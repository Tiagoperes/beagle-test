import { FC } from 'react'

type HttpMethod = 'post' | 'get' | 'put' | 'delete' | 'patch'

/* The following type defines all supported types of components. For now, we only accept React
Components. When we support more, we can redefine it as something like:

    type SupportedComponent<Props = any> = (
      FC<Props> | AngularComponent<Props> | VueComponent<Props> | WebComponent<Props>
    )

*/
type SupportedComponent<Props = any> = FC<Props>

export interface Config<Schema = any> {
  baseUrl: string,
  schemaUrl?: string,
  headers?: Record<string, string>,
  ErrorComponent: SupportedComponent,
  LoadingComponent: SupportedComponent,
  renderComponentTree: (config: Config<Schema>, ui: UIElement<Schema>) => JSX.Element,
  components: {
    [K in keyof Schema]: SupportedComponent<Schema[K]>
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
  createServerDrivenElement: (loadParams: LoadParams) => Promise<JSX.Element>,
  Loading: SupportedComponent,
}

export type DefaultSchema = Record<string, Record<string, any>>
