import styled from "styled-components"
import WebWrapper from "../../components/WebWrapper"
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { getCourseById, getSubjectByCourseId } from "../Api";

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
  const [course, setCourse] = useState(null);
  const [subjects, setSubjects] = useState(null);

  useEffect(() => {
    if(!course) {
      const promise = getCourseById(id);
      const getData = () => {
        promise.then((data) => {
          setCourse(data);
        });
      };
      getData();
    }
    if(course && !subjects) {
      const promise = getSubjectByCourseId(id);
      const getData = () => {
        promise.then((data) => {
          setSubjects(data);
        });
      };
      getData();
    }
  });

  return <>
    <WebWrapper pageName={"과정 소개"} />
    {
      (course && subjects) && 
      <Container>
        <Card>
          <H2>{course.courseName}</H2>
          <p className="mb-4 fs-5">{
            subjects.map((s, i) => {
              if(i >= subjects.length - 1) {
                return s.subject.subjectName;
              }
              return s.subject.subjectName + ", ";
            })
          }</p>
          <hr />
          <Box>
            <P>훈련 기간: {course.startDate} ~ {course.endDate}</P>
            <Divider>|</Divider>
            <P>모집 종료: {course.recruitEnd}</P>
            <Divider>|</Divider>
            <P>모집 인원: {course.capacity}</P>
          </Box>
        </Card>
        <TextBox>
          <DividerBox />
          <H3>과정소개</H3>
          <P>{course.courseInfo}</P>
        </TextBox>
      </Container>
    }
  </>
}