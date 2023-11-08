import styled from "styled-components"
import { academics, admission_answers, admission_questions, course_answers, course_questions, subject_answers, subject_questions, userList } from "../assets/TempData";
import { useNavigate } from "react-router-dom";

const CommentBox = styled.div`
  margin-top: 2rem;
  border: 1px solid #ddd;
  border-radius: 7px;
`;

const CommentWriter = styled.div`
  border-bottom: 1px solid #ddd;
  padding: 10px;
`;

const Comment = styled.div`
  height: 100px;
  vertical-align: top;
  padding: 10px;
  overflow-y: scroll;
`;

const Text = styled.p`
  font-size: 1.1rem;
`;

export function ReplyPost({ id, type }) {
  const navigate = useNavigate();
  let question;
  let answer;
  let academic;

  if(type == "s") {
    question = subject_questions.find(data => data.s_question_id == id);
    answer = subject_answers.find(data => data.s_question_id == question.s_question_id);
    academic = userList.find(data => data.uid == (academics.find(d => d.academic_id == answer.academic_id)).uid);
  }

  if(type == "c") {
    question = course_questions.find(data => data.c_question_id == id);
    answer = course_answers.find(data => data.c_question_id == question.c_question_id);
    academic = userList.find(data => data.uid == (academics.find(d => d.academic_id == answer.academic_id)).uid);
  }

  if(type == "a") {
    question = admission_questions.find(data => data.a_question_id == id);
    answer = admission_answers.find(data => data.a_question_id == question.a_question_id);
    academic = userList.find(data => data.uid == (academics.find(d => d.academic_id == answer.academic_id)).uid);
  }

  return <>
    <CommentBox>
      <CommentWriter>
        <Text>{academic.user_name} | {type == "s" && answer.s_answer_reg_date}{type == "c" && answer.c_answer_reg_date}{type == "a" && answer.a_answer_reg_date}</Text>
      </CommentWriter>
      <Comment>
        <Text>{type == "s" && answer.s_answer_content}{type == "c" && answer.c_answer_content}{type == "a" && answer.a_answer_content}</Text>
      </Comment>
    </CommentBox>
  </>
}