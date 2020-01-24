import styled from 'styled-components'

interface Props {
  flexDirection?: string,
}

export default styled.div<Props>`
  display: flex;
  flex-direction: ${({ flexDirection = 'column' }) => flexDirection};
  background-color: #FFF;
  box-shadow: 2px 2px 15px #DDD;
  max-width: 1000px;
`
