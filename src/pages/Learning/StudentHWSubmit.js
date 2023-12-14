import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { homeworks, submits } from "../../assets/TempData";
import { getHomeworkByHomeworkId, getSubmitByStudentIdAndHomeworkId } from "../Api";
import axios from "axios";

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

const ErrorMsg = styled.p`
  font-size: 1rem;
  color: red;
  margin: 0;
  padding: 1rem 0 0 0;
  text-align: center;
`;

// submitId 존재시 기존 내용에서 덮어씌기 하면서 제출일 새로고침
export function StudentHWSubmit() {
  const { state } = useLocation();
  const id = sessionStorage.getItem("id"); // studentId
  const [homework, setHomework] = useState(null);
  const [submit, setSubmit] = useState(null);
  const [submitFile, setSubmitFile] = useState(null);
  const [submitId, setSubmitId] = useState();
  const [submitContent, setSubmitContent] = useState("");
  const [errorCheck, setErrorCheck] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    if(!homework) {
      const promise = getHomeworkByHomeworkId(state);
      const getData = () => {
        promise.then((data) => {
          setHomework(data);
        });
      };
      getData();
    }
    if(!submit) {
      const promise = getSubmitByStudentIdAndHomeworkId(id, state);
      const getData = () => {
        promise.then((data) => {
          setSubmit(data);
        });
      };
      getData();
    }
  })

  useEffect(() => {
    if(submit) {
      setSubmitContent(submit.submit.submitContent);
    }
  }, [submit]);
  
  // 첨부파일 등록하는 부분 필요
  function onSubmit() {
    const data = {
      homeworkId: state,
      studentId: sessionStorage.getItem("id"),
      submitContent: submitContent,
    };
    console.log(data);
    axios
    .post("/api/subject/submit", data)
    .then((res) => {
      setErrorCheck(0);
      setSubmitId(res.data.data.submitId);
    })
    .catch((err) => {
      console.log(`${err} : 과제 제출 실패`);
      setErrorCheck(1);
    });
  };

  useEffect(()=>{
    if(submitId && submitFile){
      const fd =new FormData();
      fd.append("file", submitFile);
      fetch(`/api/file/upload/submit/${submitId}`, {
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
          setErrorCheck(1);
      });
    }
  },[submitId]);

  return<>
    {
      homework &&
      <Container>
        <TableBox>
          <H2>{homework.title}</H2>
          <Hr />
          <form>
            <ContentInput type="text" name="content" id="content" value={submitContent} onChange={(e)=>setSubmitContent(e.target.value)} />
            <Input type="file" name="file" id="file" onChange={(e) => setSubmitFile(e.target.files[0])} />
          </form>
          {
            errorCheck == 0 && navigate(`/lms/s/${homework.subjectId}/homework`)
          }
          {
            errorCheck == 1 && <ErrorMsg>등록에 실패하였습니다.</ErrorMsg>
          }
          <Box>
            <PrimaryButton onClick={() => onSubmit()}><p>{ submit ? "다시 제출" : "제출"}</p></PrimaryButton>
            <SecondaryButton onClick={() => navigate(`/lms/s/${homework.subjectId}/homework`)}><p>목록</p></SecondaryButton>
          </Box>
        </TableBox>
      </Container>
    }
  </>
}