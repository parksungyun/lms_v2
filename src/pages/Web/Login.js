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

const ErrorMsg = styled.p`
  font-size: 1rem;
  color: red;
  margin: 0;
  padding: 0;
`;

export function Login() {
  const [userId, setUserId] = useState("");
  const [userPw, setUserPw] = useState("");
  const [errorCheck, setErrorCheck] = useState(0);
  const navigate = useNavigate();

  function onSubmit(e) {
    e.preventDefault();
    if(userId.trim().length < 1) {
      setErrorCheck(1);
    }
    else if(userPw.trim().length < 1) {
      setErrorCheck(2);
    }
    else {
      const data = {
        userId: userId,
        userPw: userPw
      };
      axios
      .post("/api/auth/login", data)
      .then((res) => {
        console.log(res);
        if(res.data.result === false) {
          setErrorCheck(3);
          console.log("로그인 실패");
        }
        else {
          // const { accessToken } = res.data;
          // axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
          sessionStorage.setItem("uid", res.data.data.user.uid);
          window.location.replace("/");
        }
      })
      .catch((err) => {
        setErrorCheck(3);
        console.log(`${err} : 로그인 실패`);
      });
    }
  }

  return <>
    <Container>
      <form onSubmit={onSubmit}>
        <Header>로그인</Header>
        <Div>
          <label>아이디</label>
          <input id="userId" value={userId} onChange={(e) => setUserId(e.target.value)} />
        </Div>
        {errorCheck === 1 && <ErrorMsg>아이디를 입력하세요.</ErrorMsg>}
        <Div>
          <label>비밀번호</label>
          <input type="password" id="userPw" value={userPw} onChange={(e) => setUserPw(e.target.value)} />
        </Div>
        {errorCheck === 2 && <ErrorMsg>비밀번호를 입력하세요.</ErrorMsg>}
        {errorCheck === 3 && <ErrorMsg>아이디 또는 비밀번호를 잘못 입력하셨습니다. 입력하신 내용을 다시 확인해주세요.</ErrorMsg>}
        <Button type="submit"><p>로그인</p></Button>
        <FindWrapper>
          <Find onClick={() => navigate("/register")}><p>회원가입</p></Find>
          <Divider>|</Divider>
          <Find onClick={() => navigate("/findID")}><p>아이디 찾기</p></Find>
          <Divider>|</Divider>
          <Find onClick={() => navigate("/findPW")}><p>비밀번호 찾기</p></Find>
        </FindWrapper>
      </form>
    </Container>
  </>
}