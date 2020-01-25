import styled from 'styled-components'

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  margin: 15px 0;
`

export const Error = styled.p`
  color: #ec5a4b;
  margin: 5px 0 0 0;
`

export const StyledInput = styled.input<{ hasError: boolean }>`
  display: flex;
  flex: 1;
  padding: 8px 10px;
  border-radius: 5px;
  border: 1px solid ${({ hasError }) => hasError ? '#EC5A4B' : '#BBB'};
  outline: none;
  transition: border-color 0.3s, box-shadow 0.3s;
  font-size: 12px;
  
  ::placeholder {
    color: #BBB;
    font-style: italic;
  }

  :hover {
    border-color: ${({ hasError }) => hasError ? '#C72F20' : '#FF6C25'};
  }

  :focus {
    border-color: ${({ hasError }) => hasError ? '#9E1B0E' : '#F04E00'};
    box-shadow: 1px 1px 8px #FFCEB7;
  }
`
