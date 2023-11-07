import { useNavigate } from "react-router-dom";
import { Table } from "./Table";
import { courses, subjects } from "../assets/TempData";
import styled from "styled-components";

const header = [
  {
    text: 'No.',
    value: 'no'
  },
  {
    text: '과정명',
    value: 'courseName'
  },
  {
    text: '강의명',
    value: 'subjectName'
  },
  {
    text: '시작일',
    value: 'startDate'
  },
  {
    text: '종료일',
    value: 'endDate'
  },
  {
    text: '진행여부',
    value: 'state'
  },
  {
    text: '강의실 바로가기',
    value: 'link'
  },
];

const BadgeSuccess = styled.span`
  background-color: green;
  padding: 2px 15px;
  color: white;
  font-weight: 500;
  font-size: 0.8rem;
  border-radius: 5px;
  `;

const BadgeSecondary = styled.span`
  background-color: gray;
  padding: 2px 15px;
  color: white;
  font-weight: 500;
  font-size: 0.8rem;
  border-radius: 5px;
`;

const PrimaryButton = styled.button`
  background-color: #5f7dcf;
  padding: 0.8rem 1.4rem;
  color: white;
  font-weight: 500;
  font-size: 0.8rem;
  border-radius: 5px;
  border: 0;
`;

export function TrainerCourseHistory() {
  const navigate = useNavigate();
  const id = 2;

  const subject = subjects.filter(data => data.academic_id == id);
  const course = subject.map((s) => courses.find(data => data.course_id == s.course_id));
  console.log(subject);
  console.log(course);

  const newDate = new Date();
  const date =  newDate.getTime();
  
  function changeReply(end) {
    end = new Date(end);
    const endDate = end.getTime();
    if(date < endDate) {return(<BadgeSuccess>진행중</BadgeSuccess>)}
    else {return(<BadgeSecondary>진행끝</BadgeSecondary>)};
  };

  const item = subject.map((s,i) => (  
    {
      no: i+1,
      courseName: course[i].course_name,
      subjectName: subject[i].subject_name,
      startDate: course[i].start_date,
      endDate: course[i].end_date,
      state: changeReply(course[i].end_date),
      link: <PrimaryButton onClick={()=>navigate('/lms/t/subject')}><p>바로가기</p></PrimaryButton>,
    }
  ));

  return<>
    <Table 
      headers={header}
      items={item}
      selectable={false}
    />
  </>
}
