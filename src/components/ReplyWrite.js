import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components"
import { admission_answers, admission_questions, course_answers, course_questions, subject_answers, subject_questions } from "../assets/TempData";
import { useEffect } from "react";
import { DeleteModal } from "./DeleteModal";
import axios from "axios";

const ContentInput = styled.textarea`
  margin-top: 2rem;
  width: 100%;
  height: 150px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid lightgray;
  resize: none;
`;

const Box = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  text-align: center;
  margin: 10px 0;
  &.button{
    justify-content: center;
    margin-top: 1rem;
    margin-bottom: 0;
  }
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


export function ReplyWrite({ question }) {
  const navigate = useNavigate();
  const userType = sessionStorage.getItem("userType");
  const [reply, setReply] = useState("");
  const [isReply, setIsReply] = useState(0);
  const pathName = useLocation().pathname;
  const link = pathName.substring(0, pathName.lastIndexOf("/"));
  
  useEffect(() => {
    if(question.answer) {
      setReply(question.answer.answerContent);
      setIsReply(1);
    }
    else {
      setIsReply(0);
    }
  }, []);

  function onSubmit() {
    if(userType === "t") {
      const data = {
        academicId: sessionStorage.getItem("id"),
        content: reply
      };
      axios
      .post(`/api/subject/qna/${question.question.subjectQuestionId}/reply`, data)
      .then((res) => {
        navigate(link);
      })
      .catch((err) => {
        console.log(`${err} : 과목 QnA 답변 작성/수정 실패`);
      });
    }
    else {
      if(link.substring(link.lastIndexOf("/") + 1, link.length) === "qna") {
        const data = {
          academicId: sessionStorage.getItem("id"),
          content: reply
        };
        axios
        .post(`/api/course/qna/${question.question.courseQuestionId}/reply`, data)
        .then((res) => {
          navigate(link);
        })
        .catch((err) => {
          console.log(`${err} : 과정 QnA 답변 작성/수정 실패`);
        });
      }
      else {
        const data = {
          academicId: sessionStorage.getItem("id"),
          content: reply
        };
        axios
        .post(`/api/admission/${question.question.admissionQuestionId}/reply`, data)
        .then((res) => {
          navigate(link);
        })
        .catch((err) => {
          console.log(`${err} : 입학상담 답변 작성/수정 실패`);
        });
      }
    }
  }
  
  return <>
    <form>
      <ContentInput type="text" name="qnaReply" id="qnaReply" value={reply} onChange={(e)=>setReply(e.target.value)} placeholder="답변 내용을 입력해주세요" />
    </form>
    <Box className="button">
      {
        isReply === 1 ? <>
          <PrimaryButton onClick={() => onSubmit()}><p>수정</p></PrimaryButton>
          <DeleteModal name={"삭제"}></DeleteModal>
        </> : <PrimaryButton onClick={() => onSubmit()}><p>등록</p></PrimaryButton>
      }
      <SecondaryButton onClick={()=>navigate(link)}><p>목록</p></SecondaryButton>
    </Box>
  </>
}