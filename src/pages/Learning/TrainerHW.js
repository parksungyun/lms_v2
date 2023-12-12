import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { Table } from "../../components/Table";
import '../../styles/trainer_hw_table.css';
import { Pagination } from "../../components/Pagination";
import { getAllTrainers, getHomeworksBySubjectId, getSubmitsBySubjectId } from "../Api";

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

const ButtonBox = styled.div`
  display: flex;
  justify-content: flex-end;
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
    text: '시작일',
    value: 'startDate'
  },
  {
    text: '종료일',
    value: 'endDate'
  },
  {
    text: '제출현황',
    value: 'submitCount'
  },
  {
    text: '채점하기',
    value: 'submitScore'
  },
];

export function TrainerHW() {
  const [page, setPage] = useState(1);
  const limit = 10;
  const offset = (page - 1) * limit;
  const navigate = useNavigate();
  const { id } = useParams();
  const [homework, setHomework] = useState(null);
  const [submit, setSubmit] = useState(null);
  const [academics, setAcademics] = useState(null);
  let items;

  useEffect(() => {
    setHomework(null);
    setSubmit(null);
  }, [id]);

  useEffect(() => {
    if(!academics) {
      const promise = getAllTrainers();
      const getData = () => {
        promise.then((data) => {
          setAcademics(data);
        });
      };
      getData();
    }
    if(!homework) {
      const promise = getHomeworksBySubjectId(id);
      const getData = () => {
        promise.then((data) => {
          setHomework(data);
        });
      };
      getData();
    }
    if(!submit) {
      const promise = getSubmitsBySubjectId(id);
      const getData = () => {
        promise.then((data) => {
          setSubmit(data);
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

  if(homework && academics && submit) {
    items = homework.map((h, i) => (
      {
        no: i + 1,
        title: titleLink(h.homeworkId, shortenTitle(h.title, 35)),
        writer: academics.find((a) => a.academic.academicId === h.academicId).user.userName,
        startDate: h.startDate,
        endDate: h.endDate,
        submitCount: getSubmitCount(h.homeworkId),
        submitScore: changeButton(h.homeworkId, h.endDate)
      }
    ));
  }

  function getSubmitCount(id) {
    const temp = submit.filter((s) => s.submit.homeworkId === id);
    return temp.length;
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

  function changeButton(id, endDate) {
    const tempSubmit = submit.filter((s) => s.submit.homeworkId === id);
    let feedbackLength = 0;

    const end = new Date(endDate);
    const diff = (end.getTime() - new Date().getTime()) / 1000 / 24 / 60 / 60;

    tempSubmit.map((s) => {
      if(s.feedback) {
        feedbackLength++;
      }
    })

    if(diff >= 0) {
      return(<SecondaryButton onClick={() => navigate(`${id}/feedback`)}><p>제출현황</p></SecondaryButton>);
    }
    else if((tempSubmit.length > 0) && (feedbackLength > 0) && (tempSubmit.length === feedbackLength)) {
      return(<SuccessButton onClick={() => navigate(`${id}/feedback`)}><p>채점완료</p></SuccessButton>);
    }
    else {
      return(<SecondaryButton onClick={() => navigate(`${id}/feedback`)}><p>채점하기</p></SecondaryButton>);
    };
  };

  return<>
    <Container>
      <TableBox>
        <H2>과제</H2>
        {
          items &&
          <Table 
            headers={headers}
            items={postsData(items)}
            selectable={false}
          />
        }
      </TableBox>
      <ButtonBox>
        <PrimaryButton onClick={() => navigate("write")}><p>작성</p></PrimaryButton>
      </ButtonBox>
      {
        items &&
        <Pagination limit={limit} page={page} totalPosts={items.length} setPage={setPage} />
      }
    </Container>
  </>
}