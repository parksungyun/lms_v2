import { useState } from "react";
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

export function FindID() {
  const [userName, setUserName] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const navigate = useNavigate();

  function onSubmit(e) {
    e.preventDefault();
    if (userName && userPhone) {
      navigate("/");
    }
  }

  return <>
    <Container>
      <form onSubmit={onSubmit}>
        <Header>아이디 찾기</Header>
        <Div>
          <label>이름</label>
          <input id="userName" value={userName} onChange={(e) => setUserName(e.target.value)} />
        </Div>
        <Div>
          <label>연락처</label>
          <input id="userPhone" value={userPhone} onChange={(e) => setUserPhone(e.target.value)} />
        </Div>
        <Button type="submit"><p>아이디 찾기</p></Button>
        <FindWrapper>
          <Find onClick={() => navigate("/register")}><p>회원가입</p></Find>
          <Divider>|</Divider>
          <Find onClick={() => navigate("/login")}><p>로그인</p></Find>
          <Divider>|</Divider>
          <Find onClick={() => navigate("/findPW")}><p>비밀번호 찾기</p></Find>
        </FindWrapper>
      </form>
    </Container>
  </>
}