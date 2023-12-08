import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { Table } from "../../components/Table";
import '../../styles/trainer_hw_table.css';
import { Pagination } from "../../components/Pagination";
import { useEffect } from "react";
import { getStudentsBySubjectId, getSubjectQnaBySearch, getSubjectQnaBySubjectId } from "../Api";

const BadgeSuccess = styled.span`
  background-color: green;
  padding: 2px 15px;
  color: white;
  font-weight: 500;
  font-size: 0.8rem;
  border-radius: 5px;
  `;

const BadgeSecondary = styled.span`
  background-color: gray;
  padding: 2px 15px;
  color: white;
  font-weight: 500;
  font-size: 0.8rem;
  border-radius: 5px;
`;

const Container = styled.div`
  padding: 1.5rem 2rem;
  padding-bottom: 2rem;
  background-color: #f6f9ff;
  height: 100%;
`;

const TableBox = styled.div`
  padding: 2rem;
  padding-top: 1.3rem;
  background-color: white;
  border-radius: 1rem;
  margin-bottom: 2rem;
`;

const H2 = styled.p`
  font-size: 1.7rem;
  font-weight: bold;
  margin-top: 10px;
  margin-bottom: 0;
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

const ButtonBox = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
  margin-right: 1.4rem;
`;

const PrimaryButton = styled.button`
  border: 0;
  border-radius: 5px;
  background-color: #5f7dcf;
  padding: 0.6rem 1.4rem;
  color: white;
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
    value: 'Hits'
  },
  {
    text: '답변상태',
    value: 'replyState'
  },
];

export function StudentSubjectQna() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [students, setStudents] = useState(null);
  const [question, setQuestion] = useState(null);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [searchOption, setSearchOption] = useState("all");
  const limit = 10;
  const offset = (page - 1) * limit;
  let items;

  useEffect(() => {
    setQuestion(null);
  }, [id]);

  useEffect(() => {
    if(!students) {
      const promise = getStudentsBySubjectId(id);
      const getData = () => {
        promise.then((data) => {
          setStudents(data);
        });
      };
      getData();
    }
    if(!question) {
      const promise = getSubjectQnaBySubjectId(id);
      const getData = () => {
        promise.then((data) => {
          setQuestion(data);
        });
      };
      getData();
    }
  });

  const postsData = (posts) => {
    if(posts) {
      let result = posts.slice(offset, offset + limit);
      return result;
    }
  };

  function changeReply(question) {
    if(question.answer) {
      return(<BadgeSuccess>답변완료</BadgeSuccess>);
    }
    else {
      return(<BadgeSecondary>답변대기</BadgeSecondary>);
    };
  };

  function onSearch() {
    if(search.trim().length > 0) {
      const promise = getSubjectQnaBySearch(search, searchOption, id);
      const getData = () => {
        promise.then((data) => {
          setQuestion(data);
        });
      };
      getData();
    }
    else {
      setQuestion(null);
    }
    setSearch("");
    setSearchOption("all");
  };

  const shortenTitle = (str, length) => {
    let result = '';
    if (str.length > length) {
      result = str.substr(0, length - 2) + '...';
    } else {
      result = str;
    }
    return result;
  };

  if(question && students) {
    items = question.map((s, i) => (
      {
        no: i + 1,
        title: titleLink(s.question.subjectQuestionId, shortenTitle(s.question.title, 35)),
        writer: students.find((w) => w.student.studentId === s.question.studentId).user.userName,
        regDate: new Date(s.question.regDate).toLocaleDateString("fr-CA"),
        Hits: s.question.hits,
        replyState: changeReply(s)
      }
    ));
  }

  function titleLink(id, title) {
    return (<p onClick={() => navigate(`${id}`)}>{title}</p>);
  }

  return<>
    {
      items &&
      <Container>
        <TableBox>
          <H2>Q&A</H2>
          <Table 
            headers={headers}
            items={postsData(items)}
            selectable={false}
          />
        </TableBox>
        <ButtonBox>
          <SearchBox>
            <select className="searchSelect" onChange={(e) => setSearchOption(e.target.value)}>
              <option key="all" value="all">전체</option>
              <option key="title" value="title">제목</option>
              <option key="content" value="content">내용</option>
              <option key="writer" value="writer">작성자</option>
            </select>
            <input id="search" value={search} onChange={(e) => setSearch(e.target.value)} />
            <button onClick={() => onSearch()}><p>검색</p></button>
          </SearchBox>
          <PrimaryButton onClick={() => navigate("write")}><p>작성</p></PrimaryButton>
        </ButtonBox>
        <Pagination limit={limit} page={page} totalPosts={items.length} setPage={setPage} />
      </Container>
    }
  </>
}