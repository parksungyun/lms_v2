import styled from "styled-components"
import { Container, Col, Row } from "react-bootstrap";
import ceo from "../../assets/img/ceo.png"

const Header = styled.div`
  background-color: #5f7dcf;
  width: 100%;
  height: 100px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Content = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  h1 {
    margin-bottom: 10px;
  }
  h3 {
    margin-top: 0px;
    font-weight: 400;
    font-size: 1.5rem;
  }
  h5 {
    font-style: italic;
    font-weight: 700;
    margin-bottom: 2rem;
  }
  hr {
    border: none;
  }
`;

const Img = styled.img`
  width: 100%;
`;

const Text = styled.p`
  margin-top: 2rem;
  font-weight: light;
  font-size: 1.2rem;
`;

export function About() {
  return <>
    <Header>
      <h1>대표 인사말</h1>
    </Header>
    <Container>
      <Row>
        <Col>
          <Content>
            <h1>홈페이지 방문을 환영합니다.</h1>
            <h3>우리 사회의 앞선 기술력으로 능력을 발휘하고<br />
            Y&Y인들이 전문 기술인으로 거듭나길 바랍니다.</h3>
            <h5>대표 박 성 윤 & 한 휘 윤</h5>
            <hr />
            <Text className="lh-lg">
            우리는 지금 지식 정보화 시대 그리고 무한 경쟁시대의 한가운데 서 있습니다. 역동적인 기술 혁신으로 인하여 직업 세계는 예측할 수 없을 정도로 빠르게 변화하고 있으며 국경 없는 경쟁으로 인하여 어느 분야에서나 세계적인 표준을 능가할 것을 요구받고 있습니다. 이러한 시대에 선도적인 임무를 수행하면서 삶을 영위하는 지혜는 끊임없이 직무능력의 개발과 현장 지향적인 실천능력의 함양에 있습니다. 이것이 곧 개인의 입장에서는 자아실현의 길이며 국가적 입장에서는 경쟁력 향상의 길입니다. Y&Y아카데미학원은 이와 같은 시대적 소명에 부응하기 위하여 지식 정보화 시대에 필요한 능력 개발 전문가 양성을 위하여 정부와 협력하여 설립되었습니다. 21세기는 능력중심사회를 구현하기 위해 시대적 사명감으로 우리 사회의 앞선 기술력으로 능력을 발휘하고 전문 기술 교육인으로서 새 지평선을 열어갈 것입니다.
            </Text>
          </Content>
        </Col>
        <Col>
          <Img src={ceo} alt="ceo" />
        </Col>
      </Row>
    </Container>
  </>
}