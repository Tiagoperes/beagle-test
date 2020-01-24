import React, { FC } from 'react'
import { render } from 'react-dom'
import sduiConfig from './sduiConfig'
import { ServerDrivenUIProvider, ServerDrivenUI } from './sduiLib/react'
import NavBar from './components/NavBar'
import { Page, Content } from './styled'

const path = 'd803e59aadc5c3cc8def28553f17d61f/raw/d52f2a2b085e1422a925039cf091f982808cdfd9/beagle-example.json'

const App: FC = () => (
  <Page>
    <ServerDrivenUIProvider value={sduiConfig}>
      <NavBar />
      <Content>
        <ServerDrivenUI path={path} />
      </Content>
    </ServerDrivenUIProvider>
  </Page>
)

render(<App />, document.getElementById('root'))
