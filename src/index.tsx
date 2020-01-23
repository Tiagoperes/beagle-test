import React, { FC } from 'react'
import { render } from 'react-dom'

const App: FC = () => (
  <p>Hello World</p>
)

render(<App />, document.getElementById('root'))
