import styled from "styled-components";
import { Table } from "../../components/Table";
import { useEffect, useState } from "react";
import { getAllTrainers, getScoreByStudentId } from "../Api";

const Container = styled.div`
  padding: 1.5rem 2rem;
  padding-bottom: 2rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const Box = styled.div`
  border-bottom: 2px solid #ddd;
  border-top: 2px solid #ddd;
  width: 100%;
  display: flex;
  margin: 1.5rem 0;
  padding: 5px 15px;
`;

const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Bold = styled.p`
  font-weight: bold;
  font-size: 1.2rem;
`;

const headers = [
  {
    text: 'No.',
    value: 'no'
  },
  {
    text: '강의명',
    value: 'subject_name'
  },
  {
    text: '강사명',
    value: 'trainer_name'
  },
  {
    text: '강의점수',
    value: 'lecture_score'
  },
  {
    text: '과제점수',
    value: 'homework_score'
  },
];

export function StudentScore() {
  const id = sessionStorage.getItem("id"); // studentId
  const [score, setScore] = useState(null);
  const [academic, setAcademic] = useState(null);
  let items;

  useEffect(() => {
    if(!score) {
      const promise = getScoreByStudentId(id);
      const getData = () => {
        promise.then((data) => {
          setScore(data);
        });
      };
      getData();
    }
    if(!academic) {
      const promise = getAllTrainers();
      const getData = () => {
        promise.then((data) => {
          setAcademic(data);
        });
      };
      getData();
    }
  });

  console.log(score);

  if(score && academic) {
    items = score.subjectScore.map((s, i) => (
      {
        no: i + 1,
        subject_name: s.subject.subjectName,
        trainer_name: academic.find((a) => a.academic.academicId === s.subject.academicId).user.userName,
        lecture_score: s.lecture,
        homework_score: s.homework,
      }
    ))
  }

  return <>
    <Container>
      {
        score &&
        <Box>
          <ContentBox className="col-3">
            <Bold>과정명</Bold>
            <p>{score.course.courseName}</p>
          </ContentBox>
          <ContentBox className="col-2">
            <Bold>전체 강의점수</Bold>
            <p>{score.lecture}</p>
          </ContentBox>
          <ContentBox className="col-3">
            <Bold>전체 과제점수</Bold>
            <p>{score.homework}</p>
          </ContentBox>
          <ContentBox className="col-2">
            <Bold>출석점수</Bold>
            <p>{score.attendance}</p>
          </ContentBox>
          <ContentBox className="col-2">
            <Bold>총점</Bold>
            <p>{score.total}</p>
          </ContentBox>
        </Box>
      }
      {
        items &&
        <Table 
          headers={headers}
          items={items}
          selectable={false}
        />
      }
    </Container>
  </>
}