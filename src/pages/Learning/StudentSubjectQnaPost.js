import styled from "styled-components";
import { BsDownload } from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";
import { BsFillEyeFill } from "react-icons/bs";
import { students, subject_answers, subject_questions, userList } from "../../assets/TempData";
import { ReplyPost } from "../../components/ReplyPost";

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

const P = styled.p`
  margin: 0;
`;

const IconBox = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;


export function StudentSubjectQnaPost() {
  const { id } = useParams();
  const question = subject_questions.find(s => s.s_question_id == id);
  const answer = subject_answers.find(s => s.s_question_id == question.s_question_id);
  const navigate = useNavigate();

  return<>
    <Container>
      <TableBox>
        <H2>{question.s_question_title}</H2>
        <Box>
          <P>{userList.find(u => u.uid == students.find(s => s.student_id == question.student_id).uid).user_name}</P>
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
          answer && <ReplyPost id={answer.s_question_id} type={"s"} />
        }
        <Box className="button">
          <PrimaryButton onClick={()=>navigate("mod", { state: question.s_question_id })}><p>수정</p></PrimaryButton>
          <SecondaryButton onClick={()=>navigate("/lms/s/sqna")}><p>목록</p></SecondaryButton>
        </Box>
      </TableBox>
    </Container>
  </>
}