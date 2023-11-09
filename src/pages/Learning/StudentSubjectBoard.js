import styled from "styled-components";
import { Board } from "../../components/Board";
import { academics, subject_board, userList } from "../../assets/TempData";

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

export function StudentSubjectBoard() {
  const id = 1; // subjectid 값 임의로 받아옴
  const board = subject_board.filter(s => s.subject_id == id);

  const items = board.map((b,i) =>(
    {
      no: i + 1,
      title: b.s_post_title,
      writer: userList.find(u => u.uid == academics.find(a => a.academic_id == b.academic_id).uid).user_name,
      regDate: b.s_post_reg_date,
      hits: b.s_post_hits
    }
  ));

  const Container = styled.div`
    padding: 1.5rem 2rem;
    padding-bottom: 2rem;
    background-color: #f6f9ff;
    height: 100%;
`;
  return<>
    <Container>
      <Board board={studentSBoard} item={items} write={false}/>
    </Container>
  </>
}