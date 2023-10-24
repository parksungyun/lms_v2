import styled from "styled-components"
import { Container, Row, Col } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import main from '../../assets/img/main.jpg'
import { BiWon, BiSolidBusiness } from "react-icons/bi";
import { BsFillMortarboardFill, BsChevronRight } from "react-icons/bs";

const Content = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Section = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  &#hero{
    width: 100%;
    height: 80vh;
    background: url({main}) center center;
    background-size: cover;
    position: relative;
  }
`;

const StyledNavLink = styled(NavLink)`
  display: inline-block;
  background: rgba(255, 255, 255, 0.2);
  padding: 10px 40px;
  color: #fff;
  border-radius: 100px;
  transition: all ease-in-out 0.4s;
`;

export function Home() {
  return <>
    <Section id="hero">
      <div className="container position-relative">
        <h1>지식정보화 시대 IT 전문가 양성</h1>
        <h2>당신이 전문가로서 행복한 삶을 누리기를 바랍니다.</h2>
      </div>
    </Section>
    <Container>
      <Row>
        <Col>
          <Content className="text-center">
            <h2 className="text-center">GOOD CHOICE</h2>
            <h3 className="text-center">Y&Y ACADEMY</h3>
            <StyledNavLink to="" className="btn">입학 상담<BsChevronRight className="mb-1"/></StyledNavLink>
          </Content>
        </Col>
        <Col>
          <Content>
            <BiSolidBusiness />
            <h3 className="text-center">취업센터 운영</h3>
            <p className="text-center">알선을 통한 취업률 100% 도전<br/>수료 후 취업률 80% 이상<br /> 졸업생 취업특강</p>
          </Content>
        </Col>
        <Col>
          <Content>
            <BiWon />
            <h3 className="text-center">수업비 무료지원</h3>
            <p className="text-center">매월 최대 약 61만원 지급 <br />교육비, 교재비 100% 국비지원<br /> 실업급여 수급자 구직활동 면제</p>
          </Content>
        </Col>
        <Col>
          <Content>
            <BsFillMortarboardFill />
            <h3 className="text-center">포트폴리오 / 자격증</h3>
            <p className="text-center">포트폴리오 제작 지원<br />이력서/자소서 첨삭<br />관련 자격증 취득 지원</p>
          </Content>
        </Col>
      </Row>
      <h1>모집중인 과정</h1>
    </Container>
  </>
}