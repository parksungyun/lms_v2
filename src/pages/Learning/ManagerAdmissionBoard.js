import styled from "styled-components";
import { Board } from "../../components/Board";
import { Table } from "../../components/Table";
import { Pagination } from "../../components/Pagination";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { admission_answers, admission_questions } from "../../assets/TempData";


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

const PrimaryButton = styled.button`
  border: 0;
  border-radius: 5px;
  background-color: #5f7dcf;
  padding: 0.6rem 1.4rem;
  color: white;
`;

export function ManagerAdmissionBoard() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [searchOption, setSearchOption] = useState("all");
  const navigate = useNavigate();
  const limit = 10;
  const offset = (page - 1) * limit;
  const answer = admission_answers.filter((a) => admission_questions.map((q) => q.a_question_id == a.a_question_id));

  const items = admission_questions.map((q, i) => (
    {
      no: i + 1,
      title: titleLink(q.a_question_id, q.a_question_title),
      writer: q.writer_name,
      regDate: q.a_question_reg_date,
      replyDate: findReplyDate(q.a_question_id),
      replyState: changeReply(q.a_question_id)
    }
  ))

  function findReplyDate(id) {
    let temp;
    if(answer.find((a) => a.a_question_id == id)){
      temp = answer.find((a) => a.a_question_id == id);
      return temp.a_answer_mod_date;
    }
    else return "";
  }

  function changeReply(id) {
    if(answer.find((a) => a.a_question_id == id)){
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

  function onSearch(e) {
    e.preventDefault();
  };

  return<>
    <Container>
      <TableBox>
        <H2>입학상담</H2>
        <Hr />
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
        </ButtonBox>
        <Pagination limit={limit} page={page} totalPosts={items.length} setPage={setPage} />
      </TableBox>
    </Container>
  </>
}