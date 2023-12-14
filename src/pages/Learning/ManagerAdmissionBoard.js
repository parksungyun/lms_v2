import styled from "styled-components";
import { Table } from "../../components/Table";
import { Pagination } from "../../components/Pagination";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { academics, admission_answers, admission_questions, userList } from "../../assets/TempData";
import { getAdmissionPostsByContaining, getAllAdmissionPosts, getAllManagers } from "../Api";


const BadgeSuccess = styled.span`
  background-color: green;
  padding: 2px 15px;
  color: white;
  font-weight: 500;
  font-size: 0.8rem;
  border-radius: 5px;
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
    text: '작성일',
    value: 'regDate'
  },
  {
    text: '답변자',
    value: 'replyWriter'
  },
  {
    text: '답변일',
    value: 'replyDate'
  },
  {
    text: '답변상태',
    value: 'replyState'
  }
];

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

const Hr = styled.hr`
  border: 0 solid #ddd;
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

export function ManagerAdmissionBoard() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [searchOption, setSearchOption] = useState("all");
  const [questions, setQuestions] = useState(null);
  const [academics, setAcademics] = useState(null);
  const navigate = useNavigate();
  const limit = 10;
  const offset = (page - 1) * limit;
  let items;

  useEffect(() => {
    if(!questions) {
      const promise = getAllAdmissionPosts();
      const getData = () => {
        promise.then((data) => {
          setQuestions(data);
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

  if(questions && academics) {
    items = questions.map((q, i) => (
      {
        no: i + 1,
        title: titleLink(q.question.admissionQuestionId, shortenTitle(q.question.title, 35)),
        writer: q.question.writerName,
        regDate: new Date(q.question.regDate).toLocaleDateString("fr-CA"),
        replyWriter: findReplyWriter(q),
        replyDate: findReplyDate(q),
        replyState: changeReply(q)
      }
    ))
  }

  function findReplyWriter(reply) {
    if(reply.answer){
      return academics.find((a) => a.academic.academicId === reply.answer.academicId).user.userName;
    }
    else return "";
  }

  function findReplyDate(reply) {
    if(reply.answer){
      return new Date(reply.answer.answerModDate).toLocaleDateString("fr-CA");
    }
    else return "";
  }

  function changeReply(reply) {
    if(reply.answer){
      return(<BadgeSuccess>답변완료</BadgeSuccess>)
    }
    else {
      return(<BadgeSecondary>답변대기</BadgeSecondary>)
    }
  };

  function titleLink(id, title) {
    return (<p onClick={() => navigate(`${id}`)}>{title}</p>);
  }

  const postsData = (posts) => {
    if(posts) {
      let result = posts.slice(offset, offset + limit);
      return result;
    }
  };

  function onSearch() {
    if(search.trim().length > 0) {
      const promise = getAdmissionPostsByContaining(search, searchOption);
      const getData = () => {
        promise.then((data) => {
          setQuestions(data);
        });
      };
      getData();
    }
    else {
      const promise = getAllAdmissionPosts();
      const getData = () => {
        promise.then((data) => {
          setQuestions(data);
        });
      };
      getData();
    }
    setSearch("");
    setSearchOption("all");
  };

  return<>
    <Container>
      <TableBox>
        <H2>입학상담</H2>
        {
          items &&
          <Table 
            headers={headers}
            items={postsData(items)}
            selectable={false}
          />
        }
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
      </TableBox>
    </Container>
  </>
}