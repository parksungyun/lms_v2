import styled from "styled-components";
import { Table } from "./Table";
import { academics, admission_answers, admission_questions, course_answers, course_questions, subject_answers, subject_board, subject_questions } from "../assets/TempData";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Pagination } from "./Pagination";

const Container = styled.div`
  padding: 1.5rem 2rem;
  padding-bottom: 2rem;
  height: 700px;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  justify-content: space-between;
`;

const H2 = styled.p`
  font-size: 1.7rem;
  font-weight: bold;
  margin: 0;
  color: black;
  margin: 10px 0;
`;

const header = [
  {
    text: 'No.',
    value: 'no'
  },
  {
    text: '게시글 제목',
    value: 'title'
  },
  {
    text: '답변 내용',
    value: 'content'
  },
  {
    text: '답변 작성일',
    value: 'regDate'
  },
];

export function MyReply() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const limit = 10;
  const offset = (page - 1) * limit;
  const id = 2 // academicid임시로 받아옴(바꿔가면서 확인)
  const academic = academics.find(a => a.academic_id == id);
  let data;

  const shortenTitle = (str, length) => {
    let result = '';
    if (str.length > length) {
      result = str.substr(0, length - 2) + '...';
    } else {
      result = str;
    }
    return result;
  };

  function titleLink(id, title, type) {
    return (<p onClick={() => navigate(`/lms/${type}/${id}`)}>{title}</p>);
  }

  const postsData = (posts) => {
    if(posts) {
      let result = posts.slice(offset, offset + limit);
      return result;
    }
  };

  if(academic.dept == 0){
    const courseAnswer = course_answers.filter(c => c.academic_id == id);
    const admissionAnswer = admission_answers.filter(a => a.academic_id == id);
    let tempCourseAnswer;
    let tempAdmissionAnswer;
    tempCourseAnswer = courseAnswer.map((c,i) => (
      {
        no: i + 1,
        title: titleLink(c.c_question_id, shortenTitle(course_questions.find(q => q.c_question_id == c.c_question_id).c_question_title, 20), `m/${course_questions.find(q => q.c_question_id == c.c_question_id).course_id}/qna`),
        content: shortenTitle(c.c_answer_content, 45),
        regDate: c.c_answer_reg_date,
      }
    ));
    tempAdmissionAnswer = admissionAnswer.map((a,i) => (
      {
        no: i + 1,
        title: titleLink(a.a_question_id, shortenTitle(admission_questions.find(q => q.a_question_id == a.a_question_id).a_question_title, 20), `m/admission`),
        content: shortenTitle(a.a_answer_content, 45),
        regDate: a.a_answer_reg_date,
      }
    ));
    tempAdmissionAnswer.push(...tempCourseAnswer);
    data = tempAdmissionAnswer;
    data.sort((a, b) => a.regDate.localeCompare(b.regDate));
  } else {
    const subjectAnswer = subject_answers.filter(s => s.academic_id == id);
    data = subjectAnswer.map((s,i) => (
      {
        no: i + 1,
        title: titleLink(s.s_question_id, shortenTitle(subject_questions.find(q => q.s_question_id == s.s_question_id).s_question_title, 20), `t/${subject_questions.find(q => q.s_question_id == s.s_question_id).subject_id}/qna`),
        content: shortenTitle(s.s_answer_content, 45),
        regDate: s.s_answer_reg_date,
      }
      ))
      data.sort((a, b) => a.regDate.localeCompare(b.regDate));
    }
  return<>
    <Container>
      <div>
        <H2>내가 작성한 답글 수 : {data.length}</H2>
        <Table 
          headers={header}
          items={postsData(data.reverse())}
          selectable={false}
        />
      </div>
      <Pagination limit={limit} page={page} totalPosts={data.length} setPage={setPage} />
    </Container>
  </>
}