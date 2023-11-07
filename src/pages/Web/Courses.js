import styled from "styled-components"
import WebWrapper from "../../components/WebWrapper"
import { Course } from '../../components/Course'
import { courses } from "../../assets/TempData";

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
  return <>
    <WebWrapper pageName={"과정 안내"} />
    <Container>
      <CardWrapper>
        {
          courses.map((c) => (
            <Course id={c.course_id} />
          ))
        }
      </CardWrapper>
    </Container>
  </>
}