import styled from "styled-components";
import { BsDownload } from "react-icons/bs";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { academics, feedbacks, homeworks, submits, userList } from "../../assets/TempData";
import { useState } from "react";
import { useEffect } from "react";
import { getAllTrainers, getHomeworkByHomeworkId, getStudentByStudentId, getSubmitByStudentIdAndHomeworkId, getSubmitBySubmitId } from "../Api";
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

const CommentBox = styled.div`
  margin-top: 2rem;
  border: 1px solid #ddd;
  border-radius: 7px;
`;

const CommentWriter = styled.div`
  border-bottom: 1px solid #ddd;
  padding: 10px;
`;

const Comment = styled.div`
  height: 100px;
  vertical-align: top;
  padding: 10px;
  overflow-y: scroll;
`;

const Text = styled.p`
  font-size: 1.1rem;
`;

const Box = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  text-align: center;
  margin: 0;
  justify-content: center;
  margin-top: 1rem;
  margin-bottom: 0;
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

export function StudentHWReview() {
  const { id } = useParams();
  const studentId = sessionStorage.getItem("id"); //studentId
  const { state } = useLocation();
  const navigate = useNavigate();
  const [homework, setHomework] = useState(null);
  const [submit, setSubmit] = useState(null);
  const [academic, setAcademic] = useState(null);

  useEffect(() => {
    if(!homework) {
      const promise = getHomeworkByHomeworkId(state);
      const getData = () => {
        promise.then((data) => {
          setHomework(data);
        });
      };
      getData();
    }
    if(!submit) {
      const promise = getSubmitBySubmitId(id);
      const getData = () => {
        promise.then((data) => {
          setSubmit(data);
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

  if(submit && submit.submit.submitFileUrl) {
    axios
    .get(`/api/file/download/student/${submit.submit.submitFileUrl.substring(submit.submit.submitFileUrl.lastIndexOf("\\") + 1)}`)
    .then((res) => {
      console.log(res.data.data)
    })
    .catch((err) => {
      console.log(`${err} : Error!`)
    })
  }

  return<>
    {
      (homework && submit && academic) &&
      <Container>
        <TableBox>
          <H2>{homework.title}</H2>
          <Hr />
          <Content>{submit.submit.submitContent}</Content>
          {
            submit.submit.submitFileUrl &&
            <AttachedBox>
              <Attached><p className="fw-bold">첨부파일</p></Attached>
              <div><A href={`/api/file/download/student/${submit.submit.submitFileUrl.substring(submit.submit.submitFileUrl.lastIndexOf("\\") + 1)}`}>{submit.submit.submitFileName}<Icon><BsDownload /></Icon></A></div>
            </AttachedBox>
          }
          <Hr />
          {
            submit.feedback &&
            <CommentBox>
            <CommentWriter>
              <Text>{academic.find((a) => a.academic.academicId === submit.feedback.academicId).user.userName} | {new Date(submit.feedback.feedbackRegDate).toLocaleDateString("fr-CA")}</Text>
            </CommentWriter>
            <Comment>
              <Text>{submit.feedback.hwComment}</Text>
            </Comment>
          </CommentBox>
          }
        <Box>
          <SecondaryButton onClick={()=>navigate(`/lms/s/${homework.subjectId}/homework`)}><p>목록</p></SecondaryButton>
        </Box>
        </TableBox>
      </Container>
    }
  </>
}