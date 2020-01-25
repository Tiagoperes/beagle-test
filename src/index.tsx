import React, { FC } from 'react'
import { render } from 'react-dom'
import sduiConfig from './sdui/config'
import { ServerDrivenUIProvider, ServerDrivenUI } from './sduiLib/react'
import NavBar from './components/NavBar'
import { Page, Content } from './styled'

const path = 'd803e59aadc5c3cc8def28553f17d61f/raw/71a1cf5615d5fcc02b3f538433822b3444a03df8/beagle-example.json'

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
