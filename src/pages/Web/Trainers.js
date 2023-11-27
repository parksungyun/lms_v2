import styled from "styled-components"
import WebWrapper from "../../components/WebWrapper"
import { MemberCard } from "../../components/MemberCard";
import { academics } from "../../assets/TempData";
import { useEffect } from "react";
import { useState } from "react";
import { getAllTrainers } from "../Api";

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
  const [trainers, setTrainers] = useState(null);

  useEffect(() => {
    if(!trainers) {
      const promise = getAllTrainers();
      const getData = () => {
        promise.then((data) => {
          setTrainers(data);
        });
      };
      getData();
    }
  });

  console.log(trainers);

  return <>
    <WebWrapper pageName={"교육팀 소개"} />
    <Container>
      <CardWrapper>
        {
          trainers && trainers.map((a) => (
            <MemberCard id={a.academic.uid} />
          ))
        }
      </CardWrapper>
    </Container>
  </>
}