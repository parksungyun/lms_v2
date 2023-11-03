import styled from "styled-components";
import { Board } from "../../components/Board";
import { Table } from "../../components/Table";
import { Pagination } from "../../components/Pagination";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const managerABoard = [
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
    text: '작성일',
    value: 'writeDate'
  },
  {
    text: '등록일',
    value: 'regDate'
  },
  {
    text: '답변상태',
    value: 'replyState'
  }
];

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

function changeReply(reply) {
  if(reply === 1) return(<BadgeSuccess>답변완료</BadgeSuccess>);
  else return(<BadgeSecondary>답변대기</BadgeSecondary>);
};

const MAItems = [
  {
    no: 1,
    title: '교육상담아무말이나해봐아무말이나해봐아무해봐아무말이나해봐',
    writer: '가나다',
    writeDate: '2023-10-25',
    regDate: '2023-10-25',
    replyState: changeReply(0)
  },
  {
    no: 2,
    title: '교육상담아무말이나무말이나해봐',
    writer: '가나다',
    writeDate: '2023-10-25',
    regDate: '2023-10-25',
    replyState: changeReply(0)
  },
  {
    no: 3,
    title: '교육상담아무말이나해봐아무말이나해봐아무말이나해봐',
    writer: '가나다',
    writeDate: '2023-10-25',
    regDate: '2023-10-25',
    replyState: changeReply(1)
  },
  {
    no: 4,
    title: '교육상담아무말이나해봐아무말이나해무말이나해봐',
    writer: '가나다',
    writeDate: '2023-10-25',
    regDate: '2023-10-25',
    replyState: changeReply(0)
  },
  {
    no: 5,
    title: '교육상담아무말이나해봐아무말이나해봐아무말이나해봐',
    writer: '가나다',
    writeDate: '2023-10-25',
    regDate: '2023-10-25',
    replyState: changeReply(0)
  },
  {
    no: 6,
    title: '교육상담아무말이나해봐아무말이나해봐아무말이나해봐',
    writer: '가나다',
    writeDate: '2023-10-25',
    regDate: '2023-10-25',
    replyState: changeReply(1)
  },
  {
    no: 7,
    title: '교육상담아무말이나해봐아무말이나해봐아무말이나해봐',
    writer: '가나다',
    writeDate: '2023-10-25',
    regDate: '2023-10-25',
    replyState: changeReply(1)
  },
  {
    no: 8,
    title: '교육상담아무말이나해봐아무말이나해봐아무말이나해봐',
    writer: '가나다',
    writeDate: '2023-10-25',
    regDate: '2023-10-25',
    replyState: changeReply(0)
  },
  {
    no: 9,
    title: '교육상담아무말이나해봐아무말이나해봐아무말이나해봐',
    writer: '가나다',
    writeDate: '2023-10-25',
    regDate: '2023-10-25',
    replyState: changeReply(1)
  },
  {
    no: 10,
    title: '교육상담아무말이나해봐아무말이나해봐아무말이나해봐',
    writer: '가나다',
    writeDate: '2023-10-25',
    regDate: '2023-10-25',
    replyState: changeReply(1)
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
  border: 0 solid #ddd;
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

export function ManagerAdmissionBoard() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [searchOption, setSearchOption] = useState("all");
  const navigate = useNavigate();
  const limit = 10;
  const offset = (page - 1) * limit;

  const postsData = (posts) => {
    if(posts) {
      let result = posts.slice(offset, offset + limit);
      return result;
    }
  };

  function onSearch(e) {
    e.preventDefault();
  };

  return<>
    <Container>
      <TableBox>
        <H2>입학상담</H2>
        <Hr />
        <Table 
          headers={managerABoard}
          items={postsData(MAItems)}
          selectable={false}
        />
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
          <PrimaryButton onClick={() => navigate("/")}>작성</PrimaryButton>
        </ButtonBox>
        <Pagination limit={limit} page={page} totalPosts={MAItems.length} setPage={setPage} />
      </TableBox>
    </Container>
  </>
}