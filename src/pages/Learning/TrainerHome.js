import styled from "styled-components"
import { RiUserSettingsLine } from "react-icons/ri";
import { LmsHomeButtonWrapper } from "../../components/LmsHomeButtonWrapper";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { getSubjectByAcademicId, getUserByUid } from "../Api";

const Container = styled.div`
  padding: 1.5rem 2rem;
  padding-bottom: 2rem;
  background-color: #f6f9ff;
  height: 100%;
`;

const H2 = styled.p`
  font-size: 1.7rem;
  font-weight: bold;
  margin: 10px 0;
  &.title{
    margin: 0;
  }
`

const PrimaryButton = styled.button`
  border: 0;
  border-radius: 5px;
  background-color: #5f7dcf;
  padding: 0.8rem 1.4rem;
  color: white;
`;

const Content = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
  align-items: center;
`;

const Box = styled.div`
  background-color: white;
  border-radius: 1rem;
  padding: 2rem;
`;

const ButtonBox = styled.div`
  height: 8rem;
`;

const NameText = styled.div`
  display: flex;
  flex-direction: column;
`;

const CourseName = styled.p`
  margin: 0;
  font-size: 0.8rem;
`;

const SubjectName = styled.p`
  font-size: 1.4rem;
`;

export function TrainerHome() {
  const navigate = useNavigate()
  const id = sessionStorage.getItem("uid");
  const [user, setUser] = useState(null);
  const [subject, setSubject] = useState(null);
  let subjectNumber;
  let items;

  useEffect(() => {
    if(!user) {
      const promise = getUserByUid(id);
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
      const promise = getSubjectByAcademicId(user.academic.academicId);
      const getData = () => {
        promise.then((data) => {
          setSubject(data);
        });
      };
      getData();
    }
  }, [user]);

  if(subject) {
    subjectNumber = subject.map((s) => (
      {
        name: s.subject.subjectName,
        id: s.subject.subjectId,
        courseName: s.course.courseName
      }
    ));
    items = subjectNumber.map((s, i)=>(
      [
        {
          text: <NameText><CourseName>{s.courseName}</CourseName><SubjectName>{s.name}</SubjectName></NameText>,
          link: `/lms/t/${s.id}/subject`,
        },
        {
          text: "강의",
          link: `/lms/t/${s.id}/lecture`,
        },
        {
          text: "공지",
          link: `/lms/t/${s.id}/board`,
        },
        {
          text: "과제",
          link: `/lms/t/${s.id}/homework`,
        },
        {
          text: "Q&A",
          link: `/lms/t/${s.id}/qna`,
        }
      ]
    ));
  }
  
  return <>
    <Container>
      <Content>
        <div>
          <H2 className='title'>내 과목 관리</H2>
        </div>
        <PrimaryButton onClick={()=>navigate("/lms/a")}><p>관리자 페이지<RiUserSettingsLine /></p></PrimaryButton>
      </Content>
      <Box>
        <H2>진행중인 과목: {subjectNumber && subjectNumber.length}</H2>
        {
          subjectNumber && subjectNumber.map((c, i) => (
            <ButtonBox><LmsHomeButtonWrapper items={items[i]} /></ButtonBox>
          ))
        }
      </Box>
    </Container>
  </>
}