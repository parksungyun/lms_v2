import styled from "styled-components"
import WebWrapper from "../../components/WebWrapper"
import { MemberCard } from "../../components/MemberCard";
import { academics, userList } from "../../assets/TempData";

const Container = styled.div`
  margin: 2rem 15rem;
  padding-bottom: 3rem;
`;

const CardWrapper = styled.div`
  display: flex;
  gap: 3rem;
  justify-content: center;
  flex-wrap: wrap;
`;

export function Trainers() {
  
  return <>
    <WebWrapper pageName={"교육팀 소개"} />
    <Container>
      <CardWrapper>
        {
          academics.map((a) => (
            a.dept == 1 && <MemberCard id={a.academic_id} />
          ))
        }
      </CardWrapper>
    </Container>
  </>
}