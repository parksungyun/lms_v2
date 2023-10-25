import styled from "styled-components"
import WebWrapper from "../../components/WebWrapper"
import { useState } from "react";
import { useEffect } from "react";
import { Table } from "../../components/Table";
import '../../styles/table.css';
import { Pagination } from "../../components/Pagination";

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

const WriteButton = styled.button`
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

function changeReply(reply) {
  if(reply === 1) return(<BadgeSuccess>답변완료</BadgeSuccess>);
  else return(<BadgeSecondary>답변대기</BadgeSecondary>);
}

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

const items = [
  {
    no: 1,
    title: '교육상담아무말이나해봐아무말이나해봐아무말이나해봐아무말이나해봐아무말이나해봐아무말이나해봐',
    writer: '가나다',
    writeDate: '2023-10-25',
    reply: changeReply(1)
  },
  {
    no: 2,
    title: '교육상담아무말이나해봐아무말이나해봐아무말이나해봐아무말이나해봐아무말이나해봐아무말이나해봐',
    writer: '가나다',
    writeDate: '2023-10-25',
    reply: changeReply(1)
  },
  {
    no: 3,
    title: '교육상담아무말이나해봐아무말이나해봐아무말이나해봐',
    writer: '가나다',
    writeDate: '2023-10-25',
    reply: changeReply(1)
  },
  {
    no: 4,
    title: '교육상담아무말이나해봐아무말이나해봐아무말이나해봐아무말이나해봐아무말이나해봐아무말이나해봐아무말이나해봐',
    writer: '가나다',
    writeDate: '2023-10-25',
    reply: changeReply(1)
  },
  {
    no: 5,
    title: '교육상담아무말이나해봐아무말이나해봐아무말이나해봐아무말이나해봐아무말이나해봐',
    writer: '가나다',
    writeDate: '2023-10-25',
    reply: changeReply(1)
  },
  {
    no: 6,
    title: '교육상담아무말이나해봐아무말이나해봐아무말이나해봐아무말이나해봐',
    writer: '가나다',
    writeDate: '2023-10-25',
    reply: changeReply(1)
  },
  {
    no: 7,
    title: '교육상담아무말이나해봐아무말이나해봐',
    writer: '가나다',
    writeDate: '2023-10-25',
    reply: changeReply(1)
  },
  {
    no: 8,
    title: '교육상담아무말이나해봐아무말이나해봐아무말이나해봐아무말이나해봐',
    writer: '가나다',
    writeDate: '2023-10-25',
    reply: changeReply(1)
  },
  {
    no: 9,
    title: '교육상담아무말이나해봐',
    writer: '가나다',
    writeDate: '2023-10-25',
    reply: changeReply(0)
  },
  {
    no: 10,
    title: '교육상담',
    writer: '가나다',
    writeDate: '2023-10-25',
    reply: changeReply(0)
  },
  {
    no: 11,
    title: '교육상담',
    writer: '가나다',
    writeDate: '2023-10-25',
    reply: changeReply(0)
  },
  {
    no: 12,
    title: '교육상담',
    writer: '가나다',
    writeDate: '2023-10-25',
    reply: changeReply(0)
  },
  {
    no: 13,
    title: '교육상담',
    writer: '가나다',
    writeDate: '2023-10-25',
    reply: changeReply(0)
  },
  {
    no: 14,
    title: '교육상담',
    writer: '가나다',
    writeDate: '2023-10-25',
    reply: changeReply(0)
  },
  {
    no: 15,
    title: '교육상담',
    writer: '가나다',
    writeDate: '2023-10-25',
    reply: changeReply(0)
  },
  {
    no: 16,
    title: '교육상담',
    writer: '가나다',
    writeDate: '2023-10-25',
    reply: changeReply(0)
  },
  {
    no: 17,
    title: '교육상담',
    writer: '가나다',
    writeDate: '2023-10-25',
    reply: changeReply(0)
  },
  {
    no: 18,
    title: '교육상담',
    writer: '가나다',
    writeDate: '2023-10-25',
    reply: changeReply(0)
  },
  {
    no: 19,
    title: '교육상담',
    writer: '가나다',
    writeDate: '2023-10-25',
    reply: changeReply(0)
  },
  {
    no: 20,
    title: '교육상담',
    writer: '가나다',
    writeDate: '2023-10-25',
    reply: changeReply(0)
  },
  {
    no: 21,
    title: '교육상담',
    writer: '가나다',
    writeDate: '2023-10-25',
    reply: changeReply(0)
  },
  {
    no: 22,
    title: '교육상담',
    writer: '가나다',
    writeDate: '2023-10-25',
    reply: changeReply(0)
  },
  {
    no: 23,
    title: '교육상담',
    writer: '가나다',
    writeDate: '2023-10-25',
    reply: changeReply(0)
  },
  {
    no: 24,
    title: '교육상담',
    writer: '가나다',
    writeDate: '2023-10-25',
    reply: changeReply(0)
  },
  {
    no: 25,
    title: '교육상담',
    writer: '가나다',
    writeDate: '2023-10-25',
    reply: changeReply(0)
  },
];

export function AdmissionBoard() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [searchOption, setSearchOption] = useState("all");
  const limit = 10;
  const offset = (page - 1) * limit;

  const postsData = (posts) => {
    if(posts) {
      let result = posts.slice(offset, offset + limit);
      return result;
    }
  }

  function onSearch(e) {
    e.preventDefault();
  }

  function changeSelect() {

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
          <select className="searchSelect" onChange={changeSelect}>
            <option key="all" value="all">전체</option>
            <option key="title" value="title">제목</option>
            <option key="writer" value="writer">작성자</option>
          </select>
          <input id="search" value={search} onChange={(e) => setSearch(e.target.value)} />
          <button onClick={onSearch}>검색</button>
        </SearchBox>
        <WriteButton>작성</WriteButton>
      </ButtonBox>
      <Pagination limit={limit} page={page} totalPosts={items.length} setPage={setPage} />
    </Container>
  </>
}