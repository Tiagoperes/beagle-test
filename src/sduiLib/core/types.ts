type HttpMethod = 'post' | 'get' | 'put' | 'delete' | 'patch'

export interface Config<Schema = any> {
  baseUrl: string,
  schemaUrl?: string,
  headers?: Record<string, string>,
  renderError: () => any,
  renderLoading: () => any,
  renderComponentTree: (config: Config<Schema>, ui: UIElement<Schema>) => any,
  components: {
    [K in keyof Schema]: any
  },
}

export interface LoadParams {
  path: string,
  baseUrl?: string,
  method?: HttpMethod,
  headers?: Record<string, string>,
}

export interface UIElement<Schema = any> {
  type: keyof Schema,
  children?: Array<UIElement<Schema>>,
  key?: string,
  [key: string]: any,
}

export interface ServerDrivenUI {
  createServerDrivenElement: (loadParams: LoadParams) => any,
  renderLoading: () => any,
}

export type DefaultSchema = Record<string, Record<string, any>>
