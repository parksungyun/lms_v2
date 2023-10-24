import styled from "styled-components"
import { Container, NavDropdown, Nav, Navbar } from "react-bootstrap";
import { NavLink, Outlet } from "react-router-dom";
import logo from "../assets/img/logo.png";
// import '../styles/web_style.css';

const Img = styled.img`
  width: 200px;
`;

const StyledLogin = styled(NavLink)`
  background-color: #5f7dcf;
  padding: 10px;
  padding-left: 20px;
  padding-right: 20px;
  border-radius: 50px;
  color: white;
  &:hover {
    background-color: #86a8db;
    color: white;
  }
`;

const StyledNavLink = styled(NavLink)`
  color: black;
  &:hover {
    color: #5f7dcf;
  }
  &:active {
    color: black;
  }
`;

export function WebNavbar() {
  return <>
    <Navbar className="">
      <Container>
        <Navbar.Brand><NavLink to="/"><Img src={logo} alt="logo" /></NavLink></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav className="gap-5">
            <Nav.Link><StyledNavLink to="about">아카데미 소개</StyledNavLink></Nav.Link>
            <Nav.Link><StyledNavLink to="courses">과정 안내</StyledNavLink></Nav.Link>
            <NavDropdown title="강사 소개" id="basic-nav-dropdown">
              <NavDropdown.Item><StyledNavLink to="trainers">교육팀</StyledNavLink></NavDropdown.Item>
              <NavDropdown.Item><StyledNavLink to="managers">행정팀</StyledNavLink></NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="이용 안내" id="basic-nav-dropdown">
              <NavDropdown.Item><StyledNavLink to="step">입학 절차</StyledNavLink></NavDropdown.Item>
              <NavDropdown.Item><StyledNavLink to="admission">입학 상담</StyledNavLink></NavDropdown.Item>
            </NavDropdown>
            <Nav.Link><StyledNavLink to="contact">오시는 길</StyledNavLink></Nav.Link>
            <Nav.Link><StyledLogin to="login">로그인</StyledLogin></Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <Outlet />
  </>
}