import styled from "styled-components"
import WebWrapper from "../../components/WebWrapper"
import { useState } from "react";
import { useEffect } from "react";
import { Table } from "../../components/Table";
import '../../styles/table.css';
import { Pagination } from "../../components/Pagination";
import { Navigate, useNavigate } from "react-router-dom";
import { admission_answers, admission_questions } from "../../assets/TempData";

const Container = styled.div`
  margin: 2rem 15rem;
  padding-bottom: 3rem;
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
    value: 'writeDate'
  },
  {
    text: '답변상태',
    value: 'reply'
  }
];

export function AdmissionBoard() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [searchOption, setSearchOption] = useState("all");
  const limit = 10;
  const offset = (page - 1) * limit;
  const navigate = useNavigate();

  const items = admission_questions.map((a, i) => (
    {
      no: i + 1,
      title: titleLink(a.a_question_id, a.a_question_title),
      writer: a.writer_name,
      writeDate: a.a_question_reg_date,
      reply: changeReply(checkReply(a.a_question_id)),
    }
  ))

  function titleLink(id, title) {
    return (<p onClick={() => navigate(`${id}`)}>{title}</p>);
  }

  function checkReply(id) {
    if(admission_answers.find((a) => a.a_question_id == id)) return 1;
    else return 0;
  }

  function changeReply(reply) {
    if(reply === 1) return(<BadgeSuccess>답변완료</BadgeSuccess>);
    else return(<BadgeSecondary>답변대기</BadgeSecondary>);
  }

  const postsData = (posts) => {
    if(posts) {
      let result = posts.slice(offset, offset + limit);
      return result;
    }
  }

  function onSearch(e) {
    e.preventDefault();
  }

  return <>
    <WebWrapper pageName={"입학 상담"} />
    <Container>
      <Table 
        headers={headers} 
        items={postsData(items)}
        selectable={false}
      />
      <ButtonBox>
        <SearchBox>
          <select className="searchSelect" onChange={(e) => setSearchOption(e.target.value)}>
            <option key="all" value="all">전체</option>
            <option key="title" value="title">제목</option>
            <option key="writer" value="writer">작성자</option>
          </select>
          <input id="search" value={search} onChange={(e) => setSearch(e.target.value)} />
          <button onClick={onSearch}><p>검색</p></button>
        </SearchBox>
        <PrimaryButton onClick={() => navigate("write")}><p>작성</p></PrimaryButton>
      </ButtonBox>
      <Pagination limit={limit} page={page} totalPosts={items.length} setPage={setPage} />
    </Container>
  </>
}