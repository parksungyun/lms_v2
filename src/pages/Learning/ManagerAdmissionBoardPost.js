import styled from "styled-components";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { admission_answers, admission_questions, courses } from "../../assets/TempData";
import { useEffect } from "react";
import { ReplyWrite } from "../../components/ReplyWrite";
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

const Table = styled.table`
  border-bottom: 1px solid #ddd;
  text-align: start;
  tr{
    border-bottom: 1px solid #ddd;
  }
  td{
    border-bottom: 1px solid #ddd;
    padding: 10px 0;
    font-size: 1.1rem;
  }
  th{
    width: 11%;
    padding: 10px 0;
    font-size: 1.3rem;
  }
`;

const ContentRow = styled.tr`
  height: 400px;
  vertical-align: top;
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
  height: 150px;
  vertical-align: top;
  padding: 10px;
`;

const Text = styled.p`
  font-size: 1.1rem;
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

const ButtonBox = styled.div`
  padding-top: 2rem;
  display: flex;
  justify-content: center;
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
  margin: 10px 0;
`;

const P = styled.p`
  margin: 0;
`;

const Hr = styled.hr`
  border: 0 solid #ddd;
`;

export function ManagerAdmissionBoardPost(){
  const { id } = useParams();
  const [isReply, setIsReply] = useState();
  const navigate = useNavigate();
  const question = admission_questions.find((q) => q.a_question_id == id);
  let answer;
  if(admission_answers.find(data => data.a_question_id == question.a_question_id)){
    answer = admission_answers.find(data => data.a_question_id == question.a_question_id);
  }

  useEffect(() => {
    if(answer) setIsReply(1);
  }, [answer])

  return<>
    <Container>
      <TableBox>
        <H2>{question.a_question_title}</H2>
        <Box>
          <P>{question.writer_name}</P>
          <P>|</P>
          <P>{question.a_question_reg_date}</P>
        </Box>
        <Hr />
        <Table>
          <tr>
            <th>이름</th>
            <td>{question.writer_name}</td>
          </tr>
          <tr>
            <th>나이</th>
            <td>{question.age}</td>
          </tr>
          <tr>
            <th>연락처</th>
            <td>{question.phone}</td>
          </tr>
          <tr>
            <th>최종학력</th>
            <td>{question.final_school}</td>
          </tr>
          <tr>
            <th>수강희망과목</th>
            <td>{courses.find((c) => c.course_id == question.desired_course).course_name}</td>
          </tr>
          <ContentRow>
            <th>내용</th>
            <td className="overflow-y-scroll">{question.a_question_content}</td>
          </ContentRow>
        </Table>
        {
          isReply == 1 ? <>
            <ReplyPost id={question.a_question_id} type={"a"} />
            <ButtonBox>
              <PrimaryButton onClick={() => setIsReply(0)}><p>수정</p></PrimaryButton>
              <SecondaryButton onClick={() => navigate("/lms/m/admission")}><p>목록</p></SecondaryButton>
            </ButtonBox>
          </> : <ReplyWrite id={question.a_question_id} type={"m/admission"} />
        }
      </TableBox>
    </Container>
  </>
}