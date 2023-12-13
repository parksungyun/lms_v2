import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { getAcademicByAcademicId } from "../pages/Api";
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

const Select = styled.select`
  width: 90%;
  padding: 0.7rem;
  border: 1px solid lightgray;
  border-radius: 0.5rem;
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

export function ManagerDetailForm() {
  const navigate = useNavigate();
  const id = sessionStorage.getItem("id"); // academicId
  const [user, setUser] = useState(null);
  const [userName, setUserName] = useState();
  const [userId, setUserId] = useState();
  const [userBirth, setUserBirth] = useState();
  const [userDept, setUserDept] = useState();
  const [userPosition, setUserPosition] = useState();
  const [userPhone, setUserPhone] = useState();
  const [userAddr, setUserAddr] = useState();
  const [userEmail, setUserEmail] = useState();
  const [remark, setRemark] = useState();
  const [errorCheck, setErrorCheck] = useState();

  useEffect(() => {
    if(!user) {
      const promise = getAcademicByAcademicId(id);
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
      setUserDept(user.academic.dept);
      setUserPosition(user.position);
      setRemark(user.academic.remark);
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
    else if(!remark) {
      setErrorCheck(6);
    }
    else {
      const data = {
        userPhone: userPhone,
        userAddr: userAddr,
        userEmail: userEmail,
        userRemark: remark,
      };
      console.log(data);
      axios
      .put(`/api/user/academic/${user.user.uid}/update`, data)
      .then((res) => {
        setErrorCheck(4);
      })
      .catch((err) => {
        setErrorCheck(5);
        console.log(`${err} : 사원 개인정보 수정 실패`);
      });
    }
  }

  return <>
    <Content>
      <Details>
        <Detail>
          <Label>이름</Label>
          <Input type="text" name="user_name" id="user_name" value={userName} disabled />
        </Detail>
        <Detail>
          <Label>아이디</Label>
          <Input type="text" name="user_id" id="user_id"  value={userId} disabled />
        </Detail>
        <Detail>
          <Label>생년월일</Label>
          <Input type="date" name="user_birth" id="user_birth" value={userBirth} disabled />
        </Detail>
        <Detail>
          <Label>부서</Label>
          <Select name="user_dept" id="user_dept" disabled>
            {
              userDept === 0 && <option>행정팀</option>
            }
            {
              userDept === 1 && <option>교육팀</option>
            }
          </Select>
        </Detail>
        <Detail>
          <Label>포지션</Label>
          <Select name="user_position" id="user_position" disabled>
            <option>{userPosition}</option>
          </Select>
        </Detail>
        <Detail>
          <Label>연락처</Label>
          <Input type="text" name="user_phone" id="user_phone" value={userPhone} onChange={(e) => {setUserPhone(e.target.value)}} />
        </Detail>
        <Detail>
          <Label>주소</Label>
          <Input type="text" name="user_addr" id="user_addr" value={userAddr} onChange={(e) => {setUserAddr(e.target.value)}} />
        </Detail>
        <Detail>
          <Label>이메일</Label>
          <Input type="text" name="user_birth" id="user_birth" value={userEmail} onChange={(e) => {setUserEmail(e.target.value)}} />
        </Detail>
        <Detail>
          <Label>나의 한마디</Label>
          <Input type="text" name="remark" id="remark" value={remark} onChange={(e) => {setRemark(e.target.value)}} />
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
        errorCheck === 6 && <ErrorMsg>나의 한마디를 입력해주세요</ErrorMsg>
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