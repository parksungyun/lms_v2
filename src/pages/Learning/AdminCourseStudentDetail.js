import { useParams } from "react-router-dom";
import styled from "styled-components";
import { userList, courses, students } from "../../assets/TempData";
import { Table } from "../../components/Table";
import '../../styles/admin_table.css';

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
  const course = courses.find((c) => c.course_id == id);
  const student = students.filter((s) => s.course_id == course.course_id);
  const user = student.map((s) => (userList.find((u) => u.uid == s.uid)));
  
  const items = student.map((s, i) => (
    {
      no: i + 1,
      user_name: user[i].user_name,
      user_id: user[i].user_id,
      user_birth: user[i].user_birth,
      user_phone: user[i].user_phone,
      user_email: user[i].user_email,
    }
  ))

  return <>
    <Container>
      <H2>학생 조회</H2>
      <Content>
        <Box>
          <ContentBox className="col-2">
            <Bold>과정명</Bold>
            <p>{course.course_name}</p>
          </ContentBox>
          <ContentBox className="col-3">
            <Bold>훈련 기간</Bold>
            <p>{course.start_date} ~ {course.end_date}</p>
          </ContentBox>
          <ContentBox className="col-3">
            <Bold>모집 기간</Bold>
            <p>{course.recruit_start} ~ {course.recruit_end}</p>
          </ContentBox>
          <ContentBox className="col-2">
            <Bold>정원</Bold>
            <p>{course.capacity} 명</p>
          </ContentBox>
          <ContentBox className="col-2">
            <Bold>현재인원</Bold>
            <p>{student.length} 명</p>
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
  </>
}