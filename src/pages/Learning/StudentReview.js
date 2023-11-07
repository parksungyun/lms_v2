import styled from "styled-components";
import { Table } from "../../components/Table";
import { academics, courses, students, subjects, userList } from "../../assets/TempData";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  padding: 1.5rem 2rem;
  padding-bottom: 2rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const PrimaryButton = styled.button`
  border: 0;
  border-radius: 5px;
  background-color: #5f7dcf;
  padding: 0.7rem 1.4rem;
  color: white;
  &.disabled{
    background-color: gray;
  }
`;

const headers = [
  {
    text: 'No.',
    value: 'no'
  },
  {
    text: '강의명',
    value: 'subject_name'
  },
  {
    text: '강사명',
    value: 'trainer_name'
  },
  {
    text: '평가기간',
    value: 'review_period'
  },
  {
    text: '평가하기',
    value: 'review_link'
  },
];

export function StudentReview() {
  const navigate = useNavigate();
  const id = 1;
  const student = students.find((s) => s.student_id == id);
  const user = userList.find((u) => u.uid == student.uid);
  const course = courses.find((c) => c.course_id == student.course_id);
  const subject = subjects.filter(data => data.course_id == course.course_id);
  const currentDate = new Date();
  const endDate = new Date(course.end_date);
  const diff = (endDate.getTime() - currentDate.getTime()) / 1000 / 24 / 60 / 60;

  const items = subject.map((s, i) => (
    {
      no: i + 1,
      subject_name: s.subject_name,
      trainer_name: userList.find((u) => u.uid == (academics.find((a) => a.academic_id == s.academic_id).uid)).user_name,
      review_period: getReviewPeriod(),
      review_link: disabledBtn(s.subject_id),
    }
  ))

  function getReviewPeriod() {
    const start = new Date(endDate - 6 * 1000 * 60 * 60 * 24);
    return <p>{`${getDateFormat(start)} ~ ${course.end_date}`}</p>
  }

  function getDateFormat(date) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return  year + "-" + (("00" + month.toString()).slice(-2)) + "-" + (("00" + day.toString()).slice(-2));
  }

  function disabledBtn(id) {
    if(diff >= -7 && diff <= 0){
      return(<PrimaryButton onClick={() => onReview(id)}><p>평가하기</p></PrimaryButton>)
    } else {
      return (<PrimaryButton className="disabled" disabled><p>평가하기</p></PrimaryButton>)
    }
  };

  function onReview(id) {
    navigate(`review/${id}`);
  }

  return <>
    <Container>
      <Table 
        headers={headers}
        items={items}
        selectable={false}
      />
    </Container>
  </>
}