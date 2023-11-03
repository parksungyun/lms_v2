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

const Hr = styled.hr`
  border: 0 solid #ddd;
`;

const ContentInput = styled.textarea`
  width: 100%;
  height: 400px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid lightgray;
  resize: none;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.7rem;
  border: 1px solid lightgray;
  border-radius: 0.5rem;
  margin-top: 1rem;
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

const Box = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  text-align: center;
  margin: 0;
  justify-content: center;
  margin-top: 1.5rem;
  margin-bottom: 0;
`;

// sub_id 존재시 기존 내용에서 덮어씌기 하면서 제출일 새로고침
export function StudentHWSubmit() {
  const [hw_submit_content, setHw_submit_content] = useState();
  const navigate = useNavigate();
  return<>
    <Container>
      <TableBox>
        <H2>피라미드 만들기</H2>
        <Hr />
        <form action="" method="POST">
          <ContentInput type="text" name="hw_submit_content" id="hw_submit_content" value={hw_submit_content}  onChange={(e)=>setHw_submit_content(e.target.value)}/>
          <Input type="file" name="board_file" id="board_file" accept="" />
          <Box>
            <PrimaryButton type="submit">제출</PrimaryButton>
            <SecondaryButton onClick={() => navigate(-1)}>목록</SecondaryButton>
          </Box>
        </form>
      </TableBox>
    </Container>
  </>
}