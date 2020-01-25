import React, { FC } from 'react'
import { StyledButton } from './styled'

interface Props {
  title: string,
  action: 'submit' | 'reset',
  primary?: boolean,
  style?: Record<string, any>,
}

const Button: FC<Props> = ({ title, action, primary, style }) => {
  return <StyledButton type={action} style={style} primary={primary}>{title}</StyledButton>
}

export default Button
