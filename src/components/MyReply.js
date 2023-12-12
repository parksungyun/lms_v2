import styled from "styled-components";
import { Table } from "./Table";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Pagination } from "./Pagination";
import { getAllMyRepliesByAcademicId } from "../pages/Api";

const Container = styled.div`
  padding: 1.5rem 2rem;
  padding-bottom: 2rem;
  height: 700px;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  justify-content: space-between;
`;

const H2 = styled.p`
  font-size: 1.7rem;
  font-weight: bold;
  margin: 0;
  color: black;
  margin: 10px 0;
`;

const header = [
  {
    text: 'No.',
    value: 'no'
  },
  {
    text: '게시글 제목',
    value: 'title'
  },
  {
    text: '답변 내용',
    value: 'content'
  },
  {
    text: '답변 작성일',
    value: 'regDate'
  },
];

export function MyReply() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const limit = 10;
  const offset = (page - 1) * limit;
  const id = sessionStorage.getItem("id"); // academicId
  const [data, setData] = useState(null);
  const userType = sessionStorage.getItem("userType");
  let items;

  useEffect(() => {
    if(!data) {
      const promise = getAllMyRepliesByAcademicId(id);
      const getData = () => {
        promise.then((data) => {
          setData(data);
        });
      };
      getData();
    }
  });

  const shortenTitle = (str, length) => {
    let result = '';
    if (str.length > length) {
      result = str.substr(0, length - 2) + '...';
    } else {
      result = str;
    }
    return result;
  };

  function titleLink(id, title, type) {
    return (<p onClick={() => navigate(`/lms/${userType}/${type}/${id}`)}>{title}</p>);
  }

  const postsData = (posts) => {
    if(posts) {
      let result = posts.slice(offset, offset + limit);
      return result;
    }
  };

  console.log(data);

  if(data) {
    items = data.map((d, i) => (
      {
        no: i + 1,
        title: titleLink(d.id, shortenTitle(d.title, 20), d.type),
        content: shortenTitle(d.content, 45),
        regDate: new Date(d.regDate).toLocaleDateString("fr-CA"),
      }
    ));
  }

  return<>
    {
      items &&
      <Container>
        <div>
          <H2>내가 작성한 답글 수 : {items.length}</H2>
          <Table 
            headers={header}
            items={postsData(items)}
            selectable={false}
          />
        </div>
        <Pagination limit={limit} page={page} totalPosts={items.length} setPage={setPage} />
      </Container>
    }
  </>
}