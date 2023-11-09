import { Col, Row } from "react-bootstrap";
import styled from "styled-components"
import { Table } from "../../components/Table";
import { Progress } from "../../components/Progress";
import { academics, course_board, courses, homeworks, subjects, userList } from "../../assets/TempData";

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
  const id = 1;  //courseid 값 임의로 받아옴
  const course = course_board.filter(c => c.cousre_id == id);

  const cBoardItems = course.map((c,i) => (
    {
      no: i + 1,
      title: c.c_post_title,
      writer: userList.find(u => u.uid == academics.find(a => a.academic_id == c.academic_id).uid).user_name,
      regDate: c.c_post_reg_date,
      hits: c.c_post_hits
    }
  ));
  
  const subject = subjects.filter(s => s.course_id == id);
  const homework = homeworks.filter(h => (subject.map((s) => s.subject_id == h.subject_id)));

  const hwItems = homework.map((h,i) => (
    {
      subject: subject.find(s => s.subject_id == h.subject_id).subject_name,
      title: h.hw_title,
      startDate: h.hw_start_date,
      endDate: h.hw_end_date,
    }
  ));

  return <>
    <Container>
      <Content>
        <div>
          <H2 className='title'>내 클래스</H2>
          <p>{courses.find(c => c.course_id == id).course_name}</p>
        </div>
        <PrimaryButton>출석 체크</PrimaryButton>
      </Content>
      <Row>
        <Col>
        <TableBox>
          <H2>공지 사항</H2>
          <Table 
            headers={cBoard}
            items={cBoardItems}
            selectable={false}
          />
        </TableBox>
        </Col>
        <Col>
        <TableBox>
          <H2>과제</H2>
          <Table 
            headers={hw}
            items={hwItems}
            selectable={false}
          />
        </TableBox>
        </Col>
      </Row>
      <Box>
        <H2>내 진도관리</H2>
        {
          subject.map((s) => (
            <>
              <Progress subjectName={s.subject_name} />
            </>
          ))
        }
      </Box>
    </Container>
  </>
}