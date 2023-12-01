import styled from "styled-components";
import { Pagination } from "../../components/Pagination";
import { useEffect, useState } from "react";
import { Table } from "../../components/Table";
import '../../styles/student_hw_table.css';
import { useNavigate, useParams } from "react-router-dom";
import { academics, feedbacks, homeworks, submits, userList } from "../../assets/TempData";
import { getAllTrainers, getHomeworksBySubjectId, getSubmitsByStudentIdAndSubjectId } from "../Api";

const PrimaryButton = styled.button`
  background-color: #5f7dcf;
  padding: 2px 15px;
  color: white;
  font-weight: 500;
  font-size: 0.8rem;
  border-radius: 5px;
  border: 0;
  cursor: pointer;
  &.disabled{
    background-color: gray;
    cursor: default;
  }
`;

const SuccessButton = styled.button`
  background-color: green;
  padding: 2px 15px;
  color: white;
  font-weight: 500;
  font-size: 0.8rem;
  border-radius: 5px;
  border: 0;
  cursor: pointer;
`;

const SecondaryButton = styled.button`
  background-color: gray;
  padding: 2px 15px;
  color: white;
  font-weight: 500;
  font-size: 0.8rem;
  border-radius: 5px;
  border: 0;
  cursor: pointer;
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

const P = styled.p`
  margin: 0;
  &.active{
    color: red;
  }
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
    text: '작성자',
    value: 'writer'
  },
  {
    text: '시작일',
    value: 'startDate'
  },
  {
    text: '종료일',
    value: 'endDate'
  },
  {
    text: '제출',
    value: 'submit'
  },
  {
    text: '제출현황',
    value: 'submitState'
  },
  {
    text: '제출시간',
    value: 'submitTime'
  },
];

export function StudentHW() {
  const [page, setPage] = useState(1);
  const limit = 10;
  const offset = (page - 1) * limit;
  const navigate = useNavigate();
  const { id } = useParams();
  const studentId = sessionStorage.getItem("id"); // studentId
  const [homework, setHomework] = useState(null);
  const [submit, setSubmit] = useState(null);
  const [academic, setAcademic] = useState(null);
  let items;

  useEffect(() => {
    setHomework(null);
    setSubmit(null);
  }, [id]);

  useEffect(() => {
    if(!academic) {
      const promise = getAllTrainers();
      const getData = () => {
        promise.then((data) => {
          setAcademic(data);
        });
      };
      getData();
    }
    if(!homework) {
      const promise = getHomeworksBySubjectId(id);
      const getData = () => {
        promise.then((data) => {
          setHomework(data);
        });
      };
      getData();
    }
    if(!submit) {
      const promise = getSubmitsByStudentIdAndSubjectId(studentId, id);
      const getData = () => {
        promise.then((data) => {
          setSubmit(data);
        });
      };
      getData();
    }
  });

  const shortenTitle = (str, length) => {
    let result = '';
    if (str.length > length) {
      result = str.substr(0, length - 2) + '...';
    } else {
      result = str;
    }
    return result;
  };

  if(homework && submit && academic) {
    items = homework.map((h, i) => (
      {
        no: i + 1,
        title: titleLink(h.homeworkId, shortenTitle(h.title, 35)),
        writer: academic.find((a) => a.academic.academicId === h.academicId).user.userName,
        startDate: h.startDate,
        endDate: h.endDate,
        submit: disabledBtn(h.homeworkId),
        submitState: changeButton(h.homeworkId),
        submitTime: changeColor(h.endDate, h.homeworkId)
      }
    ));
  }

  function titleLink(id, title) {
    return (<p onClick={() => navigate(`${id}`)}>{title}</p>);
  }

  const postsData = (posts) => {
    if(posts) {
      let result = posts.slice(offset, offset + limit);
      return result;
    }
  };

  function disabledBtn(homeworkId) {
    const reply = submit.find((s) => s.submit.homeworkId === homeworkId);
    if(reply) {
      if(reply.feedback) {
        return (<PrimaryButton className="disabled" disabled><p>제출하기</p></PrimaryButton>)
      }
      else {
        return(<PrimaryButton onClick={() => navigate(`/lms/s/${id}/homework/${homeworkId}/submit`, { state: homeworkId })}><p>제출하기</p></PrimaryButton>)
      }
    }
    else {
      return (<PrimaryButton onClick={() => navigate(`/lms/s/${id}/homework/${homeworkId}/submit`, { state: homeworkId })}><p>제출하기</p></PrimaryButton>)
    }
  };

  function changeButton(homeworkId) {
    const reply = submit.find((s) => s.submit.homeworkId === homeworkId);
    if(reply) {
      if(reply.feedback) {
        return(<SuccessButton onClick={() => navigate(`/lms/s/homework/${reply.feedback.submitId}/feedback`, { state: reply.feedback.submitId })}><p>결과확인</p></SuccessButton>);
      }
      else {
        return(<PrimaryButton onClick={() => navigate(`/lms/s/homework/${reply.submit.submitId}/feedback`, { state: reply.submit.submitId })}><p>제출확인</p></PrimaryButton>);
      }
    }
    else {
      return(<SecondaryButton className="pe-none" disabled><p>제출대기</p></SecondaryButton>);
    }
  };

  function changeColor(end, homeworkId) {
    if(!submit.find(s => s.submit.homeworkId === homeworkId)) {
      return "";
    }
    const submitDate = submit.find(s => s.submit.homeworkId === homeworkId).submit.submitModDate;
    const currentDate = new Date(submitDate);
    const endDate = new Date(end);
    const diff = (endDate.getTime() - currentDate.getTime()) / 1000 / 24 / 60 / 60;
    if(diff < 0){
      return(<P className="active">{currentDate.toISOString().split('T')[0] + " " + currentDate.toISOString().split('T')[1].split('.')[0]}</P>)
    } else {
      return (<P>{currentDate.toISOString().split('T')[0] + " " + currentDate.toISOString().split('T')[1].split('.')[0]}</P>)
    }
  };

  return<>
    {
      items &&
      <Container>
        <TableBox>
          <H2>과제</H2>
          <Table 
            headers={headers}
            items={postsData(items)}
            selectable={false}
          />
        </TableBox>
        <Pagination limit={limit} page={page} totalPosts={items.length} setPage={setPage} />
      </Container>
    } 
  </>
}