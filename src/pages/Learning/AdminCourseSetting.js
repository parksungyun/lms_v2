import styled from "styled-components";
import { Table } from "../../components/Table";
import { academics, userList, courses, students, subjects } from "../../assets/TempData";
import '../../styles/course_admin_table.css';
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { getAllCourses, getAllManagers, getAllStudents } from "../Api";

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
  const [courses, setCourses] = useState(null);
  const [managers, setManagers] = useState(null);
  const [students, setStudents] = useState(null);
  let items;
  useEffect(() => {
    if(!courses) {
      const promise = getAllCourses();
      const getData = () => {
        promise.then((data) => {
          setCourses(data);
        });
      };
      getData();
    }
    if(!managers) {
      const promise = getAllManagers();
      const getData = () => {
        promise.then((data) => {
          setManagers(data);
        })
      };
      getData();
    };
    if(!students) {
      const promise = getAllStudents();
      const getData = () => {
        promise.then((data) => {
          setStudents(data);
        })
      };
      getData();
    };
  });
  if(courses && managers && students) {
    items = courses.map((a, i) => (
      {
        no: i + 1,
        name: a.courseName,
        start_date: a.startDate,
        end_date: a.endDate,
        recruit_start: a.recruitStart,
        recruit_end: a.recruitEnd,
        current: students.filter(s => s.student.courseId == a.courseId).length,
        capacity: a.capacity,
        manager: managers.find(m => m.academic.academicId == a.academicId).user.userName,
        subject: a.subjectNo,
        studentInfo: <SecondaryButton onClick={() => onStudentInfo(a.courseId)}><p>상세정보</p></SecondaryButton>,
        info: <SecondaryButton onClick={() => onDetail(a.courseId)}><p>상세정보</p></SecondaryButton>
      }
    ))
  }

  console.log(students);

  const navigate = useNavigate();

  function onDetail(id) {
    navigate(`${id}`);
  }

  function onStudentInfo(id) {
    navigate(`${id}/s`);
  }

  return <>
    {
     (items) && 
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
    }
  </>
}