import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { course_board, subject_board } from "../assets/TempData";
import { DeleteModal } from "./DeleteModal";

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

export function BoardPostMod() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [boardTitle, setBoardTitle] = useState();
  const [boardContent, setBoardContent] = useState();
  let post;
  let link;

  if(state[1] === "t") {
    post = subject_board.find((s) => s.subject_board_id == state[0]);
    link = `/lms/t/${post.subject_id}/board`
  }
  else { 
    post = course_board.find((c) => c.course_board_id == state[0]);
    link = `/lms/m/${post.cousre_id}/board`
  }

  useEffect(() => {
    if(state[1] === "t") {
      setBoardTitle(post.s_post_title);
      setBoardContent(post.s_post_content);

    }
    else {
      setBoardTitle(post.c_post_title);
      setBoardContent(post.c_post_content);
    }
  }, [post]);

  return<>
    <TableBox>
      <H2>공지 수정</H2>
      {/* <form action="" method="POST"> */}
        <Input type="text" name="board_title" id="board_title" value={boardTitle} onChange={(e)=>setBoardTitle(e.target.value)}/>
        <Hr />
        <ContentInput type="text" name="board_content" id="board_content" value={boardContent}  onChange={(e)=>setBoardContent(e.target.value)}/>
        <Input type="file" name="board_file" id="board_file" accept="" />
        <Box>
          <PrimaryButton type="submit"><p>수정</p></PrimaryButton>
          <DeleteModal name={"삭제"}></DeleteModal>
          <SecondaryButton onClick={() => navigate(link)}><p>목록</p></SecondaryButton>
        </Box>
      {/* </form> */}
    </TableBox>
  </>
}