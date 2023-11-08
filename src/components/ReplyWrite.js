import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components"
import { academics, course_answers, course_questions, subject_answers, subject_questions, userList } from "../assets/TempData";
import { useEffect } from "react";

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
  &.btn{
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

const DangerButton = styled.button`
  border: 0;
  border-radius: 5px;
  background-color: red;
  padding: 0.6rem 1.4rem;
  color: white;
`;

export function ReplyWrite({ id, user, type }) {
  const navigate = useNavigate();
  const [qna_reply, setQna_reply] = useState("");
  const [isReply, setIsReply] = useState(0);
  
  let question;
  let answer;
  
  useEffect(() => {
    if(type == "t/qna") {
      question = subject_questions.find(data => data.s_question_id == id);
      if(subject_answers.find(data => data.s_question_id == question.s_question_id)) {
        answer = subject_answers.find(data => data.s_question_id == question.s_question_id);
        setQna_reply(answer.s_answer_content);
        setIsReply(1);
      }
    }
    if(type == "m/qna") {
      question = course_questions.find(data => data.c_question_id == id);
      if(course_answers.find(data => data.c_question_id == question.c_question_id)) {
        answer = course_answers.find(data => data.c_question_id == question.c_question_id);
        setQna_reply(answer.c_answer_content);
        setIsReply(1);
      }
    }
  }, [answer]);
  
  return <>
    <form action="" method="POST" >
      <ContentInput type="text" name="qna_reply" id="qna_reply" value={qna_reply} onChange={(e)=>setQna_reply(e.target.value)} placeholder="답변 내용을 입력해주세요" />
      <Box className="btn">
        {
          isReply == 1 ? <>
            <PrimaryButton type="submit"><p>수정</p></PrimaryButton>
            <DangerButton><p>삭제</p></DangerButton>
          </> : <PrimaryButton type="submit"><p>등록</p></PrimaryButton>
        }
        <SecondaryButton onClick={()=>navigate(`/lms/${type}`)}><p>목록</p></SecondaryButton>
      </Box>
    </form>
  </>
}