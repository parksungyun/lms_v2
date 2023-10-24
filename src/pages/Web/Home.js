import styled from "styled-components"
import { Container, Row, Col } from "react-bootstrap";
import { NavLink } from "react-router-dom";

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
`;

export function Home() {
  return <>
    <Section id="hero">
      <div className="container position-relative">
        <h1>지식정보화 시대 IT 전문가 양성</h1>
        <h2>당신이 전문가로서 행복한 삶을 누리기를 바랍니다.</h2>
        <NavLink to="courses" className="btn-get-started">과정 안내</NavLink>
      </div>
    </Section>
    <Container>
      <Row>
        <Col>
          <Content>
            <h2 className="text-center">GOOD CHOICE</h2>
            <h3 className="text-center">Y&Y ACADEMY</h3>
          </Content>
        </Col>
      </Row>
    </Container>
  </>
}