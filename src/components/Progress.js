import styled from "styled-components";

const Container = styled.div`
  padding: 0.7rem 0;
  display: flex;
  gap: 2rem;
`;

const PrimaryButton = styled.button`
  border: 0;
  border-radius: 5px;
  background-color: #5f7dcf;
  padding: 0.6rem 1.4rem;
  color: white;
  width: 15rem;
  font-size: 1.8rem;
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

export function Progress({subjectName}) {
  const maxItem = 30
	let availableItem = 15
  return<>
      <Container>
        <PrimaryButton>{subjectName}</PrimaryButton>
        <Box>
          <ProgressBar>
            <ProgressBox width = {100-(availableItem*100/maxItem)}/>
          </ProgressBar>
          <P>현재 진행률 15/30강</P>
        </Box>
      </Container>
    <hr/>
  </>
}