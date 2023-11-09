import styled from "styled-components";
import { Board } from "../../components/Board";
import { academics, subject_board, subjects, userList } from "../../assets/TempData";
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

export function TrainerSubjectBoard() {
  const { id } = useParams();
  const posts = subject_board.filter((s) => s.subject_id == id);
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
    return (<p onClick={() => navigate(`${id}`, { state : "t" })}>{title}</p>);
  }

  const items = posts.map((d, i)=>(
    {
      no: i + 1,
      title: titleLink(d.subject_board_id, shortenTitle(d.s_post_title, 35)),
      writer: userList.find(u => u.uid == academics.find(a=> a.academic_id == d.academic_id).uid).user_name,
      regDate: d.s_post_reg_date,
      hits: d.s_post_hits
    }
  ));

  return<>
    <Container>
      <Board board={headers} item={items.reverse()} write={true} type={"t"} />
    </Container>
  </>
}