import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

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

const Box = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  text-align: center;
  margin: 0;
  justify-content: center;
  margin-top: 1rem;
  margin-bottom: 0;
`;

const Hr = styled.hr`
  border: 0 solid #ddd;
`;

const PrimaryButton = styled.button`
  border: 0;
  border-radius: 5px;
  background-color: #5f7dcf;
  padding: 0.6rem 1.4rem;
  color: white;
`;

const SecondaryButton = styled.button`
  border: 0;
  border-radius: 5px;
  background-color: gray;
  padding: 0.6rem 1.4rem;
  color: white;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.7rem;
  border: 1px solid lightgray;
  border-radius: 0.5rem;
  margin-top: 1rem;
`;

const ContentInput = styled.textarea`
  width: 100%;
  height: 400px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid lightgray;
`;

export function BoardPostWrite() {
  const [boardTitle, setBoardTitle] = useState("");
  const [boardContent, setBoardContent] = useState("");
  const navigate = useNavigate();
  const { state } = useLocation();
  return<>
    <TableBox>
      <H2>공지 등록</H2>
      <form action="" method="POST">
        <Input type="text" name="board_title" id="board_title" value={boardTitle} onChange={(e)=>setBoardTitle(e.target.value)} placeholder="제목을 입력해주세요"/>
        <Hr />
        <ContentInput type="text" name="board_content" id="board_content" value={boardContent}  onChange={(e)=>setBoardContent(e.target.value)} placeholder="내용을 입력해주세요"/>
        <Input type="file" name="board_file" id="board_file" accept="" />
        <Box>
          <PrimaryButton type="submit"><p>등록</p></PrimaryButton>
          <SecondaryButton onClick={() => navigate(`/lms/${state[0]}/${state[1]}/board`)}><p>목록</p></SecondaryButton>
        </Box>
      </form>
    </TableBox>
  </>
}