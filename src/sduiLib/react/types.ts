import { FC } from 'react'
import {
  Config as CoreConfig,
  ServerDrivenUI as CoreServerDrivenUI,
  LoadParams,
} from '../core/types'

export interface Config<Schema = any> extends Omit<CoreConfig<Schema>, 'renderComponentTree'> {
  renderError: () => JSX.Element,
  renderLoading: () => JSX.Element,
  components: {
    [K in keyof Schema]: FC<Schema[K]>
  },
}

export interface ServerDrivenUI extends CoreServerDrivenUI {
  createServerDrivenElement: (loadParams: LoadParams) => JSX.Element,
  renderLoading: () => JSX.Element,
}
