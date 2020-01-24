import React, { FC, useRef } from 'react'
import { createForm, FormProvider } from './context'
import { sendRequest, HttpMethod } from '../../utils/network'

interface Props {
  url: string,
  method: HttpMethod,
  successMessage?: string,
  errorMessage?: string,
}

const Form: FC<Props> = ({ url, method, successMessage, errorMessage, children }) => {
  const onSubmit = async (data: Record<string, any>) => {
    try {
      await sendRequest({ url, method, data })
      if (successMessage) window.alert(successMessage)
    } catch (error) {
      if (errorMessage) window.alert(errorMessage)
    }
  }

  const form = useRef(createForm(onSubmit))

  return (
    <FormProvider value={form.current}>
      <form onSubmit={form.current.submit} onReset={form.current.reset}>{children}</form>
    </FormProvider>
  )
}

export default Form
