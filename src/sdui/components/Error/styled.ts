import styled from 'styled-components'

export const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const ErrorTitle = styled.h2`
  color: red;
  text-align: center;
  margin: 30px 0 10px;
`

export const ErrorDescription = styled.p`
  max-width: 300px;
  text-align: center;
  font-size: 12px;
  margin: 0;
`