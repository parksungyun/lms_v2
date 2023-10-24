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

export function Register() {
  const [userId, setUserId] = useState("");
  const [userPw, setUserPw] = useState("");
  const [userPwCheck, setUserPwCheck] = useState("");
  const [userName, setUserName] = useState("");
  const [userBirth, setUserBirth] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [userAddress, setUserAddress] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [agree, setAgree] = useState(false);
  const navigate = useNavigate();

  function onSubmit(e) {
    e.preventDefault();
    if (userId && userPw) {
      navigate("/");
    }
  }

  return <>
    <Container>
      <form onSubmit={onSubmit}>
        <Header>회원가입</Header>
        <Div>
          <label>아이디</label>
          <input id="userId" value={userId} onChange={(e) => setUserId(e.target.value)} />
        </Div>
        <Div>
          <label>비밀번호</label>
          <input id="userPw" value={userPw} onChange={(e) => setUserPw(e.target.value)} />
        </Div>
        <Div>
          <label>비밀번호 확인</label>
          <input id="userPwCheck" value={userPwCheck} onChange={(e) => setUserPwCheck(e.target.value)} />
        </Div>
        <hr />
        <Div>
          <label>이름</label>
          <input id="userName" value={userName} onChange={(e) => setUserName(e.target.value)} />
        </Div>
        <Button type="submit">회원가입</Button>
        <FindWrapper>
          이미 계정이 있으십니까?
          <Find onClick={() => navigate("/login")}>로그인</Find>
        </FindWrapper>
      </form>
    </Container>
  </>
}