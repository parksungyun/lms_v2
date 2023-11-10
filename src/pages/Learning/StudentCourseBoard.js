import styled from "styled-components";
import { Board } from "../../components/Board";
import { academics, course_board, students, userList } from "../../assets/TempData";
import { useNavigate, useParams } from "react-router-dom";

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

const Container = styled.div`
  padding: 1.5rem 2rem;
  padding-bottom: 2rem;
  background-color: #f6f9ff;
  height: 100%;
  `;

export function StudentCourseBoard() {
  const navigate = useNavigate();  
  const id = 1; // 임시
  const student = students.find((s) => s.student_id == id);
  const board = course_board.filter(c => c.cousre_id == student.course_id);
  
  function titleLink(link, title) {
    return (<p onClick={() => navigate(`${link}`, { state : ["s", student.course_id, "cboard"] })}>{title}</p>);
  }

  const shortenTitle = (str, length) => {
    let result = '';
    if (str.length > length) {
      result = str.substr(0, length - 2) + '...';
    } else {
      result = str;
    }
    return result;
  };

  const items = board.map((b,i) => (
    {
      no: i + 1,
      title: titleLink(b.course_board_id, shortenTitle(b.c_post_title, 35)),
      writer: userList.find(u => u.uid == academics.find(a => a.academic_id == b.academic_id).uid).user_name,
      regDate: b.c_post_reg_date,
      hits: b.c_post_hits
    }
  ));
  
  return<>
    <Container>
      <Board board={headers} item={items} write={false}/>
    </Container>
  </>
}