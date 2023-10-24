import styled from "styled-components";

const Header = styled.div`
  background-color: #5f7dcf;
  width: 100%;
  height: 100px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const HeaderText = styled.p`
  font-size: 2rem;
  font-weight: 500;
`;

export default function WebWrapper({pageName}) {
  return <>
    <Header>
      <HeaderText>{pageName}</HeaderText>
    </Header>
  </>
}