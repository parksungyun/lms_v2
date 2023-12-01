import { Col, Row } from "react-bootstrap";
import styled from "styled-components"
import { Table } from "../../components/Table";
import { Progress } from "../../components/Progress";
import { academics, course_board, courses, homeworks, lectures, students, studies, subjects, userList } from "../../assets/TempData";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAcademicByAcademicId, getAllManagers, getCourseBoardByCourseId, getHomeworksByCourseId, getProgressByStudentId, getSubjectByCourseId, getUserByUid } from "../Api";

const Container = styled.div`
  padding: 1.5rem 2rem;
  padding-bottom: 2rem;
  background-color: #f6f9ff;
  height: 100%;
`;

const TableBox = styled.div`
  padding: 2rem;
  padding-top: 1.3rem;
  background-color: white;
  border-radius: 1rem;
  margin-bottom: 2rem;
  height: 360px;
`;

const H2 = styled.p`
  font-size: 1.7rem;
  font-weight: bold;
  margin: 10px 0;
  &.title{
    margin: 0;
  }
  &.pointer{
    &:hover{
      cursor: pointer;
    }
  }
`;

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

const cBoard = [
  {
    text: 'No.',
    value: 'no'
  },
  {
    text: '제목',
    value: 'title'
  },
  {
    text: '작성자',
    value: 'writer'
  },
  {
    text: '등록일',
    value: 'regDate'
  },
  {
    text: '조회수',
    value: 'hits'
  }
];

const hw = [
  {
    text: '과목',
    value: 'subject'
  },
  {
    text: '제목',
    value: 'title'
  },
  {
    text: '시작일',
    value: 'startDate'
  },
  {
    text: '종료일',
    value: 'endDate'
  },
];

export function StudentHome() {
  const id = sessionStorage.getItem("uid");
  const [user, setUser] = useState(null);
  const [subject, setSubject] = useState(null);
  const [homework, setHomework] = useState(null);
  const [study, setStudy] = useState(null);
  const [board, setBoard] = useState(null);
  const [academic, setAcademic] = useState(null);
  const navigate = useNavigate();
  let cBoardItems;
  let hwItems;

  
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
    if(!academic) {
      const promise = getAllManagers();
      const getData = () => {
        promise.then((data) => {
          setAcademic(data);
        });
      };
      getData();
    }
  });

  useEffect(() => {
    if(user) {
      if(!subject) {
        const promise = getSubjectByCourseId(user.student.courseId);
        const getData = () => {
          promise.then((data) => {
            setSubject(data);
          });
        };
        getData();
      }
      if(!board) {
        const promise = getCourseBoardByCourseId(user.student.courseId);
        const getData = () => {
          promise.then((data) => {
            setBoard(data);
          });
        };
        getData();
      }
      if(!homework) {
        const promise = getHomeworksByCourseId(user.student.courseId);
        const getData = () => {
          promise.then((data) => {
            setHomework(data);
          });
        };
        getData();
      }
      if(!study) {
        const promise = getProgressByStudentId(user.student.studentId);
        const getData = () => {
          promise.then((data) => {
            setStudy(data);
          });
        };
        getData();
      }
    }
  }, [user]);

  const shortenTitle = (str, length) => {
    let result = '';
    if (str.length > length) {
      result = str.substr(0, length - 2) + '...';
    } else {
      result = str;
    }
    return result;
  };

  function titleLink(id, title, type) {
    return (<p onClick={() => navigate(`${type}/${id}`)}>{title}</p>);
  }

  function attendCheck() {

  }

  if(board && academic) {
    cBoardItems = board.map((c, i) => (
      {
        no: i + 1,
        title: titleLink(c.courseBoardId, shortenTitle(c.title, 20, "cboard")),
        writer: academic.find((a) => a.academic.academicId == c.academicId).user.userName,
        regDate: new Date(c.regDate).toISOString().split('T')[0],
        hits: c.hits
      }
    ));
  }

  if(homework && subject) {
    hwItems = homework.map((h, i) => (
      {
        subject: shortenTitle(subject.find((s) => s.subject.subjectId === h.subjectId).subject.subjectName, 11),
        title: titleLink(h.homeworkId, shortenTitle(h.title), 20, "homework"),
        startDate: h.startDate,
        endDate: h.endDate,
      }
    ));
  }

  return <>
  {
    (subject && cBoardItems && hwItems) &&
    <Container>
      <Content>
        <div>
          <H2 className='title'>내 과정</H2>
          <p>{subject[0].course.courseName}</p>
        </div>
        <PrimaryButton onClick={() => attendCheck()}><p>출석 체크</p></PrimaryButton>
      </Content>
      <Row>
        <Col>
        <TableBox>
          <H2 onClick={()=> navigate("cboard")} className="pointer">공지 사항</H2>
          <Table 
            headers={cBoard}
            items={cBoardItems.length > 5 ? cBoardItems.slice(0,5) : cBoardItems}
            selectable={false}
          />
        </TableBox>
        </Col>
        <Col>
        <TableBox>
          <H2>과제</H2>
          <Table 
            headers={hw}
            items={hwItems.length > 5 ? hwItems.slice(0,5) : hwItems}
            selectable={false}
          />
        </TableBox>
        </Col>
      </Row>
      <Box>
        <H2>내 진도관리</H2>
        {
          study && study.map((s) => (
              <Progress
                subjectName={s.subjectName}
                max={s.numOfLecture}
                item={s.numOfStudy}
                link={`${s.subjectId}/subject`}
              />
          ))
        }
      </Box>
    </Container>
  }
  </>
}