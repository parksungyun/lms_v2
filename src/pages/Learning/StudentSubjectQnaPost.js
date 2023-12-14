import styled from "styled-components";
import { BsDownload } from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";
import { BsFillEyeFill } from "react-icons/bs";
import { students, subject_answers, subject_questions, userList } from "../../assets/TempData";
import { ReplyPost } from "../../components/ReplyPost";
import { useState } from "react";
import { useEffect } from "react";
import { getAllTrainers, getStudentsBySubjectId, getSubjectQnaBySubjectQuestionId } from "../Api";
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

const Hr = styled.hr`
  border: 0 solid #ddd;
`;

const AttachedBox = styled.div`
  border: 1px solid #ddd;
  display: flex;
  margin-top: 2rem;
  padding: 1rem;
  border-radius: 0.5rem;
`;

const Attached = styled.div`
  margin-right: 1rem;
  border-right: 1px solid #ddd;
  padding-right: 1rem;
`;

const A = styled.a`
  color: black;
`;

const Icon = styled.i`
  font-weight: bold;
  padding-left: 0.5rem;
`;

const Content = styled.p`
  height: 300px;
  overflow-y: scroll;
`;

const Box = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  text-align: center;
  margin: 10px 0;
  &.button{
    justify-content: center;
    margin-top: 1rem;
    margin-bottom: 0;
  }
`;

const PrimaryButton = styled.button`
  border: 0;
  border-radius: 5px;
  background-color: #5f7dcf;
  padding: 0.6rem 1.4rem;
  color: white;
`;

const SecondaryButton = styled.button`
  border: 0;
  border-radius: 5px;
  background-color: gray;
  padding: 0.6rem 1.4rem;
  color: white;
`;

const P = styled.p`
  margin: 0;
`;

const IconBox = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;


export function StudentSubjectQnaPost() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [question, setQuestion] = useState(null);
  const [students, setStudents] = useState(null);
  const [academic, setAcademic] = useState(null);
  useEffect(() => {
    if(!question) {
      const promise = getSubjectQnaBySubjectQuestionId(id);
      const getData = () => {
        promise.then((data) => {
          setQuestion(data);
        });
      };
      getData();
    }
    if(!academic) {
      const promise = getAllTrainers();
      const getData = () => {
        promise.then((data) => {
          setAcademic(data);
        });
      };
      getData();
    }
  });

  useEffect(() => {
    if(question) {
      if(!students) {
        const promise = getStudentsBySubjectId(question.question.subjectId);
        const getData = () => {
          promise.then((data) => {
            setStudents(data);
          });
        };
        getData();
      }
    }
  }, [question]);

  if(question && question.question.fileUrl) {
    axios
    .get(`/api/file/download/student/${question.question.fileUrl.substring(question.question.fileUrl.lastIndexOf("\\") + 1)}`)
    .then((res) => {
      console.log(res.data.data)
    })
    .catch((err) => {
      console.log(`${err} : Error!`)
    })
  };
  
  return<>
    {
      (question && academic && students) &&
      <Container>
        <TableBox>
          <H2>{question.question.title}</H2>
          <Box>
            <P>{students.find((s) => s.student.studentId === question.question.studentId).user.userName}</P>
            <P>|</P>
            <P>{new Date(question.question.regDate).toLocaleDateString("fr-CA")}</P>
            <P>|</P>
            <IconBox>
              <BsFillEyeFill />
              <P>{question.question.hits}</P>
            </IconBox>
          </Box>
          <Hr />
          <Content>{question.question.content}</Content>
          {
            question.question.fileUrl &&
            <AttachedBox>
              <Attached><p className="fw-bold">첨부파일</p></Attached>
              <div><A href={`/api/file/download/student/${question.question.fileUrl.substring(question.question.fileUrl.lastIndexOf("\\") + 1)}`}>{question.question.fileName}<Icon><BsDownload /></Icon></A></div>
            </AttachedBox>
          }
          <Hr />
          {
            question.answer && <ReplyPost question={question} academic={academic.find((a) => a.academic.academicId === question.answer.academicId)} />
          }
          <Box className="button">
            {
              question.question.studentId == sessionStorage.getItem("id") &&
              <PrimaryButton onClick={() => navigate("mod", { state: question.question.subjectQuestionId })}><p>수정</p></PrimaryButton>
            }
            <SecondaryButton onClick={() => navigate(`/lms/s/${question.question.subjectId}/sqna`)}><p>목록</p></SecondaryButton>
          </Box>
        </TableBox>
      </Container>
    }
  </>
}