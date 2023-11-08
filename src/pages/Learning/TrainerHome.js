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

export function TrainerHome() {
  const navigate = useNavigate()

  const id = 1; // academicid 임의로 받아옴
  const course = courses.filter(c => c.academic_id == id)

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
        link: '/lms/t/subject'
      },
      {
        text: "강의",
        link: '/lms/t/lecture'
      },
      {
        text: "공지",
        link: '/lms/t/board'
      },
      {
        text: "과제",
        link: '/lms/t/homework'
      },
      {
        text: "Q&A",
        link: '/lms/t/qna'
      }
    ]
  ));
  return <>
    <Container>
      <Content>
        <div>
          <H2 className='title'>내 과목 관리</H2>
        </div>
        <PrimaryButton onClick={()=>navigate("/lms/a")}><p>관리자 페이지<RiUserSettingsLine /></p></PrimaryButton>
      </Content>
      <Box>
        <H2>진행중인 과목: {courseNumber.length}</H2>
        {/* 하위 부분은 수정이 필요합니다. 주의하세요 */}
        {
          courseNumber.map((c, i) => (
            <ButtonBox><LmsHomeButtonWrapper items={items[i]} /></ButtonBox>
          ))
        }
      </Box>
    </Container>
  </>
}