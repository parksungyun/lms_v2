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
  const [page, setPage] = useState(<StudentReview />);
  const [active, setActive] = useState(['active', '', '', '', '']);
  const id = sessionStorage.getItem("id"); // studentId
  const [user, setUser] = useState(null);
  const [course, setCourse] = useState(null);
  const [academic, setAcademic] = useState(null);
  const [attendance, setAttendance] = useState(null);

  useEffect(() => {
    if(!academic) {
      const promise = getAllManagers();
      const getData = () => {
        promise.then((data) => {
          setAcademic(data);
        });
      };
      getData();
    }
    if(!user) {
      const promise = getStudentByStudentId(id);
      const getData = () => {
        promise.then((data) => {
          setAcademic(data);
        });
      };
      getData();
    }
    if(!attendance) {
      const promise = getStudentAttendanceByStudentId(id);
      const getData = () => {
        promise.then((data) => {
          setAttendance(data);
        });
      };
      getData();
    }
  });

  useEffect(() => {
    if(user) {
      if(!course) {
        const promise = getCourseById(user.student.courseId);
        const getData = () => {
          promise.then((data) => {
            setCourse(data);
          });
        };
        getData();
      }
    }
  }, [user]);
  
  function changeActive(i) {
    let temp = ['', '', '', '', ''];
    temp[i] = 'active';
    setActive(temp);
  }
  return<>
    {
      // (user && academic && course && attendance) &&
      <Container>
        <TableBox>
          <Btn className={active[0]} onClick={()=>{setPage(<StudentReview />); changeActive(0)}}><p>강의평가</p></Btn>
          <Btn className={active[1]} onClick={()=>{setPage(<StudentAttendance />); changeActive(1)}}><p>출결관리</p></Btn>
          <Btn className={active[2]} onClick={()=>{setPage(<StudentScore />); changeActive(2)}}><p>성적조회</p></Btn>
          <Btn className={active[3]} onClick={()=>{setPage(<MyPost />); changeActive(3)}}><p>내 게시글 관리</p></Btn>
          <Btn className={active[4]} onClick={()=>{setPage(<StudentDetailForm />); changeActive(4)}}><p>개인정보수정</p></Btn>
          <Btn className={active[5]} onClick={()=>{setPage(<ChangePW />); changeActive(5)}}><p>비밀번호수정</p></Btn>
          <div>
            {page}
          </div>
        </TableBox>
      </Container>
    } 
  </>
}