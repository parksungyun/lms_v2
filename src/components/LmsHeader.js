import styled from "styled-components"
import { BsList } from "react-icons/bs";
import logo from '../assets/img/logo.png'
import { Outlet, useNavigate } from "react-router";
import { LmsSidebar } from "./LmsSidebar";
import { useContext, useEffect, useState } from "react";
import { SideContext } from "../pages/Router";

const Container = styled.div`
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
`;

const Aside = styled.div`
  transition: all 1000ms ease-in-out;
  width: fit-content;
`;

const Page = styled.div`
  width: 100vw;
`;

export function LmsHeader(){
  const { toggled, setToggled, setSelectedMenu } = useContext(SideContext);
  const navigate = useNavigate();


  return<>
    <Container>
      <Img src={logo} alt="logo" onClick={() => {setSelectedMenu("Home"); navigate("/lms/s");}}/>
      <Content>
        <UserName>송승현</UserName>
        <BsList className="icon" onClick={() => setToggled(!toggled)} />
      </Content>
    </Container>
    <ContentContainer>
      {
        toggled && <Aside><LmsSidebar /></Aside>
      }
      <Page><Outlet /></Page>
    </ContentContainer>
  </>
}