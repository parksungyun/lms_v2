import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Table } from "../../components/Table";
import '../../styles/trainer_hw_table.css';
import { Pagination } from "../../components/Pagination";

const BadgeSuccess = styled.span`
  background-color: green;
  padding: 2px 15px;
  color: white;
  font-weight: 500;
  font-size: 0.8rem;
  border-radius: 5px;
  `;

const BadgeSecondary = styled.span`
  background-color: gray;
  padding: 2px 15px;
  color: white;
  font-weight: 500;
  font-size: 0.8rem;
  border-radius: 5px;
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

const ButtonBox = styled.div`
  display: flex;
  justify-content: end;
  margin-top: 2rem;
  margin-right: 1.4rem;
`;

const PrimaryButton = styled.button`
  border: 0;
  border-radius: 5px;
  background-color: #5f7dcf;
  padding: 0.6rem 1.4rem;
  color: white;
`;

export function StudentCourseQna() {
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

  function changeReply(reply) {
    if(reply === 1) {return(<BadgeSuccess>답변완료</BadgeSuccess>)}
    else {return(<BadgeSecondary>답변대기</BadgeSecondary>)};
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
      text: '등록일',
      value: 'regDate'
    },
    {
      text: '답변상태',
      value: 'replyState'
    },
  ];
  
  const items = [
    {
      no: 1,
      title: '교육상담아무말이나해봐아무말이나해봐아무',
      regDate: '2023-10-01',
      replyState: changeReply(1)
    },
    {
      no: 2,
      title: '교육상담아무말이나해봐아무말이나해봐아무',
      regDate: '2023-10-01',
      replyState: changeReply(0)
    },
    {
      no: 3,
      title: '교육상담아무말이나해봐아무말이나해봐아무',
      regDate: '2023-10-01',
      replyState: changeReply(1)
    },
    {
      no: 4,
      title: '교육상담아무말이나해봐아무말이나해봐아무',
      regDate: '2023-10-01',
      replyState: changeReply(1)
    },
    {
      no: 5,
      title: '교육상담아무말이나해봐아무말이나해봐아무',
      regDate: '2023-10-01',
      replyState: changeReply(0)
    },
    {
      no: 6,
      title: '교육상담아무말이나해봐아무말이나해봐아무',
      regDate: '2023-10-01',
      replyState: changeReply(0)
    },
    {
      no: 7,
      title: '교육상담아무말이나해봐아무말이나해봐아무',
      regDate: '2023-10-01',
      replyState: changeReply(1)
    },
    {
      no: 8,
      title: '교육상담아무말이나해봐아무말이나해봐아무',
      regDate: '2023-10-01',
      replyState: changeReply(0)
    },
    {
      no: 9,
      title: '교육상담아무말이나해봐아무말이나해봐아무',
      regDate: '2023-10-01',
      replyState: changeReply(1)
    },
    {
      no: 10,
      title: '교육상담아무말이나해봐아무말이나해봐아무',
      regDate: '2023-10-01',
      replyState: changeReply(1)
    },
    {
      no: 11,
      title: '교육상담아무말이나해봐아무말이나해봐아무',
      regDate: '2023-10-01',
      replyState: changeReply(1)
    },
    {
      no: 12,
      title: '교육상담아무말이나해봐아무말이나해봐아무',
      regDate: '2023-10-01',
      replyState: changeReply(0)
    },
    {
      no: 13,
      title: '교육상담아무말이나해봐아무말이나해봐아무',
      regDate: '2023-10-01',
      replyState: changeReply(0)
    },
    {
      no: 14,
      title: '교육상담아무말이나해봐아무말이나해봐아무',
      regDate: '2023-10-01',
      replyState: changeReply(1)
    },
    {
      no: 15,
      title: '교육상담아무말이나해봐아무말이나해봐아무',
      regDate: '2023-10-01',
      replyState: changeReply(1)
    },
    {
      no: 16,
      title: '교육상담아무말이나해봐아무말이나해봐아무',
      regDate: '2023-10-01',
      replyState: changeReply(1)
    },
    {
      no: 17,
      title: '교육상담아무말이나해봐아무말이나해봐아무',
      regDate: '2023-10-01',
      replyState: changeReply(0)
    },
    {
      no: 18,
      title: '교육상담아무말이나해봐아무말이나해봐아무',
      regDate: '2023-10-01',
      replyState: changeReply(0)
    },
    {
      no: 19,
      title: '교육상담아무말이나해봐아무말이나해봐아무',
      regDate: '2023-10-01',
      replyState: changeReply(1)
    },
    {
      no: 20,
      title: '교육상담아무말이나해봐아무말이나해봐아무',
      regDate: '2023-10-01',
      replyState: changeReply(0)
    },
    {
      no: 21,
      title: '교육상담아무말이나해봐아무말이나해봐아무',
      regDate: '2023-10-01',
      replyState: changeReply(0)
    },
    {
      no: 22,
      title: '교육상담아무말이나해봐아무말이나해봐아무',
      regDate: '2023-10-01',
      replyState: changeReply(1)
    },
    {
      no: 23,
      title: '교육상담아무말이나해봐아무말이나해봐아무',
      regDate: '2023-10-01',
      replyState: changeReply(0)
    },
    {
      no: 24,
      title: '교육상담아무말이나해봐아무말이나해봐아무',
      regDate: '2023-10-01',
      replyState: changeReply(0)
    },
    {
      no: 25,
      title: '교육상담아무말이나해봐아무말이나해봐아무',
      regDate: '2023-10-01',
      replyState: changeReply(1)
    },
  ];

  return<>
    <Container>
      <TableBox>
        <H2>1:1 문의</H2>
        <Table 
          headers={headers}
          items={postsData(items)}
          selectable={false}
        />
      </TableBox>
      <ButtonBox>
        <PrimaryButton onClick={() => navigate("/lms/s")}>1:1 문의하기</PrimaryButton>
      </ButtonBox>
      <Pagination limit={limit} page={page} totalPosts={items.length} setPage={setPage} />
    </Container>
  </>
}