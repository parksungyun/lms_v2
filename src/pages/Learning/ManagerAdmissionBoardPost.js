import styled from "styled-components";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { ReplyWrite } from "../../components/ReplyWrite";
import { ReplyPost } from "../../components/ReplyPost";
import { getAdmissionPostById, getAllManagers, getCourseById } from "../Api";

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
    width: 11%;
    padding: 10px 0;
    font-size: 1.3rem;
  }
`;

const ContentRow = styled.tr`
  height: 400px;
  vertical-align: top;
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

const H2 = styled.p`
  font-size: 1.7rem;
  font-weight: bold;
  margin-top: 10px;
  margin-bottom: 0;
`;

const Box = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  text-align: center;
  margin: 10px 0;
  &.button {
    justify-content: center;
    margin-top: 1rem;
    margin-bottom: 0;
  }
`;

const P = styled.p`
  margin: 0;
`;

const Hr = styled.hr`
  border: 0 solid #ddd;
`;

export function ManagerAdmissionBoardPost(){
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [course, setCourse] = useState(null);
  const [academics, setAcademics] = useState(null);
  const [isReply, setIsReply] = useState();
  const navigate = useNavigate();

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
    if(!academics) {
      const promise = getAllManagers();
        const getData = () => {
          promise.then((data) => {
            setAcademics(data);
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

      if(post.answer) {
        setIsReply(1);
      }
    }
  }, [post]);

  return<>
    <Container>
      {
        (post && course) &&
        <TableBox>
          <H2>{post.question.title}</H2>
          <Box>
            <P>{post.question.writerName}</P>
            <P>|</P>
            <P>{new Date(post.question.regDate).toLocaleDateString("fr-CA")}</P>
          </Box>
          <Hr />
          <Table>
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
            <ContentRow>
              <th>내용</th>
              <td className="overflow-y-scroll">{post.question.content}</td>
            </ContentRow>
          </Table>
          {
            (academics && isReply === 1) ? <>
              <ReplyPost question={post} academic={academics.find((a) => a.academic.academicId === post.answer.academicId)} />
              <Box className="button">
                {
                  post.answer.academicId == sessionStorage.getItem("id") &&
                  <PrimaryButton onClick={()=>setIsReply(0)}><p>수정</p></PrimaryButton>
                }
                <SecondaryButton onClick={()=>navigate(`/lms/m/admission`)}><p>목록</p></SecondaryButton>
              </Box>
            </> : <ReplyWrite question={post} />
          }
        </TableBox>
      }
    </Container>
  </>
}