import { useState } from "react";
import { useNavigate } from "react-router-dom";
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

const DangerButton = styled.button`
  border: 0;
  border-radius: 5px;
  background-color: red;
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
  resize: none;
`;

export function StudentSubjectQnaMod() {
  const [qna_content, setQna_content] = useState("반복문 완전히 모르겠다.반복문 완전히 모르겠다.반복문 완전히 모르겠다.반복문 완전히 모르겠다");
  const [qna_title, setQna_title] = useState("반복문 완전히 모르겠다");
  const navigate = useNavigate();
  return<>
    <Container>
      <TableBox>
        <H2>QnA 수정</H2>
        <form action="" method="POST">
          <Input type="text" name="qna_title" id="qna_title" value={qna_title} onChange={(e)=>setQna_title(e.target.value)}/>
          <Hr />
          <ContentInput type="text" name="qna_content" id="qna_content" value={qna_content}  onChange={(e)=>setQna_content(e.target.value)}/>
          <Input type="file" name="qna_file" id="qna_file" accept="" />
          <Box>
            <PrimaryButton type="submit">수정</PrimaryButton>
            <DangerButton>삭제</DangerButton>
            <SecondaryButton onClick={() => navigate(-1)}>목록</SecondaryButton>
          </Box>
        </form>
      </TableBox>
    </Container>
  </>
}