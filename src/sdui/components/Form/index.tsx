import React, { FC, useRef, useState } from 'react'
import { createForm, FormProvider } from './context'
import { sendRequest, HttpMethod } from '../../../utils/network'
import Loading from '../Loading'
import { LoadingPanel, StyledForm } from './styled'

interface Props {
  url: string,
  method: HttpMethod,
  successMessage?: string,
  errorMessage?: string,
  style?: Record<string, any>,
}

const Form: FC<Props> = ({ url, method, successMessage, errorMessage, style, children }) => {
  const [isLoading, setLoading] = useState(false)

  const onSubmit = async (data: Record<string, any>) => {
    setLoading(true)
    try {
      await sendRequest({ url, method, data })
      if (successMessage) window.alert(successMessage)
    } catch (error) {
      if (errorMessage) window.alert(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  const form = useRef(createForm(onSubmit))

  return (
    <FormProvider value={form.current}>
      <StyledForm
        style={style}
        onSubmit={form.current.submit}
        onReset={form.current.reset}
      >
        {children}
        <LoadingPanel isVisible={isLoading}><Loading /></LoadingPanel>
      </StyledForm>
    </FormProvider>
  )
}

export default Form
