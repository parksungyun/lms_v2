import styled from "styled-components";
import { BsFillEyeFill } from "react-icons/bs";
import { BsDownload } from "react-icons/bs";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { academics, course_board, subject_board, userList } from "../assets/TempData";

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
  const navigate = useNavigate();

  
  let post;
  let type;
  let navlink;

  if(state[0] === "t" || state[2] === "sboard"){
    type = 0;
    post = subject_board.find((s) => s.subject_board_id == id);
  }
  if(state[0] === "m" || state[2] === "cboard"){
    type = 1;
    post = course_board.find((c) => c.course_board_id == id);
  }

  if(state[2] === "cboard") navlink = `/lms/${state[0]}/cboard`;
  else navlink = `/lms/${state[0]}/${state[1]}/${state[2]}`;

  return<>
    <TableBox>
      <H2>{type === 0 ? post.s_post_title : post.c_post_title}</H2>
      <Box>
        <P>{userList.find((u) => u.uid == (academics.find((a) => a.academic_id == post.academic_id)).uid).user_name}</P>
        <P>|</P>
        <P>{type === 0 ? post.s_post_reg_date : post.c_post_reg_date}</P>
        <P>|</P>
        <IconBox>
          <BsFillEyeFill />
          <P>{type === 0 ? post.s_post_hits : post.c_post_hits}</P>
        </IconBox>
      </Box>
      <Hr />
      <Content>
      {type === 0 ? post.s_post_content : post.c_post_content}
      </Content>
      <AttachedBox>
        <Attached><p className="fw-bold">첨부파일</p></Attached>
        <div><A href={type === 0 ? post.s_post_fileURL : post.c_post_fileURL}>파일.pdf<Icon><BsDownload /></Icon></A></div>
      </AttachedBox>
      <Box className="button">
        { state[0] === "s" ? null : <PrimaryButton onClick={() => navigate("mod", { state : [id, state[0]] })}><p>수정</p></PrimaryButton>}
        <SecondaryButton onClick={() => navigate(navlink)}><p>목록</p></SecondaryButton>
      </Box>
    </TableBox>
  </>
}