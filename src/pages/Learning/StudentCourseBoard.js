import styled from "styled-components";
import { Board } from "../../components/Board";
import { academics, course_board, userList } from "../../assets/TempData";
import { useNavigate } from "react-router-dom";

const studentCBoard = [
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

const Container = styled.div`
  padding: 1.5rem 2rem;
  padding-bottom: 2rem;
  background-color: #f6f9ff;
  height: 100%;
  `;

export function StudentCourseBoard() {
  const navigate = useNavigate();
  
  function titleLink(id, title) {
    return (<p onClick={() => navigate(`${id}`)}>{title}</p>);
  }
  
  const id = 1 // courseid 값 임의로 받아옴
  const board = course_board.filter(c => c.cousre_id == id);
  const SCBItems = board.map((b,i) => (
    {
      no: i + 1,
      title: titleLink(b.course_board_id, b.c_post_title),
      writer: userList.find(u => u.uid == academics.find(a => a.academic_id == b.academic_id).uid).user_name,
      regDate: b.c_post_reg_date,
      hits: b.c_post_hits
    }
  ));
  
  return<>
    <Container>
      <Board board={studentCBoard} item={SCBItems} write={true}/>
    </Container>
  </>
}