import { useNavigate } from "react-router-dom";
import styled from "styled-components"

const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
`;
const ModalBox = styled.div`
  width: 500px;
  height: 200px;
  background-color: white;
  padding: 1.5rem 2rem;
  border-radius: 1.2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const H2 = styled.p`
  font-size: 1.7rem;
  font-weight: bold;
  margin: 0;
  color: black;
  margin-top: 10px;
`;

const Box = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  text-align: center;
  margin: 10px 0;
  &.button{
    justify-content: center;
    margin-top: 1rem;
    margin-bottom: 0;
  }
`;

const SecondaryButton = styled.button`
  border: 0;
  border-radius: 5px;
  background-color: gray;
  padding: 0.6rem 1.4rem;
  color: white;
`;

const DangerButton = styled.button`
  border: 0;
  border-radius: 5px;
  background-color: red;
  padding: 0.6rem 1.4rem;
  color: white;
`;

const Content = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const P = styled.p`
  font-size: 1.3rem;
`;

export function DeleteModal(){
  const navigate = useNavigate();
  return<>
    <Container>
      <ModalBox>
        <H2>삭제 확인</H2>
        <Content>
          <P>정말 삭제하시겠습니까?</P>
        </Content>
        <Box className="button">
          <DangerButton><p>삭제</p></DangerButton>
          <SecondaryButton onClick={()=>navigate(-1)}><p>취소</p></SecondaryButton>
        </Box>
      </ModalBox>
    </Container>
  </>
}