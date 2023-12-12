import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { Table } from "../../components/Table";
import '../../styles/trainer_hw_table.css';
import { Pagination } from "../../components/Pagination";
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

export function TrainerSubjectQna() {
  const { id } = useParams();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [searchOption, setSearchOption] = useState("all");
  const limit = 10;
  const offset = (page - 1) * limit;
  const navigate = useNavigate();
  const [questions, setQuestions] = useState(null);
  const [students, setStudents] = useState(null);
  let items;

  useEffect(() => {
    setQuestions(null);
    setStudents(null);
  }, [id]);

  useEffect(() => {
    if(!questions) {
      const promise = getSubjectQnaBySubjectId(id);
      const getData = () => {
        promise.then((data) => {
          setQuestions(data);
        });
      };
      getData();
    }
    if(!students) {
      const promise = getStudentsBySubjectId(id);
      const getData = () => {
        promise.then((data) => {
          setStudents(data);
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

  const shortenTitle = (str, length) => {
    let result = '';
    if (str.length > length) {
      result = str.substr(0, length - 2) + '...';
    } else {
      result = str;
    }
    return result;
  };

  if(questions && students) {
    items = questions.map((q, i) => (
      {
        no: i + 1,
        title: titleLink(q.question.subjectQuestionId, shortenTitle(q.question.title, 35)),
        writer: students.find((s) => s.student.studentId === q.question.studentId).user.userName,
        regDate: new Date(q.question.regDate).toLocaleDateString("fr-CA"),
        Hits: q.question.hits,
        replyState: changeReply(q)
      }
    ));
  }

  function changeReply(reply) {
    if(reply.answer) {
      return(<BadgeSuccess>답변완료</BadgeSuccess>)
    }
    else {
      return(<BadgeSecondary>답변대기</BadgeSecondary>)
    };
  };

  function onSearch() {
    if(search.trim().length > 0) {
      const promise = getSubjectQnaBySearch(search, searchOption, id);
      const getData = () => {
        promise.then((data) => {
          setQuestions(data);
        });
      };
      getData();
    }
    else {
      setQuestions(null);
    }
    setSearch("");
    setSearchOption("all");
  };

  function titleLink(id, title) {
    return (<p onClick={() => navigate(`${id}`)}>{title}</p>);
  }

  return<>
    <Container>
      <TableBox>
        <H2>Q&A</H2>
        {
          items &&
          <Table 
            headers={headers}
            items={postsData(items)}
            selectable={false}
          />
        }
      </TableBox>
      <ButtonBox>
        <SearchBox>
          <select className="searchSelect" onChange={(e) => setSearchOption(e.target.value)}>
            <option key="all" value="all">전체</option>
            <option key="title" value="title">제목</option>
            <option key="writer" value="writer">작성자</option>
          </select>
          <input id="search" value={search} onChange={(e) => setSearch(e.target.value)} />
          <button onClick={() => onSearch()}><p>검색</p></button>
        </SearchBox>
      </ButtonBox>
      {
        items &&
        <Pagination limit={limit} page={page} totalPosts={items.length} setPage={setPage} />
      }
    </Container>
  </>
}