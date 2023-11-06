import { useState } from "react";
import styled from "styled-components";
import { StudentDetailForm } from "../../components/StudentDetailForm";
import { ChangePW } from "../../components/ChangePW";
import { StudentAttendance } from "./StudentAttendance";
import { StudentReview } from "./StudentReview";
import { StudentScore } from "./StudentScore";

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


export function StudentMypage() {
  const [page, setPage] = useState(<StudentAttendance />);
  const [active, setActive] = useState(['active', '', '', '', '']);
  
  function changeActive(i) {
    let temp = ['', '', '', '', ''];
    temp[i] = 'active';
    setActive(temp);
  }
  return<>
    <Container>
      <TableBox>
        <Btn className={active[0]} onClick={()=>{setPage(<StudentAttendance />); changeActive(0)}}>출결관리</Btn>
        <Btn className={active[1]} onClick={()=>{setPage(<StudentReview />); changeActive(1)}}>강의평가</Btn>
        <Btn className={active[2]} onClick={()=>{setPage(<StudentScore />); changeActive(2)}}>성적조회</Btn>
        <Btn className={active[3]} onClick={()=>{setPage(<StudentDetailForm />); changeActive(3)}}>개인정보수정</Btn>
        <Btn className={active[4]} onClick={()=>{setPage(<ChangePW />); changeActive(4)}}>비밀번호수정</Btn>
        <div>
          {page}
        </div>
      </TableBox>
    </Container>
  </>
}