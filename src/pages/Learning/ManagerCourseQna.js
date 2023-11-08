import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Table } from "../../components/Table";
import '../../styles/trainer_hw_table.css';
import { Pagination } from "../../components/Pagination";
import { course_answers, course_questions, students, userList } from "../../assets/TempData";

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
    text: '답변일',
    value: 'replyDate'
  },
  {
    text: '답변상태',
    value: 'replyState'
  },
];

export function ManagerCourseQna() {
  const id = 1; // 임시 course_id
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [searchOption, setSearchOption] = useState("all");
  const limit = 10;
  const offset = (page - 1) * limit;
  const navigate = useNavigate();
  const questions = course_questions.filter((q) => q.course_id == id)
  const answer = course_answers.filter((a) => questions.map((q) => q.c_question_id == a.c_question_id));
  
  const items = questions.map((c, i) => (
    {
      no: i + 1,
      title: titleLink(c.c_question_id, c.c_question_title),
      writer: userList.find((u) => u.uid == (students.find((s) => s.student_id == c.student_id).uid)).user_name,
      regDate: c.c_question_reg_date,
      replyDate: findReplyDate(c.c_question_id),
      replyState: changeReply(c.c_question_id)
    }
  ));

  function findReplyDate(id) {
    let temp;
    if(answer.find((a) => a.c_question_id == id)){
      temp = answer.find((a) => a.c_question_id == id);
      return temp.c_answer_mod_date;
    }
    else return "";
  }
    
  function changeReply(id) {
    if(answer.find((a) => a.c_question_id == id)){
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
        <H2>1:1 문의</H2>
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
            <option key="writer" value="writer">작성자</option>
          </select>
          <input id="search" value={search} onChange={(e) => setSearch(e.target.value)} />
          <button onClick={onSearch}><p>검색</p></button>
        </SearchBox>
      </ButtonBox>
      <Pagination limit={limit} page={page} totalPosts={items.length} setPage={setPage} />
    </Container>
  </>
}