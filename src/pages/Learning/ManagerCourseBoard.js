import styled from "styled-components";
import { Board } from "../../components/Board";
import { academics, course_board, userList } from "../../assets/TempData";

const Container = styled.div`
  padding: 1.5rem 2rem;
  padding-bottom: 2rem;
  background-color: #f6f9ff;
  height: 100%;
`;

const headers = [
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

export function ManagerCourseBoard() {
const id = 1; // courseid 값 임의로 받아오기
const course = course_board.filter(c => c.cousre_id == id);
  
const items = course.map((c,i) => (
  {
    no: i + 1,
    title: c.c_post_title,
    writer: userList.find(u => u.uid == academics.find(a => a.academic_id == c.academic_id).uid).user_name,
    regDate: c.c_post_reg_date,
    hits: c.c_post_hits
  }
));

  return<>
    <Container>
      <Board board={headers} item={items} write={true}/>
    </Container>
  </>
}