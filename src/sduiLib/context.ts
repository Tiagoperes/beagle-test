import { createContext } from 'react'
import { TServerDrivenUI } from './'

const context = createContext<TServerDrivenUI | null>(null)
export const ServerDrivenUIProvider = context.Provider
export default context
