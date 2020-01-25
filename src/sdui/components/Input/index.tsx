import React, { FC, useState, useContext, useEffect } from 'react'
import { forEach } from 'lodash'
import formContext from '../Form/context'
import validationFunctions, { Validation } from '../validations'
import { InputGroup, Error, StyledInput } from './styled'

interface Props {
  name: string,
  value?: string,
  placeholder?: string,
  validations?: Array<Validation>,
  style?: Record<string, any>,
}

const Input: FC<Props> = ({ value, name, placeholder, validations, style }) => {
  const form = useContext(formContext)
  const [error, setError] = useState<string | undefined>()
  const [shouldShowError, setShouldShowError] = useState(false)

  const validate = (value: string) => {
    forEach(validations, validation => {
      if (!validationFunctions[validation]) {
        console.error(`Error: server driven ui component Input has no validation of name ${validation}. Skipping validation.`)
        return true
      }
      const error = validationFunctions[validation](value)
      setError(error)
      form?.setFieldError(name, !!error)
      if (error) return false
    })
  }
  
  useEffect(() => {
    if (!form) return 
    form.setField(name, { value: '', hasError: false })
    validate('')
    const removeSubmitListener = form.addSubmitListener(() => setShouldShowError(true))
    const removeResetListener = form.addResetListener(() => {
      form.setField(name, { value: '', hasError: false })
      setError(undefined)
      setShouldShowError(false)
      validate('')
    })
    
    return () => {
      removeSubmitListener()
      removeResetListener()
    }
  }, [])

  const onChange = (event: React.FocusEvent<HTMLInputElement>) => {
    const { value } = event.target
    console.log(value)
    validate(value)
    form?.setFieldValue(name, value)
  }

  return (
    <InputGroup>
      <StyledInput
        style={style}
        name={name}
        onChange={onChange}
        onBlur={() => setShouldShowError(true)}
        value={value}
        placeholder={placeholder}
        hasError={shouldShowError && !!error}
      />
      {shouldShowError && error && <Error>{error}</Error>}
    </InputGroup>
  )
}

export default Input
