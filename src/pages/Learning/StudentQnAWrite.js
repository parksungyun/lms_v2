import { useState } from "react";
import { useNavigate } from "react-router-dom"
import styled from "styled-components";

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
  width: 90%;
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

export function StudentQnAWrite() {
  const navigate = useNavigate();
  const [qna_title, setQna_title] =useState();
  const [qna_content, setQna_content] =useState();
  return<>
    <Container>
      <TableBox>
        <H2>QnA 등록</H2>
        <form action="" method="POST">
        <Input type="text" name="qna_title" id="qna_title" value={qna_title} onChange={(e)=>setQna_title(e.target.value)} placeholder="제목 입력해주세요"/>
        <Hr />
        <ContentInput type="text" name="qna_content" id="qna_content" value={qna_content}  onChange={(e)=>setQna_content(e.target.value)} placeholder="내용 입력해주세요"/>
        <Input type="file" name="qna_file" id="qna_file" accept="" />
        <Box>
          <PrimaryButton>등록</PrimaryButton>
          <SecondaryButton onClick={() => navigate(-1)}>목록</SecondaryButton>
        </Box>
      </form>
      </TableBox>
    </Container>
  </>
}