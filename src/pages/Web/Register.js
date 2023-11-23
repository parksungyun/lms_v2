import axios from "axios";
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

const ErrorMsg = styled.p`
  font-size: 1rem;
  color: red;
  margin: 0;
  padding: 0;
`;

export function Register() {
  const [requestResult, setRequestResult] = useState("");
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
  const [errorCheck, setErrorCheck] = useState(0);

  function onSubmit() {
    if(!(userId && userPw && userPwCheck && userName && userBirth && userPhone && userAddress && userEmail)) {
      setErrorCheck(1);
    }
    else if(userPw != userPwCheck) {
      setErrorCheck(2);
    }
    else if(!/^\d{3}-\d{3,4}-\d{4}$/.test(userPhone)) {
      setErrorCheck(3);
    }
    else if(!/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(userEmail)) {
      setErrorCheck(4);
    }
    else if(!agree) {
      setErrorCheck(5);
    }
    else {
      setErrorCheck(0);
      const data = {
        userId: userId,
        userPw: userPw,
        userName: userName,
        userBirth: userBirth,
        userPhone: userPhone,
        userAddress: userAddress,
        userEmail: userEmail
      };
      axios
      .post("/api/auth/register", data)
      .then((res) => {
        console.log(res);
        navigate("/");
      })
      .catch((err) => {
        console.log(`${err} : 회원가입 실패`);
      });
    }
  }

  function checkDuplication() {
    
  }

  return <>
    <Container>
      <Header>회원가입</Header>
      <form>
        <Divider>
          <Div>
            <label>아이디</label>
            <TextInput id="userId" value={userId} onChange={(e) => setUserId(e.target.value)} placeholder="아이디를 입력해주세요" />
          </Div>
          <Div>
            <label>이름</label>
            <TextInput id="userName" value={userName} onChange={(e) => setUserName(e.target.value)} placeholder="이름을 입력해주세요" />
          </Div>
        </Divider>
        {errorCheck === 6 && <ErrorMsg>중복된 아이디 입니다.</ErrorMsg>}
        <Divider>
          <Div>
            <label>비밀번호</label>
            <TextInput type="password" id="userPw" value={userPw} onChange={(e) => setUserPw(e.target.value)}  placeholder="비밀번호를 입력해주세요" />
          </Div>
          <Div>
            <label>비밀번호 확인</label>
            <TextInput type="password" id="userPwCheck" value={userPwCheck} onChange={(e) => setUserPwCheck(e.target.value)} placeholder="비밀번호를 다시 한번 입력해주세요" />
          </Div>
        </Divider>
        {errorCheck === 2 && <ErrorMsg>비밀번호 확인이 일치하지 않습니다.</ErrorMsg>}
        <Divider>
          <Div>
            <label>연락처</label>
            <TextInput id="userPhone" value={userPhone} onChange={(e) => setUserPhone(e.target.value)}  placeholder="000-0000-0000" />
          </Div>
          <Div>
            <label>생년월일</label>
            <TextInput type="date" id="userBirth" value={userBirth} onChange={(e) => setUserBirth(e.target.value)} />
          </Div>
        </Divider>
        {errorCheck === 3 && <ErrorMsg>연락처 형식이 올바르지 않습니다.</ErrorMsg>}
        <Divider>
          <Div>
            <label>Email</label>
            <TextInput id="userEmail" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} placeholder="example@example.com" />
          </Div>
          <Div>
            <label>주소</label>
            <TextInput id="userAddress" value={userAddress} onChange={(e) => setUserAddress(e.target.value)} placeholder="주소를 입력해주세요" />
          </Div>
        </Divider>
        {errorCheck === 4 && <ErrorMsg>Email 형식이 올바르지 않습니다.</ErrorMsg>}
        <Divider>
            <input type="checkbox" id="agree" value={agree} onChange={(e) => setAgree(e.target.checked)} />
            <label>개인정보 수집 및 이용에 동의합니다.</label>
        </Divider>
        {errorCheck === 5 && <ErrorMsg>개인정보 수집 및 이용에 동의해주세요.</ErrorMsg>}
        {errorCheck === 1 && <ErrorMsg>회원가입 정보를 모두 입력해주세요.</ErrorMsg>}
      </form>
      <Button onClick={() => onSubmit()}><p>가입하기</p></Button>
      <FindWrapper>
        이미 계정이 있으십니까?
        <Find onClick={() => navigate("/login")}><p>로그인</p></Find>
      </FindWrapper>
    </Container>
  </>
}