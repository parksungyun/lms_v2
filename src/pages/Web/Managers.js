import styled from "styled-components"
import WebWrapper from "../../components/WebWrapper"
import { MemberCard } from "../../components/MemberCard";
import { academics } from "../../assets/TempData";
import { useState } from "react";
import { useEffect } from "react";
import { getAllManagers } from "../Api";

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

export function Managers() {
  const [managers, setManagers] = useState(null);

  useEffect(() => {
    if(!managers) {
      const promise = getAllManagers();
      const getData = () => {
        promise.then((data) => {
          setManagers(data);
        });
      };
      getData();
    }
  });

  return <>
    <WebWrapper pageName={"행정팀 소개"} />
    <Container>
      <CardWrapper>
        {
          managers && managers.map((a) => (
            <MemberCard id={a.academic.uid} />
          ))
        }
      </CardWrapper>
    </Container>
  </>
}