import styled from "styled-components";
import { BsFillEyeFill } from "react-icons/bs";
import { BsDownload } from "react-icons/bs";
import { useLocation, useParams } from "react-router-dom";
import { academics, course_questions, subject_questions, userList } from "../assets/TempData";
import { useEffect } from "react";

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
  const { state } = useLocation();
  
  let post;
  let writer;
  let type;

  if(state == "t" || state == "s"){
    type = 0;
    post = subject_questions.find((q) => q.s_question_id == id);
    writer = userList.find((u) => u.uid == (academics.find((a) => a.academic_id == post.academic_id).uid));
  }
  
  if(state == "m" || state == "c"){
    type = 1;
    post = course_questions.find((q) => q.c_question_id = id);
    writer = academics.find((a) => a.academic_id == post.academic_id);
  }

  return<>
    <TableBox>
      <H2>{type == 0 ? post.s_question_title : post.c_question_title}</H2>
      <Box>
        <P>{writer.user_name}</P>
        <P>|</P>
        <P>{type == 0 ? post.s_question_reg_date : post.c_question_reg_date}</P>
        <P>|</P>
        <IconBox>
          <BsFillEyeFill />
          <P>{type == 0 ? post.s_question_hits : post.c_question_hits}</P>
        </IconBox>
      </Box>
      <Hr />
      <Content>
      {type == 0 ? post.s_question_content : post.c_question_content}
      </Content>
      <AttachedBox>
        <Attached><p className="fw-bold">첨부파일</p></Attached>
        <div><A href={type == 0 ? post.s_question_fileURL : post.c_question_fileURL}>파일.pdf<Icon><BsDownload /></Icon></A></div>
      </AttachedBox>
      <Box className="button">
        { state == "t" || state == "m" ? null : <PrimaryButton><p>수정</p></PrimaryButton>}
        <SecondaryButton><p>목록</p></SecondaryButton>
      </Box>
    </TableBox>
  </>
}