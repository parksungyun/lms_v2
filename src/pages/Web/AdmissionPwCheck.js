import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components"
import WebWrapper from "../../components/WebWrapper";

const Container = styled.div`
  width: 100%;
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
  }
`;

const Header = styled.div`
  font-size: 2rem;
  text-align: center;
  margin-bottom: 2rem;
  font-weight: bold;
`;

const Div = styled.div`
  display: flex;
  flex-direction: column;
  input {
    width: 300px;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid lightgray;
  }
`;

const Button = styled.button`
  padding: 1rem 3rem;
  border-radius: 50px;
  background-color: #5f7dcf;
  border: 1px solid #eee;
  color: white;
  font-weight: 700;
  margin-top: 2rem;
  &:hover {
    background-color: #86a8db;
  }
`;

export function AdmissionPwCheck() {
  const [postPw, setPostPw] = useState("");
  const navigate = useNavigate();

  function onSubmit(e) {
    e.preventDefault();
  }

  return <>
    <WebWrapper pageName={"입학 상담"} />
    <Container>
      <form onSubmit={onSubmit}>
        <Header>비밀번호 확인</Header>
        <Div>
          <input type="password" id="userPw" value={postPw} onChange={(e) => setPostPw(e.target.value)} />
        </Div>
        <Button type="submit"><p>확인</p></Button>
      </form>
    </Container>
  </>
}