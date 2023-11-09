import styled from "styled-components"
import { RiUserSettingsLine } from "react-icons/ri";
import { LmsHomeButtonWrapper } from "../../components/LmsHomeButtonWrapper";
import { courses } from "../../assets/TempData";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  padding: 1.5rem 2rem;
  padding-bottom: 2rem;
  background-color: #f6f9ff;
  height: 100%;
`;

const H2 = styled.p`
  font-size: 1.7rem;
  font-weight: bold;
  margin: 10px 0;
  &.title{
    margin: 0;
  }
`

const PrimaryButton = styled.button`
  border: 0;
  border-radius: 5px;
  background-color: #5f7dcf;
  padding: 0.8rem 1.4rem;
  color: white;
`;

const Content = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
  align-items: center;
`;

const Box = styled.div`
  background-color: white;
  border-radius: 1rem;
  padding: 2rem;
`;

const ButtonBox = styled.div`
  height: 8rem;
`;

export function ManagerHome() {
  const navigate = useNavigate();
  const id = 3; // academicid 임의로 받아옴
  const course = courses.filter(c => c.academic_id == id);

  const courseNumber = course.map((c) => (
    {
      name: c.course_name,
      id: c.course_id,
    }
  ));
  
  const items = courseNumber.map((c)=>(
    [
      {
        text: c.name,
        link: `/lms/m/${c.id}/info`
      },
      {
        text: "공지",
        link: `/lms/m/${c.id}/board`
      },
      {
        text: "1:1 문의",
        link: `/lms/m/${c.id}/qna`
      },
      {
        text: "강의평가",
        link: `/lms/m/${c.id}/review`
      }
    ]
  ));

  return <>
    <Container>
      <Content>
        <div>
          <H2 className='title'>내 클래스 관리</H2>
        </div>
        <PrimaryButton onClick={()=>navigate("/lms/a")}><p>관리자 페이지<RiUserSettingsLine /></p></PrimaryButton>
      </Content>
      <Box>
        <H2>진행중인 과목: {courseNumber.length}</H2>
        {
          courseNumber.map((c, i) => (
            <ButtonBox><LmsHomeButtonWrapper items={items[i]} /></ButtonBox>
          ))
        }
      </Box>
    </Container>
  </>
}