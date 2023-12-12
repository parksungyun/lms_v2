import styled from "styled-components";
import { BsDownload } from "react-icons/bs";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { BsFillEyeFill } from "react-icons/bs";
import { useState } from "react";
import { ReplyPost } from "../../components/ReplyPost";
import { ReplyWrite } from "../../components/ReplyWrite";
import { useEffect } from "react";
import { getAllStudents, getAllTrainers, getSubjectQnaBySubjectQuestionId } from "../Api";

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

export function TrainerSubjectQnaPost() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isReply, setIsReply] = useState();
  const [question, setQuestion] = useState(null);
  const [students, setStudents] = useState(null);
  const [academics, setAcademics] = useState(null);
  const pathName = useLocation().pathname;
  const link = pathName.substring(0, pathName.lastIndexOf("/"));

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
    if(!students) {
      const promise = getAllStudents();
      const getData = () => {
        promise.then((data) => {
          setStudents(data);
        });
      };
      getData();
    }
    if(!academics) {
      const promise = getAllTrainers();
      const getData = () => {
        promise.then((data) => {
          setAcademics(data);
        });
      };
      getData();
    }
  });

  useEffect(() => {
    if(question) {
      if(question.answer) {
        setIsReply(1);
      }
    }
  }, [question]);

  return<>
    <Container>
      {
        (question && students && academics) &&
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
          <AttachedBox>
            <Attached><p className="fw-bold">첨부파일</p></Attached>
            <div><A href={question.question.fileURL}>파일.pdf<Icon><BsDownload /></Icon></A></div>
          </AttachedBox>
          <Hr />
        {
          isReply === 1 ? <>
          <ReplyPost question={question} academic={academics.find((a) => a.academic.academicId === question.answer.academicId)} />
          <Box className="button">
            <PrimaryButton onClick={() => setIsReply(0)}><p>수정</p></PrimaryButton>
            <SecondaryButton onClick={() => navigate(link)}><p>목록</p></SecondaryButton>
          </Box>
          </> : <ReplyWrite question={question} />
        }
        </TableBox>
      }
    </Container>
  </>
}