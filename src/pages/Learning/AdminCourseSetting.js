import styled from "styled-components";
import { Table } from "../../components/Table";
import { academics, userList, courses, students, subjects } from "../../assets/TempData";
import '../../styles/course_admin_table.css';
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  padding: 1.5rem 2rem;
  padding-bottom: 2rem;
  background-color: #f6f9ff;
  height: 100%;
`;

const Content = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
  align-items: center;
`;

const TableBox = styled.div`
  padding: 2rem;
  padding-top: 1.3rem;
  background-color: white;
  border-radius: 1rem;
  margin-bottom: 2rem;
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

const PrimaryButtonSmall = styled.button`
  border: 0;
  border-radius: 5px;
  background-color: #5f7dcf;
  padding: 0.6rem 1.4rem;
  color: white;
`;

const SecondaryButton = styled.button`
  border: 0;
  border-radius: 5px;
  background-color: gray;
  padding: 0.6rem 1.4rem;
  color: white;
`;

const courseSetting = [
  {
    text: 'No.',
    value: 'no'
  },
  {
    text: '과정명',
    value: 'name'
  },
  {
    text: '훈련시작일',
    value: 'start_date'
  },
  {
    text: '훈련종료일',
    value: 'end_date'
  },
  {
    text: '모집시작일',
    value: 'recruit_start'
  },
  {
    text: '모집종료일',
    value: 'recruit_end'
  },
  {
    text: '현재인원',
    value: 'current'
  },
  {
    text: '정원',
    value: 'capacity'
  },
  {
    text: '담당 매니저',
    value: 'manager'
  },
  {
    text: '과목수',
    value: 'subject'
  },
  {
    text: '학생조회',
    value: 'studentInfo'
  },
  {
    text: '상세정보',
    value: 'info'
  }
];

export function AdminCourseSetting() {
  const items = courses.map((c, i) => (
    {
      no: i + 1,
      name: c.course_name,
      start_date: c.start_date,
      end_date: c.end_date,
      recruit_start: c.recruit_start,
      recruit_end: c.recruit_end,
      current: students.filter((s) => s.course_id == c.course_id).length,
      capacity: c.capacity,
      manager: userList[academics[c.academic_id - 1].uid - 1].user_name,
      subject: subjects.filter((s) => s.course_id == c.course_id).length,
      studentInfo: <PrimaryButtonSmall onClick={() => onStudentInfo(c.course_id)}><p>학생조회</p></PrimaryButtonSmall>,
      info: <SecondaryButton onClick={() => onDetail(c.course_id)}><p>상세정보</p></SecondaryButton>
    }
  ))

  const navigate = useNavigate();

  function onDetail(id) {
    navigate(`${id}`);
  }

  function onStudentInfo(id) {
    navigate(`${id}/s`);
  }

  return <>
    <Container>
      <Content>
        <H2 className="title">과정 관리</H2>
        <PrimaryButton onClick={() => navigate("add")}><p>과정 등록</p></PrimaryButton>
      </Content>
      <TableBox>
        <Table 
          headers={courseSetting}
          items={items}
          selectable={false}
        />
      </TableBox>
    </Container>
  </>
}