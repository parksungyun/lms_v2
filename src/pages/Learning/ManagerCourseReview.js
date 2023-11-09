import styled from "styled-components";
import { CourseReview } from "../../components/CourseReview";
import { useState } from "react";
import { course_reviews, students, subjects, userList } from "../../assets/TempData";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

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
  const subject = subjects.filter(s => s.course_id == id);
  const [index, setIndex] = useState(1);
  let temp = new Array(subject.length);
  console.log(subject);
  
  useEffect(() => {
    temp.map((t) => t = "");  
    temp[0] = "active";
  }, []);
  
  const [active, setActive] = useState(temp);
  let review;
  review = course_reviews.filter((r) => r.subject_id == subject[index - 1].subject_id);
  let items;

  if(review) {
    items = review.map((c, i) => (
      {
        no: i + 1,
        writer: userList.find(u => u.uid == students.find(s => s.student_id == c.student_id).uid).user_name,
        score: c.review_score,
        content: c.review_comment
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
          subject.map((s, i) => (
            <>            
            <Btn className={active[i]} onClick={()=>{setIndex(i+1); changeActive(i+1)}}><p>{s.subject_name}</p></Btn>
            </>
          ))
        }
        <div>
          <CourseReview items={items} info={review} index={subject[index - 1].subject_id} />
        </div>
      </TableBox>
    </Container>
  </>
}