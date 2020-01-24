import React, { FC } from 'react'
import { render } from 'react-dom'
import sduiConfig from './sduiConfig'
import { ServerDrivenUIProvider } from './sduiLib/context'
import ServerDrivenUI from './sduiLib/Component'

const path = 'd803e59aadc5c3cc8def28553f17d61f/raw/5ce18f70b9b1e6ae275a7b420429c54f4ab176b2/beagle-example.json'

const App: FC = () => (
  <ServerDrivenUIProvider value={sduiConfig}>
    <p>Hello World</p>
    <ServerDrivenUI path={path} />
  </ServerDrivenUIProvider>
)

render(<App />, document.getElementById('root'))
