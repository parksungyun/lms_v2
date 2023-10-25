import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components"

const Container = styled.div`
  width: 100%;
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 3rem auto;
  align-items: center;
  /* background-color: gray; */
  form {
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: center;
    gap: 1rem;
  }
`;

const Header = styled.div`
  font-size: 2rem;
  text-align: center;
  margin-bottom: 5rem;
  font-weight: bold;
`;

const Div = styled.div`
  display: flex;
  flex-direction: column;
`;

const TextInput = styled.input`
  width: 300px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid lightgray;
`;

const Divider = styled.div`
  display: flex;
  gap: 1rem;
`;

const Button = styled.button`
  padding: 1rem 3rem;
  border-radius: 50px;
  background-color: #5f7dcf;
  border: 1px solid #eee;
  color: white;
  font-weight: 700;
  margin: 2rem auto;
  &:hover {
    background-color: #86a8db;
  }
`;

const FindWrapper = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
  font-weight: 100;
`;

const Find = styled.button`
  border: none;
  background-color: white;
  font-weight: 700;
  &:hover {
    color: #5f7dcf;
  }
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
  }

  return <>
    <Container>
      <Header>회원가입</Header>
      <form onSubmit={onSubmit}>
        <Divider>
          <Div>
            <label>아이디</label>
            <TextInput id="userId" value={userId} onChange={(e) => setUserId(e.target.value)} />
          </Div>
          <Div>
            <label>이름</label>
            <TextInput id="userName" value={userName} onChange={(e) => setUserName(e.target.value)} />
          </Div>
        </Divider>
        <Divider>
          <Div>
            <label>비밀번호</label>
            <TextInput type="password" id="userPw" value={userPw} onChange={(e) => setUserPw(e.target.value)} />
          </Div>
          <Div>
            <label>비밀번호 확인</label>
            <TextInput type="password" id="userPwCheck" value={userPwCheck} onChange={(e) => setUserPwCheck(e.target.value)} />
          </Div>
        </Divider>
        <Divider>
          <Div>
            <label>연락처</label>
            <TextInput id="userPhone" value={userPhone} onChange={(e) => setUserPhone(e.target.value)} />
          </Div>
          <Div>
            <label>생년월일</label>
            <TextInput type="date" id="userBirth" value={userBirth} onChange={(e) => setUserBirth(e.target.value)} />
          </Div>
        </Divider>
        <Divider>
          <Div>
            <label>Email</label>
            <TextInput id="userEmail" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} />
          </Div>
          <Div>
            <label>주소</label>
            <TextInput id="userAddress" value={userAddress} onChange={(e) => setUserAddress(e.target.value)} />
          </Div>
        </Divider>
        <Divider>
            <input type="checkbox" id="agree" value={agree} onChange={(e) => setAgree(e.target.value)} />
            <label>개인정보 수집 및 이용에 동의합니다.</label>
        </Divider>
        <Button type="submit">가입하기</Button>
        <FindWrapper>
          이미 계정이 있으십니까?
          <Find onClick={() => navigate("/login")}>로그인</Find>
        </FindWrapper>
      </form>
    </Container>
  </>
}