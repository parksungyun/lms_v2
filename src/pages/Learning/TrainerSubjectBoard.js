import styled from "styled-components";
import { Board } from "../../components/Board";
import { academics, subject_board, userList } from "../../assets/TempData";

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

const TSBItems = subject_board.map((d,i)=>(
  {
    no: i+1,
    title: d.s_post_title,
    writer: userList.find(u => u.uid == academics.find(a=> a.academic_id == d.academic_id).uid).user_name,
    regDate: d.s_post_reg_date,
    hits: d.s_post_hits
  }
));


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