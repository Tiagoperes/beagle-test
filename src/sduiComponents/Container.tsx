import React, { FC } from 'react'

interface Props {
  children: Array<FC>,
}

const Container: FC<Props> = ({ children }) => {
  return (
    <div>
      {children}
    </div>
  )
}

export default Container
