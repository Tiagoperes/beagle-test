import React, { FC } from 'react'
import { Nav, Title, NavLeftPanel, NavRightPanel, NavButton } from './styled'
import Logo from '../../assets/svg/Dog'

const NavBar: FC = () => (
  <Nav>
    <NavLeftPanel>
      <Logo />
      <Title>Dawg!</Title>
    </NavLeftPanel>
    <NavRightPanel>
      <NavButton>Fazer login</NavButton>
      <NavButton>Cadastrar-se</NavButton>
      <NavButton>Sobre nós</NavButton>
    </NavRightPanel>
  </Nav>
)

export default NavBar
