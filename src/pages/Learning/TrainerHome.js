import styled from "styled-components"
import { RiUserSettingsLine } from "react-icons/ri";
import { LmsHomeButtonWrapper } from "../../components/LmsHomeButtonWrapper";
import { courses, subjects } from "../../assets/TempData";
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

const NameText = styled.div`
  display: flex;
  flex-direction: column;
`;

const CourseName = styled.p`
  margin: 0;
  font-size: 0.8rem;
`;

const SubjectName = styled.p`
  font-size: 1.4rem;
`;

export function TrainerHome() {
  const navigate = useNavigate()

  const id = 2; // academicid 임의로 받아옴
  const subject = subjects.filter((s) => s.academic_id == id);

  const subjectNumber = subject.map((s) => (
    {
      name: s.subject_name,
      id: s.subject_id,
      c_name: courses.find((c) => s.course_id == c.course_id).course_name
    }
  ));
  
  

  const items = subjectNumber.map((s)=>(
    [
      {
        text: <NameText><CourseName>{s.c_name}</CourseName><SubjectName>{s.name}</SubjectName></NameText>,
        link: `/lms/t/${s.id}/subject`
      },
      {
        text: "강의",
        link: `/lms/t/${s.id}/lecture`
      },
      {
        text: "공지",
        link: `/lms/t/${s.id}/board`
      },
      {
        text: "과제",
        link: `/lms/t/${s.id}/homework`
      },
      {
        text: "Q&A",
        link: `/lms/t/${s.id}/qna`
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
        <H2>진행중인 과목: {subjectNumber.length}</H2>
        {/* 하위 부분은 수정이 필요합니다. 주의하세요 */}
        {
          subjectNumber.map((c, i) => (
            <ButtonBox><LmsHomeButtonWrapper items={items[i]} /></ButtonBox>
          ))
        }
      </Box>
    </Container>
  </>
}