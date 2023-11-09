import styled from "styled-components";
import { BsDownload } from "react-icons/bs";
import { useLocation, useNavigate } from "react-router-dom";
import { academics, feedbacks, homeworks, submits, userList } from "../../assets/TempData";

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
  margin: 0;
  justify-content: center;
  margin-top: 1rem;
  margin-bottom: 0;
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

export function StudentHWReview() {
  const studentid = 1; // 임의 student_id
  const { state } = useLocation();
  const navigate = useNavigate();
  const homework = homeworks.find(h => h.homework_id == state);
  const submit = submits.filter(s => s.homework_id == homework.homework_id);
  const student = submit.find(s => s.student_id == studentid);
  const feedback = feedbacks.find(f => f.submit_id == student.submit_id);

  return<>
    <Container>
      <TableBox>
        <H2>{homework.hw_title}</H2>
        <Hr />
        <Content>{student.submit_content}</Content>
        <AttachedBox>
          <Attached><p className="fw-bold">첨부파일</p></Attached>
          <div><A href={student.submit_fileURL}>파일.pdf<Icon><BsDownload /></Icon></A></div>
        </AttachedBox>
        <Hr />
        <CommentBox>
        <CommentWriter>
          <Text>{userList.find(u => u.uid == academics.find(a => a.academic_id == feedback.academic_id).uid).user_name} | {feedback.feedback_reg_date}</Text>
        </CommentWriter>
        <Comment>
          <Text>{feedback.hw_comment}</Text>
        </Comment>
      </CommentBox>
      <Box>
        <SecondaryButton onClick={()=>navigate("/lms/s/homework")}><p>목록</p></SecondaryButton>
      </Box>
      </TableBox>
    </Container>
  </>
}