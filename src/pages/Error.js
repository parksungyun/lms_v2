import { useNavigate } from "react-router-dom";
import styled from "styled-components"

const Container = styled.div`
  margin: 15rem 15rem;
  display: flex;
  flex-direction: column;
  gap: 10rem;
  align-items: center;
  justify-content: center;
`;

const Danger = styled.p`
  color: red;
  font-size: 6rem;
  font-weight: 700;
  text-align: center;
`;

const Text = styled.p`
  color: gray;
  font-size: 2rem;
  font-weight: 700;
  text-align: center;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
`;

const Button = styled.button`
  border: 0;
  padding: 2rem 3rem;
  background-color: #5f7dcf;
  border-radius: 1rem;
  font-size: 2rem;
  font-weight: 700;
  color: white;
`;

export function Error() {
  const navigate = useNavigate();

  return <>
    <Container>
      <Content>
        <Danger>PAGE NOT FOUND</Danger>
        <Text>We're sorry, the requested page couldn't be found. If you followed a link, please contact us.</Text>
      </Content>
      <Button onClick={() => navigate("/")}><p>Back to Homepage</p></Button>
    </Container>
  </>
}