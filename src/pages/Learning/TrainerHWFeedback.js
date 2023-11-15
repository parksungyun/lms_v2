import styled from "styled-components"
import { Table } from "../../components/Table";
import { useLocation, useNavigate } from "react-router-dom";
import { courses, feedbacks, homeworks, students, subjects, submits, userList } from "../../assets/TempData";
import { FeedbackModal } from "../../components/FeedbackModal";

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
  border-bottom: 2px solid #ddd;
  border-top: 2px solid #ddd;
  width: 100%;
  display: flex;
  margin: 1.5rem 0;
  padding: 5px 15px;
`;

const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Bold = styled.p`
  font-weight: bold;
  font-size: 1.2rem;
`;

const P = styled.p`
  margin: 0;
  &.active{
    color: red;
  }
`;

const headers = [
  {
    text: 'No.',
    value: 'no'
  },
  {
    text: '학생이름',
    value: 'student'
  },
  {
    text: '내용',
    value: 'content'
  },
  {
    text: '첨부파일',
    value: 'attached'
  },
  {
    text: '제출시간',
    value: 'submitTime'
  },
  {
    text: '제출현황',
    value: 'submitState'
  },
];

export function TrainerHWFeedback() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const homework = homeworks.find((h) => h.homework_id == state);
  const submit = submits.filter((s) => s.homework_id == homework.homework_id);
  const course = courses.find((c) => c.course_id == subjects.find((s) => s.subject_id == homework.subject_id).course_id);
  const studentNum = students.filter((s) => s.course_id == course.course_id).length;
  const submitNum = submit.length;
  let feedback;
  let feedbackNum = submitNum;

  if(feedbacks.filter((h) => submit.find((s) => s.submit_id == h.submit_id))) {
    feedback = feedbacks.filter((h) => submit.find((s) => s.submit_id == h.submit_id));
    feedbackNum = submitNum - feedback.length;
  }

  const items = submit.map((s, i) => (
    {
      no: i + 1,
      student: userList.find((u) => u.uid == students.find((t) => t.student_id == s.student_id).uid).user_name,
      content: s.submit_content,
      attached: s.submit_fileURL,
      submitTime: changeColor(homework.hw_end_date, s.submit_mod_date),
      submitState: changeButton(s.submit_id),
    }
  ))

  function changeButton(id) {
    if(feedbacks.find((f) => f.submit_id == id)) {
      return <FeedbackModal name={"채점완료"} feedbackid={id}></FeedbackModal>
    }
    else {
      return <FeedbackModal name={"채점대기"} feedbackid={id}></FeedbackModal>
    }
  };

  function changeColor(end, submitDate) {
    const currentDate = new Date(submitDate);
    const endDate = new Date(end);
    const diff = (endDate.getTime() - currentDate.getTime()) / 1000 / 24 / 60 / 60;
    if(diff < 0){
      return(<P className="active">{submitDate}</P>)
    } else {
      return (<P>{submitDate}</P>)
    }
  };

  return <>
    <Container>
      <TableBox>
        <H2>{homework.hw_title}</H2>
        <Box>
          <ContentBox className="col-3">
            <Bold>전체</Bold>
            <p>{studentNum}</p>
          </ContentBox>
          <ContentBox className="col-3">
            <Bold>제출</Bold>
            <p>{submitNum}</p>
          </ContentBox>
          <ContentBox className="col-3">
            <Bold>미제출</Bold>
            <p>{studentNum - submitNum}</p>
          </ContentBox>
          <ContentBox className="col-3">
            <Bold>채점대기</Bold>
            <p>{feedbackNum}</p>
          </ContentBox>
        </Box>
        <Table 
            headers={headers}
            items={items}
            selectable={false}
          />
      </TableBox>
    </Container>
  </>
}