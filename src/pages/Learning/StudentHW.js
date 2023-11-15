import styled from "styled-components";
import { Pagination } from "../../components/Pagination";
import { useState } from "react";
import { Table } from "../../components/Table";
import '../../styles/student_hw_table.css';
import { useNavigate } from "react-router-dom";
import { academics, feedbacks, homeworks, submits, userList } from "../../assets/TempData";

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
  const id = 1; // subject 값 받아오기
  const studentid = 1; // studentid 값 받아오기
  const homework = homeworks.filter(h => h.subject_id == id);
  const submit = submits.filter(s => s.student_id == studentid);

  
  const shortenTitle = (str, length) => {
    let result = '';
    if (str.length > length) {
      result = str.substr(0, length - 2) + '...';
    } else {
      result = str;
    }
    return result;
  };

  const items = homework.map((h, i) => (
    {
      no: i + 1,
      title: titleLink(h.homework_id, shortenTitle(h.hw_title, 35)),
      writer: userList.find(u => u.uid == academics.find(a => a.academic_id == h.academic_id).uid).user_name,
      startDate: h.hw_start_date,
      endDate: h.hw_end_date,
      submit: disabledBtn(h.homework_id),
      submitState: changeButton(submit.find(s => s.homework_id == h.homework_id).submit_id),
      submitTime: changeColor(h.hw_end_date, submit.find(s => s.homework_id == h.homework_id).submit_mod_date)
    }
  ));

  function titleLink(id, title) {
    return (<p onClick={() => navigate(`${id}`)}>{title}</p>);
  }

  const postsData = (posts) => {
    if(posts) {
      let result = posts.slice(offset, offset + limit);
      return result;
    }
  };

  function disabledBtn(id) {
    let temp;
    let isFeedback = false;
    if(submit.find((s) => s.homework_id == id)) {
      temp = submit.find((s) => s.homework_id == id);
      if(feedbacks.find((f) => f.submit_id == temp.submit_id)) {
        isFeedback = true;
      }
    }
    if(!isFeedback){
      return(<PrimaryButton onClick={()=>navigate(`/lms/s/homework/${id}/submit`, { state: id })}><p>제출하기</p></PrimaryButton>)
    } else {
      return (<PrimaryButton className="disabled" disabled><p>제출하기</p></PrimaryButton>)
    }
  };

  function changeButton(id) {
    let temp;
    if(feedbacks.find((f) => f.submit_id == id)) {
      temp = submits.find((h) => h.submit_id == id).homework_id;
      return(<SuccessButton onClick={() => navigate(`/lms/s/homework/${temp}/feedback`, { state: temp })}><p>결과확인</p></SuccessButton>)
    }
    else if(id) {
      temp = submits.find((h) => h.submit_id == id).homework_id;
      return(<PrimaryButton onClick={() => navigate(`/lms/s/homework/${temp}/feedback`, { state: temp })}><p>제출확인</p></PrimaryButton>)
    }
    else {
      return(<SecondaryButton><p>제출대기</p></SecondaryButton>)
    }
  };

  function changeColor(end, submitDate) {
    const currentDate = new Date(submitDate);
    const endDate = new Date(end);
    const diff = (endDate.getTime() - currentDate.getTime()) / 1000 / 24 / 60 / 60;
    if(diff < 0){
      return(<P className="active">{submitDate}</P>)
    } else {
      return (<P>{submitDate}</P>)
    }
  };

  return<>
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
  </>
}