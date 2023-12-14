import axios from "axios";
import { useEffect, useState } from "react";
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
  margin-top: 1rem;
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

const VerifyButton = styled.button`
  padding: 1rem;
  height: 2.7rem;
  display: flex;
  align-items: center;
  border: none;
  border-radius: 0.3rem;
  background-color: #5f7dcf;
  color: white;
  margin-top: 1rem;
`;

const VerifyDiv = styled.div`
  display: flex;
  align-items: end;
  gap: 1rem;
  input {
    width: 235px;
  }
`;

export function FindID() {
  const [userName, setUserName] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [verify, setVerify] = useState(-1);
  const [verifyNum, setVerifyNum] = useState("");
  const [errorCheck, setErrorCheck] = useState(0);
  const [findID, setFindID] = useState();
  const [randomNum, setRandomNum] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if(verify === 0) {
      setRandomNum(Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000);
    }
  }, [verify]);

  useEffect(() => {
    setVerifyNum("");
  }, [errorCheck]);

  useEffect(() => {
    if(randomNum) {
      const data = {
        toNumber: userPhone.replaceAll("-", ""),
        randomNumber: randomNum,
      }
      axios
      .post("/api/message/send", data)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(`${err} : 인증문자 전송 실패`);
      });
    }
  }, [randomNum]);

  function onVerify(e) {
    e.preventDefault();
    if (!userName) {
      setErrorCheck(1);
      setVerify(-1);
    }
    else if(!/^\d{3}-\d{3,4}-\d{4}$/.test(userPhone)) {
      setErrorCheck(2);
      setVerify(-1);
    }
    else if (!(userName && userPhone)) {
      setErrorCheck(3);
      setVerify(-1);
    }
    else {
      setVerify(0);
    }
  }

  function onVerifyCheck(e) {
    e.preventDefault();
    if(verifyNum == randomNum) {
      setVerify(1);
      onSubmit();
    }
    else {
      setErrorCheck(6);
    }
  }

  function onSubmit() {
    setErrorCheck(0);
    const data = {
      userName: userName,
      userPhone: userPhone
    };
    axios
    .post("/api/auth/findID", data)
    .then((res) => {
      if (res.data.result == true) {
        setFindID(res.data.data);
        setErrorCheck(4);
      }
      else {
        setErrorCheck(5);
      };
    })
    .catch((err) => {
      setErrorCheck(7);
      console.log(`${err} : ID찾기 실패`);
    });
  }

  return <>
    <Container>
      <form>
        <Header>아이디 찾기</Header>
        <Div>
          <label>이름</label>
          <input id="userName" value={userName} onChange={(e) => setUserName(e.target.value)} placeholder="이름을 입력해주세요" />
        </Div>
        {errorCheck === 1 && <ErrorMsg>이름을 입력해주세요.</ErrorMsg>}
        <Div>
          <label>연락처</label>
          <input id="userPhone" value={userPhone} onChange={(e) => setUserPhone(e.target.value)} placeholder="000-0000-0000" />
        </Div>
        {errorCheck === 2 && <ErrorMsg>연락처 형식이 올바르지 않습니다.</ErrorMsg>}
        {errorCheck === 3 && <ErrorMsg>정보를 모두 입력해주세요.</ErrorMsg>}
        {
          verify < 1 &&
          <Button onClick={(e) => onVerify(e)}><p>아이디 찾기</p></Button>
        }
        {
          verify == 0 &&
          <VerifyDiv>
            <Div>
              <label>인증번호</label>
              <input id="verifyNum" value={verifyNum} onChange={(e) => setVerifyNum(e.target.value)} placeholder="인증번호를 입력해주세요" />
            </Div>
            <VerifyButton onClick={(e) => onVerifyCheck(e)}><p>인증</p></VerifyButton>
          </VerifyDiv>
        }
        {errorCheck === 6 && <ErrorMsg>인증 번호가 일치하지 않습니다.</ErrorMsg>}
        {errorCheck === 5 && <ErrorMsg>일치하는 아이디가 없습니다.</ErrorMsg>}
        {errorCheck === 4 && <SuccessMsg>회원님의 아이디는 [ {findID} ] 입니다.</SuccessMsg>}
        {errorCheck === 7 && <ErrorMsg>아이디 찾기 실패</ErrorMsg>}
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