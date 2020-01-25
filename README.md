# Beagle

Este projeto é uma POC construída para o processo seletivo do Beagle-Web, produto da empresa ZUP IT.
O objetivo do Beagle-Web é construir uma solução para guiar o uso de server-driven UI para os demais
produtos da ZUP.

## Rodando a aplicação

Para rodar esta aplicação, clone o projeto, instale com o yarn e rode com o comando `yarn dev`!

```
git clone git@github.com:Tiagoperes/beagle-test.git
cd beagle-test
yarn
yarn dev
```

## Sobre minhas modificações do problema
Para deixar o problema mais interssante e implementar uma solução mais robusta, fiz as seguintes
alterações no enunciado do problema:

- Devem existir três campos no formulário: e-mail, nome e idade.
- O formulário deve possuir duas ações: submeter e limpar.
- O formulário não pode ser submetido caso haja algum erro de validação.
- A submissão do formulário deve gerar uma requisição POST XHR com os dados do formulário.
- Se a requisição do formulário for bem sucedida, deve-se exibir uma mensagem de sucesso. Uma
mensagem de erro deve ser exibida caso contrário.

Utilizei a ferramenta online webhook.site para fazer a requisição do formulário. Para ver o
resultado das requisições, acesse https://webhook.site/#!/0f248bf3-ad8b-4269-bd2a-3ba99d15781a/98a61910-0d6b-41b5-b9a4-10abee9326ed/1.
Ao clicar no botão de submeter o formulário, uma nova entrada deve ser gerada na página do link
anterior.

Criei os novos componentes `card`, `form` e `title`.

Criei duas novas funções de validação: `required` e `email`.

Criei vários novos atributos nos componentes e alterei outros, essas modificações serão explicadas
na seção "Alterações no JSON e sugestões".

O JSON que utilizei para fazer a renderização pode ser encontrado no seguinte gist:
https://gist.github.com/Tiagoperes/d803e59aadc5c3cc8def28553f17d61f

## Sobre a solução
A intenção desta POC foi construir uma biblioteca capaz de facilitar o uso de server driven ui para
o desenvolvedor final. Portanto, este projeto inclui uma lib e uma implementação que utiliza a lib.
Devido à restrição de tempo, a lib não foi extraída em outro projeto e é apresentada aqui no
diretório `src/sduiLib`.

A lib em sí é composta de duas partes separadas: `core` e `react`. A intenção é que a lib seja
agnóstica de framework, mas que também facilite o uso pelo desenvolvedor final. Portanto, `core`
foi codificado independente de framework e o renderizador é sempre especificado pelo desenvolvedor.
O diretório `react` contém o renderizador para React. Podemos criar um renderizador para cada
framework diferente, mas para os fins deste deste, criei apenas o renderizador para o React, que é
a feerramenta com qual possuo maior familiaridade.

O desenvolvedor que vai usar a biblioteca de server driven ui sempre importa dois arquivos:
`lib/core` e `lib/{framwork}`. Dessa forma, um projeto que usa React, por exemplo, não precisa
importar código do Angular ou de Vue. Veja um exemplo de configuração abaixo:

```typescript
import createServerDrivenUI from 'sduiLib/core'
import { createReactComponentTree } from 'sduiLib/react'
// ...

export default createServerDrivenUI<Schema>({
  baseUrl: 'https://myserver.com/sdui',
  ErrorComponent: Error,
  LoadingComponent: Loading,
  renderComponentTree: createReactComponentTree,
  components: {
    // ...
  }
})
```

O desenvolvedor específica a url do servidor, os componentes e o renderizador na configuração acima.
Caso outro framework estivesse sendo utilizado, bastaria substituir o valor da propriedade
renderComponentTree.

### Typescript
Como pode ser notado pelo exemplo de código acima, utilizei Typescript para escrever o projeto e não
javascript puro. Essa decisão se deve principalmente ao fato de que, com javascript, seria muito
fácil escrever um componente que não implementa corretamente a interface provida pelos componentes
do servidor. Para que isso funcione, implementei o conceito de que schema, que funciona de maneira
parecida com o GraphQL, mas aqui, a validaçao é feita em tempo de compilação e não de execução.

O servidor, além de prover as diferentes views representadas por jsons, também terá um endpoint
para prover um schema dos componentes. Esse arquivo é uma definição de tipos em linguagem typescript
que representa todos os componentes que podem ser retornados pelo servidor.

O desenvolvedor pode especificar na configuração da lib, o schema a ser utilizado. Se o schema não
for definido, assume-se que o endpoint será `${baseUrl}/schema`.

Ao executar o comando `yarn update-sdui-schema`, esse esquema é baixado para o projeto local e
assim é possível fazer todas as validações dos componentes. Se existir algum componente no servidor
que não está implementado localmente, o código da configuração é sublinhado de vermelho, pois existe
um erro. Se o componente não recebe um atributo obrigatório: erro!, Se o componente de formulário
não implementa uma função de validação: erro!

Para garantir que está tudo ok ao comitar, foi criado um hook pre-commit que baixa a versão mais
recente do schema e valida os tipos. Dessa forma, o desenvolvedor é alertado sempre que tentar
comitar umna versão do app que não está de acordo com a definição de componentes do servidor.

O schema utilizado nesta aplicação pode ser encontrada no seguinte gist:
https://gist.github.com/Tiagoperes/df605a1656f27f7c2685a3c55979029b

### Componentes
Segui a lógica de que os componentes no JSON devem apenas definir o comportamento geral do
componente, a implementação em si deve ser de total responsabilidade do desenvolvedor, o qual, ao
configurar a biblioteca, deve relacionar cada componente do servidor a um componente local.

Por exemplo, no JSON, o formulário deve dizer apenas o que acontece na submissão. Os campos dentro
do formulário devem dizer apenas quais são as validações para o campo e um identificador. Os
botões especificam apenas qual é a ação a ser realizada. O comportamento de loading, a requisição
ajax, os textos de erro ao validar, os eventos onBlur e onChange que mudam o estado da validação, o
estilo geral do componente, devem ser todos definidos na implementação local do componente.

### Fallbacks e tratamento de erro

#### Erros de interface (componentes no servidor diferentes de componentes locais)
Erros com a interface dos componentes devem ser detectados pelo Typescript no momento de escrita
do código ou no commit. De qualquer forma, esses erros também são logados no console se acontecer
de um código que não passa nas validações ser distribuído ou se o front acessar uma view com
componentes que não respeitam o schema. Além dos logs, a aplicação não "crasha". Se um componente
no JSON não é encontrado localmente, ele é simplesmente ignorado na renderização. Se uma validação
não é encontrada, também é ignorada, sem causar maiores problemas ao usuário.

#### Erros de conexão com a internet
Se ocorrer um erro de conexão, um erro é logado no console e a lib carrega a última versão do
componente guardada em cache (localStorage). Se não há cache, o componente de erro cadastrado no
objeto de configuração da lib é exibido.

#### Loadings
Enquanto o componente está sendo carregado do servidor, o componente de loading especificado na
configuração da lib é exibido.

### Solução React
A solução específica para o react consiste em um provider que recebe a configuração da lib e no
componente "ServerDrivenUI", provido pela lib. Veja um exemplo de como o desenvolvedor React
utilizaria a lib para exibir uma página com o perfil e a lista de amigos do usuário:

sdui-config.ts
```typescript
import createServerDrivenUI from '../sduiLib/core'
import { createReactComponentTree } from '../sduiLib/react'
import Schema from './schema'
import Error from './components/Error'
import Loading from './components/Loading'
import Container from './components/Container'
import Image from './components/Image'
// other components...

export default createServerDrivenUI<Schema>({
  baseUrl: 'https://mysdui.com',
  schemaUrl: 'https://schema.mysdui.com',
  ErrorComponent: Error,
  LoadingComponent: Loading,
  renderComponentTree: createReactComponentTree,
  components: {
    container: Container,
    image: Image,
    // other components...
  }
})
```

App.tsx
```typescript
import React, { FC } from 'react'
import sduiConfig from './sdui/config'
import { ServerDrivenUIProvider, ServerDrivenUI } from './sduiLib/react'

const App: FC = () => (
  <ServerDrivenUIProvider value={sduiConfig}>
    <p>Meu perfil:</p>
    <ServerDrivenUI path="profile" />
    <p>Meus amigos:</p>
    <ServerDrivenUI path="friends" />
  </ServerDrivenUIProvider>
)

export default App
```

## Modificações e sugestões para o JSON

#### Estilo
Para não precisar recriar um componente só pq foi necessário usar uma margem, uma cor ou uma
disposição diferente, é interessante passarmos algumas informações de estilo no JSON. Para isso,
criei a propriedade "style", que recebe qualquer propriedade de estilo css em camelCase.

#### Validações
As validações são realizados por campo, e não por formulário. E se eu quiser validar que 3 dos
5 campos são obrigatórios? Seria inviável criar 3 funções diferentes de "required". Portanto, a
validação foi transferida do formulário para o campo e agora é um array de strings ao invés de
apenas uma string. Um campo pode ser validado através de várias funções, por exemplo, ele pode ser
obrigatório e também pode ter que ser um e-mail válido.

#### Formulário
Para que fosse possível fazer algo interessante com o formulário, criei o componente de `form` com
as propriedades `url`, `method`, `successMessage` e `errorMessage`, que servem para fazer a
requisição XHR e exibir um feedback.

#### Outras modificações
Fiz algumas outras modificações para melhorar o estilo e alterei alguns nomes de propriedades que
fariam mais sentido para mim. Nada importante.

#### Sugestões
`type` é uma palavra reservada no json. Nunca poderemos ter uma propriedade chamada `type` em um
componente. Isso está ok, a não ser que comecemos a ter mais meta-propriedades. Se isso acontecer,
sugiro encapsular as propriedades do componente em um objeto chamado `props`.

## Testes
Time is up, sorry =/. Sei que são importantes, mas não deu tempo mesmo, haha.
