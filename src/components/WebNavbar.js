import styled from "styled-components"
import { Container, NavDropdown, Nav, Navbar } from "react-bootstrap";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import logo from "../assets/img/logo.png";
import { BsPencil } from "react-icons/bs";
import { useEffect, useState } from "react";
import { getUserByUid } from "../pages/Api";

const Img = styled.img`
  width: 200px;
`;

const StyledLogin = styled(NavLink)`
  background-color: #5f7dcf;
  padding: 10px 30px;
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

const StyledDropdown = styled(NavDropdown.Item)`
  &:active {
    background-color: white;
  }
`;

const LoginWrapper = styled.div`
  display: flex;
  gap: 1rem;
`;

export function WebNavbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [userType, setUserType] = useState();

  useEffect(() => {
    if(sessionStorage.getItem("uid") === null) {
    }
    else {
      if(!user) {
        const promise = getUserByUid(sessionStorage.getItem("uid"));
        const getData = () => {
          promise.then((data) => {
            setUser(data);
          });
        };
        getData();
      }
      else {
        if(user.student) {
          sessionStorage.setItem("userType", "s");
          sessionStorage.setItem("id", user.student.studentId);
        }
        if(user.academic) {
          sessionStorage.setItem("id", user.academic.academicId);
          if(user.academic.dept === 0)
            sessionStorage.setItem("userType", "m");
          else sessionStorage.setItem("userType", "t");
          sessionStorage.setItem("auth", user.academic.auth);
        }
        if(!user.student && !user.academic) {
          sessionStorage.setItem("userType", "g");
        }
        setUserType(sessionStorage.getItem("userType"));
      }
    }
  });

  return <>
    <Navbar>
      <Container>
        <Navbar.Brand><NavLink to="/"><Img src={logo} alt="logo" /></NavLink></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav className="gap-5">
            <Nav.Link><StyledNavLink to="about">아카데미 소개</StyledNavLink></Nav.Link>
            <Nav.Link><StyledNavLink to="courses">과정 안내</StyledNavLink></Nav.Link>
            <NavDropdown title="강사 소개" id="basic-nav-dropdown">
              <StyledDropdown><StyledNavLink to="trainers">교육팀</StyledNavLink></StyledDropdown>
              <StyledDropdown><StyledNavLink to="managers">행정팀</StyledNavLink></StyledDropdown>
            </NavDropdown>
            <NavDropdown title="이용 안내" id="basic-nav-dropdown">
              <StyledDropdown><StyledNavLink to="step">입학 절차</StyledNavLink></StyledDropdown>
              <StyledDropdown><StyledNavLink to="admission">입학 상담</StyledNavLink></StyledDropdown>
            </NavDropdown>
            <Nav.Link><StyledNavLink to="contact">오시는 길</StyledNavLink></Nav.Link>
            <LoginWrapper>
              {
                !user
                ? <Nav.Link><StyledLogin to="login">로그인</StyledLogin></Nav.Link>
                : <Nav.Link><StyledNavLink onClick={() => {sessionStorage.clear(); setUser(null)}}>로그아웃</StyledNavLink></Nav.Link>
              }
              {
                (user && userType !== "g") 
                && <Nav.Link onClick={() => {navigate(`/lms/${userType}`)}}><StyledLogin>LMS 바로가기 <BsPencil /></StyledLogin></Nav.Link>
              }
            </LoginWrapper>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <Outlet />
  </>
}