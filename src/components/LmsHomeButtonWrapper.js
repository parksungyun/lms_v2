import styled from "styled-components";
import { LmsHomeButton } from "./LmsHomeButton";


const Container = styled.div`
  padding: 0.7rem 0;
  display: flex;
  gap: 2rem;
`;

const Hr = styled.hr`
  border: 0;
  margin: 0.5rem 0;
`;

export function LmsHomeButtonWrapper({items}) {
  return<>
    <Hr />
    <Container>
      {
        items.length > 0 ? items.map((item, i) => (
          <LmsHomeButton buttonName={item.text} link={item.link}/>
        )) : <LmsHomeButton buttonName={items.text} link={items.link}/>
      }
    </Container>
  </>
}