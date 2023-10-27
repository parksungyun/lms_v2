import { Col, ProgressBar, Row } from "react-bootstrap";
import styled from "styled-components"
import { Table } from "../../components/Table";
import { Progress } from "../../components/Progress";

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

const cBoardItems = [
  {
    no: 1,
    title: '교육상담아무말이나해봐아무말이나해봐아무해봐아무말이나해봐',
    writer: '가나다',
    regDate: '2023-10-25',
    hits: '5'
  },
  {
    no: 2,
    title: '교육상담아무말이나무말이나해봐',
    writer: '가나다',
    regDate: '2023-10-25',
    hits: '10'
  },
  {
    no: 3,
    title: '교육상담아무말이나해봐아무말이나해봐아무말이나해봐',
    writer: '가나다',
    regDate: '2023-10-25',
    hits: '8'
  },
  {
    no: 4,
    title: '교육상담아무말이나해봐아무말이나해무말이나해봐',
    writer: '가나다',
    regDate: '2023-10-25',
    hits: '4'
  },
  {
    no: 5,
    title: '교육상담아무말이나해봐아무말이나해봐아무말이나해봐',
    writer: '가나다',
    regDate: '2023-10-25',
    hits: '484'
  },
];

const hw = [
  {
    text: '과목.',
    value: 'subject'
  },
  {
    text: '제목',
    value: 'title'
  },
  {
    text: '등록일',
    value: 'regDate'
  },
  {
    text: '종료일',
    value: 'endDate'
  },
];

const hwItems = [
  {
    subject: 1,
    title: '교육상담아무말이나해봐아무말이나해봐아무말이나해봐아무말이나나해봐',
    regDate: '가나다',
    endDate: '2023-10-25',
  },
  {
    subject: 2,
    title: '교육상담아무말이나무말이나해봐',
    regDate: '가나다',
    endDate: '2023-10-25',
  },
  {
    subject: 3,
    title: '교육상담아무말이나해봐아무말이나해봐아무말이나해봐',
    regDate: '가나다',
    endDate: '2023-10-25',
  },
  {
    subject: 4,
    title: '교육상담아무말이나해봐아무말이나해무말이나해봐',
    regDate: '가나다',
    endDate: '2023-10-25',
  },
  {
    subject: 5,
    title: '교육상담아무말이나해봐아무말이나해봐아무말이나해봐',
    regDate: '가나다',
    endDate: '2023-10-25',
  },
];

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

const Hr = styled.hr`
  border: 0;
  margin: 0;
`;

const Box = styled.div`
  background-color: white;
  border-radius: 1rem;
  padding: 2rem;
`;

export function StudentHome() {
  return <>
    <Container>
      <Content>
        <div>
          <H2 className='title'>내 클래스</H2>
          <p>클래스 이름 받아오기</p>
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
        <Progress subjectName={'HTML'}/>
        <Hr />
        <Progress subjectName={'CSS'}/>
        <Hr />
        <Progress subjectName={'JS'}/>
        <Hr />
        <Progress subjectName={'DB'}/>
        <Hr />
        <Progress subjectName={'JAVA'}/>
      </Box>
    </Container>
  </>
}