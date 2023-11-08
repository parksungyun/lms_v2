import styled from "styled-components";
import { BsDownload } from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";
import { BsFillEyeFill } from "react-icons/bs";
import { useState } from "react";
import { course_answers, course_questions, students, userList } from "../../assets/TempData";
import { ReplyPost } from "../../components/ReplyPost";
import { ReplyWrite } from "../../components/ReplyWrite";
import { useEffect } from "react";

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

const AttachedBox = styled.div`
  border: 1px solid #ddd;
  display: flex;
  margin-top: 2rem;
  padding: 1rem;
  border-radius: 0.5rem;
`;

const Attached = styled.div`
  margin-right: 1rem;
  border-right: 1px solid #ddd;
  padding-right: 1rem;
`;

const A = styled.a`
  color: black;
`;

const Icon = styled.i`
  font-weight: bold;
  padding-left: 0.5rem;
`;

const Content = styled.p`
  height: 300px;
  overflow-y: scroll;
`;

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

const P = styled.p`
  margin: 0;
`;

const IconBox = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ContentInput = styled.textarea`
  margin-top: 2rem;
  width: 100%;
  height: 150px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid lightgray;
  resize: none;
`;

export function ManagerCourseQnaPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isReply, setIsReply] = useState();
  const question = course_questions.find((q) => q.c_question_id == id);
  const student = userList.find(data => data.uid == (students.find(d => d.student_id == question.student_id)).uid);
  let answer;

  if(course_answers.find(data => data.c_question_id == question.c_question_id)){
    answer = course_answers.find(data => data.c_question_id == question.c_question_id);
  }

  useEffect(() => {
    if(answer) setIsReply(1);
  }, [answer])

  return<>
    <Container>
      <TableBox>
        <H2>{question.c_question_title}</H2>
        <Box>
          <P>{student.user_name}</P>
          <P>|</P>
          <P>{question.c_question_reg_date}</P>
        </Box>
        <Hr />
        <Content>{question.c_question_content}</Content>
        <AttachedBox>
          <Attached><p className="fw-bold">첨부파일</p></Attached>
          <div><A href={question.c_question_fileURL}>파일.pdf<Icon><BsDownload /></Icon></A></div>
        </AttachedBox>
        <Hr />
        {
          isReply == 1 ? <>
            <ReplyPost id={question.c_question_id} type={"c"} />
            <Box className="btn">
              <PrimaryButton onClick={()=>setIsReply(0)}><p>수정</p></PrimaryButton>
              <SecondaryButton onClick={()=>navigate("/lms/m/qna")}><p>목록</p></SecondaryButton>
            </Box>
          </> : <ReplyWrite id={question.c_question_id} type={"m/qna"} />
        }
      </TableBox>
    </Container>
  </>
}