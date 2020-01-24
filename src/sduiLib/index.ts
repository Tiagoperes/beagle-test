import React, { FC, ReactNode } from 'react'
import { map, uniqueId } from 'lodash'

const namespace = '@beagle-web/cache'

type HttpMethod = 'post' | 'get' | 'put' | 'delete' | 'patch'

interface Config<Schema> {
  baseUrl: string,
  headers?: Record<string, string>,
  shouldFallbackToCache: boolean,
  ErrorComponent: FC,
  LoadingComponent: FC,
  components: {
    [K in keyof Schema]: FC<Schema[K]>
  },
}

export interface LoadParams {
  path: string,
  baseUrl?: string,
  method?: HttpMethod,
  headers?: Record<string, string>,
}

interface UIElement<Schema> {
  type: keyof Schema,
  children?: Array<UIElement<Schema>>,
  key?: string,
  [key: string]: any,
}

type DefaultSchema = Record<string, Record<string, any>>

function createServerDrivenUI<Schema = DefaultSchema>(config: Config<Schema>) {
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

  const createReactComponentTree = ({
    type,
    children,
    key = uniqueId(),
    ...props
  }: UIElement<Schema>): ReactNode => {
    const Component = config.components[type]
    const reactChildren = map(children, createReactComponentTree)
    // @ts-ignore
    return React.createElement(Component, { ...props, key }, reactChildren)
  }

  const createServerDrivenElement = async (loadParams: LoadParams): Promise<ReactNode> => {
    let uiTree: UIElement<Schema>
    try {
      uiTree = await loadFromServer(loadParams)
    } catch (error) {
      uiTree = await loadFromCache(loadParams)
    }
    if (uiTree) return createReactComponentTree(uiTree)
    return React.createElement(config.ErrorComponent)
  }

  return {
    createServerDrivenElement,
    Loading: config.LoadingComponent,
  }
}

export default createServerDrivenUI

export type TServerDrivenUI = ReturnType<typeof createServerDrivenUI>
