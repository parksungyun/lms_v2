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

const SuccessMsg = styled.p`
  font-size: 1rem;
  color: #5f7dcf;
  margin: 0;
  padding: 0;
`;

export function FindID() {
  const [userName, setUserName] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [errorCheck, setErrorCheck] = useState(0);
  const [findID, setFindID] = useState("");
  const navigate = useNavigate();

  function onSubmit(e) {
    e.preventDefault();
    if (!userName) {
      setErrorCheck(1);
    } else if (!/^\d{3}-\d{3,4}-\d{4}$/.test(userPhone)) {
      setErrorCheck(2);
    } else if (!(userName && userPhone)) {
      setErrorCheck(3);
    } else {
      const data = {
        userName: userName,
        userPhone: userPhone
      };
      axios
      .post("/api/auth/findID", data)      
      .then((res) => {
        console.log(res);
        if (res.data.result == true) {
          setFindID(res.data.data);
          setErrorCheck(4);
        } else { setErrorCheck(5); };
      })
      .catch((err) => {
        console.log(`${err} : ID찾기 실패`);
      });
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
        {errorCheck === 1 && <ErrorMsg>이름을 입력해주세요.</ErrorMsg>}
        {errorCheck === 2 && <ErrorMsg>연락처 형식이 올바르지 않습니다.</ErrorMsg>}
        {errorCheck === 3 && <ErrorMsg>정보를 모두 입력해주세요.</ErrorMsg>}
        {errorCheck === 4 && <SuccessMsg>회원님의 아이디는 {findID} 입니다.</SuccessMsg>}
        {errorCheck === 5 && <ErrorMsg>정보를 다시 확인해주세요.</ErrorMsg>}
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