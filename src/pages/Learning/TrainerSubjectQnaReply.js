import styled from "styled-components";
import { BsDownload } from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";
import { BsFillEyeFill } from "react-icons/bs";
import { useState } from "react";
import { academics, students, subject_answers, subject_questions, userList } from "../../assets/TempData";

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

export function TrainerSubjectQnaReply() {
  const { id } = useParams();
  const question = subject_questions.find(data => data.s_question_id == id);
  const student = userList.find(data => data.uid == (students.find(d => d.student_id == question.student_id)).uid);
  let answer;
  let trainer;
  if(subject_answers.find(data => data.s_question_id == question.s_question_id)){
    answer = subject_answers.find(data => data.s_question_id == question.s_question_id);
    trainer = userList.find(data => data.uid == (academics.find(d => d.academic_id == answer.academic_id)).uid);
  }
  
  const navigate = useNavigate();
  const [qna_reply, setQna_reply] = useState();
  return<>
    <Container>
      <TableBox>
        <H2>{question.s_question_title}</H2>
        <Box>
          <P>{student.user_name}</P>
          <P>|</P>
          <P>{question.s_question_reg_date}</P>
          <P>|</P>
          <IconBox>
            <BsFillEyeFill />
            <P>{question.s_question_hits}</P>
          </IconBox>
        </Box>
        <Hr />
        <Content>{question.s_question_content}</Content>
        <AttachedBox>
          <Attached><p className="fw-bold">첨부파일</p></Attached>
          <div><A href={question.s_question_fileURL}>파일.pdf<Icon><BsDownload /></Icon></A></div>
        </AttachedBox>
        <Hr />
      {
        answer ? 
          <>
            <CommentBox>
            <CommentWriter>
              <Text>{trainer.user_name} | {answer.s_answer_reg_date}</Text>
            </CommentWriter>
            <Comment>
              <Text>{answer.s_answer_content}</Text>
            </Comment>
            </CommentBox>
            <Box className="btn">
              <PrimaryButton onClick={()=>navigate(`${id}/mod`)}><p>답변 수정</p></PrimaryButton>
              <SecondaryButton onClick={()=>navigate(-1)}><p>목록</p></SecondaryButton>
            </Box>
          </>:<>
            <form action="" method="POST" >
              <ContentInput type="text" name="qna_reply" id="qna_reply" value={qna_reply}  onChange={(e)=>setQna_reply(e.target.value)} placeholder="내용을 입력해주세요"/>
              <Box className="btn">
                <PrimaryButton type="submit"><p>답변 등록</p></PrimaryButton>
                <SecondaryButton onClick={()=>navigate(-1)}><p>목록</p></SecondaryButton>
              </Box>
            </form>
          </>
      }
      </TableBox>
    </Container>
  </>
}