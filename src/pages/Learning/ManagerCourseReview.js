import styled from "styled-components";
import { CourseReview } from "../../components/CourseReview";
import { useState } from "react";

const items1 = [
  {
    no: 1,
    writer: '가나다',
    score: 5,
    content: '몇점을 주어야 할까요 그냥 만점 드렸습니다'
  },
  {
    no: 2,
    writer: '가나다',
    score: 5,
    content: '몇점을 주어야 할까요 그냥 만점 드렸습니다'
  },
  {
    no: 3,
    writer: '가나다',
    score: 5,
    content: '몇점을 주어야 할까요 그냥 만점 드렸습니다'
  },
  {
    no: 4,
    writer: '가나다',
    score: 5,
    content: '몇점을 주어야 할까요 그냥 만점 드렸습니다'
  },
  {
    no: 5,
    writer: '가나다',
    score: 5,
    content: '몇점을 주어야 할까요 그냥 만점 드렸습니다'
  },
];

const items2 = [
  {
    no: 1,
    writer: '가나다',
    score: 4,
    content: '몇점을 주어야 할까요 그냥 만점 드렸습니다'
  },
  {
    no: 2,
    writer: '가나다',
    score: 4,
    content: '몇점을 주어야 할까요 그냥 만점 드렸습니다'
  },
  {
    no: 3,
    writer: '가나다',
    score: 4,
    content: '몇점을 주어야 할까요 그냥 만점 드렸습니다'
  },
  {
    no: 4,
    writer: '가나다',
    score: 4,
    content: '몇점을 주어야 할까요 그냥 만점 드렸습니다'
  },
  {
    no: 5,
    writer: '가나다',
    score: 4,
    content: '몇점을 주어야 할까요 그냥 만점 드렸습니다'
  },
];

const items3 = [
  {
    no: 1,
    writer: '가나다',
    score: 3,
    content: '몇점을 주어야 할까요 그냥 만점 드렸습니다'
  },
  {
    no: 2,
    writer: '가나다',
    score: 3,
    content: '몇점을 주어야 할까요 그냥 만점 드렸습니다'
  },
  {
    no: 3,
    writer: '가나다',
    score: 3,
    content: '몇점을 주어야 할까요 그냥 만점 드렸습니다'
  },
  {
    no: 4,
    writer: '가나다',
    score: 3,
    content: '몇점을 주어야 할까요 그냥 만점 드렸습니다'
  },
  {
    no: 5,
    writer: '가나다',
    score: 3,
    content: '몇점을 주어야 할까요 그냥 만점 드렸습니다'
  },
];

const items4 = [
  {
    no: 1,
    writer: '가나다',
    score: 2,
    content: '몇점을 주어야 할까요 그냥 만점 드렸습니다'
  },
  {
    no: 2,
    writer: '가나다',
    score: 2,
    content: '몇점을 주어야 할까요 그냥 만점 드렸습니다'
  },
  {
    no: 3,
    writer: '가나다',
    score: 2,
    content: '몇점을 주어야 할까요 그냥 만점 드렸습니다'
  },
  {
    no: 4,
    writer: '가나다',
    score: 2,
    content: '몇점을 주어야 할까요 그냥 만점 드렸습니다'
  },
  {
    no: 5,
    writer: '가나다',
    score: 2,
    content: '몇점을 주어야 할까요 그냥 만점 드렸습니다'
  },
];

const items5 = [
  {
    no: 1,
    writer: '가나다',
    score: 1,
    content: '몇점을 주어야 할까요 그냥 만점 드렸습니다'
  },
  {
    no: 2,
    writer: '가나다',
    score: 1,
    content: '몇점을 주어야 할까요 그냥 만점 드렸습니다'
  },
  {
    no: 3,
    writer: '가나다',
    score: 1,
    content: '몇점을 주어야 할까요 그냥 만점 드렸습니다'
  },
  {
    no: 4,
    writer: '가나다',
    score: 1,
    content: '몇점을 주어야 할까요 그냥 만점 드렸습니다'
  },
  {
    no: 5,
    writer: '가나다',
    score: 1,
    content: '몇점을 주어야 할까요 그냥 만점 드렸습니다'
  },
];

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

const Hr = styled.hr`
  border: 0 #ddd;
  margin: 8px 0;
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

export function ManagerCourseReview() {
  const [item, setItem] = useState(items1);
  const [active, setActive] = useState(['active', '', '', '', '']);
  
  function changeActive(i) {
    let temp = ['', '', '', '', ''];
    temp[i-1] = 'active';
    setActive(temp);
  }
  return<>
    <Container>
      <TableBox>
        <H2>강의평가</H2>
        <Hr />
        <Btn className={active[0]} onClick={()=>{setItem(items1); changeActive(1)}}>강의1</Btn>
        <Btn className={active[1]} onClick={()=>{setItem(items2); changeActive(2)}}>강의2</Btn>
        <Btn className={active[2]} onClick={()=>{setItem(items3); changeActive(3)}}>강의3</Btn>
        <Btn className={active[3]} onClick={()=>{setItem(items4); changeActive(4)}}>강의4</Btn>
        <Btn className={active[4]} onClick={()=>{setItem(items5); changeActive(5)}}>강의5</Btn>
        <div>
          <CourseReview items={item}/>
        </div>
      </TableBox>
    </Container>
  </>
}