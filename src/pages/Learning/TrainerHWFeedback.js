import styled from "styled-components"
import { Table } from "../../components/Table";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { FeedbackModal } from "../../components/FeedbackModal";
import { useEffect, useState } from "react";
import { getHomeworkByHomeworkId, getStudentsBySubjectId, getSubmitsByHomeworkId } from "../Api";
import axios from "axios";

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

const Box = styled.div`
  border-bottom: 2px solid #ddd;
  border-top: 2px solid #ddd;
  width: 100%;
  display: flex;
  margin: 1.5rem 0;
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

const P = styled.p`
  margin: 0;
  &.active{
    color: red;
  }
`;

const ButtonBox = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
  margin-right: 1.4rem;
`;

const SecondaryButton = styled.button`
  border: 0;
  border-radius: 5px;
  background-color: gray;
  padding: 0.6rem 1.4rem;
  color: white;
`;

const A = styled.a`
  color: black;
`;

const headers = [
  {
    text: 'No.',
    value: 'no'
  },
  {
    text: '학생이름',
    value: 'student'
  },
  {
    text: '내용',
    value: 'content'
  },
  {
    text: '첨부파일',
    value: 'attached'
  },
  {
    text: '제출시간',
    value: 'submitTime'
  },
  {
    text: '제출현황',
    value: 'submitState'
  },
];

export function TrainerHWFeedback() {
  const { id } = useParams();
  const navigate = useNavigate();
  const pathName = useLocation().pathname;
  const link = pathName.substring(0, pathName.lastIndexOf("/"));
  const subjectId = pathName.split("/")[3];
  const [homework, setHomework] = useState(null);
  const [submit, setSubmit] = useState(null);
  const [students, setStudents] = useState(null);
  let items;
  let wait = 0;

  useEffect(() => {
    if(!homework) {
      const promise = getHomeworkByHomeworkId(id);
      const getData = () => {
        promise.then((data) => {
          setHomework(data);
        });
      };
      getData();
    }
    if(!submit) {
      const promise = getSubmitsByHomeworkId(id);
      const getData = () => {
        promise.then((data) => {
          setSubmit(data);
        });
      };
      getData();
    }
    if(!students) {
      const promise = getStudentsBySubjectId(subjectId);
      const getData = () => {
        promise.then((data) => {
          setStudents(data);
        });
      };
      getData();
    }
  });

  function Download(url) {
    axios
    .get(`/api/file/download/student/${url}`)
    .then((res) => {
      console.log(res.data.data)
    })
    .catch((err) => {
      console.log(`${err} : Error!`)
    })
  };

  function checkFile(file){
    if(file) {
      return <A href={`/api/file/download/student/${file.submitFileUrl.substring(file.submitFileUrl.lastIndexOf("\\") + 1)}`} onClick={()=>Download((file.submitFileUrl.substring(file.submitFileUrl.lastIndexOf("\\") + 1)))}>{file.submitFileName}</A>;
    } else {
      return "";
    }
  };

  if(homework && submit && students) {
    items = submit.map((s, i) => (
      {
        no: i + 1,
        student: students.find((u) => u.student.studentId === s.submit.studentId).user.userName,
        content: s.submit.submitContent,
        attached: checkFile(s.submit),
        submitTime: changeColor(homework.endDate, s.submit.submitModDate),
        submitState: changeButton(s),
      }
    ))
  }

  function changeButton(reply) {
    if(reply.feedback) {
      return <FeedbackModal name={"채점완료"} submit={reply}></FeedbackModal>
    }
    else {
      wait++;
      return <FeedbackModal name={"채점대기"} submit={reply}></FeedbackModal>
    }
  };

  function changeColor(end, submitDate) {
    const currentDate = new Date(submitDate);
    const endDate = new Date(end);
    const diff = (endDate.getTime() - currentDate.getTime()) / 1000 / 24 / 60 / 60;
    if(diff < 0){
      return(<P className="active">{currentDate.toLocaleDateString("fr-CA") + " " + currentDate.toLocaleTimeString("af-ZA")}</P>);
    } else {
      return (<P>{currentDate.toLocaleDateString("fr-CA") + " " + currentDate.toLocaleTimeString("af-ZA")}</P>);
    }
  }

  return <>
    <Container>
      <TableBox>
        {
          homework &&
          <H2>{homework.title}</H2>
        }
        <Box>
          {
            students &&
            <ContentBox className="col-3">
              <Bold>전체</Bold>
              <p>{students.length}</p>
            </ContentBox>
          }
          {
            submit &&
            <ContentBox className="col-3">
              <Bold>제출</Bold>
              <p>{submit.length}</p>
            </ContentBox>
          }
          {
            (students && submit) &&
            <ContentBox className="col-3">
              <Bold>미제출</Bold>
              <p>{students.length - submit.length}</p>
            </ContentBox>
          }
          <ContentBox className="col-3">
            <Bold>채점대기</Bold>
            <p>{wait}</p>
          </ContentBox>
        </Box>
        {
          items &&
          <Table 
              headers={headers}
              items={items}
              selectable={false}
          />
        }
      </TableBox>
      <ButtonBox>
        <SecondaryButton onClick={()=>navigate(link.substring(0, link.lastIndexOf("/")))}><p>목록</p></SecondaryButton>
      </ButtonBox>
    </Container>
  </>
}