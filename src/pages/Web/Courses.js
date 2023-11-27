import styled from "styled-components"
import WebWrapper from "../../components/WebWrapper"
import { Course } from '../../components/Course'
import { useEffect, useState } from "react";
import { getRecruitingCourses } from "../Api";

const Container = styled.div`
  margin: 2rem 13rem;
  padding-bottom: 3rem;
`;

const CardWrapper = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
`;

export function Courses() {
  const [courses, setCourses] = useState(null);

  useEffect(() => {
    if(!courses) {
      const promise = getRecruitingCourses();
      const getData = () => {
        promise.then((data) => {
          setCourses(data);
        });
      };
      getData();
    }
  });
  return <>
    <WebWrapper pageName={"과정 안내"} />
    <Container>
      <CardWrapper>
        {
          courses && courses.map((c) => (
            <Course id={c.courseId} />
          ))
        }
      </CardWrapper>
    </Container>
  </>
}