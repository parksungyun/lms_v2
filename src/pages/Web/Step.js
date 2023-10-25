import styled from "styled-components"
import WebWrapper from "../../components/WebWrapper"
import { Col, Row } from "react-bootstrap";

const Container = styled.div`
  margin: 2rem;
  margin-left: 3rem;
  padding-bottom: 3rem;
`;

const TitleBox = styled.div`
  padding: 3rem 5rem;
  background-color: #ecf5f9;
  border-radius: 1rem;
  text-align: center;
  margin-bottom: 1.3rem;
`;

const H2 = styled.p`
  font-size: 2.5rem;
  font-weight: 700;
  margin: 15px 0px;
`;

const H3 = styled.p`
  font-size: 2rem;
  font-weight: 700;
  margin: 15px 0px;
`;

const TextBox = styled.div`
  padding: 1.3rem 0;
`;

const Li = styled.li`
  font-size: 1.6rem;
  line-height: 2rem;
`;

const Divider = styled.div`
  width: 40px;
  height: 4px;
  background-color: #5f7dcf;
`;

const Box = styled.div`
  background: #ecf5f9;
  padding: 15px 20px;
  margin-bottom: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 1rem;
`;

const H5 = styled.div`
  font-size: 1.1rem;
  font-weight: 500;
  &.main{
    font-weight: bold;
    text-align: end;
    margin-bottom: 1.5rem;
    font-size: 1.5rem;
  }
`;

export function Step() {
  return <>
    <WebWrapper pageName={"입학 절차"} />
    <Container>
      <TitleBox>
        <H2>고용 노동부 장관이 실시하는 직업교육</H2>
        <p classNameName="fs-5">15세이상 취업에 필요한 기능과 기술을 습득하기 위한 교육 기회를 제공하고 재취업 및 창업에 필요한 직업능력개발을 위하여 고용 노동부 장관이 실시하는 직업교육입니다.</p>
      </TitleBox>
      <TextBox>
        <Divider />
        <H3>신청자격</H3>
        <ul>
          <Li>직업안정기관에 구직 등록한 15세 이상 실업자</Li>
          <Li>고등학교 3학년 재학생으로서 대학진학 예정이 없는 학생</Li>
          <Li>대학(전문대학) 최종학년 재학생으로, 대학원등 진학하지 아니하며, 다음연도 2월말까지 졸업예정자</Li>
          <Li>야간대학교, 사이버대학교, 방송통신대학 재학생(휴학생은 제외)</Li>
          <Li>사업기간이 1년이상이면서 연간 매출액이 8천만원 미만인 영세자영업자, 학습지교사, 골프장 경기보조원, 보험설계사, 택배기사, 퀵서비스기사</Li>
        </ul>
      </TextBox>
      <TextBox>
        <Divider />
        <H3>국비지원내용</H3>
        <ul>
          <Li>교육비 및 교재비100% 국비전액무료</Li>
          <Li>훈련비 훈련장려금지급( 교통비, 식대포함 11만 6천원 지급)</Li>
          <Li>유형 및 개인의 상황에 따라 훈련장려금은 상이할 수 있습니다.</Li>
        </ul>
      </TextBox>
      <TextBox>
        <Divider />
        <H3>지원내용</H3>
        <ul>
          <Li>756여개의 산학협동협약체결 된 업체와의 동행 면접 시행</Li>
          <Li>수료생 전원 100% 취업 추천 및 취업 관리</Li>
          <Li>관련 자격증 취득시 까지 교육지원</Li>
        </ul>
      </TextBox>
      <TextBox>
        <H3>교육신청 절차</H3>
        <Row>
          <Col>
            <Box>
              <H5>Step1</H5>
              <div>
                <H5 className="main">워크넷</H5>
                <H5>구직신청(인증)</H5>
              </div>
            </Box>
            <Box>
              <H5>Step4</H5>
              <div>
                <H5 className="main">훈련상담</H5>
                <H5>자기탐생활동 /
                  훈련정보 수집</H5>
              </div>
            </Box>
            <Box>
              <H5>Step7</H5>
              <div>
                <H5 className="main">훈련기관 방문</H5>
                <H5>적합 훈련 과정 수강신청</H5>
              </div>
            </Box>
          </Col>
          <Col>
            <Box>
              <H5>Step2</H5>
              <div>
                <H5 className="main">HRD-Net</H5>
                <H5>교육동영상 시청 /
                    훈련과정 탐색</H5>
              </div>
            </Box>
            <Box>
              <H5>Step5</H5>
              <div>
                <H5 className="main">훈련 필요성 인정</H5>
                <H5>개인 훈련 계획 수립 및 작성</H5>
              </div>
            </Box>
            <Box>
              <H5>Step8</H5>
              <div>
                <H5 className="main">수강</H5>
                <H5>훈련과정 수강</H5>
              </div>
            </Box>
          </Col>
          <Col>
            <Box>
              <H5>Step3</H5>
              <div>
                <H5 className="main">고용센터 방문</H5>
                <H5 className="text-end">계좌발급 신청</H5>
              </div>
            </Box>
            <Box>
              <H5>Step6</H5>
              <div>
                <H5 className="main">내일배움카드</H5>
                <H5>내일배움카드 발급 및 수령</H5>
              </div>
            </Box>
            <Box>
              <H5>Step9</H5>
              <div>
                <H5 className="main">HRD-Net</H5>
                <H5>수강평 입력</H5>
              </div>
            </Box>
          </Col>
        </Row>
      </TextBox>
    </Container>
  </>
}