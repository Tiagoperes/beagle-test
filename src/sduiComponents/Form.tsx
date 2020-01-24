import React, { FC } from 'react'

interface Props {
  action: string,
  method: 'post' | 'get' | 'put' | 'delete' | 'patch',
}

const Form: FC<Props> = ({ action, method, children }) => {
  console.log('form', action, method)
  return <form>{children}</form>
}

export default Form
