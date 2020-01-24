import React, { FC } from 'react'

interface Props {
  title: string,
  action: 'submit' | 'reset',
}

const Button: FC<Props> = ({ title, action }) => {
  return <button type={action}>{title}</button>
}

export default Button
