import styled from "styled-components";
import WebWrapper from "../../components/WebWrapper"
import { useNavigate, useParams } from "react-router-dom";
import { academics, admission_answers, admission_questions, courses, userList } from "../../assets/TempData";

const Container = styled.div`
  margin: 2rem 15rem;
  padding-bottom: 3rem;
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
    width: 15%;
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
  height: 10rem;
  overflow-y: scroll;
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
  padding: 2rem 0;
  display: flex;
  justify-content: center;
  gap: 0.5rem;
`;

export function AdmissionPost(){
  const navigate = useNavigate();
  const { id } = useParams();
  const post = admission_questions.find((a) => a.a_question_id == id);
  const course = courses.find((c) => post.desired_course == c.course_id);
  let reply;
  let manager;
  
  if(admission_answers.find((a) => a.a_question_id == post.a_question_id)) {
    reply = admission_answers.find((a) => a.a_question_id == post.a_question_id);
    manager = userList.find((u) => u.uid == academics.find((a) => a.academic_id == reply.academic_id).uid);
  }

  return<>
  <WebWrapper pageName={"입학 상담"} />
    <Container>
      <Table>
        <tr>
          <th>작성일</th>
          <td>{post.a_question_reg_date}</td>
        </tr>
        <tr>
          <th>이름</th>
          <td>{post.writer_name}</td>
        </tr>
        <tr>
          <th>나이</th>
          <td>{post.age}</td>
        </tr>
        <tr>
          <th>연락처</th>
          <td>{post.phone}</td>
        </tr>
        <tr>
          <th>최종학력</th>
          <td>{post.final_school}</td>
        </tr>
        <tr>
          <th>수강희망과목</th>
          <td>{course.course_name}</td>
        </tr>
        <tr>
          <th>제목</th>
          <td>{post.a_question_title}</td>
        </tr>
        <ContentRow>
          <th>내용</th>
          <td className="overflow-y-scroll">{post.a_question_content}</td>
        </ContentRow>
      </Table>
      {
        reply && <>
        <CommentBox>
          <CommentWriter>
            <Text>{manager.user_name} | {reply.a_answer_reg_date}</Text>
          </CommentWriter>
          <Comment>
            <Text>{reply.a_answer_content}</Text>
          </Comment>
        </CommentBox>
        </>
      }
      <ButtonBox>
        <PrimaryButton onClick={() => navigate("mod")}><p>수정</p></PrimaryButton>
        <SecondaryButton onClick={() => navigate("/admission")}><p>목록</p></SecondaryButton>
      </ButtonBox>
    </Container>
  </>
}