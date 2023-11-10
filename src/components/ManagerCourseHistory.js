import { useNavigate } from "react-router-dom";
import { Table } from "./Table";
import { courses, academics } from "../assets/TempData";
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

export function ManagerCourseHistory({id}) {
  const navigate = useNavigate();

  const course = courses.filter(c => c.academic_id == id);
  console.log(course)

  const newDate = new Date();
  const date =  newDate.getTime();
  
  function changeReply(end) {
    end = new Date(end);
    const endDate = end.getTime();
    if(date < endDate) {return(<BadgeSuccess>진행중</BadgeSuccess>)}
    else {return(<BadgeSecondary>진행끝</BadgeSecondary>)};
  };

  const item = course.map((c,i) => (
    {
      no: i + 1,
      courseName: c.course_name,
      startDate: c.start_date,
      endDate: c.end_date,
      state: changeReply(c.end_date),
      link: <PrimaryButton onClick={()=>navigate(`/lms/m/${c.course_id}/info`)}><p>바로가기</p></PrimaryButton>
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
