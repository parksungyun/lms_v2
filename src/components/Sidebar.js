import { NavLink } from "react-router-dom";
import styled from "styled-components"

const Container = styled.div`
  width: 18vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  background-color: #eee;
  z-index: 1;
`;

const MainTitle = styled.li`
  list-style: none;
`;

const StyledNavLink = styled(NavLink)`
  color: black;
`;

export function Sidebar(){
  return<>
    <Container>
      <ul>
        <MainTitle><StyledNavLink>내 클래스</StyledNavLink></MainTitle>
        <MainTitle><StyledNavLink to='#'>HTML</StyledNavLink></MainTitle>
        <MainTitle><StyledNavLink to='#'>CSS</StyledNavLink></MainTitle>
        <MainTitle><StyledNavLink to='#'>JS</StyledNavLink></MainTitle>
        <MainTitle><StyledNavLink to='#'>JAVA</StyledNavLink></MainTitle>
        <MainTitle><StyledNavLink to='#'>DB</StyledNavLink></MainTitle>
      </ul>
    </Container>
  </>
}