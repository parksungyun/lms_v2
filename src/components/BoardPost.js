import styled from "styled-components";
import { BsFillEyeFill } from "react-icons/bs";
import { BsDownload } from "react-icons/bs";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { getAllManagers, getAllTrainers, getCourseBoardByCourseBoardId, getSubjectBoardBySubjectBoardId } from "../pages/Api";
import axios from "axios";

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

const P = styled.p`
  margin: 0;
`;

const IconBox = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Hr = styled.hr`
  border: 0 solid #ddd;
`;

const Content = styled.div`
  height: 500px;
  overflow-y: scroll;
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

export function BoardPost() {
  const { id } = useParams();
  const pathName = useLocation().pathname;
  const path = pathName.split("/");
  const navigate = useNavigate();
  const userType = sessionStorage.getItem("userType");
  const [post, setPost] = useState(null);
  const [academic, setAcademic] = useState(null);
  let navlink;

  useEffect(() => {
    if(!post) {
      if(userType === "t" || path[4] === "sboard") {
        const promise = getSubjectBoardBySubjectBoardId(id);
        const getData = () => {
          promise.then((data) => {
            setPost(data);
          });
        };
        getData();
      }
      if(userType === "m" || path[3] === "cboard") {
        const promise = getCourseBoardByCourseBoardId(id);
        const getData = () => {
          promise.then((data) => {
            setPost(data);
          });
        };
        getData();
      }
    }
    if(!academic) {
      if(userType === "t" || path[4] === "sboard") {
        const promise = getAllTrainers();
        const getData = () => {
          promise.then((data) => {
            setAcademic(data);
          });
        };
        getData();
      }
      if(userType === "m" || path[3] === "cboard") {
        const promise = getAllManagers();
        const getData = () => {
          promise.then((data) => {
            setAcademic(data);
          });
        };
        getData();
      }
    }
  });

  if(post) {
    if(path[3] === "cboard") navlink = `/lms/${userType}/cboard`;
    else if(path[4] === "sboard") navlink = `/lms/${userType}/${post.subjectId}/sboard`;
    else if(userType === "m") navlink = `/lms/${userType}/${post.courseId}/board`;
    else navlink = `/lms/${userType}/${post.subjectId}/board`;
  }

  if(post && post.fileUrl) {
    axios
    .get(`/api/file/download/academic/${post.fileUrl.substring(post.fileUrl.lastIndexOf("\\") + 1)}`)
    .then((res) => {
      console.log(res.data.data)
    })
    .catch((err) => {
      console.log(`${err} : Error!`)
    })
  }
  
  return<>
    {
      (academic && post) &&
      <TableBox>
        <H2>{post.title}</H2>
        <Box>
          <P>{academic.find((a) => a.academic.academicId === post.academicId).user.userName}</P>
          <P>|</P>
          <P>{new Date(post.regDate).toLocaleDateString("fr-CA")}</P>
          <P>|</P>
          <IconBox>
            <BsFillEyeFill />
            <P>{post.hits}</P>
          </IconBox>
        </Box>
        <Hr />
        <Content>
        {post.content}
        </Content>
        {
          post.fileUrl &&
          <AttachedBox>
            <Attached><p className="fw-bold">첨부파일</p></Attached>
            <div><A href={`/api/file/download/academic/${post.fileUrl.substring(post.fileUrl.lastIndexOf("\\") + 1)}`}>{post.fileName}<Icon><BsDownload /></Icon></A></div>
          </AttachedBox>
        }
        <Box className="button">
          { (userType != "s" && (post.academicId == sessionStorage.getItem("id"))) && <PrimaryButton onClick={() => navigate("mod")}><p>수정</p></PrimaryButton>}
          <SecondaryButton onClick={() => navigate(navlink)}><p>목록</p></SecondaryButton>
        </Box>
      </TableBox>
    }
  </>
}