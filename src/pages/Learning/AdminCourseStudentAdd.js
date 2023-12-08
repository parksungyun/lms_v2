import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { getCourseById, getUserByUserId } from "../Api";
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
`;

const ContentDivide = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3rem;
`;

const LoadBox = styled.div`
  width: 100%;
  gap: 0.5rem;
  display: flex;
  flex-direction: column;
  padding: 1rem 2rem;
  margin-bottom: 2rem;
  background-color: #eee;
  border-radius: 1rem;
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

const Details = styled.div`
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

const Check = styled.input`

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

const LoadInfo = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
`;

const LoadUser = styled.div`
  margin: 0 auto;
`;

const LoadText = styled.p`
  font-size: 1.1rem;
  font-weight: 700;
  color: #5f7dcf;
`;

const ErrorMsg = styled.p`
  font-size: 1rem;
  color: red;
  margin: 0;
  padding: 0;
`;

export function AdminCourseStudentAdd() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [search, setSearch] = useState("");
  const [user, setUser] = useState(null);
  const [loadText, setLoadText] = useState("");
  const [userUid, setUserUid] = useState("");
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState("");
  const [userBirth, setUserBirth] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [userAddr, setUserAddr] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [course, setCourse] = useState(null);
  const [error, setError] = useState(0);

  useEffect(()=> {
    if(user) {
      setUserUid(user.uid);
      setUserName(user.userName);
      setUserId(user.userId);
      setUserBirth(user.userBirth);
      setUserPhone(user.userPhone);
      setUserEmail(user.userEmail);
      setUserAddr(user.userAddr);
      setLoadText(`${user.userName} 님의 정보를 불러왔습니다.`);
    }
    else {
      setUserName("");
      setUserId("");
      setUserBirth("");
      setUserPhone("");
      setUserEmail("");
      setUserAddr("");
    }
  }, [user]);

  useEffect(()=>{
    if (!course) {
      const promise = getCourseById(id);
      const getData = () => {
        promise.then((data) => {
          setCourse(data);
        })
      };
      getData();
    }
  });

  function onSearch(item) {
    if(item) {
      const promise = getUserByUserId(item);
      const getData = () => {
        promise.then((data) => {
          if (data) {
            setUser(data);
          } else {
            setUser(null);
            setLoadText("이미 등록된 사용자 입니다.")
          }
        });
      };
      getData();
    }
    else {
      setLoadText("사용자 검색 결과가 없습니다.");
    }
  };

  console.log(userUid)

  function onSubmit() {
    const data = {
      userUid: userUid
    }
  if (error == 0) {
    axios
      .post(`/api/user/student/${userUid}/add/${id}`)
      .then((res) => {
        console.log(res.data);
        setError(2);
      })
      .catch((err) => {
        console.log(`${err} : Add 실패`);
        setError(3);
      });
    }
  }
  return <>
    {
      course &&
        <Container>
          <H2>학생 등록</H2>
          <Content>
            <LoadBox>
              <LoadInfo>
                <Input type="text" name="user_search" id="user_search" value={search} onChange={(e) => {setSearch(e.target.value)}} placeholder="검색할 사용자 아이디를 입력하세요." />
                <PrimaryButton onClick={() => {onSearch(search); setSearch("");}}><p>사용자 불러오기</p></PrimaryButton>
              </LoadInfo>
              <LoadUser>
                <LoadText>{loadText}</LoadText>
              </LoadUser>
            </LoadBox>
            <ContentDivide>
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
                  <Label>연락처</Label>
                  <Input type="text" name="user_phone" id="user_phone" value={userPhone} disabled />
                </Detail>
                <Detail>
                  <Label>주소</Label>
                  <Input type="text" name="user_addr" id="user_addr" value={userAddr} disabled />
                </Detail>
                <Detail>
                  <Label>이메일</Label>
                  <Input type="text" name="user_birth" id="user_birth" value={userEmail} disabled />
                </Detail>
                <Detail>
                  <Label>과정</Label>
                  <Input type="text" name="course_id" id="course_id" value={course.courseName} disabled />
                </Detail>
                  {error == 2 && window.location.reload()}
                  {error == 3 && <ErrorMsg>등록이 실패하였습니다.</ErrorMsg>}
                <ButtonBox>
                  <PrimaryButton onClick={()=>onSubmit()}><p>등록</p></PrimaryButton>
                  <SecondaryButton onClick={() => navigate(`/lms/a/courseSetting/${id}/s`)}><p>목록</p></SecondaryButton>
                </ButtonBox>
              </Details>
            </ContentDivide>
          </Content>
        </Container>
    }
  </>
}