import styled from "styled-components";
import { Board } from "../../components/Board";
import { academics, course_board, userList } from "../../assets/TempData";
import { useNavigate, useParams } from "react-router-dom";

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
const { id } = useParams();
const course = course_board.filter(c => c.cousre_id == id);
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

function titleLink(id, title) {
  return (<p onClick={() => navigate(`${id}`, { state : ["t", 1] })}>{title}</p>);
}
  
const items = course.map((c, i) => (
  {
    no: i + 1,
    title: titleLink(c.course_board_id, shortenTitle(c.c_post_title, 35)),
    writer: userList.find(u => u.uid == academics.find(a => a.academic_id == c.academic_id).uid).user_name,
    regDate: c.c_post_reg_date,
    hits: c.c_post_hits
  }
));

  return<>
    <Container>
      <Board board={headers} item={items.reverse()} write={true} type={"m"} />
    </Container>
  </>
}