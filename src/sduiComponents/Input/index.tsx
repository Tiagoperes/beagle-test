import React, { FC, useState } from 'react'
import { forEach } from 'lodash'
import validationFunctions, { Validation } from '../validations'
import { InputGroup, Error } from './styled'

interface Props {
  name: string,
  value?: string,
  placeholder?: string,
  validations?: Array<Validation>,
}

const Input: FC<Props> = ({ value, name, placeholder, validations }) => {
  const [error, setError] = useState<string | undefined>()
  const [shouldShowError, setShouldShowError] = useState(false)

  const validate = (event: React.FocusEvent<HTMLInputElement>) => {
    const { value } = event.target
    forEach(validations, validation => {
      const error = validationFunctions[validation](value)
      setError(error)
      if (error) return false
    })
  }

  return (
    <InputGroup>
      <input
        name={name}
        onChange={validate}
        onBlur={() => setShouldShowError(true)}
        value={value}
        placeholder={placeholder}
      />
      {shouldShowError && error && <Error>{error}</Error>}
    </InputGroup>
  )
}

export default Input
