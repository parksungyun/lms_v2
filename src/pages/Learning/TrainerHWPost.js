import styled from "styled-components";
import { BsDownload } from "react-icons/bs";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { academics, homeworks, userList } from "../../assets/TempData";
import { useEffect, useState } from "react";
import { getAllTrainers, getHomeworkByHomeworkId } from "../Api";
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
  &.Badge{
    margin-top: 0;
  }
`;

const P = styled.p`
  margin: 0;
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

const BadgeDanger = styled.span`
  background-color: red;
  padding: 2px 15px;
  color: white;
  font-weight: 500;
  font-size: 0.8rem;
  border-radius: 5px;
  `;

const BadgePrimary = styled.span`
  background-color: #5f7dcf;
  padding: 2px 15px;
  color: white;
  font-weight: 500;
  font-size: 0.8rem;
  border-radius: 5px;
`;

export function TrainerHWPost() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [academic, setAcademic] = useState(null);

  useEffect(() => {
    if(!academic) {
      const promise = getAllTrainers();
      const getData = () => {
        promise.then((data) => {
          setAcademic(data);
        });
      };
      getData();
    }
    if(!post) {
      const promise = getHomeworkByHomeworkId(id);
      const getData = () => {
        promise.then((data) => {
          setPost(data);
        });
      };
      getData();
    }
  });

  if(post && post.fileUrl) {
    axios
    .get(`/api/file/download/academic/${post.fileUrl.substring(post.fileUrl.lastIndexOf("\\") + 1)}`)
    .then((res) => {
      console.log(res.data.data)
    })
    .catch((err) => {
      console.log(`${err} : Error!`)
    })
  };

  return<>
    {
      (post && academic) &&
      <TableBox>
        <H2>{post.title}</H2>
        <Box>
          <P>{academic.find((a) => a.academic.academicId === post.academicId).user.userName}</P>
          <P>|</P>
          <P>{new Date(post.regDate).toLocaleDateString("fr-CA")}</P>
        </Box>
        <Hr />
        <Content>
          <Box className="Badge">
            <BadgePrimary>시작일</BadgePrimary>
            <P>{post.startDate}</P>
            <BadgeDanger>종료일</BadgeDanger>
            <P>{post.endDate}</P>
          </Box>
          {post.content}
        </Content>
        <AttachedBox>
          <Attached><p className="fw-bold">첨부파일</p></Attached>
          <div><A href={`/api/file/download/academic/${post.fileUrl.substring(post.fileUrl.lastIndexOf("\\") + 1)}`}>{post.fileName}<Icon><BsDownload /></Icon></A></div>
        </AttachedBox>
        <Box className="button">
          <PrimaryButton onClick={() => navigate("mod")}><p>수정</p></PrimaryButton>
          <SecondaryButton onClick={() => navigate(`/lms/t/${post.subjectId}/homework`)}><p>목록</p></SecondaryButton>
        </Box>
      </TableBox>
    }
  </>
}