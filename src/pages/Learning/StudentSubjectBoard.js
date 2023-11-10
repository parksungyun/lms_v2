import styled from "styled-components";
import { Board } from "../../components/Board";
import { academics, subject_board, userList } from "../../assets/TempData";
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

export function StudentSubjectBoard() {
  const { id } = useParams();
  const navigate = useNavigate();
  const board = subject_board.filter(s => s.subject_id == id);

  const shortenTitle = (str, length) => {
    let result = '';
    if (str.length > length) {
      result = str.substr(0, length - 2) + '...';
    } else {
      result = str;
    }
    return result;
  };
  
  function titleLink(link, title) {
    return (<p onClick={() => navigate(`${link}`, { state : ["s", id, "sboard"] })}>{title}</p>);
  }

  const items = board.map((b,i) =>(
    {
      no: i + 1,
      title: titleLink(b.subject_board_id, shortenTitle(b.s_post_title, 35)),
      writer: userList.find(u => u.uid == academics.find(a => a.academic_id == b.academic_id).uid).user_name,
      regDate: b.s_post_reg_date,
      hits: b.s_post_hits
    }
  ));
  return<>
    <Container>
      <Board board={headers} item={items} write={false}/>
    </Container>
  </>
}