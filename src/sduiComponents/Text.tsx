import React, { FC } from 'react'

interface Props {
  value: string,
  style?: Record<string, any>,
}

const Text: FC<Props> = ({ value, style }) => (
  <p style={style}>{value}</p>
)

export default Text
