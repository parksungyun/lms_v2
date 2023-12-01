import styled from "styled-components";
import { Table } from "../../components/Table";
import { Col, Row } from "react-bootstrap";
import { NavLink, useLocation } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllTrainers, getHomeworksBySubjectId, getLecturesBySubjectId, getProgressByStudentIdAndSubjectId, getStudentByStudentId, getStudentsByCourseId, getStudyByStudentIdAndSubjectId, getSubjectBoardBySubjectId, getSubjectQnaBySubjectId,  getSubmitsByStudentIdAndSubjectId } from "../Api";

const BadgePrimary = styled.span`
  background-color: #5f7dcf;
  padding: 2px 15px;
  color: white;
  font-weight: 500;
  font-size: 0.8rem;
  border-radius: 5px;
`;

const BadgeSuccess = styled.span`
  background-color: green;
  padding: 2px 15px;
  color: white;
  font-weight: 500;
  font-size: 0.8rem;
  border-radius: 5px;
  `;

const BadgeSecondary = styled.span`
  background-color: gray;
  padding: 2px 15px;
  color: white;
  font-weight: 500;
  font-size: 0.8rem;
  border-radius: 5px;
`;

const Container = styled.div`
  padding: 1.5rem 2rem;
  padding-bottom: 2rem;
  background-color: #f6f9ff;
  height: 100%;
`;

const StyledNavLink = styled(NavLink)`
  font-size: 1.7rem;
  font-weight: bold;
  color: black;
  &:hover{
    color: black;
  }
`;

const TableBox = styled.div`
  padding: 2rem;
  padding-top: 1.3rem;
  background-color: white;
  border-radius: 1rem;
  margin-bottom: 2rem;
  height: 360px;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 30px;
  background-color: #dedede;
  border-radius:12px;
  font-weight: 600;
  font-size: .8rem;
  overflow: hidden;
  margin: 0.75rem 0;
`;

const ProgressBox = styled.div`
  width: ${(props) => props.width}%; 
  height: 30px;
  padding: 0;
  text-align: center;
  background-color: #5f7dcf;
  color: #111;
`;

const studentSBoard = [
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

const studentSHW = [
  {
    text: 'No.',
    value: 'no'
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
  {
    text: '제출',
    value: 'submit'
  }
];

const studentSLec = [
  {
    text: 'No.',
    value: 'no'
  },
  {
    text: '제목',
    value: 'title'
  },
  {
    text: '수강상태',
    value: 'state'
  }
];

const studentSQNA = [
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
    text: '답변상태',
    value: 'state'
  }
];

export function StudentSubject() {
  const navigate = useNavigate();
  const { id } = useParams();
  const studentId = sessionStorage.getItem("id");
  const [user, setUser] = useState(null);
  const [academic, setAcademic] = useState(null);
  const [students, setStudents] = useState(null);
  const [board, setBoard] = useState(null);
  const [homework, setHomework] = useState(null);
  const [submit, setSubmit] = useState(null);
  const [question, setQuestion] = useState(null);
  const [lecture, setLecture] = useState(null);
  const [study, setStudy] = useState(null);
  const [progress, setProgress] = useState(null);
  let boardItems;
  let hwItems;
  let lectureItems;
  let qnaItems;

  useEffect(() => {
    setBoard(null);
    setHomework(null);
    setSubmit(null);
    setQuestion(null);
    setLecture(null);
    setStudy(null);
    setProgress(null);
  }, [id]);

  useEffect(() => {
    if(!user) {
      const promise = getStudentByStudentId(studentId);
      const getData = () => {
        promise.then((data) => {
          setUser(data);
        });
      };
      getData();
    }
    if(!academic) {
      const promise = getAllTrainers();
      const getData = () => {
        promise.then((data) => {
          setAcademic(data);
        });
      };
      getData();
    }
    if(!board) {
      const promise = getSubjectBoardBySubjectId(id);
      const getData = () => {
        promise.then((data) => {
          setBoard(data);
        });
      };
      getData();
    }
    if(!homework) {
      const promise = getHomeworksBySubjectId(id);
      const getData = () => {
        promise.then((data) => {
          setHomework(data);
        });
      };
      getData();
    }
    if(!submit) {
      const promise = getSubmitsByStudentIdAndSubjectId(studentId, id);
      const getData = () => {
        promise.then((data) => {
          setSubmit(data);
        });
      };
      getData();
    }
    if(!progress) {
      const promise = getProgressByStudentIdAndSubjectId(studentId, id);
      const getData = () => {
        promise.then((data) => {
          setProgress(data);
        });
      };
      getData();
    }
    if(!question) {
      const promise = getSubjectQnaBySubjectId(id);
      const getData = () => {
        promise.then((data) => {
          setQuestion(data);
        });
      };
      getData();
    }
    if(!lecture) {
      const promise = getLecturesBySubjectId(id);
      const getData = () => {
        promise.then((data) => {
          setLecture(data);
        });
      };
      getData();
    }
    if(!study) {
      const promise = getStudyByStudentIdAndSubjectId(studentId, id);
      const getData = () => {
        promise.then((data) => {
          setStudy(data);
        });
      };
      getData();
    }
  });

  useEffect(() => {
    if(user) {
      if(!students) {
        const promise = getStudentsByCourseId(user.student.courseId);
        const getData = () => {
          promise.then((data) => {
            setStudents(data);
          });
        };
        getData();
      }
    }
  }, [user]);

  function changeReplyHW(homeworkId) {
    const reply = submit.find((s) => s.submit.homeworkId === homeworkId);
    if(reply) {
      if(reply.feedback) {
        return(<BadgeSuccess>채점완료</BadgeSuccess>);
      }
      else {
        return (<BadgePrimary>제출완료</BadgePrimary>);
      }
    }
    else {
      return(<BadgeSecondary>제출대기</BadgeSecondary>);
    }
  };
  
  function changeReplyLecture(lectureId) {
    const reply = study.find((s) => s.lectureId === lectureId);
    if(reply) {
      if(reply.isStudy === 0) {
        return(<BadgePrimary>수강진행</BadgePrimary>);
      }
      else if(reply.isStudy === 1) {
        return(<BadgeSuccess>수강완료</BadgeSuccess>);
      }
    }
    else return(<BadgeSecondary>수강대기</BadgeSecondary>);
  };

  function changeReplyQNA(reply) {
    if(reply.answer) {
      return(<BadgeSuccess>답변완료</BadgeSuccess>);
    }
    else {
      return(<BadgeSecondary>답변대기</BadgeSecondary>);
    }
  };

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

  if(board && academic) {
    boardItems = board.map((b, i) => (
      {
        no: i + 1,
        title: titleLink(b.subjectBoardId, shortenTitle(b.title, 11), `/lms/s/${id}/sboard`),
        writer: academic.find((a) => a.academic.academicId === b.academicId).user.userName,
        regDate: new Date(b.regDate).toISOString().split('T')[0],
        hits: b.hits
      }
    ));
  }

  if(homework && submit) {
    hwItems = homework.map((h, i) => (
      {
        no: i + 1,
        title: titleLink(h.homeworkId, shortenTitle(h.title, 11), `/lms/s/${id}/homework`),
        startDate: h.startDate,
        endDate: h.endDate,
        submit: changeReplyHW(h.homeworkId)
      }
    ));
  }

  if(lecture && study) {
    lectureItems = lecture.map((l, i) => (
      {
        no: i + 1,
        title: l.title,
        state: changeReplyLecture(l.lectureId)
      }
    ));
  }

  if(question && students) {
    qnaItems = question.map((q, i) => (
      {
        no: i + 1,
        title: titleLink(q.question.subjectQuestionId, shortenTitle(q.question.title, 11), `/lms/s/${id}/sqna`),
        writer: (students.find((a) => a.student.studentId === q.question.studentId)).user.userName,
        regDate: new Date(q.question.regDate).toISOString().split('T')[0],
        state: changeReplyQNA(q)
      }
    ));
  }

  return<>
    <Container>
      <Row>
        <Col>
        {
          boardItems &&
          <TableBox>
            <StyledNavLink to={`/lms/s/${id}/sboard`}>공지 사항</StyledNavLink>
            <Table
              headers={studentSBoard}
              items={boardItems.length > 5 ? boardItems.slice(0, 5) : boardItems}
              selectable={false}
            />
          </TableBox>
        }
        </Col>
        <Col>
        {
          hwItems &&
          <TableBox>
            <StyledNavLink to={`/lms/s/${id}/homework`}>과제</StyledNavLink>
            <Table
              headers={studentSHW}
              items={hwItems.length > 5 ? hwItems.slice(0, 5) : hwItems}
              selectable={false}
            />
          </TableBox>
        }
        </Col>
      </Row>
      <Row>
        <Col>
        {
          (progress && lectureItems) &&
          <TableBox>
            <StyledNavLink to={`/lms/s/${id}/lecture`}>강의</StyledNavLink>
            <ProgressBar>
              <ProgressBox width = {progress.numOfStudy / progress.numOfLecture * 100} />
            </ProgressBar>
            <p>{progress.numOfStudy}/{progress.numOfLecture}강</p>
            <Table
              headers={studentSLec}
              items={lectureItems.length > 3 ? lectureItems.slice(0, 3) : lectureItems}
              selectable={false}
            />
          </TableBox>
        }
        </Col>
        <Col>
        {
          qnaItems &&
          <TableBox>
            <StyledNavLink to={`/lms/s/${id}/sqna`}>Q&A</StyledNavLink>
            <Table
              headers={studentSQNA}
              items={qnaItems.length > 5 ? qnaItems.slice(0, 5) : qnaItems}
              selectable={false}
            />
          </TableBox>
        }
        </Col>
      </Row>
    </Container>
  </>
}