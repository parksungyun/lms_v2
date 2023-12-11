import styled from "styled-components";
import { CourseReview } from "../../components/CourseReview";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { getAllTrainers, getStudentsByCourseId, getSubjectByCourseId, getSubjectReviewByCourseId } from "../Api";

const Container = styled.div`
  padding: 1.5rem 2rem;
  padding-bottom: 2rem;
  background-color: #f6f9ff;
  height: 100%;
`;

const TableBox = styled.div`
  padding: 2rem;
  padding-top: 1.3rem;
  background-color: white;
  border-radius: 1rem;
  margin-bottom: 2rem;
`;

const H2 = styled.p`
  font-size: 1.7rem;
  font-weight: bold;
  margin-top: 10px;
  margin-bottom: 0;
`;

const Hr = styled.hr`
  border: 0 #ddd;
  margin: 8px 0;
`;

const Btn = styled.button`
  border: 0;
  border-bottom: 2px solid #ddd;
  background-color: white;
  padding: 1rem 1.2rem;
  border-radius: 10px 10px 0 0;
  &:hover{
    color: #5f7dcf;
  }
  &.active{
    color: #5f7dcf;
    border-bottom: 2px solid #5f7dcf;
  }
`;

export function ManagerCourseReview() {
  const { id } = useParams();
  const [subject, setSubject] = useState(null);
  const [review, setReview] = useState(null);
  const [students, setStudents] = useState(null);
  const [academics, setAcademics] = useState(null);
  const [index, setIndex] = useState(0);
  const [active, setActive] = useState();
  let items;

  useEffect(() => {
    setSubject(null);
    setReview(null);
    setStudents(null);
  }, [id]);

  useEffect(() => {
    if(!subject) {
      const promise = getSubjectByCourseId(id);
      const getData = () => {
        promise.then((data) => {
          setSubject(data);
        });
      };
      getData();
    }
    if(!review) {
      const promise = getSubjectReviewByCourseId(id);
      const getData = () => {
        promise.then((data) => {
          setReview(data);
        });
      };
      getData();
    }
    if(!students) {
      const promise = getStudentsByCourseId(id);
      const getData = () => {
        promise.then((data) => {
          setStudents(data);
        });
      };
      getData();
    }
    if(!academics) {
      const promise = getAllTrainers(id);
      const getData = () => {
        promise.then((data) => {
          setAcademics(data);
        });
      };
      getData();
    }
  })
  
  useEffect(() => {
    if(subject) {
      let temp = new Array(subject.length);
      temp.map((t) => t = "");  
      temp[0] = "active";
      setActive(temp);
    }
  }, [subject]);

  if(subject && review && students) {
    items = (review.filter((c) => c.subjectId === subject[index - 1].subject.subjectId)).map((c, i) => (
      {
        no: i + 1,
        writer: students.find((s) => s.student.studentId === c.studentId).user.userName,
        score: c.reviewScore,
        content: c.reviewComment
      }
    ));
  }
  else {
    items = {};
  }
  
  function changeActive(i) {
    let temp = new Array(subject.length);
    temp.map((t) => t = "");
    temp[i-1] = "active";
    setActive(temp);
  }

  return<>
    <Container>
      <TableBox>
        <H2>강의평가</H2>
        <Hr />
        {
          (active) &&
          subject.map((s, i) => (         
            <Btn className={active[i]} onClick={()=>{setIndex(i+1); changeActive(i+1)}}><p>{s.subject.subjectName}</p></Btn>
          ))
        }
        <div>
          {
            (items && subject && students && academics) &&
            <CourseReview items={items} subject={subject[index - 1]} student={students} academic={academics} />
          }
        </div>
      </TableBox>
    </Container>
  </>
}