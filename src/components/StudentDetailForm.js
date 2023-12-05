import { useNavigate } from "react-router-dom";
import { students, userList } from "../assets/TempData";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { getStudentByStudentId } from "../pages/Api";
import axios from "axios";

const Content = styled.div`
  padding: 2rem 0;
  padding-top: 2rem;
  background-color: white;
  border-radius: 1rem;
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 3rem;
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
  padding: 1rem 0 0 0;
  text-align: center;
  &.success {
    color: blue;
  }
`;

export function StudentDetailForm() {
  const navigate = useNavigate();
  const id = sessionStorage.getItem("id"); // studentId
  const [user, setUser] = useState(null);
  const [errorCheck, setErrorCheck] = useState();
  const [userName, setUserName] = useState();
  const [userId, setUserId] = useState();
  const [userBirth, setUserBirth] = useState();
  const [userPhone, setUserPhone] = useState();
  const [userAddr, setUserAddr] = useState();
  const [userEmail, setUserEmail] = useState();

  useEffect(() => {
    if (!user) {
      const promise = getStudentByStudentId(id);
      const getData = () => {
        promise.then((data) => {
          setUser(data);
        });
      };
      getData();
    }
  });

  useEffect(() => {
    if(user) {
      setUserName(user.user.userName);
      setUserId(user.user.userId);
      setUserBirth(user.user.userBirth);
      setUserPhone(user.user.userPhone);
      setUserAddr(user.user.userAddr);
      setUserEmail(user.user.userEmail);
    }
  }, [user]);

  function onSubmit() {
    if(!userPhone) {
      setErrorCheck(1);
    }
    else if(!userAddr) {
      setErrorCheck(2);
    }
    else if(!userEmail) {
      setErrorCheck(3);
    }
    else {
      const data = {
        userPhone: userPhone,
        userAddr: userAddr,
        userEmail: userEmail,
      };
      console.log(data);
      axios
      .post(`/api/user/student/${user.user.uid}/update`, data)
      .then((res) => {
        setErrorCheck(4);
      })
      .catch((err) => {
        setErrorCheck(5);
        console.log(`${err} : 학생 개인정보 수정 실패`);
      });
    }
  }

  return <>
    <Content>
      <Details>
        <Detail>
          <Label>이름</Label>
          <Input type="text" name="userName" id="userName" value={userName} onChange={(e) => {setUserName(e.target.value)}} disabled/>
        </Detail>
        <Detail>
          <Label>아이디</Label>
          <Input type="text" name="userId" id="userId"  value={userId} onChange={(e) => {setUserId(e.target.value)}} disabled/>
        </Detail>
        <Detail>
          <Label>생년월일</Label>
          <Input type="date" name="userBirth" id="userBirth" value={userBirth} onChange={(e) => {setUserBirth(e.target.value)}} disabled/>
        </Detail>
        <Detail>
          <Label>연락처</Label>
          <Input type="text" name="userPhone" id="userPhone" value={userPhone} onChange={(e) => {setUserPhone(e.target.value)}} />
        </Detail>
        <Detail>
          <Label>주소</Label>
          <Input type="text" name="userAddr" id="userAddr" value={userAddr} onChange={(e) => {setUserAddr(e.target.value)}} />
        </Detail>
        <Detail>
          <Label>이메일</Label>
          <Input type="text" name="userEmail" id="userEmail" value={userEmail} onChange={(e) => {setUserEmail(e.target.value)}} />
        </Detail>
      </Details>
      {
        errorCheck === 1 && <ErrorMsg>연락처를 입력해주세요</ErrorMsg>
      }
      {
        errorCheck === 2 && <ErrorMsg>주소를 입력해주세요</ErrorMsg>
      }
      {
        errorCheck === 3 && <ErrorMsg>이메일을 입력해주세요</ErrorMsg>
      }
      {
        errorCheck === 4 && <ErrorMsg className="success">수정이 완료되었습니다</ErrorMsg>
      }
      {
        errorCheck === 5 && <ErrorMsg>수정이 실패하였습니다</ErrorMsg>
      }
      <ButtonBox>
        <PrimaryButton onClick={() => onSubmit()}><p>수정</p></PrimaryButton>
      </ButtonBox>
    </Content>
  </>
}