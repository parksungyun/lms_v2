import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Table } from "../../components/Table";
import '../../styles/trainer_hw_table.css';
import { Pagination } from "../../components/Pagination";
import { academics, feedbacks, homeworks, submits, userList } from "../../assets/TempData";

const SuccessButton = styled.button`
  background-color: green;
  padding: 2px 15px;
  color: white;
  font-weight: 500;
  font-size: 0.8rem;
  border-radius: 5px;
  border: 0;
`;

const SecondaryButton = styled.button`
  background-color: gray;
  padding: 2px 15px;
  color: white;
  font-weight: 500;
  font-size: 0.8rem;
  border-radius: 5px;
  border: 0;
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
    text: '시작일',
    value: 'startDate'
  },
  {
    text: '종료일',
    value: 'endDate'
  },
  {
    text: '제출현황',
    value: 'submitCount'
  },
  {
    text: '채점하기',
    value: 'submitScore'
  },
];

export function TrainerHW() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [searchOption, setSearchOption] = useState("all");
  const limit = 10;
  const offset = (page - 1) * limit;
  const navigate = useNavigate();

  const id = 1 // subjectid 임의로 받아옴
  const homework = homeworks.filter(h => h.subject_id == id);

  const items = homework.map((h,i) => (
    {
      no: i+1,
      title: titleLink(h.homework_id, h.hw_title),
      writer: userList.find(u => u.uid == academics.find(a => a.academic_id == h.academic_id).uid).user_name,
      startDate: h.hw_start_date,
      endDate: h.hw_end_date,
      submitCount: getSubmitCount(h.homework_id),
      submitScore: changeButton(h.homework_id)
    }
  ));

  function getSubmitCount(id) {
    const submit = submits.filter((s) => s.homework_id == id);
    return submit.length;
  }

  function titleLink(id, title) {
    return (<p onClick={() => navigate(`${id}`)}>{title}</p>);
  }

  const postsData = (posts) => {
    if(posts) {
      let result = posts.slice(offset, offset + limit);
      return result;
    }
  };

  function changeButton(id) {
    const submit = submits.filter((s) => s.homework_id == id);
    const feedback = feedbacks.filter((h) => submit.find((s) => s.submit_id == h.submit_id));

    if(submit.length == feedback.length) {
      return(<SuccessButton onClick={()=>navigate(`${id}/feedback`, { state : id })}><p>채점완료</p></SuccessButton>)
    }
    else {
      return(<SecondaryButton onClick={()=>navigate(`${id}/feedback`, { state : id })}><p>채점하기</p></SecondaryButton>)
    };
  };

  function onSearch(e) {
    e.preventDefault();
  };

  return<>
    <Container>
      <TableBox>
        <H2>과제</H2>
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
        <PrimaryButton onClick={() => navigate("write")}><p>작성</p></PrimaryButton>
      </ButtonBox>
      <Pagination limit={limit} page={page} totalPosts={items.length} setPage={setPage} />
    </Container>
  </>
}