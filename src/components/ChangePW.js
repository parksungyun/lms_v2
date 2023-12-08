import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useState } from "react";
import axios from "axios";

const Content = styled.div`
  padding: 2rem 0;
  padding-top: 2rem;
  background-color: white;
  border-radius: 1rem;
  margin-bottom: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3rem;
  flex-direction: column;
`;

const PrimaryButton = styled.button`
  border: 0;
  border-radius: 5px;
  background-color: #5f7dcf;
  padding: 0.8rem 1.4rem;
  color: white;
`;

const Details = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
`;

const Detail = styled.div`
  display: flex;
  gap: 1rem;
  width: 100%;
  padding-right: 2rem;
  align-items:center;
`;

const Label = styled.label`
  width: 10%;
`;

const Input = styled.input`
  width: 90%;
  padding: 0.7rem;
  border: 1px solid lightgray;
  border-radius: 0.5rem;
`;

const ButtonBox = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
`;

const ErrorMsg = styled.p`
  font-size: 1rem;
  color: red;
  margin: 0;
  padding: 0;
  &.success {
    color: blue;
  }
`;

export function ChangePW() {
  const navigate = useNavigate();
  const id = sessionStorage.getItem("uid");
  const [currentPw, setCurrentPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [newPwCheck, setNewPwCheck] = useState("");
  const [errorCheck, setErrorCheck] = useState(0);

  function onSubmit() {
    if(!currentPw) {
      setErrorCheck(1);
    }
    else if(!newPw) {
      setErrorCheck(2);
    }
    else if(!newPwCheck) {
      setErrorCheck(3);
    }
    else if(!/^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/.test(newPw)) {
      setErrorCheck(4);
    }
    else if(newPw !== newPwCheck) {
      setErrorCheck(5);
    }
    else {
      const data = {
        currentPw: currentPw,
        newPw: newPw
      };
      axios
      .post(`/api/auth/${id}/changePW`, data)
      .then((res) => {
        console.log(res.data);
        if(res.data.result) {
          setErrorCheck(7);
          setCurrentPw("");
          setNewPw("");
          setNewPwCheck("");
        }
        else {
          setErrorCheck(6);
        }
      })
      .catch((err) => {
        console.log(`${err} : ChangePW 실패`);
      });
    }
  }

  return <>
    <Content>
      <Details>
        <Detail>
          <Label>현재 비밀번호</Label>
          <Input type="password" name="currentPw" id="currentPw" value={currentPw} onChange={(e) => {setCurrentPw(e.target.value)}}/>
        </Detail>
        <Detail>
          <Label>새 비밀번호</Label>
          <Input type="password" name="newPw" id="newPw"  value={newPw} onChange={(e) => {setNewPw(e.target.value)}}/>
        </Detail>
        <Detail>
          <Label>새 비밀번호 확인</Label>
          <Input type="password" name="newPwCheck" id="newPwCheck"  value={newPwCheck} onChange={(e) => {setNewPwCheck(e.target.value)}}/>
        </Detail>
      </Details>
      {errorCheck === 1 && <ErrorMsg>현재 비밀번호를 입력해주세요.</ErrorMsg>}
      {errorCheck === 2 && <ErrorMsg>새 비밀번호를 입력해주세요.</ErrorMsg>}
      {errorCheck === 3 && <ErrorMsg>새 비밀번호 확인을 입력해주세요.</ErrorMsg>}
      {errorCheck === 4 && <ErrorMsg>비밀번호 형식이 일치하지 않습니다.</ErrorMsg>}
      {errorCheck === 5 && <ErrorMsg>비밀번호 확인이 일치하지 않습니다.</ErrorMsg>}
      {errorCheck === 6 && <ErrorMsg>현재 비밀번호가 일치하지 않습니다.</ErrorMsg>}
      {errorCheck === 7 && <ErrorMsg className="success">비밀번호 변경이 완료되었습니다.</ErrorMsg>}
      <ButtonBox>
        <PrimaryButton onClick={() => onSubmit()}><p>수정</p></PrimaryButton>
      </ButtonBox>
    </Content>
  </>
}