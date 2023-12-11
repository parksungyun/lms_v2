import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { DeleteModal } from "./DeleteModal";
import { getCourseBoardByCourseBoardId, getSubjectBoardBySubjectBoardId } from "../pages/Api";
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
  margin: 0;
  justify-content: center;
  margin-top: 1rem;
  margin-bottom: 0;
`;

const Hr = styled.hr`
  border: 0 solid #ddd;
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

const DangerButton = styled.button`
  border: 0;
  border-radius: 5px;
  background-color: red;
  padding: 0.6rem 1.4rem;
  color: white;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.7rem;
  border: 1px solid lightgray;
  border-radius: 0.5rem;
  margin-top: 1rem;
`;

const ContentInput = styled.textarea`
  width: 100%;
  height: 400px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid lightgray;
  resize: none;
`;

const ErrorMsg = styled.p`
  font-size: 1rem;
  color: red;
  margin: 0;
  padding: 1rem 0 0 0;
  text-align: center;
`;

export function BoardPostMod() {
  const navigate = useNavigate();
  const { id } = useParams();
  const pathName = useLocation().pathname;
  const userType = sessionStorage.getItem("userType");
  const [post, setPost] = useState(null);
  const [boardTitle, setBoardTitle] = useState();
  const [boardContent, setBoardContent] = useState();
  const [errorCheck, setErrorCheck] = useState();
  const link = pathName.substring(0, pathName.lastIndexOf("/"));
  const linkId = pathName.split('/')[3];

  useEffect(() => {
    if(!post) {
      if(userType === "t") {
        const promise = getSubjectBoardBySubjectBoardId(id);
        const getData = () => {
          promise.then((data) => {
            setPost(data);
          });
        };
        getData();
      }
      else {
        const promise = getCourseBoardByCourseBoardId(id);
        const getData = () => {
          promise.then((data) => {
            setPost(data);
          });
        };
        getData();
      }
    }
  });

  useEffect(() => {
    if(post) {
      setBoardTitle(post.title);
      setBoardContent(post.content);
    }
  }, [post]);

  function onSubmit() {
    if(!boardTitle) {
      setErrorCheck(1);
    }
    else if(!boardContent) {
      setErrorCheck(2);
    }
    else {
      if(userType === "t") {
        const data = {
          academicId: sessionStorage.getItem("id"),
          subjectId: linkId,
          title: boardTitle,
          content: boardContent
        };
        console.log(data);
        axios
        .post(`/api/subject/board/${id}/mod`, data)
        .then((res) => {
          navigate(link);
        })
        .catch((err) => {
          console.log(`${err} : 과목 공지 게시글 수정 실패`);
        });
      }
      else {
        const data = {
          academicId: sessionStorage.getItem("id"),
          courseId: linkId,
          title: boardTitle,
          content: boardContent
        };
        console.log(data);
        axios
        .post(`/api/course/board/${id}/mod`, data)
        .then((res) => {
          navigate(link);
        })
        .catch((err) => {
          console.log(`${err} : 과정 공지 게시글 수정 실패`);
        });
      }
    }
  }

  return<>
    <TableBox>
      <H2>공지 수정</H2>
      <form>
        <Input type="text" name="boardTitle" id="boardTitle" value={boardTitle} onChange={(e)=>setBoardTitle(e.target.value)}/>
        <Hr />
        <ContentInput type="text" name="boardContent" id="boardContent" value={boardContent}  onChange={(e)=>setBoardContent(e.target.value)}/>
        <Input type="file" name="boardFile" id="boardFile" accept="" />
      </form>
      {
        errorCheck === 1 && <ErrorMsg>제목을 입력해주세요</ErrorMsg>
      }
      {
        errorCheck === 2 && <ErrorMsg>내용을 입력해주세요</ErrorMsg>
      }
      <Box>
        <PrimaryButton onClick={() => onSubmit()}><p>수정</p></PrimaryButton>
        <DeleteModal name={"삭제"}></DeleteModal>
        <SecondaryButton onClick={() => navigate(link.substring(0, link.lastIndexOf("/")))}><p>목록</p></SecondaryButton>
      </Box>
    </TableBox>
  </>
}