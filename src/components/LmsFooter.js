import styled from "styled-components"
import logo from '../assets/img/logo.png'

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Img = styled.img`
  width: 200px;
`;

const Text = styled.p`
  font-size: 1.1rem;
`;

export function LmsFooter() {
  return <>
    <Container>
      <Img src={logo} alt="Y&Y ACADEMY" />
      <Text>©Copyright <b>Y&Y Academy</b>. All Rights Reserved</Text>
    </Container>
  </>
}