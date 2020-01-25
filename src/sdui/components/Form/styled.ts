import styled from 'styled-components'

export const StyledForm = styled.form`
  position: relative;
  display: flex;
`

export const LoadingPanel = styled.div<{ isVisible: boolean }>`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.6);
  opacity: ${({ isVisible }) => isVisible ? 1 : 0};
  pointer-events: ${({ isVisible }) => isVisible ? 'auto' : 'none'};
  transition: opacity 0.5s;
`
