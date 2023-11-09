import { Col, Row } from "react-bootstrap";
import styled from "styled-components"
import { Table } from "../../components/Table";
import { Progress } from "../../components/Progress";
import { academics, course_board, courses, homeworks, lectures, students, studies, subjects, userList } from "../../assets/TempData";
import { useNavigate } from "react-router-dom";

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
  const id = 1;  //studentid 값 임의로 받아옴
  const student = students.find(s => s.student_id == id);
  const courseBoard = course_board.filter(c => c.cousre_id == student.course_id);  
  const subject = subjects.filter(s => s.course_id == student.course_id);
  const homework = homeworks.filter(h => (subject.map((s) => s.subject_id == h.subject_id)));
  const study = studies.filter(s => s.student_id == id);

  const navigate = useNavigate();

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

  const cBoardItems = courseBoard.map((c,i) => (
    {
      no: i + 1,
      title: titleLink(c.course_board_id, shortenTitle(c.c_post_title, 20, "cboard")),
      writer: userList.find(u => u.uid == academics.find(a => a.academic_id == c.academic_id).uid).user_name,
      regDate: c.c_post_reg_date,
      hits: c.c_post_hits
    }
  ));

  const hwItems = homework.map((h,i) => (
    {
      subject: shortenTitle(subject.find(s => s.subject_id == h.subject_id).subject_name, 11),
      title: titleLink(h.homework_id ,shortenTitle(h.hw_title), 20, "homework"),
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
        <PrimaryButton onClick={attendCheck()}>출석 체크</PrimaryButton>
      </Content>
      <Row>
        <Col>
        <TableBox>
          <H2 onClick={()=> navigate("cboard")} className="pointer">공지 사항</H2>
          <Table 
            headers={cBoard}
            items={cBoardItems.reverse().slice(0,5)}
            selectable={false}
          />
        </TableBox>
        </Col>
        <Col>
        <TableBox>
          <H2>과제</H2>
          <Table 
            headers={hw}
            items={hwItems.reverse().slice(0,5)}
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
              <Progress
                subjectName={s.subject_name}
                max={lectures.filter(l => l.subject_id == s.subject_id).length}
                item={study.filter((data) => lectures.filter(l => l.lecture_id == data.lecture_id).find(lecture => lecture.subject_id == s.subject_id)).length}
                link={`${s.subject_id}/subject`}
                />
            </>
          ))
        }
      </Box>
    </Container>
  </>
}