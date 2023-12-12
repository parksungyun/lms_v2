import { useNavigate } from "react-router-dom";
import { Table } from "./Table";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { getCourseByAcademicId } from "../pages/Api";

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
  const id = sessionStorage.getItem("id"); // academicId
  const [courses, setCourses] = useState(null);
  const newDate = new Date();
  const date =  newDate.getTime();
  let items;

  useEffect(() => {
    if(!courses) {
      const promise = getCourseByAcademicId(id);
      const getData = () => {
        promise.then((data) => {
          setCourses(data);
        });
      };
      getData();
    }
  })
  
  function changeReply(end) {
    end = new Date(end);
    const endDate = end.getTime();
    if(date < endDate) {return(<BadgeSuccess>진행중</BadgeSuccess>)}
    else {return(<BadgeSecondary>진행끝</BadgeSecondary>)};
  };

  if(courses) {
    items = courses.map((c,i) => (
      {
        no: i + 1,
        courseName: c.courseName,
        startDate: c.startDate,
        endDate: c.endDate,
        state: changeReply(c.endDate),
        link: <PrimaryButton onClick={()=>navigate(`/lms/m/${c.courseId}/info`)}><p>바로가기</p></PrimaryButton>
      }
    ));
  }

  return<>
    {
      items &&
      <Table 
        headers={header}
        items={items}
        selectable={false}
      />
    }
  </>
}
