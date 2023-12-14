import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  padding: 0.7rem;
  display: flex;
  gap: 2rem;
  background-color: #f6f9ff;
  border: lightgray solid 1px;
  margin-bottom: 0.5rem;
  border-radius: 10px;
`;

const PrimaryButton = styled.button`
  border: 0;
  border-radius: 5px;
  background-color: #5f7dcf;
  padding: 0.6rem 1.4rem;
  color: white;
  width: 25rem;
  font-size: 1.5rem;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 30px;
  background-color: #dedede;
  border-radius:12px;
  font-weight: 600;
  font-size: .8rem;
  overflow: hidden;
`;

const ProgressBox = styled.div`
  width: ${(props) => props.width}%; 
  height: 30px;
  padding: 0;
  text-align: center;
  background-color: #5f7dcf;
  color: #111;
`;

const Box = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
`;

const P = styled.p`
  font-size: 1.2rem;
`;

export function Progress({subjectName, max, item, link}) {
  const navigate = useNavigate();

  return<>
    <Container>
      <PrimaryButton onClick={()=>navigate(link)}><p>{subjectName}</p></PrimaryButton>
      <Box>
        <ProgressBar>
          <ProgressBox width = {item / max * 100}/>
        </ProgressBar>
        <P>현재 진행률 {item}/{max}강</P>
      </Box>
    </Container>
  </>
}