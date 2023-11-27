import styled from "styled-components";
import WebWrapper from "../../components/WebWrapper"
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { getAcademicByAcademicId, getAdmissionPostById, getCourseById } from "../Api";

const Container = styled.div`
  margin: 2rem 15rem;
  padding-bottom: 3rem;
`;

const Table = styled.table`
  border-bottom: 1px solid #ddd;
  text-align: start;
  tr{
    border-bottom: 1px solid #ddd;
  }
  td{
    border-bottom: 1px solid #ddd;
    padding: 10px 0;
    font-size: 1.1rem;
  }
  th{
    width: 15%;
    padding: 10px 0;
    font-size: 1.3rem;
  }
`;

const ContentRow = styled.tr`
  height: 400px;
  vertical-align: top;
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
  height: 10rem;
  overflow-y: scroll;
  vertical-align: top;
  padding: 10px;
`;

const Text = styled.p`
  font-size: 1.1rem;
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

const ButtonBox = styled.div`
  padding: 2rem 0;
  display: flex;
  justify-content: center;
  gap: 0.5rem;
`;

export function AdmissionPost(){
  const navigate = useNavigate();
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [course, setCourse] = useState(null);
  const [manager, setManager] = useState(null);

  useEffect(() => {
    if(!post) {
      const promise = getAdmissionPostById(id);
      const getData = () => {
        promise.then((data) => {
          setPost(data);
        });
      };
      getData();
    }
  })

  useEffect(() => {
    if(post) {
      if(!course) {
        const promise = getCourseById(post.question.desiredCourse);
          const getData = () => {
            promise.then((data) => {
              setCourse(data);
            });
          };
          getData();
      }
      if(!manager && post.answer) {
        const promise = getAcademicByAcademicId(post.answer.academicId);
          const getData = () => {
            promise.then((data) => {
              setManager(data);
            });
          };
          getData();
      }
    }
  }, [post]);

  return<>
  <WebWrapper pageName={"입학 상담"} />
  {
    course &&
    <Container>
      <Table>
        <tr>
          <th>작성일</th>
          <td>{new Date(post.question.reg_date).toLocaleDateString()}</td>
        </tr>
        <tr>
          <th>이름</th>
          <td>{post.question.writerName}</td>
        </tr>
        <tr>
          <th>나이</th>
          <td>{post.question.age}</td>
        </tr>
        <tr>
          <th>연락처</th>
          <td>{post.question.phone}</td>
        </tr>
        <tr>
          <th>최종학력</th>
          <td>{post.question.finalSchool}</td>
        </tr>
        <tr>
          <th>수강희망과목</th>
          <td>{course.courseName}</td>
        </tr>
        <tr>
          <th>제목</th>
          <td>{post.question.title}</td>
        </tr>
        <ContentRow>
          <th>내용</th>
          <td className="overflow-y-scroll">{post.question.content}</td>
        </ContentRow>
      </Table>
      {
        post.answer && <>
        <CommentBox>
          <CommentWriter>
            <Text>{manager && manager.user.userName} | {new Date(post.answer.answer_reg_date).toLocaleDateString()}</Text>
          </CommentWriter>
          <Comment>
            <Text>{post.answer.answerContent}</Text>
          </Comment>
        </CommentBox>
        </>
      }
      <ButtonBox>
        <PrimaryButton onClick={() => navigate("mod")}><p>수정</p></PrimaryButton>
        <SecondaryButton onClick={() => navigate("/admission")}><p>목록</p></SecondaryButton>
      </ButtonBox>
    </Container>
  }
  </>
}