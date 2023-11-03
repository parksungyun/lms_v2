import styled from "styled-components"
import { BsList } from "react-icons/bs";
import logo from '../assets/img/logo.png'
import { Outlet, useNavigate } from "react-router";
import { LmsSidebar } from "./LmsSidebar";
import { useContext, useEffect, useState } from "react";
import { SideContext } from "../pages/Router";
import { LmsFooter } from "./LmsFooter";

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
  const { toggled, setToggled, setSelectedMenu, userType } = useContext(SideContext);
  const navigate = useNavigate();
  
  return<>
    <Container>  
      <Header>
        <Img src={logo} alt="logo" onClick={() => {setSelectedMenu("Home"); navigate(`/lms/${userType}`);}}/>
        <Content>
          <UserName>송승현</UserName>
          <BsList className="icon" onClick={() => setToggled(!toggled)} />
        </Content>
      </Header>
      <ContentContainer>
        {
          toggled && <Aside><LmsSidebar userType={userType} /></Aside>
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