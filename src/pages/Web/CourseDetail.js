import styled from "styled-components"
import WebWrapper from "../../components/WebWrapper"
import { Row, Col } from "react-bootstrap";

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
  return <>
    <WebWrapper pageName={"과정 소개"} />
    <Container>
      <Card>
        <H2>class명</H2>
        <p className="mb-4 fs-5">HTML, CSS, JS, DB, JAVA</p>
        <hr />
        <Box>
          <P>개강 일자: 2023-10-31</P>
          <Divider>|</Divider>
          <P>모집 종료 일자: 2023-11-06</P>
          <Divider>|</Divider>
          <P>모집 인원: 30</P>
        </Box>
      </Card>
      <TextBox>
        <DividerBox />
        <H3>과정소개</H3>
        <P>「한국판 뉴딜」사업의 일환으로 혁신적인 기술 및 훈련 방법을 갖춘 기업-대학-민간 혁신기관을 통해 4차 산업혁명과 함께 급성장하고 있는 디지털·신기술 분야에 대한 집중적 교육 훈련을 합니다.<br />
디지털·신기술 분야 현장에서 기업이 원하는 핵심 실무 인재를 양성하는 것이 목적입니다. <br />
프로젝트 과제 수행, 해커톤, 기업과제 해결 등을 통한 차별적인 훈련 방법을 추구합니다.<br />
국민내일배움카드 발급자를 대상으로 훈련비 전액을 지원합니다.<br />
훈련장려금을 매월 최대 316,000~816,000원을 지원합니다.<br />
훈련생의 자기주도적 과업수행능력과 종합적인 실무적용능력을 개발하는 것을 목적으로 하는 프로젝트 기반 훈련(PBT, Project Based Training)입니다.<br />
신기술 분야인 드론 기업의 수요를 반영하고 참여기업의 강사(멘토)가 참여하는 과정입니다.<br />
대전 소재의 드론 기업과 하드웨어, 소프트웨어 간의 융합 솔루션을 제공하는 기업을 포함, 총 58개 기업의 인력 수요를 파악하여 설계된 과정입니다.<br />
본 과정에서 필요한 모든 키트, 교재 및 IDE를 무상 제공합니다.</P>
      </TextBox>
    </Container>
  </>
}