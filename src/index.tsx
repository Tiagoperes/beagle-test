import React, { FC } from 'react'
import { render } from 'react-dom'
import sduiConfig from './sduiConfig'
import { ServerDrivenUIProvider } from './sduiLib/context'
import ServerDrivenUI from './sduiLib/Component'

const App: FC = () => (
  <ServerDrivenUIProvider value={sduiConfig}>
    <p>Hello World</p>
  </ServerDrivenUIProvider>
)

render(<App />, document.getElementById('root'))
