import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

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
`;

const ErrorMsg = styled.p`
  font-size: 1rem;
  color: red;
  margin: 0;
  padding: 1rem 0 0 0;
  text-align: center;
`;

export function BoardPostWrite() {
  const [boardTitle, setBoardTitle] = useState("");
  const [boardContent, setBoardContent] = useState("");
  const [errorCheck, setErrorCheck] = useState();
  const [boardFile, setBoardFile] = useState();
  const [boardId, setBoardId] = useState();
  const userType = sessionStorage.getItem("userType");
  const navigate = useNavigate();
  const pathName = useLocation().pathname;
  const link = pathName.substring(0, pathName.lastIndexOf("/"));
  const linkId = pathName.split('/')[3];

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
        .post(`/api/subject/board/write`, data)
        .then((res) => {
          setBoardId(res.data.data.subjectBoardId);
          console.log(res.data.data);
        })
        .catch((err) => {
          console.log(`${err} : 과목 공지 게시글 작성 실패`);
          setErrorCheck(3)
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
        .post(`/api/course/board/write`, data)
        .then((res) => {
          setBoardId(res.data.data.courseBoardId);
        })
        .catch((err) => {
          console.log(`${err} : 과정 공지 게시글 작성 실패`);
          setErrorCheck(3);
        });
      }
    }
  }

  useEffect(()=>{
    const fd = new FormData();
    if (boardFile) {
      fd.append("file", boardFile);
      console.log(fd);
      if (userType === "t") {
        fetch(`/api/file/upload/subject/board/${boardId}`, {
          method: 'POST',
          body: fd
        })
        .then(response => response.json())
        .then(data => {
            console.log('File upload success:', data);
            setErrorCheck(0);
        })
        .catch(error => {
            console.error('File upload failed:', error);
            setErrorCheck(3);
        });
      } else {
        fetch(`/api/file/upload/course/board/${boardId}`, {
          method: 'POST',
          body: fd
        })
        .then(response => response.json())
        .then(data => {
            console.log('File upload success:', data);
            setErrorCheck(0);
        })
        .catch(error => {
            console.error('File upload failed:', error);
            setErrorCheck(3);
        });
      }
    } else {
      console.error("No file selected.");
    };
  }, [boardId])

  return<>
    <TableBox>
      <H2>공지 등록</H2>
      <form>
        <Input type="text" name="boardTitle" id="boardTitle" value={boardTitle} onChange={(e)=>setBoardTitle(e.target.value)} placeholder="제목을 입력해주세요"/>
        <Hr />
        <ContentInput type="text" name="boardContent" id="boardContent" value={boardContent}  onChange={(e)=>setBoardContent(e.target.value)} placeholder="내용을 입력해주세요"/>
        <Input type="file" name="boardFile" id="boardFile" onChange={(e) => setBoardFile(e.target.files[0])} />
      </form>
      {
        errorCheck === 1 && <ErrorMsg>제목을 입력해주세요</ErrorMsg>
      }
      {
        errorCheck === 2 && <ErrorMsg>내용을 입력해주세요</ErrorMsg>
      }
      {
        errorCheck === 3 && <ErrorMsg>등록에 실패하였습니다.</ErrorMsg>
      }
      {
        errorCheck === 0 && navigate(link)
      }
      <Box>
        <PrimaryButton onClick={() => onSubmit()}><p>등록</p></PrimaryButton>
        <SecondaryButton onClick={() => navigate(link)}><p>목록</p></SecondaryButton>
      </Box>
    </TableBox>
  </>
}