import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { Table } from "../../components/Table";
import '../../styles/trainer_hw_table.css';
import { Pagination } from "../../components/Pagination";
import { academics, lectures, userList } from "../../assets/TempData";
import { getAllTrainers, getLecturesBySubjectId, getSubjectById } from "../Api";

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
    text: '등록일',
    value: 'regDate'
  },
  {
    text: '조회수',
    value: 'Hits'
  },
];

export function TrainerLecture() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [searchOption, setSearchOption] = useState("all");
  const [lectures, setLectures] = useState(null);
  const [trainers, setTrainers] = useState(null);
  const limit = 10;
  const offset = (page - 1) * limit;
  const navigate = useNavigate();
  let items;

  const { id } = useParams();

  useEffect(()=>{
    if(!lectures) {
      const promise = getLecturesBySubjectId(id);
      const getData = () => {
        promise.then((data) => {
          setLectures(data);
        });
      };
      getData();
    };
    if(!trainers) {
      const promise = getAllTrainers();
      const getData = () => {
        promise.then((data) => {
          setTrainers(data);
        });
      };
      getData();
    }
  })

  const shortenTitle = (str, length) => {
    let result = '';
    if (str.length > length) {
      result = str.substr(0, length - 2) + '...';
    } else {
      result = str;
    }
    return result;
  };
  
  if (lectures && trainers) {
    items = lectures.map((l,i) => (
      {
        no: i+1,
        title: titleLink(l.lectureId, shortenTitle(l.title, 35)),
        writer: trainers.find(t => t.academic.academicId == l.academicId).user.userName,
        regDate: l.regDate,
        Hits: l.hits
      }
    ));
  }

  function titleLink(id, title) {
    return (<p onClick={() => navigate(`${id}`)}>{title}</p>);
  }

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
    {
      items && 
        <Container>
          <TableBox>
            <H2>강의</H2>
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
              <button onClick={onSearch}><p>검색</p></button>
            </SearchBox>
            <PrimaryButton onClick={() => navigate("write", { state : id })}><p>작성</p></PrimaryButton>
          </ButtonBox>
          <Pagination limit={limit} page={page} totalPosts={items.length} setPage={setPage} />
        </Container>
    }
  </>
}