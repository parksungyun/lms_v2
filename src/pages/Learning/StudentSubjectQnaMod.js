import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { subject_questions } from "../../assets/TempData";
import { DeleteModal } from "../../components/DeleteModal";
import { useEffect } from "react";
import { getSubjectQnaBySubjectQuestionId } from "../Api";
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

const ErrorMsg = styled.p`
  font-size: 1rem;
  color: red;
  margin: 0;
  padding: 1rem 0 0 0;
  text-align: center;
`;

export function StudentSubjectQnaMod() {
  const { state } = useLocation();
  const [question, setQuestion] = useState(null);
  const [qnaTitle, setQnaTitle] = useState();
  const [qnaContent, setQnaContent] = useState();
  const [qnaFile, setQnaFile] = useState();
  const [errorCheck, setErrorCheck] = useState();
  const navigate = useNavigate();
  const pathName = useLocation().pathname;
  const link = pathName.substring(0, pathName.lastIndexOf('/'));

  useEffect(() => {
    if(!question) {
      const promise = getSubjectQnaBySubjectQuestionId(state);
        const getData = () => {
          promise.then((data) => {
            setQuestion(data);
          });
        };
        getData();
    }
  });

  useEffect(() => {
    if(question) {
      setQnaTitle(question.question.title);
      setQnaContent(question.question.content);
    }
  },[question]);

  function onSubmit() {
    if(!qnaTitle) {
      setErrorCheck(1);
    }
    else if(!qnaContent) {
      setErrorCheck(2);
    }
    else {
      const data = {
        subjectId: question.question.subjectId,
        studentId: question.question.studentId,
        title: qnaTitle,
        content: qnaContent
      };
      console.log(data);
      axios
      .post(`/api/subject/qna/${state}/mod`, data)
      .then((res) => {
        setErrorCheck(0);
      })
      .catch((err) => {
        console.log(`${err} : 과목 QnA 게시글 수정 실패`);
        setErrorCheck(3);
      });

      const fd = new FormData();
      if (qnaFile) {
        fd.append("file", qnaFile);
        console.log(fd);
          fetch(`/api/file/upload/subject/question/${state}`, {
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
              setErrorCheck(3);
          });
        }
    }
  }

  return<>
    {
      question &&
      <Container>
        <TableBox>
          <H2>QnA 수정</H2>
          <form>
            <Input type="text" name="qnaTitle" id="qnaTitle" value={qnaTitle} onChange={(e)=>setQnaTitle(e.target.value)} />
            <Hr />
            <ContentInput type="text" name="qnaContent" id="qnaContent" value={qnaContent}  onChange={(e)=>setQnaContent(e.target.value)} />
            <Input type="file" name="qnaFile" id="qnaFile" onChange={(e) => setQnaFile(e.target.files[0])} />
          </form>
          {
            errorCheck === 1 && <ErrorMsg>제목을 입력해주세요</ErrorMsg>
          }
          {
            errorCheck === 2 && <ErrorMsg>내용을 입력해주세요</ErrorMsg>
          }
          {
            errorCheck === 3 && <ErrorMsg>수정에 실패하였습니다</ErrorMsg>
          }
          {
            errorCheck === 0 && navigate(link)
          }
          <Box>
            <PrimaryButton onClick={() => onSubmit()}><p>수정</p></PrimaryButton>
            <DeleteModal name={"삭제"}></DeleteModal>
            <SecondaryButton onClick={() => navigate(link)}><p>취소</p></SecondaryButton>
          </Box>
        </TableBox>
      </Container>
    }
  </>
}