import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components"

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

const FindWrapper = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
`;

const Find = styled.button`
  border: none;
  background-color: white;
`;

const Divider = styled.div`
  color: #bbb;
  margin: 0;
  padding: 0;
  cursor: default;
`;

export function FindPW() {
  const [userId, setUserId] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const navigate = useNavigate();

  function onSubmit(e) {
    e.preventDefault();

  }

  return <>
    <Container>
      <form onSubmit={onSubmit}>
        <Header>비밀번호 찾기</Header>
        <Div>
          <label>아이디</label>
          <input id="userId" value={userId} onChange={(e) => setUserId(e.target.value)} />
        </Div>
        <Div>
          <label>연락처</label>
          <input id="userPhone" value={userPhone} onChange={(e) => setUserPhone(e.target.value)} />
        </Div>
        <Button type="submit">비밀번호 찾기</Button>
        <FindWrapper>
          <Find onClick={() => navigate("/register")}>회원가입</Find>
          <Divider>|</Divider>
          <Find onClick={() => navigate("/login")}>로그인</Find>
          <Divider>|</Divider>
          <Find onClick={() => navigate("/findID")}>아이디 찾기</Find>
        </FindWrapper>
      </form>
    </Container>
  </>
}