import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components"
import { BsCheckLg } from "react-icons/bs";

const Container = styled.div`
  width: 100%;
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 3rem auto;
  align-items: center;
  .form {
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
  &.Id{
    width: 230px;
  }
`;

const CheckButton = styled.button`
  width: 60px;
  border-radius: 5px;
  background-color: #5f7dcf;
  border: 1px solid #eee;
  color: white;
  margin-left: 10px;
  font-size: large;
  &:hover {
    background-color: #86a8db;
  }
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

const SuccessMsg = styled.p`
  font-size: 1rem;
  color: #5f7dcf;
  margin: 0;
  padding: 0;
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
  const [errorCheck, setErrorCheck] = useState(0);
  const [checkID, setCheckID] = useState(0);

  function onSubmit() {
    if(checkID == 0) {
      setErrorCheck(10);
    }
    else if (!(userId && userPw && userPwCheck && userName && userBirth && userPhone && userAddress && userEmail)) {
      setErrorCheck(1);
    }
    else if (!/^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/.test(userPw)) {
      setErrorCheck(2)
    }
    else if(userPw != userPwCheck) {
      setErrorCheck(3);
    }
    else if(!/^\d{3}-\d{3,4}-\d{4}$/.test(userPhone)) {
      setErrorCheck(4);
    }
    else if(!/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(userEmail)) {
      setErrorCheck(5);
    }
    else if(!agree) {
      setErrorCheck(6);
    }
    else {
      setErrorCheck(0);
      const data = {
        userId: userId,
        userPw: userPw,
        userName: userName,
        userBirth: userBirth,
        userPhone: userPhone,
        userAddr: userAddress,
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
    if (userId.trim().length < 1) {
      setErrorCheck(7);
    } else {
      const data = {
        userId: userId
      }
      axios
      .post("/api/auth/checkID", data)
      .then((res) => {
        console.log(res);
        if (res.data.result) {
          setErrorCheck(8);
          setCheckID(0);
        } else {
          setErrorCheck(9);
          setCheckID(1);
        }
      })
      .catch((err) => {
        console.log(`${err} : ID Check 실패`);
      });
    }
  }

  return <>
    <Container>
      <Header>회원가입</Header>
      <div className="form">
        <Divider>
          <Div>
            <label>아이디</label>
            <div className="d-flex flex-columnn">
              <TextInput id="userId" className="Id" value={userId} onChange={(e) => setUserId(e.target.value)} placeholder="아이디를 입력해주세요" />
              <CheckButton onClick={()=>checkDuplication()}><BsCheckLg /></CheckButton>
            </div>
          </Div>
          <Div>
            <label>이름</label>
            <TextInput id="userName" value={userName} onChange={(e) => setUserName(e.target.value)} placeholder="이름을 입력해주세요" />
          </Div>
        </Divider>
        {errorCheck === 7 && <ErrorMsg>아이디를 입력해주세요.</ErrorMsg>}
        {errorCheck === 8 && <ErrorMsg>중복된 아이디 입니다.</ErrorMsg>}
        {errorCheck === 9 && <SuccessMsg>사용 가능한 아이디 입니다.</SuccessMsg>}
        {errorCheck === 10 && <ErrorMsg>아이디 중복체크를 진행해주세요.</ErrorMsg>}
        <Divider>
          <Div>
            <label>비밀번호</label>
            <TextInput type="password" id="userPw" value={userPw} onChange={(e) => setUserPw(e.target.value)}  placeholder="영문,숫자,특수기호 포함하여 8~15자 입력" />
          </Div>
          <Div>
            <label>비밀번호 확인</label>
            <TextInput type="password" id="userPwCheck" value={userPwCheck} onChange={(e) => setUserPwCheck(e.target.value)} placeholder="비밀번호를 다시 한번 입력해주세요" />
          </Div>
        </Divider>
        {errorCheck === 2 && <ErrorMsg>비밀번호 형식이 일치하지 않습니다.</ErrorMsg>}
        {errorCheck === 3 && <ErrorMsg>비밀번호 확인이 일치하지 않습니다.</ErrorMsg>}
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
        {errorCheck === 4 && <ErrorMsg>연락처 형식이 올바르지 않습니다.</ErrorMsg>}
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
        {errorCheck === 5 && <ErrorMsg>Email 형식이 올바르지 않습니다.</ErrorMsg>}
        <Divider>
            <input type="checkbox" id="agree" value={agree} onChange={(e) => setAgree(e.target.checked)} />
            <label>개인정보 수집 및 이용에 동의합니다.</label>
        </Divider>
        {errorCheck === 6 && <ErrorMsg>개인정보 수집 및 이용에 동의해주세요.</ErrorMsg>}
        {errorCheck === 1 && <ErrorMsg>회원가입 정보를 모두 입력해주세요.</ErrorMsg>}
      </div>
      <Button onClick={() => onSubmit()}><p>가입하기</p></Button>
      <FindWrapper>
        이미 계정이 있으십니까?
        <Find onClick={() => navigate("/login")}><p>로그인</p></Find>
      </FindWrapper>
    </Container>
  </>
}