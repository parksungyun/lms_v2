import styled from "styled-components";
import { Table } from "./Table";
import { academics, course_board, course_questions, homeworks, lectures, subject_board, subject_questions } from "../assets/TempData";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Pagination } from "./Pagination";
import { useEffect } from "react";

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
    text: '게시글 내용',
    value: 'content'
  },
  {
    text: '게시글 작성일',
    value: 'regDate'
  },
];

export function MyPost() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const limit = 10;
  const offset = (page - 1) * limit;
  const type = sessionStorage.getItem("userType");
  const id = sessionStorage.getItem("id"); // studentId OR academicId
  const [data, setData] = useState(null);

  useEffect(() => {
    if(type === "s") {
      if(!data) {
        
      }
    }

    if(type === "t") {
      if(!data) {
        
      }
    }

    if(type === "m") {
      if(!data) {
        
      }
    }
  })

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

  if(type == 's') {
    const courseQuestion = course_questions.filter(c => c.student_id == id);
    const subjectQuextion = subject_questions.filter(s => s.student_id == id);
    let tempCourseQuestion;
    let tempSubjectQuestion;

    tempCourseQuestion = courseQuestion.map((c,i) => (
      {
        no: i + 1,
        title: titleLink(c.c_question_id, shortenTitle(c.c_question_title, 20), `s/cqna`),
        content: shortenTitle(c.c_question_content, 45),
        regDate: c.c_question_reg_date
      }
    ));

    tempSubjectQuestion = subjectQuextion.map((s,i) => (
      {
        no: i + 1,
        title: titleLink(s.s_question_id, shortenTitle(s.s_question_title, 20), `s/${s.subject_id}/sqna`),
        content: shortenTitle(s.s_question_content, 45),
        regDate: s.s_question_reg_date
      }
    ));

    tempCourseQuestion.push(...tempSubjectQuestion);
    data = tempCourseQuestion;
    data.sort((a, b) => a.regDate.localeCompare(b.regDate));

  } else {
    const academic = academics.find(a => a.academic_id == id);
      if(academic.dept == 0) {
        const courseBoard = course_board.filter(c => c.academic_id == id);
        console.log(courseBoard)
        data = courseBoard.map((c,i) => (
          {
            no: i + 1,
            title: titleLink(c.course_board_id, shortenTitle(c.c_post_title, 20), `m/${c.cousre_id}/board/`),
            content: shortenTitle(c.c_post_content, 45),
            regDate: c.c_post_reg_date,
          }
        ));
          data.sort((a, b) => a.regDate.localeCompare(b.regDate));
      } else {
        const subjectBoard = subject_board.filter(s => s.academic_id == id);
        const lecture = lectures.filter(l => l.academic_id == id);
        const homework = homeworks.filter(h => h.academic_id == id);
        let tempSubjectBoard;
        let tempLecture;
        let tempHomework;

        tempSubjectBoard = subjectBoard.map((s,i) => (
          {
            no: i + 1,
            title: titleLink(s.subject_board_id, shortenTitle(s.s_post_title, 20), `t/${s.subject_id}/board`),
            content: shortenTitle(s.s_post_content, 45),
            regDate: s.s_post_reg_date,
          }
        ));

        tempLecture = lecture.map((l,i) => (
          {
            no: i + 1,
            title: titleLink(l.lecture_id, shortenTitle(l.lecture_title, 20), `t/${l.subject_id}/lecture`),
            content: shortenTitle(l.lecture_content, 45),
            regDate: l.lecture_reg_date,
          }
        ));

        tempHomework = homework.map((h,i) => (
          {
            no: i + 1,
            title: titleLink(h.homework_id, shortenTitle(h.hw_title, 20), `t/${h.subject_id}/homework`),
            content: shortenTitle(h.hw_content, 45),
            regDate: h.hw_reg_date,
          }
        ));

        tempSubjectBoard.push(...tempLecture, ...tempHomework);
        data = tempSubjectBoard;
        data.sort((a, b) => a.regDate.localeCompare(b.regDate));
        }
  };

  return<>
    <Container>
      <div>
        <H2>내가 작성한 게시글 수 : {data.length}</H2>
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