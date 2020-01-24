import React, { FC, useState, useContext, useEffect } from 'react'
import sduiContext from './context'
import { LoadParams } from './'

const ServerDrivenUI: FC<LoadParams> = (loadParams) => {
  const sdui = useContext(sduiContext)
  const [SDUIComponent, setSDUIComponent] = useState<FC>()

  const loadUI = async () => {
    if (!sdui) return
    const Component = await sdui.createServerDrivenElement(loadParams)
    setSDUIComponent(Component)
  }

  useEffect(() => {
    loadUI()
   }, [loadParams])

  if (!sdui) {
    throw Error('Couldn\'t find a ServerDrivenUIProvider in the component tree!')
  }

  if (SDUIComponent) return <SDUIComponent />
  return <sdui.Loading />
}

export default ServerDrivenUI
