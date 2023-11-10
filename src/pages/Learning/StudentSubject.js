import styled from "styled-components";
import { Table } from "../../components/Table";
import { Col, Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { academics, feedbacks, homeworks, students, subject_answers, subject_board, subject_questions, submits, userList, lectures, studies } from "../../assets/TempData";
import { useParams, useNavigate } from "react-router-dom";

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
  const board = subject_board.filter(s => s.subject_id == id);
  const studentid = 1; // 임의로 studentid값 받아옴
  const submit = submits.filter(s => s.student_id == studentid);
  const homework = homeworks.filter(h => h.subject_id == id);  
  const question = subject_questions.filter(s => s.subject_id == id);
  const lecture = lectures.filter(l => l.subject_id == id);
  const study = studies.filter(s => s.student_id == studentid);
  const isStudy = lecture.filter(l => study.find(s => s.lecture_id == l.lecture_id))
  let i = 100 - (isStudy.length * 100 / lecture.length);
  if (i == 0) {
    i = 100;
  } else if (i == 100) {
    i = 0;
  }

  function changeReplyHW(reply) {
    if (submit.find(s => s.homework_id == reply)) {
      if(feedbacks.find(f => f.submit_id == submit.find(s => s.homework_id == reply).submit_id)) {
        return(<BadgeSuccess>채점완료</BadgeSuccess>);
      } else {
        return (<BadgePrimary>제출완료</BadgePrimary>);
      }
    }
    else return(<BadgeSecondary>제출대기</BadgeSecondary>);
  };
  
  function changeReplyLecture(reply) {
    if(reply) {
      return(<BadgePrimary>학습중</BadgePrimary>);
    }
    else return(<BadgeSecondary>미학습</BadgeSecondary>);
  };

  function changeReplyQNA(reply) {
    if(subject_answers.find(s => s.s_question_id == reply)) return(<BadgeSuccess>답변완료</BadgeSuccess>);
    else return(<BadgeSecondary>답변대기</BadgeSecondary>);
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

  const boardItems = board.map((b,i) => (
    {
      no: i + 1,
      title: titleLink(b.subject_board_id, shortenTitle(b.s_post_title, 20), `/lms/s/${id}/sboard`),
      writer: userList.find(u => u.uid == academics.find(a => a.academic_id == b.academic_id).uid).user_name,
      regDate: b.s_post_reg_date,
      hits: b.s_post_hits
    }
  ));

  const HWItems = homework.map((h,i) => (
    {
      no: i + 1,
      title: titleLink(h.homework_id, shortenTitle(h.hw_title, 20), `/lms/s/${id}/homework`),
      startDate: h.hw_start_date,
      endDate: h.hw_end_date,
      submit: changeReplyHW(h.homework_id)
    }
  ));

  const lectureItems = lecture.filter(l => !study.find(s => s.lecture_id == l.lecture_id)).map((l,i) => (
    {
      no: i + 1,
      title: l.lecture_title,
      state: changeReplyLecture(study.find(s => s.lecture_id == l.lecture_id))
    }
  ));
  const qnaItems = question.map((q,i) => (
    {
      no: i + 1,
      title: titleLink(q.s_question_id, shortenTitle(q.s_question_title, 20), `/lms/s/${id}/sqna`),
      writer: userList.find(u => u.uid == students.find(s => s.student_id == q.student_id).uid).user_name,
      regDate: q.s_question_reg_date,
      state: changeReplyQNA(q.s_question_id)
    }
  ));

  return<>
    <Container>
      <Row>
        <Col>
          <TableBox>
            <StyledNavLink to='/lms/s/sboard'>공지 사항</StyledNavLink>
            <Table
              headers={studentSBoard}
              items={boardItems.reverse().slice(0, 5)}
              selectable={false}
            />
          </TableBox>
        </Col>
        <Col>
          <TableBox>
            <StyledNavLink to='/lms/s/homework'>과제</StyledNavLink>
            <Table
              headers={studentSHW}
              items={HWItems.reverse().slice(0, 5)}
              selectable={false}
            />
          </TableBox>
        </Col>
      </Row>
      <Row>
        <Col>
          <TableBox>
            <StyledNavLink to='/lms/s/lecture'>강의</StyledNavLink>
            <ProgressBar>
              <ProgressBox width = {i}/>
            </ProgressBar>
            <p>{isStudy.length}/{lecture.length}강</p>
            <Table
              headers={studentSLec}
              items={lectureItems.reverse().slice(0, 3)}
              selectable={false}
            />
          </TableBox>
        </Col>
        <Col>
          <TableBox>
            <StyledNavLink to='/lms/s/sqna'>Q&A</StyledNavLink>
            <Table
              headers={studentSQNA}
              items={qnaItems.reverse().slice(0, 5)}
              selectable={false}
            />
          </TableBox>
        </Col>
      </Row>
    </Container>
  </>
}