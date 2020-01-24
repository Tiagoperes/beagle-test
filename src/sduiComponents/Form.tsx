import React, { FC } from 'react'

interface Props {
  action: string,
  method: 'post' | 'get' | 'put' | 'delete' | 'patch',
  children: Array<FC>,
}

const Button: FC<Props> = ({ title, action }) => {
  const actions = {
    submit: () => {
      console.log('submit')
    },
    clear: () => {
      console.log('clear')
    }
  }

  return <button onClick={actions[action]}>{title}</button>
}

export default Button
