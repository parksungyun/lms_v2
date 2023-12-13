import { useLocation, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { getStudentByStudentId } from "../Api";
import axios from "axios";

const Container = styled.div`
  padding: 1.5rem 2rem;
  padding-bottom: 2rem;
  background-color: #f6f9ff;
  height: 100%;
`;

const Content = styled.div`
  padding: 2rem;
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

const H2 = styled.p`
  font-size: 1.7rem;
  font-weight: bold;
  margin: 10px 0;
  &.title{
    margin: 0;
  }
`;

const PrimaryButton = styled.button`
  border: 0;
  border-radius: 5px;
  background-color: #5f7dcf;
  padding: 0.8rem 1.4rem;
  color: white;
`;

const SecondaryButton = styled.button`
  border: 0;
  border-radius: 5px;
  background-color: gray;
  padding: 0.8rem 1.4rem;
  color: white;
`;

const DangerButton = styled.button`
  border: 0;
  border-radius: 5px;
  background-color: red;
  padding: 0.8rem 1.4rem;
  color: white;
`;

const Details = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  padding-left: 3rem;
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
`;

const SuccessMsg = styled.p`
  font-size: 1rem;
  color: blue;
  margin: 0;
  padding: 0;
`;

export function ManagerCourseStudentDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const pathName = useLocation().pathname;
  const link = pathName.substring(0, pathName.lastIndexOf("/"));
  const [student, setStudent] = useState(null);
  const [userName, setUserName] = useState();
  const [userId, setUserId] = useState();
  const [userBirth, setUserBirth] = useState();
  const [userPhone, setUserPhone] = useState();
  const [userAddr, setUserAddr] = useState();
  const [userEmail, setUserEmail] = useState();
  const [userAvailable, setUserAvailable] = useState();
  const [errorCheck, setErrorCheck] = useState(0);

  useEffect(() => {
    if(!student) {
      const promise = getStudentByStudentId(id);
      const getData = () => {
        promise.then((data) => {
          setStudent(data);
        });
      };
      getData();
    }
  })

  useEffect(() => {
    if(student) {
      setUserName(student.user.userName);
      setUserId(student.user.userId);
      setUserBirth(student.user.userBirth);
      setUserPhone(student.user.userPhone);
      setUserAddr(student.user.userAddr);
      setUserEmail(student.user.userEmail);
      setUserAvailable(student.student.available);
    }
  }, [student]);

  function onSubmit() {
    if (!userName) {
      setErrorCheck(1);
    }
    else {
      const data = {
        uid: student.user.uid,
        userName: userName,
        userBirth: userBirth,
        userPhone: userPhone,
        userAddr: userAddr,
        userEmail: userEmail,
      }
      axios
      .put("/api/user/student/mod", data)
      .then((res) => {
        setErrorCheck(2);
      })
      .catch((err) => {
        console.log(`${err} : Mod 실패`);
        setErrorCheck(3);
      });
    }
  }

  function resetPw() {
    axios
    .post(`/api/auth/${student.user.uid}/resetPW`)
    .then((res) => {
      console.log(res.data.data);
      setErrorCheck(4);
    })      
    .catch((err) => {
      console.log(`${err} : ResetPW 실패`);
      setErrorCheck(5);
    });
  }

  function changeAvailable() {
    axios
    .post(`/api/user/${student.user.uid}/changeAvailable/${userAvailable}`)
    .then((res) => {
      console.log(res.data.data);
    })
    .catch((err) => {
      console.log(`${err} : changeAvailable 실패`);
    });
    window.location.reload();
  };

  return <>
    <Container>
      <H2>학생 상세 정보</H2>
      <Content>
        <Details>
          <Detail>
            <Label>이름</Label>
            <Input type="text" name="user_name" id="user_name" value={userName} onChange={(e) => {setUserName(e.target.value)}} />
          </Detail>
          <Detail>
            <Label>아이디</Label>
            <Input type="text" name="user_id" id="user_id"  value={userId} onChange={(e) => {setUserId(e.target.value)}} disabled />
          </Detail>
          <Detail>
            <Label>비밀번호</Label>
            <PrimaryButton onClick={() => resetPw()}><p>비밀번호 초기화</p></PrimaryButton>
          </Detail>
          <Detail>
            <Label>생년월일</Label>
            <Input type="date" name="user_birth" id="user_birth" value={userBirth} onChange={(e) => {setUserBirth(e.target.value)}} disabled />
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
            <Label>활성화</Label>
            {
              userAvailable === 1 ? <DangerButton onClick={() => changeAvailable()}><p>비활성화</p></DangerButton> : <PrimaryButton onClick={() => changeAvailable()}><p>활성화</p></PrimaryButton>
            }
          </Detail>
        </Details>
        {
          errorCheck === 1 && <ErrorMsg>이름을 입력해주세요.</ErrorMsg>
        }
        {
          errorCheck === 2 && <SuccessMsg>수정이 성공하였습니다.</SuccessMsg>
        }
        {
          errorCheck === 3 && <ErrorMsg>수정이 실패하였습니다.</ErrorMsg>
        }
        {
          errorCheck === 4 && <SuccessMsg>비밀번호 초기화가 성공하였습니다.</SuccessMsg>
        }
        {
          errorCheck === 5 && <ErrorMsg>비밀번호 초기화가 실패하였습니다.</ErrorMsg>
        }
        <ButtonBox>
          <PrimaryButton onClick={() => onSubmit()}><p>수정</p></PrimaryButton>
          <SecondaryButton onClick={() => navigate(link.substring(0, link.lastIndexOf("/")))}><p>목록</p></SecondaryButton>
        </ButtonBox>
      </Content>
    </Container>
  </>
}