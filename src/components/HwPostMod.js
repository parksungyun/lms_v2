import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
  margin: 10px 0;
  &.btn{
    justify-content: center;
    margin-top: 1rem;
    margin-bottom: 0;
  }
  &.text{
    margin: 0;
  }
  &.date{
    margin-bottom: 1rem;
  }
`;

const P = styled.p`
  margin: 0;
`;

const Hr = styled.hr`
  border: 0 solid #ddd;
`;

const Content = styled.div`
`;

const PrimaryButton = styled.button`
  border: 0;
  border-radius: 5px;
  background-color: #5f7dcf;
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
  &.date{
    margin-top: 0;
  }
`;

const ContentInput = styled.textarea`
  width: 100%;
  height: 400px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid lightgray;
  resize: none;
`;

export function HWPostMod() {
  const [hw_content, setHw_content] = useState("반복문을 이용하여 과제를 해결하세요. 아래 첨부파일을 확인하고 과제해결 후 제출하세요!");
  const [hw_title, setHw_title] = useState("피라미드 만들기");
  const [hw_start_date, setHw_start_date] = useState("2023-09-05");
  const [hw_end_date, setHw_end_date] = useState("2023-09-10");
  const navigate = useNavigate();
  return<>
    <TableBox>
      <H2>과제 수정</H2>
      <form action="" method="POST">
        <Input type="text" name="hw_title" id="hw_title" value={hw_title} onChange={(e)=>setHw_title(e.target.value)} />
        <Hr />
        <Content>
          <Box className="text">
            <P className="col-6">시작일</P>
            <P className="col-6">종료일</P>
          </Box>
          <Box className="date">
            <Input className="date" type="date" name="hw_start_date" id="hw_start_date" value={hw_start_date} onChange={(e)=>setHw_start_date(e.target.value)}/>
            <Input className="date" type="date" name="hw_end_date" id="hw_end_date" value={hw_end_date}  onChange={(e)=>setHw_end_date(e.target.value)}/>
          </Box>
          <ContentInput type="text" name="hw_content" id="hw_content" value={hw_content}  onChange={(e)=>setHw_content(e.target.value)}/>
        </Content>
        <Input type="file" name="hw_file" id="hw_file" accept="" />
        <Box className="btn">
          <PrimaryButton type="submit">수정</PrimaryButton>
          <DangerButton>삭제</DangerButton>
          <SecondaryButton onClick={()=>navigate(-1)}>목록</SecondaryButton>
        </Box>
      </form>
    </TableBox>
  </>
}