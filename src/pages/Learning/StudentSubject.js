import styled from "styled-components";
import { Table } from "../../components/Table";
import { Col, Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { academics, feedbacks, homeworks, students, subject_answers, subject_board, subject_questions, submits, userList } from "../../assets/TempData";

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

const subjectid = 1;
const board = subject_board.filter(s => s.subject_id == subjectid);

const SSBItems = board.map((b,i) => (
  {
    no: i + 1,
    title: b.s_post_title,
    writer: userList.find(u => u.uid == academics.find(a => a.academic_id == b.academic_id).uid).user_name,
    regDate: b.s_post_reg_date,
    hits: b.s_post_hits
  }
));


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

function changeReplyHW(reply) {
  if(feedbacks.find(f => f.submit_id == submit.find(s => s.homework_id == reply).submit_id)) return(<BadgeSuccess>채점완료</BadgeSuccess>);
  else if (submit.find(s => s.homework_id == reply)) return (<BadgePrimary>제출완료</BadgePrimary>);
  else return(<BadgeSecondary>제출대기</BadgeSecondary>);
};

const studentid =1;

const submit = submits.filter(s => s.student_id == studentid);

const homework = homeworks.filter(h => h.subject_id == subjectid);

const SSHWItems = homework.map((h,i) => (
  {
    no: i + 1,
    title: h.hw_title,
    startDate: h.hw_start_date,
    endDate: h.hw_end_date,
    submit: changeReplyHW(h.homework_id)
  }
));

function changeReplyLec(reply) {
  if(reply === 2) return(<BadgePrimary>학습중</BadgePrimary>);
  else if (reply == 1) return(<BadgeSuccess>학습끝</BadgeSuccess>);
  else return(<BadgeSecondary>미학습</BadgeSecondary>);
};

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

const SSLECItems = [
  {
    no: 1,
    title: '교육상담아무말이나해봐아무',
    state: changeReplyLec(1)
  },
  {
    no: 2,
    title: '교육상담아무말이나해봐아무',
    state: changeReplyLec(2)
  },
  {
    no: 3,
    title: '교육상담아무말이나해봐아무',
    state: changeReplyLec(0)
  },
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

function changeReplyQNA(reply) {
  if(subject_answers.find(s => s.s_question_id == reply)) return(<BadgeSuccess>답변완료</BadgeSuccess>);
  else return(<BadgeSecondary>답변대기</BadgeSecondary>);
};

const question = subject_questions.filter(s => s.subject_id == subjectid);

const SSQNAItems = question.map((q,i) => (
  {
    no: i + 1,
    title: q.s_question_title,
    writer: userList.find(u => u.uid == students.find(s => s.student_id == q.student_id).uid).user_name,
    regDate: q.s_question_reg_date,
    state: changeReplyQNA(q.s_question_id)
  }
));

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

export function StudentSubject() {
  const maxItem = 30;
	let availableItem = 15;

  return<>
    <Container>
      <Row>
        <Col>
          <TableBox>
            <StyledNavLink to='/lms/s/sboard'>공지 사항</StyledNavLink>
            <Table
              headers={studentSBoard}
              items={SSBItems}
              selectable={false}
            />
          </TableBox>
        </Col>
        <Col>
          <TableBox>
            <StyledNavLink to='/lms/s/homework'>과제</StyledNavLink>
            <Table
              headers={studentSHW}
              items={SSHWItems}
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
              <ProgressBox width = {100-(availableItem*100/maxItem)}/>
            </ProgressBar>
            <p>현재 진행률 15/30강</p>
            <Table
              headers={studentSLec}
              items={SSLECItems}
              selectable={false}
            />
          </TableBox>
        </Col>
        <Col>
          <TableBox>
            <StyledNavLink to='/lms/s/sqna'>Q&A</StyledNavLink>
            <Table
              headers={studentSQNA}
              items={SSQNAItems}
              selectable={false}
            />
          </TableBox>
        </Col>
      </Row>
    </Container>
  </>
}