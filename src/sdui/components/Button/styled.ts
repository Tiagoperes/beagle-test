import styled from 'styled-components'

export const StyledButton = styled.button<{ primary?: boolean }>`
  border-radius: 5px;
  background-color: ${({ primary }) => primary ? '#E84C3D' : '#FFF'};
  color: ${({ primary }) => primary ? '#FFF' : '#E84C3D'};
  cursor: pointer;
  padding: 8px 15px;
  border: 1px solid ${({ primary }) => primary ? 'transparent' : '#E84C3D'};
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-size: 12px;
  outline: none;
  transition: background-color 0.3s;

  :focus {
    box-shadow: 1px 1px 8px #FFCEB7;
  }

  :hover {
    background-color: ${({ primary }) => primary ? '#AB2215' : '#EEE'};
  }
`
