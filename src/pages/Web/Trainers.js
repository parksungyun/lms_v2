import styled from "styled-components"
import WebWrapper from "../../components/WebWrapper"
import { MemberCard } from "../../components/MemberCard";

const Container = styled.div`
  margin: 2rem;
  margin-left: 3rem;
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
        <MemberCard />
        <MemberCard />
        <MemberCard />
        <MemberCard />
        <MemberCard />
        <MemberCard />
        <MemberCard />
        <MemberCard />
        <MemberCard />
        <MemberCard />
        <MemberCard />
        <MemberCard />
      </CardWrapper>
    </Container>
  </>
}