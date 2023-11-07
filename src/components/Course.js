import { useNavigate } from "react-router-dom";
import { BiUser } from "react-icons/bi";
import styled from "styled-components";
import { courses } from '../assets/TempData';

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
  const course = courses.find((c) => c.course_id == id);
  const navigate = useNavigate();

  function onDetail(id) {
    navigate(`/course/${id}`);
  }

  return <>
    <Container>
      <Box>
        <Img src={course.course_photo} alt={course.course_name} onClick={() => onDetail(course.course_id)}/>
        <Content>
          <Title onClick={() => onDetail(course.course_id)}>{course.course_name}</Title>
          <Capacity>
            <BiUser />&nbsp;{course.capacity}
          </Capacity>
        </Content>
      </Box>
    </Container>
  </>
}