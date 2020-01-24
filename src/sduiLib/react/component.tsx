import React, { FC, ReactNode, Fragment, useState, useContext, useEffect } from 'react'
import sduiContext from './context'
import { LoadParams } from '../core/types'

const ServerDrivenUI: FC<LoadParams> = (loadParams) => {
  const sdui = useContext(sduiContext)
  const [renderedTree, setRenderedTree] = useState<ReactNode>()

  const loadUI = async () => {
    if (!sdui) return
    const Component = await sdui.createServerDrivenElement(loadParams)
    setRenderedTree(Component)
  }

  useEffect(() => {
    loadUI()
   }, [loadParams])

  if (!sdui) {
    throw Error('Couldn\'t find a ServerDrivenUIProvider in the component tree!')
  }

  return renderedTree ? <Fragment>{renderedTree}</Fragment> : <sdui.Loading />
}

export default ServerDrivenUI
