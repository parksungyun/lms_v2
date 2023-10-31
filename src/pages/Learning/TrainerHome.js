import { Col, ProgressBar, Row } from "react-bootstrap";
import styled from "styled-components"
import { RiUserSettingsLine } from "react-icons/ri";
import { LmsHomeButtonWrapper } from "../../components/LmsHomeButtonWrapper";

const classTest = [
  {
    name: "class이름1",
    id: 0,
  },
  {
    name: "class이름2",
    id: 0,
  },
  {
    name: "class이름3",
    id: 0,
  },
  {
    name: "class이름4",
    id: 0,
  },
  {
    name: "class이름5",
    id: 0,
  },
];

const tItems = [
  {
    text: "clasa이름",
    link: '/lms/t'
  },
  {
    text: "강의",
    link: '/lms/t'
  },
  {
    text: "공지",
    link: '/lms/t'
  },
  {
    text: "과제",
    link: '/lms/t'
  },
  {
    text: "Q&A",
    link: '/lms/t'
  },
];

const Container = styled.div`
  padding: 1.5rem 2rem;
  padding-bottom: 2rem;
  background-color: #f6f9ff;
  height: calc(100vh - 50.73px);;
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
  return <>
    <Container>
      <Content>
        <div>
          <H2 className='title'>내 과목 관리</H2>
        </div>
        <PrimaryButton>관리자 페이지<RiUserSettingsLine /></PrimaryButton>
      </Content>
      <Box>
        <H2>진행중인 과목: {classTest.length}</H2>
        {/* 하위 부분은 수정이 필요합니다. 주의하세요 */}
        {
          classTest.map((c, i) => (
            <ButtonBox><LmsHomeButtonWrapper items={tItems} /></ButtonBox>
          ))
        }
      </Box>
    </Container>
  </>
}