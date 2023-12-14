import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { Table } from "../../components/Table";
import '../../styles/admin_table.css';
import { useState } from "react";
import { getCourseById, getStudentsByCourseId } from "../Api";
import { useEffect } from "react";

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
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 3rem;
`;

const Box = styled.div`
  border-bottom: 2px solid #ddd;
  border-top: 2px solid #ddd;
  width: 100%;
  display: flex;
  margin: 1.5rem 0;
  padding: 5px 15px;
`;

const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Bold = styled.p`
  font-weight: bold;
  font-size: 1.2rem;
`;

const TableBox = styled.div`
  background-color: white;
  width: 100%;
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

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const studentDetail = [
  {
    text: 'No.',
    value: 'no'
  },
  {
    text: '학생이름',
    value: 'user_name'
  },
  {
    text: '아이디',
    value: 'user_id'
  },
  {
    text: '생년월일',
    value: 'user_birth'
  },
  {
    text: '연락처',
    value: 'user_phone'
  },
  {
    text: '이메일',
    value: 'user_email'
  },
];

export function AdminCourseStudentDetail() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [students, setStudents] = useState(null);
  const navigate = useNavigate();
  let items;

  useEffect(() => {
    if(!course) {
      const promise = getCourseById(id);
      const getData = () => {
        promise.then((data) => {
          setCourse(data);
        })
      };
      getData();
    };
    if(!students) {
      const promise = getStudentsByCourseId(id);
      const getData = () => {
        promise.then((data) => {
          setStudents(data);
        })
      };
      getData();
    };
  });
  if (course && students) {
    items = students.map((s, i) => (
      {
        no: i + 1,
        user_name: s.user.userName,
        user_id: s.user.userId,
        user_birth: s.user.userBirth,
        user_phone: s.user.userPhone,
        user_email: s.user.userEmail,
      }
    ))
  }
  
  return <>
    {
      (items) &&
        <Container>
          <Title>
            <H2>학생 조회</H2>
            <PrimaryButton onClick={() => navigate("add")}><p>학생 등록</p></PrimaryButton>
          </Title>
          <Content>
            <Box>
              <ContentBox className="col-2">
                <Bold>과정명</Bold>
                <p>{course.courseName}</p>
              </ContentBox>
              <ContentBox className="col-3">
                <Bold>훈련 기간</Bold>
                <p>{course.startDate} ~ {course.endDate}</p>
              </ContentBox>
              <ContentBox className="col-3">
                <Bold>모집 기간</Bold>
                <p>{course.recruitStart} ~ {course.recruitEnd}</p>
              </ContentBox>
              <ContentBox className="col-2">
                <Bold>정원</Bold>
                <p>{course.capacity} 명</p>
              </ContentBox>
              <ContentBox className="col-2">
                <Bold>현재인원</Bold>
                <p>{students.length} 명</p>
              </ContentBox>
            </Box>
            <TableBox>
              <Table 
                headers={studentDetail}
                items={items}
                selectable={false}
              />
            </TableBox>
          </Content>
        </Container>
    }
  </>
}