import styled from 'styled-components'

export const Nav = styled.div`
  background-color: #E84C3D;
  height: 30px;
  display: flex;
  flex-direction: row;
  box-shadow: 2px 0 11px #AAA;
  align-items: center;
  padding: 10px 20px;
`

export const NavLeftPanel = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

export const NavRightPanel = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row-reverse;
`

export const Title = styled.h1`
  margin: 0 20px;
  font-size: 20px;
  color: #FFF;
  font-family: Arial, Helvetica, sans-serif;
`

export const NavButton = styled.div`
  background-color: #b93f34;
  border-radius: 5px;
  color: #FFF;
  cursor: pointer;
  margin: 0 8px;
  padding: 10px 15px;
  transition: background-color 0.3s;

  :first-child {
    margin-right: 0;
  }

  :hover {
    background-color: #86251C;
  }
`
