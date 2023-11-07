import styled from "styled-components";
import { courses, students, userList, subjects, academics, studies, attendances, feedbacks, submits, homeworks, lectures } from "../../assets/TempData";
import { Table } from "../../components/Table";
import { useState } from "react";

const Container = styled.div`
  padding: 1.5rem 2rem;
  padding-bottom: 2rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const PrimaryButton = styled.button`
  border: 0;
  border-radius: 5px;
  background-color: #5f7dcf;
  padding: 0.8rem 1.4rem;
  color: white;
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
  const id = 1;
  const student = students.find((s) => s.student_id == id);
  const user = userList.find((u) => u.uid == student.uid);
  const course = courses.find((c) => c.course_id == student.course_id);
  const subject = subjects.filter(data => data.course_id == course.course_id);
  const attendance = attendances.filter(data => data.student_id == student.student_id);
  const subjectHwScore = calHwScore();
  const subjectLectScore = calLectScore();
  const attendScore = calAttendScore();
  const homeworkScore = totalHwScore();
  const lectureScore = totalLectScore();
  const totalScore = Math.round((lectureScore * 0.4) + (homeworkScore * 0.4) + (attendScore * 0.2));

  function calHwScore() {
    let score = [0];
    subject.map((s, i) => {
      let temp = 0;
      const tempHomework = homeworks.filter((h) => h.subject_id === s.subject_id);
      const tempSubmit = tempHomework.map((h) => (submits.filter(data => data.student_id === student.student_id)).find((t) => h.homework_id == t.homework_id));
      const tempFeedback = tempSubmit.map((h) => {
        if(h) {
          return feedbacks.find((f) => f.submit_id == h.submit_id);
        }
      });
      tempFeedback.map((h) => {
        if(h) temp += h.hw_score;
      });
      temp = temp / tempHomework.length;
      score[i] = Math.round(temp);
    })
    return score;
  }

  function calLectScore() {
    let score = [0];
    subject.map((s, i) => {
      let temp = 0;
      const tempLecture = lectures.filter((l) => l.subject_id === s.subject_id);
      const tempStudy = tempLecture.map((l) => (studies.filter(data => data.student_id === student.student_id)).find((t) => l.lecture_id == t.lecture_id));
      tempStudy.map((t) => {
        if(t) {
          if(t.is_study == 2) temp++;
        }
      });
      score[i] = Math.round(temp / tempLecture.length * 100);
    })
    return score;
  }

  function calPeriod() {
    const start = new Date(course.start_date);
    const end = new Date(course.end_date);
    let count = 0;

    while(true) {
      let temp = start;
      if(temp.getTime() > end.getTime()) {
        break;
      }
      else {
        let tmp = temp.getDay();
        if(tmp == 0 || tmp == 6) {
          // 주말
        }
        else {
          // 평일
          count++;
        }
        temp.setDate(start.getDate() + 1);
      }
    }
    return count;
  }

  function calAttendScore() {
    let temp = 0;
    const period = calPeriod();
    
    const tempAttend = attendances.filter((a) => a.student_id === student.student_id);
    console.log(tempAttend);
    tempAttend.map((t) => {
      if(t) {
        if(t.absence_id < 99) temp++;
      }
    });
    return Math.round(temp / period * 100);
  }

  function totalHwScore() {
    let temp = 0;
    subjectHwScore.map((h) => {temp += h});
    temp = temp / subject.length;
    return Math.round(temp);
  }

  function totalLectScore() {
    let temp = 0;
    subjectLectScore.map((l) => {temp += l});
    temp = temp / subject.length;
    return Math.round(temp);
  }

  const items = subject.map((s, i) => (
    {
      no: i + 1,
      subject_name: s.subject_name,
      trainer_name: userList.find((u) => u.uid == (academics.find((a) => a.academic_id == s.academic_id).uid)).user_name,
      lecture_score: subjectLectScore[i],
      homework_score: subjectHwScore[i],
    }
  ))

  return <>
    <Container>
      <Box>
        <ContentBox className="col-3">
          <Bold>과정명</Bold>
          <p>{course.course_name}</p>
        </ContentBox>
        <ContentBox className="col-2">
          <Bold>전체 강의점수</Bold>
          <p>{lectureScore}</p>
        </ContentBox>
        <ContentBox className="col-3">
          <Bold>전체 과제점수</Bold>
          <p>{homeworkScore}</p>
        </ContentBox>
        <ContentBox className="col-2">
          <Bold>출석점수</Bold>
          <p>{attendScore}</p>
        </ContentBox>
        <ContentBox className="col-2">
          <Bold>총점</Bold>
          <p>{totalScore}</p>
        </ContentBox>
      </Box>
      <Table 
        headers={headers}
        items={items}
        selectable={false}
      />
    </Container>
  </>
}