import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Table } from "../../components/Table";
import '../../styles/trainer_hw_table.css';
import { Pagination } from "../../components/Pagination";
import { course_answers, course_questions, students } from "../../assets/TempData";
import { getCourseQnaByStudentId, getStudentByStudentId } from "../Api";

const BadgeSuccess = styled.span`
  background-color: green;
  padding: 2px 15px;
  color: white;
  font-weight: 500;
  font-size: 0.8rem;
  border-radius: 5px;
  `;

const BadgeSecondary = styled.span`
  background-color: gray;
  padding: 2px 15px;
  color: white;
  font-weight: 500;
  font-size: 0.8rem;
  border-radius: 5px;
`;

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

const ButtonBox = styled.div`
  display: flex;
  justify-content: end;
  margin-top: 2rem;
  margin-right: 1.4rem;
`;

const PrimaryButton = styled.button`
  border: 0;
  border-radius: 5px;
  background-color: #5f7dcf;
  padding: 0.6rem 1.4rem;
  color: white;
`;

const headers = [
  {
    text: 'No.',
    value: 'no'
  },
  {
    text: '제목',
    value: 'title'
  },
  {
    text: '등록일',
    value: 'regDate'
  },
  {
    text: '답변상태',
    value: 'replyState'
  },
];

export function StudentCourseQna() {
  const id = sessionStorage.getItem("id"); // studentId
  const [question, setQuestion] = useState(null);
  const [page, setPage] = useState(1);
  const limit = 10;
  const offset = (page - 1) * limit;
  const navigate = useNavigate();
  let items;

  useEffect(() => {
    if(!question) {
      const promise = getCourseQnaByStudentId(id);
      const getData = () => {
        promise.then((data) => {
          setQuestion(data);
        });
      };
      getData();
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

  if(question) {
    items = question.map((q, i) => (
      {
        no: i + 1,
        title: titleLink(q.question.courseQuestionId, shortenTitle(q.question.title, 35)),
        regDate: new Date(q.question.regDate).toLocaleDateString("fr-CA"),
        replyState: changeReply(q)
      }
    ));
  }
    
  const postsData = (posts) => {
    if(posts) {
      let result = posts.slice(offset, offset + limit);
      return result;
    }
  };

  function changeReply(reply) {
    if(reply.answer) {
      return(<BadgeSuccess>답변완료</BadgeSuccess>);
    }
    else {
      return(<BadgeSecondary>답변대기</BadgeSecondary>);
    }
  };

  function titleLink(id, title) {
    return (<p onClick={() => navigate(`${id}`)}>{title}</p>);
  }

  return<>
    {
      items && 
      <Container>
        <TableBox>
          <H2>1:1 문의</H2>
          <Table 
            headers={headers}
            items={postsData(items)}
            selectable={false}
          />
        </TableBox>
        <ButtonBox>
          <PrimaryButton onClick={() => navigate("write")}><p>1:1 문의하기</p></PrimaryButton>
        </ButtonBox>
        <Pagination limit={limit} page={page} totalPosts={items.length} setPage={setPage} />
      </Container>
    }
  </>
}