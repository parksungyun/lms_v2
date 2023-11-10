import styled from "styled-components";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

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
  &.button{
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

export function TrainerHWPostWrite() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [hwTitle, setHwTitle] = useState("");
  const [hwContent, setHwContent] = useState("");
  const [hwStartDate, setHwStartDate] = useState("");
  const [hwEndDate, setHwEndDate] = useState("");
  return<>
    <TableBox>
      <H2>과제 등록</H2>
      <form action="" method="POST">
        <Input type="text" name="hw_title" id="hw_title" value={hwTitle} onChange={(e)=>setHwTitle(e.target.value)} placeholder="제목을 입력해주세요"/>
        <Hr />
        <Content>
          <Box className="text">
            <P className="col-6">시작일</P>
            <P className="col-6">종료일</P>
          </Box>
          <Box className="date">
            <Input className="date" type="date" name="hw_start_date" id="hw_start_date" value={hwStartDate} onChange={(e)=>setHwStartDate(e.target.value)}/>
            <Input className="date" type="date" name="hw_end_date" id="hw_end_date" value={hwEndDate}  onChange={(e)=>setHwEndDate(e.target.value)}/>
          </Box>
          <ContentInput type="text" name="hw_content" id="hw_content" value={hwContent}  onChange={(e)=>setHwContent(e.target.value)} placeholder="내용을 입력해주세요"/>
        </Content>
        <Input type="file" name="hw_file" id="hw_file" accept="" />
        <Box className="button">
          <PrimaryButton type="submit"><p>등록</p></PrimaryButton>
          <SecondaryButton onClick={()=>navigate(`/lms/t/${state}/homework`)}><p>목록</p></SecondaryButton>
        </Box>
      </form>
    </TableBox>
  </>
}