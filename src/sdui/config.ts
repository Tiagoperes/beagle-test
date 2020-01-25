import createServerDrivenUI from '../sduiLib/core'
import { createReactComponentTree } from '../sduiLib/react'
import Schema from './schema'
import Error from './components/Error'
import Loading from './components/Loading'
import Container from './components/Container'
import Image from './components/Image'
import Form from './components/Form'
import Input from './components/Input'
import Button from './components/Button'
import Text from './components/Text'
import Title from './components/Title'
import Card from './components/Card'

export default createServerDrivenUI<Schema>({
  baseUrl: 'https://gist.githubusercontent.com/Tiagoperes',
  schemaUrl: 'https://gist.githubusercontent.com/Tiagoperes/df605a1656f27f7c2685a3c55979029b/raw/b438cd2831b0032de37fe9a1b2c320f30a3d3c4f/beagle-schema.ts',
  ErrorComponent: Error,
  LoadingComponent: Loading,
  renderComponentTree: createReactComponentTree,
  components: {
    button: Button,
    container: Container,
    form: Form,
    image: Image,
    input: Input,
    text: Text,
    title: Title,
    card: Card,
  }
})
