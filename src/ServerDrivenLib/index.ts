import { FC } from 'react'

const namespace = '@beagle-web/cache'

interface Example {
  container: {},
  image: {
    url: string,
    description: string,
  },
  text: {
    value: string,
  },
  form: {
    action: string,
    method: 'post' | 'get' | 'put' | 'delete' | 'patch',
  },
  input: {
    name: string,
    placeholder?: string,
    validations?: Array<'required' | 'validateMajority'>, 
  },
  button: {
    action: 'submit' | 'clear',
    title: string,
  },
}

type HttpMethod = 'post' | 'get' | 'put' | 'delete' | 'patch'

interface Config<Schema> {
  baseUrl: string,
  headers?: Record<string, string>,
  shouldFallbackToCache: boolean,
  error: FC,
  loading: FC,
  components: {
    [K in keyof Schema]: FC<Schema[K]>
  },
}

interface LoadParams {
  path: string,
  baseUrl?: string,
  method?: HttpMethod,
  headers?: Record<string, string>,
}

type DefaultSchema = Record<string, Record<string, any>>

interface UIElement<Schema> {
  type: keyof Schema,
  children: Array<UIElement<Schema>>,
  [key: string]: any,
}

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

  const createReactComponentTree = (uiTree: UIElement<Schema>) => {
    
  }
}
