import styled from "styled-components";
import { Pagination } from "../../components/Pagination";
import { useState } from "react";
import { Table } from "../../components/Table";
import '../../styles/student_hw_table.css';
import { useNavigate } from "react-router-dom";

const PrimaryButton = styled.button`
  background-color: #5f7dcf;
  padding: 2px 15px;
  color: white;
  font-weight: 500;
  font-size: 0.8rem;
  border-radius: 5px;
  border: 0;
  &.disabled{
    background-color: gray;
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
`;

const SecondaryButton = styled.button`
  background-color: gray;
  padding: 2px 15px;
  color: white;
  font-weight: 500;
  font-size: 0.8rem;
  border-radius: 5px;
  border: 0;
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

export function StudentHW() {
  const [page, setPage] = useState(1);
  const limit = 10;
  const offset = (page - 1) * limit;
  const navigate = useNavigate();

  const postsData = (posts) => {
    if(posts) {
      let result = posts.slice(offset, offset + limit);
      return result;
    }
  };

  function changeButton(button) {
    if(button === 1) {return(<SuccessButton onClick={()=>navigate('/lms/s')}>결과확인</SuccessButton>)}
    else {return(<SecondaryButton onClick={()=>navigate('/lms/s')}>제출확인</SecondaryButton>)};
  };

  const newDate = new Date();
  const date =  newDate.getTime();

  console.log(date);

  function disabledBtn(end) {
    end = new Date(end);
    const endDate = end.getTime();
    if(date < endDate){
      return(<PrimaryButton onClick={()=>navigate('/lms/s')}>채점하기</PrimaryButton>)
    } else {
      return (<PrimaryButton className="disabled" disabled>채점하기</PrimaryButton>)
    }
  };
  
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
      text: '제출상황',
      value: 'submitState'
    },
    {
      text: '제출시간',
      value: 'submitTime'
    },
  ];
  
  const items = [
    {
      no: 1,
      title: '교육상담아무말이나해봐아무말이나해봐아무',
      writer: '가나다',
      startDate: '2023-10-01',
      endDate: '2023-11-05',
      submit: disabledBtn('2023-11-05'),
      submitState: changeButton(1),
      submitTime: 'yyyy-mm-dd hh:mm:ss'
    },
    {
      no: 2,
      title: '교육상담아무말이나해봐아무말이나해봐아무말이나해봐',
      writer: '가나다',
      startDate: '2023-10-01',
      endDate: '2023-10-25',
      submit: disabledBtn('2023-10-25'),
      submitState: changeButton(1),
      submitTime: 'yyyy-mm-dd hh:mm:ss'
    },
    {
      no: 3,
      title: '교육상담아무말이나해봐아무말이나해봐아무말이나',
      writer: '가나다',
      startDate: '2023-10-01',
      endDate: '2023-10-25',
      submit: disabledBtn('2023-10-25'),
      submitState: changeButton(1),
      submitTime: 'yyyy-mm-dd hh:mm:ss'
    },
    {
      no: 4,
      title: '교육상담아무말이나해봐아무말이나해봐아무말이나',
      writer: '가나다',
      startDate: '2023-10-01',
      endDate: '2023-10-25',
      submit: disabledBtn('2023-10-25'),
      submitState: changeButton(1),
      submitTime: 'yyyy-mm-dd hh:mm:ss'
    },
    {
      no: 5,
      title: '교육상담아무말이나해봐아무말이나해봐아무',
      writer: '가나다',
      startDate: '2023-10-01',
      endDate: '2023-10-25',
      submit: disabledBtn('2023-10-25'),
      submitState: changeButton(0),
      submitTime: 'yyyy-mm-dd hh:mm:ss'
    },
    {
      no: 6,
      title: '교육상담아무말이나해봐아무말이나해',
      writer: '가나다',
      startDate: '2023-10-01',
      endDate: '2023-10-25',
      submit: disabledBtn('2023-10-25'),
      submitState: changeButton(0),
      submitTime: 'yyyy-mm-dd hh:mm:ss'
    },
    {
      no: 7,
      title: '교육상담아무말이나해봐아무말이나해봐아',
      writer: '가나다',
      startDate: '2023-10-01',
      endDate: '2023-10-25',
      submit: disabledBtn('2023-10-25'),
      submitState: changeButton(0),
      submitTime: 'yyyy-mm-dd hh:mm:ss'
    },
    {
      no: 8,
      title: '교육상담아무말이나해봐아무말이나해봐아',
      writer: '가나다',
      startDate: '2023-10-01',
      endDate: '2023-10-25',
      submit: disabledBtn('2023-10-25'),
      submitState: changeButton(1),
      submitTime: 'yyyy-mm-dd hh:mm:ss'
    },
    {
      no: 9,
      title: '교육상담아무말이나해봐아무말이나해봐아',
      writer: '가나다',
      startDate: '2023-10-01',
      endDate: '2023-10-25',
      submit: disabledBtn('2023-10-25'),
      submitState: changeButton(1),
      submitTime: 'yyyy-mm-dd hh:mm:ss'
    },
    {
      no: 10,
      title: '교육상담아무말이나해봐아무말이',
      writer: '가나다',
      startDate: '2023-10-01',
      endDate: '2023-10-25',
      submit: disabledBtn('2023-10-25'),
      submitState: changeButton(1),
      submitTime: 'yyyy-mm-dd hh:mm:ss'
    },
    {
      no: 11,
      title: '교육상담아무',
      writer: '가나다',
      startDate: '2023-10-01',
      endDate: '2023-10-25',
      submit: disabledBtn('2023-10-25'),
      submitState: changeButton(0),
      submitTime: 'yyyy-mm-dd hh:mm:ss'
    },
    {
      no: 12,
      title: '교육상담아무말이나해봐아무',
      writer: '가나다',
      startDate: '2023-10-01',
      endDate: '2023-10-25',
      submit: disabledBtn('2023-10-25'),
      submitState: changeButton(1),
      submitTime: 'yyyy-mm-dd hh:mm:ss'
    },
    {
      no: 13,
      title: '교육상담아무말이나해봐아무',
      writer: '가나다',
      startDate: '2023-10-01',
      endDate: '2023-10-25',
      submit: disabledBtn('2023-10-25'),
      submitState: changeButton(0),
      submitTime: 'yyyy-mm-dd hh:mm:ss'
    },
    {
      no: 14,
      title: '교육상담아무말이나해봐아무말',
      writer: '가나다',
      startDate: '2023-10-01',
      endDate: '2023-10-25',
      submit: disabledBtn('2023-10-25'),
      submitState: changeButton(0),
      submitTime: 'yyyy-mm-dd hh:mm:ss'
    },
    {
      no: 15,
      title: '교육상담아무말이나해봐',
      writer: '가나다',
      startDate: '2023-10-01',
      endDate: '2023-10-25',
      submit: disabledBtn('2023-10-25'),
      submitState: changeButton(1),
      submitTime: 'yyyy-mm-dd hh:mm:ss'
    },
    {
      no: 16,
      title: '교육상담아무말이나해봐아무',
      writer: '가나다',
      startDate: '2023-10-01',
      endDate: '2023-10-25',
      submit: disabledBtn('2023-10-25'),
      submitState: changeButton(1),
      submitTime: 'yyyy-mm-dd hh:mm:ss'
    },
    {
      no: 17,
      title: '교육상담아무말이나해봐아무말이나',
      writer: '가나다',
      startDate: '2023-10-01',
      endDate: '2023-10-25',
      submit: disabledBtn('2023-10-25'),
      submitState: changeButton(1),
      submitTime: 'yyyy-mm-dd hh:mm:ss'
    },
    {
      no: 18,
      title: '교육상담아무말이나해봐아무말이나해봐',
      writer: '가나다',
      startDate: '2023-10-01',
      endDate: '2023-10-25',
      submit: disabledBtn('2023-10-25'),
      submitState: changeButton(1),
      submitTime: 'yyyy-mm-dd hh:mm:ss'
    },
    {
      no: 19,
      title: '교육상담아무말이나해봐아무말이나',
      writer: '가나다',
      startDate: '2023-10-01',
      endDate: '2023-10-25',
      submit: disabledBtn('2023-10-25'),
      submitState: changeButton(0),
      submitTime: 'yyyy-mm-dd hh:mm:ss'
    },
    {
      no: 20,
      title: '교육상담아무말이나해봐아무말이나해',
      writer: '가나다',
      startDate: '2023-10-01',
      endDate: '2023-10-25',
      submit: disabledBtn('2023-10-25'),
      submitState: changeButton(0),
      submitTime: 'yyyy-mm-dd hh:mm:ss'
    },
    {
      no: 21,
      title: '교육상담아무말이나해봐아무말이나해',
      writer: '가나다',
      startDate: '2023-10-01',
      endDate: '2023-10-25',
      submit: disabledBtn('2023-10-25'),
      submitState: changeButton(0),
      submitTime: 'yyyy-mm-dd hh:mm:ss'
    },
    {
      no: 22,
      title: '교육상담아무말이나해봐아무말이',
      writer: '가나다',
      startDate: '2023-10-01',
      endDate: '2023-10-25',
      submit: disabledBtn('2023-10-25'),
      submitState: changeButton(0),
      submitTime: 'yyyy-mm-dd hh:mm:ss'
    },
    {
      no: 23,
      title: '교육상담아무말이나해봐아무말이나해봐아무말',
      writer: '가나다',
      startDate: '2023-10-01',
      endDate: '2023-10-25',
      submit: disabledBtn('2023-10-25'),
      submitState: changeButton(1),
      submitTime: 'yyyy-mm-dd hh:mm:ss'
    },
    {
      no: 24,
      title: '교육상담아무말이나해봐아무말이나해',
      writer: '가나다',
      startDate: '2023-10-01',
      endDate: '2023-10-25',
      submit: disabledBtn('2023-10-25'),
      submitState: changeButton(0),
      submitTime: 'yyyy-mm-dd hh:mm:ss'
    },
    {
      no: 25,
      title: '교육상담아무말이나해봐아무말',
      writer: '가나다',
      startDate: '2023-10-01',
      endDate: '2023-10-25',
      submit: disabledBtn('2023-10-25'),
      submitState: changeButton(0),
      submitTime: 'yyyy-mm-dd hh:mm:ss'
    },
  ];

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