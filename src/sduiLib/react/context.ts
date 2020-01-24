import { createContext } from 'react'
import { ServerDrivenUI } from '../core/types'

const context = createContext<ServerDrivenUI | null>(null)
export const ServerDrivenUIProvider = context.Provider
export default context
