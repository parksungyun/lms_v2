import styled from "styled-components"
import { BiListUl } from "react-icons/bi";
import logo from '../assets/img/logo.png'
import { useNavigate } from "react-router";

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

export function LmsHeader(){

  const navigate = useNavigate();

  return<>
    <Container>
      <Img src={logo} alt="logo" onClick={()=>navigate("/lms")}/>
      <Content>
        <UserName>송승현</UserName>
        <BiListUl className="icon" />
      </Content>
    </Container>
  </>
}