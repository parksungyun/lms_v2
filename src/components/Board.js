import styled from "styled-components";
import { Pagination } from "./Pagination";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Table } from "./Table";

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
  margin: 10px 0;
  &.title{
    margin: 0;
  }
`;

const Hr = styled.hr`
  border: 0;
  margin: 0;
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

export function Board({board, item, write}) {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [searchOption, setSearchOption] = useState("all");
  const navigate = useNavigate();
  const limit = 10;
  const offset = (page - 1) * limit;

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
    <TableBox>
      <H2>공지 사항</H2>
      <Hr />
      <Table 
        headers={board}
        items={postsData(item)}
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
        <button onClick={onSearch}>검색</button>
      </SearchBox>
      {write == true ? <PrimaryButton onClick={() => navigate("/")}>작성</PrimaryButton> : null}
    </ButtonBox>
    <Pagination limit={limit} page={page} totalPosts={item.length} setPage={setPage} />
  </>  
}