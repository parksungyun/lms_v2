import  Modal  from "react-bootstrap/Modal";
import { useState } from "react"
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Button = styled.button`
  padding: 1rem 3rem;
  border-radius: 50px;
  background-color: #5f7dcf;
  border: 1px solid #eee;
  color: white;
  font-weight: 700;
  margin-top: 2rem;
  margin-bottom: 1rem;
  &:hover {
    background-color: #86a8db;
  }
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
  margin: 1rem 0;
`;

const ErrorMsg = styled.p`
  font-size: 1rem;
  color: red;
  margin: 0;
  padding: 0;
`;

export function ChangePWModal({userId}) {
  const [userPw, setUserPw] = useState("")
  const [userPwCheck, setUserPwCheck] = useState("")
  const [errorCheck, setErrorCheck] = useState(0);
  const [show, setShow] = useState(true);
  const navigate = useNavigate();

  function onSubmit() {
    if (!/^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/.test(userPw)) {
      setErrorCheck(1);
    } else if (!userPwCheck) {
      setErrorCheck(2);
    } else if (userPw != userPwCheck) {
      setErrorCheck(3);
    } else {
      const data = {
        userId: userId,
        userPw: userPw
      };
      axios
      .post("/api/auth/changePW", data)
      .then((res) => {
        console.log(res)
        navigate("/login");
      })
      .catch((err) => {
        console.log(`${err} : ChabgePW 실패`);
      });
    }
  }

  return<>
    <Modal
      show={show}
    >
      <Modal.Body className="d-flex flex-column justify-content-center align-items-center">
        <Div>
          <label>비밀번호</label>
          <input id="userPw" value={userPw} onChange={(e) => setUserPw(e.target.value)} type="password" placeholder="영문,숫자,특수기호 포함하여 8~15자 입력" />
        </Div>
        <Div>
          <label>비밀번호 확인</label>
          <input id="userPwCheck" value={userPwCheck} onChange={(e) => setUserPwCheck(e.target.value)} type="password" placeholder="비밀번호를 다시 한번 입력해주세요"/>
        </Div>
        {errorCheck === 1 && <ErrorMsg>비밀번호 형식이 일치하지 않습니다.</ErrorMsg>}
        {errorCheck === 2 && <ErrorMsg>비밀번호 확인을 입력해주세요.</ErrorMsg>}
        {errorCheck === 3 && <ErrorMsg>비밀번호 확인이 일치하지 않습니다.</ErrorMsg>}
        <Button onClick={()=>onSubmit()}><p>비밀번호 변경</p></Button>
      </Modal.Body>
    </Modal>
  </>
}