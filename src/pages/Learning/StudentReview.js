import styled from "styled-components";
import { Table } from "../../components/Table";
import { academics, courses, students, subjects, userList } from "../../assets/TempData";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllTrainers, getCourseById, getStudentByStudentId, getSubjectByStudentId, getSubjectReviewByStudentId } from "../Api";

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
  padding: 0.7rem 1.4rem;
  color: white;
  &.disabled{
    background-color: gray;
  }
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
    text: '평가기간',
    value: 'review_period'
  },
  {
    text: '평가하기',
    value: 'review_link'
  },
];

export function StudentReview() {
  const navigate = useNavigate();
  const id = sessionStorage.getItem("id"); // studentId
  const [user, setUser] = useState(null);
  const [academic, setAcademic] = useState(null);
  const [subjects, setSubjects] = useState(null);
  const [review, setReview] = useState(null);
  let items;

  useEffect(() => {
    if(!user) {
      const promise = getStudentByStudentId(id);
      const getData = () => {
        promise.then((data) => {
          setUser(data);
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
    if(!subjects) {
      const promise = getSubjectByStudentId(id);
      const getData = () => {
        promise.then((data) => {
          setSubjects(data);
        });
      };
      getData();
    }
    if(!review) {
      const promise = getSubjectReviewByStudentId(id);
      const getData = () => {
        promise.then((data) => {
          setReview(data);
        });
      };
      getData();
    }
  })

  if(subjects && academic && review) {
    items = subjects.map((s, i) => (
      {
        no: i + 1,
        subject_name: s.subject.subjectName,
        trainer_name: academic.find((a) => a.academic.academicId === s.subject.academicId).user.userName,
        review_period: getReviewPeriod(s.course.endDate),
        review_link: disabledBtn(s),
      }
    ))
  }

  function getReviewPeriod(endDate) {
    const end = new Date(endDate);
    const start = new Date(end - 6 * 1000 * 60 * 60 * 24);
    return <p>{`${getDateFormat(start)} ~ ${endDate}`}</p>
  }

  function getDateFormat(date) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return  year + "-" + (("00" + month.toString()).slice(-2)) + "-" + (("00" + day.toString()).slice(-2));
  }

  function disabledBtn(subject) {
    const currentDate = new Date();
    const endDate = new Date(subject.course.endDate);
    const diff = (endDate.getTime() - currentDate.getTime()) / 1000 / 24 / 60 / 60;
    if(review.find((r) => (r.subjectId === subject.subject.subjectId) && (r.studentId == id))) {
      return (<PrimaryButton className="disabled" disabled><p>평가완료</p></PrimaryButton>)
    }

    if(diff < 7 && diff >= 0){
      return(<PrimaryButton onClick={() => onReview(subject.subject.subjectId)}><p>평가하기</p></PrimaryButton>)
    }
    else {
      return (<PrimaryButton className="disabled" disabled><p>평가하기</p></PrimaryButton>)
    }
  };

  function onReview(id) {
    navigate(`review/${id}`);
  }

  return <>
    <Container>
      <Table 
        headers={headers}
        items={items}
        selectable={false}
      />
    </Container>
  </>
}