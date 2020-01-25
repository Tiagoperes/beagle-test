import React, { FC } from 'react'
import { StyledCard } from './styled'

interface Props {
  style?: Record<string, any>,
}

const Card: FC<Props> = ({ style, children }) => (
  <StyledCard style={style}>{children}</StyledCard>
)

export default Card
