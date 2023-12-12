import { useNavigate } from "react-router-dom";
import { BiUser } from "react-icons/bi";
import styled from "styled-components";
import { courses } from '../assets/TempData';
import { useState } from "react";
import { useEffect } from "react";
import { getCourseById } from "../pages/Api";

const Container = styled.div`
  display: flex;
  align-items: stretch;
  margin-bottom: 20px;
`;

const Box = styled.div`
  border-radius: 5px;
  border: 1px solid #eef0ef;
`;

const Img = styled.img`
  width: 100%;
  height: auto;
  cursor: pointer;
`;

const Content = styled.div`
  padding: 15px;
`;

const Title = styled.p`
  font-weight: 700;
  font-size: 20px;
  color: #37423b;
  &:hover{
    color: #5f7dcf;
  }
  cursor: pointer;
`;

const Capacity = styled.div`
  margin-top: 10px;
  padding-top: 15px;
  border-top: 1px solid #eef0ef;
  display: flex;
  justify-content: end;
  align-items: center;
`

export function Course({id}) {
  const [course, setCourse] = useState(null);
  const navigate = useNavigate();

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
  });

  function onDetail(id) {
    navigate(`/course/${id}`);
  }
  return <>
    <Container>
      {
        course && <Box>
          <Img src={"/upload/" + `${course.coursePhoto.substring(course.coursePhoto.lastIndexOf("\\") + 1)}`} alt={course.courseName} onClick={() => onDetail(course.courseId)}/>
          <Content>
            <Title onClick={() => onDetail(course.courseId)}>{course.courseName}</Title>
            <Capacity>
              <BiUser />&nbsp;{course.capacity}
            </Capacity>
          </Content>
        </Box>
      }
    </Container>
  </>
}