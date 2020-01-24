import React, { Fragment } from 'react'
import { map, uniqueId } from 'lodash'
import { UIElement, Config } from '../core/types'

const createReactComponentTree = <Schema>(
  config: Config<Schema>,
  ui: UIElement<Schema>,
): JSX.Element => {
  const { type, children, key = uniqueId(), ...props } = ui
  const Component = config.components[type]

  if (!Component) {
    console.log(`Warning: server driven UI could not find component ${type}. This component and its children won't be rendered.`)
    return React.createElement(Fragment)
  }

  const reactChildren = map(children, child => createReactComponentTree(config, child))
  // @ts-ignore
  return React.createElement(Component, { ...props, key }, reactChildren)
}

export default createReactComponentTree
