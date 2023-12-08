import { useState } from "react";
import styled from "styled-components";
import { StudentDetailForm } from "../../components/StudentDetailForm";
import { ChangePW } from "../../components/ChangePW";
import { StudentAttendance } from "./StudentAttendance";
import { StudentReview } from "./StudentReview";
import { StudentScore } from "./StudentScore";
import { MyPost } from "../../components/MyPost";
import { MyReply } from "../../components/MyReply";
import { getAllManagers, getCourseById, getStudentAttendanceByStudentId, getStudentByStudentId } from "../Api";
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
  const [page, setPage] = useState(<MyPost />);
  const [active, setActive] = useState(['active', '', '', '', '']);
  
  function changeActive(i) {
    let temp = ['', '', '', '', ''];
    temp[i] = 'active';
    setActive(temp);
  }
  
  return<>
    {
      <Container>
        <TableBox>
          <Btn className={active[0]} onClick={()=>{setPage(<MyPost />); changeActive(0)}}><p>내 게시글 관리</p></Btn>
          <Btn className={active[1]} onClick={()=>{setPage(<StudentDetailForm />); changeActive(1)}}><p>개인정보수정</p></Btn>
          <Btn className={active[2]} onClick={()=>{setPage(<ChangePW />); changeActive(2)}}><p>비밀번호수정</p></Btn>
          <Btn className={active[3]} onClick={()=>{setPage(<StudentAttendance />); changeActive(3)}}><p>출결관리</p></Btn>
          <Btn className={active[4]} onClick={()=>{setPage(<StudentScore />); changeActive(4)}}><p>성적조회</p></Btn>
          <Btn className={active[5]} onClick={()=>{setPage(<StudentReview />); changeActive(5)}}><p>강의평가</p></Btn>
          <div>
            {page}
          </div>
        </TableBox>
      </Container>
    } 
  </>
}