import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Table } from "../../components/Table";
import '../../styles/trainer_hw_table.css';
import { Pagination } from "../../components/Pagination";

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

const SearchBox = styled.div`
  display: flex;
  gap: 0.2rem;
  input {
    padding: 0.3rem;
  }
  button {
    border: 0;
    border-radius: 5px;
    color: white;
    padding: 5px 15px;
    background-color: #5f7dcf;
  }
`;

const ButtonBox = styled.div`
  display: flex;
  justify-content: space-between;
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

export function TrainerHW() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [searchOption, setSearchOption] = useState("all");
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
    if(button === 1) {return(<SuccessButton onClick={()=>navigate('/lms/t')}>채점완료</SuccessButton>)}
    else {return(<SecondaryButton onClick={()=>navigate('/lms/t')}>채점하기</SecondaryButton>)};
  };

  function onSearch(e) {
    e.preventDefault();
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
      text: '제출현황',
      value: 'submitHits'
    },
    {
      text: '채점하기',
      value: 'submitScore'
    },
  ];
  
  const items = [
    {
      no: 1,
      title: '교육상담아무말이나해봐아무말이나해봐아무',
      writer: '가나다',
      startDate: '2023-10-01',
      endDate: '2023-11-05',
      submitHits: '10',
      submitScore: changeButton(1)
    },
    {
      no: 2,
      title: '교육상담아무말이나해봐아무말이나해봐아무',
      writer: '가나다',
      startDate: '2023-10-01',
      endDate: '2023-11-05',
      submitHits: '10',
      submitScore: changeButton(0)
    },
    {
      no: 3,
      title: '교육상담아무말이나해봐아무말이나해봐아무',
      writer: '가나다',
      startDate: '2023-10-01',
      endDate: '2023-11-05',
      submitHits: '10',
      submitScore: changeButton(1)
    },
    {
      no: 4,
      title: '교육상담아무말이나해봐아무말이나해봐아무',
      writer: '가나다',
      startDate: '2023-10-01',
      endDate: '2023-11-05',
      submitHits: '10',
      submitScore: changeButton(1)
    },
    {
      no: 5,
      title: '교육상담아무말이나해봐아무말이나해봐아무',
      writer: '가나다',
      startDate: '2023-10-01',
      endDate: '2023-11-05',
      submitHits: '10',
      submitScore: changeButton(1)
    },
    {
      no: 6,
      title: '교육상담아무말이나해봐아무말이나해봐아무',
      writer: '가나다',
      startDate: '2023-10-01',
      endDate: '2023-11-05',
      submitHits: '10',
      submitScore: changeButton(1)
    },
    {
      no: 7,
      title: '교육상담아무말이나해봐아무말이나해봐아무',
      writer: '가나다',
      startDate: '2023-10-01',
      endDate: '2023-11-05',
      submitHits: '10',
      submitScore: changeButton(0)
    },
    {
      no: 8,
      title: '교육상담아무말이나해봐아무말이나해봐아무',
      writer: '가나다',
      startDate: '2023-10-01',
      endDate: '2023-11-05',
      submitHits: '10',
      submitScore: changeButton(1)
    },
    {
      no: 9,
      title: '교육상담아무말이나해봐아무말이나해봐아무',
      writer: '가나다',
      startDate: '2023-10-01',
      endDate: '2023-11-05',
      submitHits: '10',
      submitScore: changeButton(0)
    },
    {
      no: 10,
      title: '교육상담아무말이나해봐아무말이나해봐아무',
      writer: '가나다',
      startDate: '2023-10-01',
      endDate: '2023-11-05',
      submitHits: '10',
      submitScore: changeButton(0)
    },
    {
      no: 11,
      title: '교육상담아무말이나해봐아무말이나해봐아무',
      writer: '가나다',
      startDate: '2023-10-01',
      endDate: '2023-11-05',
      submitHits: '10',
      submitScore: changeButton(0)
    },
    {
      no: 12,
      title: '교육상담아무말이나해봐아무말이나해봐아무',
      writer: '가나다',
      startDate: '2023-10-01',
      endDate: '2023-11-05',
      submitHits: '10',
      submitScore: changeButton(0)
    },
    {
      no: 13,
      title: '교육상담아무말이나해봐아무말이나해봐아무',
      writer: '가나다',
      startDate: '2023-10-01',
      endDate: '2023-11-05',
      submitHits: '10',
      submitScore: changeButton(0)
    },
    {
      no: 14,
      title: '교육상담아무말이나해봐아무말이나해봐아무',
      writer: '가나다',
      startDate: '2023-10-01',
      endDate: '2023-11-05',
      submitHits: '10',
      submitScore: changeButton(0)
    },
    {
      no: 15,
      title: '교육상담아무말이나해봐아무말이나해봐아무',
      writer: '가나다',
      startDate: '2023-10-01',
      endDate: '2023-11-05',
      submitHits: '10',
      submitScore: changeButton(1)
    },
    {
      no: 16,
      title: '교육상담아무말이나해봐아무말이나해봐아무',
      writer: '가나다',
      startDate: '2023-10-01',
      endDate: '2023-11-05',
      submitHits: '10',
      submitScore: changeButton(1)
    },
    {
      no: 17,
      title: '교육상담아무말이나해봐아무말이나해봐아무',
      writer: '가나다',
      startDate: '2023-10-01',
      endDate: '2023-11-05',
      submitHits: '10',
      submitScore: changeButton(1)
    },
    {
      no: 18,
      title: '교육상담아무말이나해봐아무말이나해봐아무',
      writer: '가나다',
      startDate: '2023-10-01',
      endDate: '2023-11-05',
      submitHits: '10',
      submitScore: changeButton(0)
    },
    {
      no: 19,
      title: '교육상담아무말이나해봐아무말이나해봐아무',
      writer: '가나다',
      startDate: '2023-10-01',
      endDate: '2023-11-05',
      submitHits: '10',
      submitScore: changeButton(1)
    },
    {
      no: 20,
      title: '교육상담아무말이나해봐아무말이나해봐아무',
      writer: '가나다',
      startDate: '2023-10-01',
      endDate: '2023-11-05',
      submitHits: '10',
      submitScore: changeButton(1)
    },
    {
      no: 21,
      title: '교육상담아무말이나해봐아무말이나해봐아무',
      writer: '가나다',
      startDate: '2023-10-01',
      endDate: '2023-11-05',
      submitHits: '10',
      submitScore: changeButton(0)
    },
    {
      no: 22,
      title: '교육상담아무말이나해봐아무말이나해봐아무',
      writer: '가나다',
      startDate: '2023-10-01',
      endDate: '2023-11-05',
      submitHits: '10',
      submitScore: changeButton(1)
    },
    {
      no: 23,
      title: '교육상담아무말이나해봐아무말이나해봐아무',
      writer: '가나다',
      startDate: '2023-10-01',
      endDate: '2023-11-05',
      submitHits: '10',
      submitScore: changeButton(1)
    },
    {
      no: 24,
      title: '교육상담아무말이나해봐아무말이나해봐아무',
      writer: '가나다',
      startDate: '2023-10-01',
      endDate: '2023-11-05',
      submitHits: '10',
      submitScore: changeButton(1)
    },
    {
      no: 25,
      title: '교육상담아무말이나해봐아무말이나해봐아무',
      writer: '가나다',
      startDate: '2023-10-01',
      endDate: '2023-11-05',
      submitHits: '10',
      submitScore: changeButton(0)
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
      <ButtonBox>
        <SearchBox>
          <select className="searchSelect" onChange={(e) => setSearchOption(e.target.value)}>
            <option key="all" value="all">전체</option>
            <option key="title" value="title">제목</option>
            <option key="writer" value="writer">작성자</option>
          </select>
          <input id="search" value={search} onChange={(e) => setSearch(e.target.value)} />
          <button onClick={onSearch}>검색</button>
        </SearchBox>
        <PrimaryButton onClick={() => navigate("/lms/t")}>작성</PrimaryButton>
      </ButtonBox>
      <Pagination limit={limit} page={page} totalPosts={items.length} setPage={setPage} />
    </Container>
  </>
}