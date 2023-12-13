import styled from "styled-components";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

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

const ErrorMsg = styled.p`
  font-size: 1rem;
  color: red;
  margin: 0;
  padding: 1rem 0 0 0;
  text-align: center;
`;

export function TrainerHWPostWrite() {
  const navigate = useNavigate();
  const pathName = useLocation().pathname;
  const link = pathName.substring(0, pathName.lastIndexOf("/"));
  const subjectId = pathName.split("/")[3];
  const [hwTitle, setHwTitle] = useState("");
  const [hwContent, setHwContent] = useState("");
  const [hwStartDate, setHwStartDate] = useState("");
  const [hwEndDate, setHwEndDate] = useState("");
  const [hwFile, setHwFile] = useState("");
  const [hwId, setHwId] = useState("");
  const [errorCheck, setErrorCheck] = useState();

  function onSubmit() {
    if(!hwTitle) {
      setErrorCheck(1);
    }
    else if(!hwStartDate) {
      setErrorCheck(2);
    }
    else if(!hwEndDate) {
      setErrorCheck(3);
    }
    else {
      const data = {
        academicId: sessionStorage.getItem("id"),
        subjectId: subjectId,
        title: hwTitle,
        content: hwContent,
        startDate: hwStartDate,
        endDate: hwEndDate,
      };
      console.log(data);
      axios
      .post(`/api/subject/homework/write`, data)
      .then((res) => {
        setHwId(res.data.data.homeworkId);
      })
      .catch((err) => {
        console.log(`${err} : 과목 과제 게시글 작성 실패`);
        setErrorCheck(4);
      });
    }
  }

  useEffect(()=>{
    const fd = new FormData();
    if (hwFile) {
      fd.append("file", hwFile);
      console.log(fd);
        fetch(`/api/file/upload/homework/${hwId}`, {
          method: 'POST',
          body: fd
        })
        .then(response => response.json())
        .then(data => {
            console.log('File upload success:', data);
            setErrorCheck(0);
        })
        .catch(error => {
            console.error('File upload failed:', error);
            setErrorCheck(4);
        });
      }
  },[hwId])

  return<>
    <TableBox>
      <H2>과제 등록</H2>
      <form>
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
        <Input type="file" name="hw_file" id="hw_file" onChange={((e) => setHwFile(e.target.files[0]))} />
      </form>
      {
        errorCheck === 1 && <ErrorMsg>제목을 입력해주세요</ErrorMsg>
      }
      {
        errorCheck === 2 && <ErrorMsg>시작일을 입력해주세요</ErrorMsg>
      }
      {
        errorCheck === 3 && <ErrorMsg>종료일을 입력해주세요</ErrorMsg>
      }
      {
        errorCheck === 4 && <ErrorMsg>등록에 실패하였습니다</ErrorMsg>
      }
      {
        errorCheck === 0 && navigate(link)
      }
      <Box className="button">
        <PrimaryButton onClick={() => onSubmit()}><p>등록</p></PrimaryButton>
        <SecondaryButton onClick={()=>navigate(link)}><p>목록</p></SecondaryButton>
      </Box>
    </TableBox>
  </>
}