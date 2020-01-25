import React, { FC } from 'react'

interface Props {
  style?: Record<string, any>,
}

const Container: FC<Props> = ({ style, children }) => (
  <div style={{ display: 'flex', ...style }}>{children}</div>
)

export default Container
