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

export function ManagerCourseHistory() {
  const navigate = useNavigate();
  const id = 1;

  const academic = academics.filter(data => data.academic_id == id);
  const course = academic.map((s) => courses.find(data => data.academic_id == s.academic_id));
  console.log(course)

  const newDate = new Date();
  const date =  newDate.getTime();
  
  function changeReply(end) {
    end = new Date(end);
    const endDate = end.getTime();
    if(date < endDate) {return(<BadgeSuccess>진행중</BadgeSuccess>)}
    else {return(<BadgeSecondary>진행끝</BadgeSecondary>)};
  };

  const item = [
    {
      no: 1,
      courseName: course[0].course_name,
      startDate: course[0].start_date,
      endDate: course[0].end_date,
      state: changeReply(course[0].end_date),
      link: <PrimaryButton onClick={()=>navigate('/lms/m/info')}><p>바로가기</p></PrimaryButton>,
    },
  ];
  return<>
    <Table 
      headers={header}
      items={item}
      selectable={false}
    />
  </>
}
