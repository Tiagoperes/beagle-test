import React from 'react'
import {
  DefaultSchema,
  Config,
  LoadParams,
  UIElement,
  ServerDrivenUI,
} from './types'

const namespace = '@beagle-web/cache'

function createServerDrivenUI<Schema = DefaultSchema>(config: Config<Schema>): ServerDrivenUI {
  const loadFromCache = async ({ path, baseUrl, method = 'get' }: LoadParams) => {
    const url = `${baseUrl || config.baseUrl}/${path}`
    const fromStorage = localStorage.getItem(`${namespace}/${url}/${method}`)
    return fromStorage ? JSON.parse(fromStorage) : null
  }

  const loadFromServer = async ({ path, baseUrl, method = 'get', headers }: LoadParams) => {
    const url = `${baseUrl || config.baseUrl}/${path}`
    const response = await fetch(url, { method, headers: { ...config.headers, ...headers } })
    if (response.status < 100 && response.status >= 400) throw new Error('Network error')
    const uiTree = await response.json() as UIElement<Schema>
    localStorage.setItem(`${namespace}/${url}/${method}`, JSON.stringify(uiTree))
    return uiTree
  }

  const createServerDrivenElement = async (loadParams: LoadParams): Promise<JSX.Element> => {
    let uiTree: UIElement<Schema>
    try {
      uiTree = await loadFromServer(loadParams)
    } catch (error) {
      console.log('Error while fetching server driven component:', error)
      uiTree = await loadFromCache(loadParams)
    }
    if (uiTree) return config.renderComponentTree(config, uiTree)
    return React.createElement(config.ErrorComponent)
  }

  return {
    createServerDrivenElement,
    Loading: config.LoadingComponent,
  }
}

export default createServerDrivenUI
