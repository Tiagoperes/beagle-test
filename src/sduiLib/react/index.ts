import createCoreServerDrivenUI from '../core'
import { DefaultSchema } from '../core/types'
import ServerDrivenUI from './component'
import { ServerDrivenUIProvider } from './context'
import createReactComponentTree from './renderer'
import { Config } from './types'

function createServerDrivenUI<Schema = DefaultSchema>(config: Config<Schema>) {
  return createCoreServerDrivenUI({
    ...config,
    renderComponentTree: createReactComponentTree,
  })
}

export {
  ServerDrivenUI,
  ServerDrivenUIProvider,
  createReactComponentTree,
  createServerDrivenUI,
}
