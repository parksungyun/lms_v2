import styled from "styled-components"
import { BsList } from "react-icons/bs";
import logo from '../assets/img/logo.png'
import { Outlet, useNavigate } from "react-router";
import { LmsSidebar } from "./LmsSidebar";
import { useContext, useEffect, useState } from "react";
import { SideContext } from "../pages/Router";
import { LmsFooter } from "./LmsFooter";
import { userList } from "../assets/TempData";
import axios from "axios";
import { getUser } from "../pages/Api";

const Container = styled.div`
  width: 100%;
  height: 100%;
;`

const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0 1rem;
  z-index: 3;
`;

const Img = styled.img`
  width: 150px;
  cursor: pointer;
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  .icon{
    width: 25px;
    height: 25px;
    cursor: pointer;
  }
`;

const UserName = styled.p`
  font-size: 1.1rem;
  font-weight: bold;
  margin: 0;
`;

const ContentContainer = styled.div`
  display: flex;
  min-height: 100vh;
  height: auto;
`;

const Aside = styled.div`
  transition: all 1000ms ease-in-out;
  width: fit-content;
  min-height: 100%;
  height: auto;
`;

const Page = styled.div`
  width: 100%;
  min-height: 100%;
  height: auto;
`;

const Footer = styled.div`
  /* position : relative; */
  padding: 1rem 0;
  background-color: #f6f9ff;
  border-top: 1px solid #eee;
`;

export function LmsHeader(){
  // const { toggled, setToggled, setSelectedMenu, userType } = useContext(SideContext);
  sessionStorage.setItem("selected", "Home");
  const navigate = useNavigate();
  const id = sessionStorage.getItem("uid");
  const [isToggled, setIsToggled] = useState(true);
  const [user, setUser] = useState({});

  useEffect(() => {
    sessionStorage.setItem("toggled", isToggled);
  }, [isToggled])

  useEffect(() => {
    console.log(getUser(id));
    setUser(getUser(id));
  }, []);

  
  return<>
    <Container>  
      <Header>
        <Img src={logo} alt="logo" onClick={() => {sessionStorage.setItem("selected", "Home"); navigate(`/lms`);}}/>
        <Content>
          <UserName>{user.userName}</UserName>
          <BsList className="icon" onClick={() => setIsToggled(!isToggled)} />
        </Content>
      </Header>
      <ContentContainer>
        {
          isToggled && <Aside><LmsSidebar /></Aside>
        }
        <Page>
          <Outlet />
        </Page>
      </ContentContainer>
      <Footer>
        <LmsFooter />
      </Footer>
    </Container>
  </>
}