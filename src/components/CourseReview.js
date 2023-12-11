import styled from "styled-components";
import { Table } from "./Table";
import { academics, courses, students, subjects, userList } from "../assets/TempData";

const Box = styled.div`
  border-bottom: 2px solid #ddd;
  border-top: 2px solid #ddd;
  width: 100%;
  display: flex;
  margin: 1.5rem 0;
  margin-top: 8px;
  padding: 5px 15px;
`;

const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Bold = styled.p`
  font-weight: bold;
  font-size: 1.2rem;
`;

const headers = [
  {
    text: 'No.',
    value: 'no'
  },
  {
    text: '작성자',
    value: 'writer'
  },
  {
    text: '점수',
    value: 'score'
  },
  {
    text: '내용',
    value: 'content'
  },
];

export function CourseReview({items, subject, student, academic}) {

  let sum = 0;
  let average = 0;
  if(items.length > 0) {
    items.map((i) => {
      sum += i.reviewScore;
    });
    average = sum / items.length;
  }

  return<>
    <Box>
      <ContentBox className='col-2'>
        <Bold>강사</Bold>
        <p>{academic.find((a) => a.academic.academicId === subject.subject.academicId).user.userName}</p>
      </ContentBox>
      <ContentBox className='col-3'>
        <Bold>전체</Bold>
        <p>{student.length}</p>
      </ContentBox>
      <ContentBox className='col-3'>
        <Bold>제출</Bold>
        <p>{items.length}</p>
      </ContentBox>
      <ContentBox className='col-3'>
        <Bold>미제출</Bold>
        <p>{student.length - items.length}</p>
      </ContentBox>
      <ContentBox className='col-1'>
        <Bold>평균</Bold>
        <p>{average}</p>
      </ContentBox>
    </Box>
    <Table 
      headers={headers}
      items={items}
      selectable={false}
    />
  </>
}