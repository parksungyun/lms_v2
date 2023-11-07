import styled from "styled-components"
import WebWrapper from "../../components/WebWrapper"
import { Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { courses, subjects } from "../../assets/TempData";

const Container = styled.div`
  margin: 2rem 10rem;
  padding-bottom: 3rem;
`;

const Card = styled.div`
  padding: 3rem 5rem;
  background-color: #ecf5f9;
  border-radius: 1rem;
  text-align: center;
  margin-bottom: 1.3rem;
`;

const H2 = styled.p`
  font-size: 2.5rem;
  font-weight: 700;
  margin: 10px 0;
`;

const Divider = styled.div`
  color: #bbb;
  margin: 0;
  padding: 0;
  cursor: default;
  font-size: 1.5rem;
`;

const Box = styled.div`
  display: flex;
  gap: 2rem;
  padding-top: 1rem;
  justify-content: center;
  align-items: center;
`;

const P = styled.p`
  font-size: 1.5rem;
  margin: 0;
`

const TextBox = styled.div`
  padding: 1.3rem 0;
`;

const H3 = styled.p`
  font-size: 2rem;
  font-weight: 700;
  margin: 15px 0px;
`;

const DividerBox = styled.div`
  width: 40px;
  height: 4px;
  background-color: #5f7dcf;
`;

export function CourseDetail() {
  const { id } = useParams();
  const course = courses.find((c) => c.course_id == id);
  const subject = subjects.filter((s) => s.course_id == course.course_id);

  return <>
    <WebWrapper pageName={"과정 소개"} />
    <Container>
      <Card>
        <H2>{course.course_name}</H2>
        <p className="mb-4 fs-5">{
          subject.map((s, i) => {
            if(i >= subject.length - 1) {
              return s.subject_name;
            }
            return s.subject_name + ", ";
          })
        }</p>
        <hr />
        <Box>
          <P>훈련 기간: {course.start_date} ~ {course.end_date}</P>
          <Divider>|</Divider>
          <P>모집 종료: {course.recruit_end}</P>
          <Divider>|</Divider>
          <P>모집 인원: {course.capacity}</P>
        </Box>
      </Card>
      <TextBox>
        <DividerBox />
        <H3>과정소개</H3>
        <P>{course.course_info}</P>
      </TextBox>
    </Container>
  </>
}