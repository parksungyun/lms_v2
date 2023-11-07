import { useState } from "react";
import styled from "styled-components";
import { TrainerCourseHistory } from "../../components/TrainerCourseHistory";
import { TrainerDetailForm } from "../../components/TrainerDetailForm";
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

export function TrainerMypage() {
  const [page, setPage] = useState(<TrainerCourseHistory />);
  const [active, setActive] = useState(['active', '', '']);
  
  function changeActive(i) {
    let temp = ['', '', ''];
    temp[i-1] = 'active';
    setActive(temp);
  }
  return<>
    <Container>
      <TableBox>
        <Btn className={active[0]} onClick={()=>{setPage(<TrainerCourseHistory />); changeActive(1)}}><p>강의 이력</p></Btn>
        <Btn className={active[1]} onClick={()=>{setPage(<TrainerDetailForm />); changeActive(2)}}><p>개인정보수정</p></Btn>
        <Btn className={active[2]} onClick={()=>{setPage(<ChangePW />); changeActive(3)}}><p>비밀번호수정</p></Btn>
        <div>
          {page}
        </div>
      </TableBox>
    </Container>
  </>
}