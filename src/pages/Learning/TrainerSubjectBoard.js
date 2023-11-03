import styled from "styled-components";
import { Board } from "../../components/Board";

const trainerSBoard = [
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

const TSBItems = [
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
  {
    no: 6,
    title: '교육상담아무말이나해봐아무말이나해봐아무말이나해봐',
    writer: '가나다',
    regDate: '2023-10-25',
    hits: '484'
  },
  {
    no: 7,
    title: '교육상담아무말이나해봐아무말이나해봐아무말이나해봐',
    writer: '가나다',
    regDate: '2023-10-25',
    hits: '484'
  },
  {
    no: 8,
    title: '교육상담아무말이나해봐아무말이나해봐아무말이나해봐',
    writer: '가나다',
    regDate: '2023-10-25',
    hits: '484'
  },
  {
    no: 9,
    title: '교육상담아무말이나해봐아무말이나해봐아무말이나해봐',
    writer: '가나다',
    regDate: '2023-10-25',
    hits: '484'
  },
  {
    no: 10,
    title: '교육상담아무말이나해봐아무말이나해봐아무말이나해봐',
    writer: '가나다',
    regDate: '2023-10-25',
    hits: '484'
  },
];

const Container = styled.div`
  padding: 1.5rem 2rem;
  padding-bottom: 2rem;
  background-color: #f6f9ff;
  height: 100%;
`;

export function TrainerSubjectBoard() {
  return<>
    <Container>
      <Board board={trainerSBoard} item={TSBItems} write={true}/>
    </Container>
  </>
}