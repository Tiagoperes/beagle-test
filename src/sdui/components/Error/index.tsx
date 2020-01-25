import React, { FC } from 'react'
import ErrorImage from '../../../assets/images/error.png'
import { ErrorContainer, ErrorTitle, ErrorDescription } from './styled'

const Error: FC = () => (
  <ErrorContainer>
    <img src={ErrorImage} alt="Imagem de erro" />
    <ErrorTitle>Oops! Ocorreu um erro.</ErrorTitle>
    <ErrorDescription>
      Não foi possível carregar o conteúdo. Por favor tente mais tarde
    </ErrorDescription>
  </ErrorContainer>
)

export default Error
