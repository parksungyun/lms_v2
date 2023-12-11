import styled from "styled-components";
import { Board } from "../../components/Board";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllManagers, getCourseBoardByCourseId } from "../Api";

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
const [board, setBoard] = useState(null);
const [academics, setAcademics] = useState(null);
const navigate = useNavigate();
let items;

useEffect(() => {
  setBoard(null);
}, [id]);

useEffect(() => {
  if(!board) {
    const promise = getCourseBoardByCourseId(id);
    const getData = () => {
      promise.then((data) => {
        setBoard(data);
      });
    };
    getData();
  }
  if(!academics) {
    const promise = getAllManagers();
    const getData = () => {
      promise.then((data) => {
        setAcademics(data);
      });
    };
    getData();
  }
});

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
  return (<p onClick={() => navigate(`${link}`)}>{title}</p>);
}

if(board && academics) {
  items = board.map((c, i) => (
    {
      no: i + 1,
      title: titleLink(c.courseBoardId, shortenTitle(c.title, 35)),
      writer: academics.find((a) => a.academic.academicId === c.academicId).user.userName,
      regDate: new Date(c.regDate).toLocaleDateString("fr-CA"),
      hits: c.hits
    }
  ));
}

  return<>
    <Container>
      {
        items &&
        <Board board={headers} item={items} />
      }
    </Container>
  </>
}