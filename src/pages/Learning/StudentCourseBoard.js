import styled from "styled-components";
import { Board } from "../../components/Board";
import { academics, course_board, students, userList } from "../../assets/TempData";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { getAllManagers, getCourseBoardByCourseId, getCourseBoardBySearch, getStudentByStudentId } from "../Api";

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

const SearchBox = styled.div`
display: flex;
gap: 0.2rem;
input {
  padding: 0.3rem;
}
button {
  border: 0;
  border-radius: 5px;
  color: white;
  padding: 5px 15px;
  background-color: #5f7dcf;
}
`;

export function StudentCourseBoard() {
  const navigate = useNavigate();  
  const id = sessionStorage.getItem("id"); // studentId
  const [user, setUser] = useState(null);
  const [academic, setAcademic] = useState(null);
  const [board, setBoard] = useState(null);
  const [search, setSearch] = useState("");
  const [searchOption, setSearchOption] = useState("all");
  let items;

  useEffect(() => {
    if(!user) {
      const promise = getStudentByStudentId(id);
      const getData = () => {
        promise.then((data) => {
          setUser(data);
        });
      };
      getData();
    }
    if(!academic) {
      const promise = getAllManagers();
      const getData = () => {
        promise.then((data) => {
          setAcademic(data);
        });
      };
      getData();
    }
  });

  useEffect(() => {
    if(user) {
      if(!board) {
        const promise = getCourseBoardByCourseId(user.student.courseId);
        const getData = () => {
          promise.then((data) => {
            setBoard(data);
          });
        };
        getData();
      }
    }
  }, [user]);
  
  function titleLink(link, title) {
    return (<p onClick={() => navigate(`${link}`, { state : ["s", user.student.courseId, "cboard"] })}>{title}</p>);
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

  function onSearch() {
    if(search.trim().length > 0) {
      const promise = getCourseBoardBySearch(search, searchOption, user.student.courseId);
      const getData = () => {
        promise.then((data) => {
          setBoard(data);
        });
      };
      getData();
    }
    else {
      setBoard(null);
    }
    setSearch("");
    setSearchOption("all");
  };

  if(board && academic) {
    items = board.map((b, i) => (
      {
        no: i + 1,
        title: titleLink(b.courseBoardId, shortenTitle(b.title, 35)),
        writer: academic.find((a) => a.academic.academicId === b.academicId).user.userName,
        regDate: new Date(b.regDate).toISOString().split('T')[0],
        hits: b.hits
      }
    ));
  }
  
  return<>
    <Container>
      {
        items && <Board board={headers} item={items} write={false} />
      }
      <SearchBox>
        <select className="searchSelect" onChange={(e) => setSearchOption(e.target.value)}>
          <option key="all" value="all">전체</option>
          <option key="title" value="title">제목</option>
          <option key="content" value="content">내용</option>
        </select>
        <input id="search" value={search} onChange={(e) => setSearch(e.target.value)} />
        <button onClick={() => onSearch()}><p>검색</p></button>
      </SearchBox>
    </Container>
  </>
}