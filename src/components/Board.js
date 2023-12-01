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

export function Board({board, item}) {
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const limit = 10;
  const offset = (page - 1) * limit;
  const userType = sessionStorage.getItem("userType");

  const postsData = (posts) => {
    if(posts) {
      let result = posts.slice(offset, offset + limit);
      return result;
    }
  };

  return<>
    <TableBox>
      <H2>공지 사항</H2>
      <Table 
        headers={board}
        items={postsData(item)}
        selectable={false}
      />
    </TableBox>    
    <ButtonBox>
      {userType === "s" ? null : <PrimaryButton onClick={() => navigate("write")}><p>작성</p></PrimaryButton>}
    </ButtonBox>
    <Pagination limit={limit} page={page} totalPosts={item.length} setPage={setPage} />
  </>  
}