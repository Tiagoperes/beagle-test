import React, { FC } from 'react'
import { H2 } from './styled'

interface Props {
  value: string,
  style?: Record<string, any>,
}

const Title: FC<Props> = ({ value, style }) => (
  <H2 style={style}>{value}</H2>
)

export default Title
