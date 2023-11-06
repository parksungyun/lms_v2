import { useState } from "react";
import styled from "styled-components";
import { ManagerCourseHistory } from "../../components/ManagerCourseHistory";
import { ManagerDetailForm } from "../../components/ManagerDetailForm";
import { ChangePW } from "../../components/ChangePW";

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

export function ManagerMypage() {
  const [page, setPage] = useState(<ManagerCourseHistory />);
  const [active, setActive] = useState(['active', '', '']);
  
  function changeActive(i) {
    let temp = ['', '', ''];
    temp[i-1] = 'active';
    setActive(temp);
  }
  return<>
    <Container>
      <TableBox>
        <Btn className={active[0]} onClick={()=>{setPage(<ManagerCourseHistory />); changeActive(1)}}>과정 이력</Btn>
        <Btn className={active[1]} onClick={()=>{setPage(<ManagerDetailForm />); changeActive(2)}}>개인정보수정</Btn>
        <Btn className={active[2]} onClick={()=>{setPage(<ChangePW />); changeActive(3)}}>비밀번호수정</Btn>
        <div>
          {page}
        </div>
      </TableBox>
    </Container>
  </>
}