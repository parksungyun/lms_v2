import styled from "styled-components";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { homeworks } from "../../assets/TempData";
import { DeleteModal } from "../../components/DeleteModal";
import { getHomeworkByHomeworkId } from "../Api";
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
  margin: 10px 0;
  &.button{
    justify-content: center;
    margin-top: 1rem;
    margin-bottom: 0;
  }
  &.text{
    margin: 0;
  }
  &.date{
    margin-bottom: 1rem;
  }
`;

const P = styled.p`
  margin: 0;
`;

const Hr = styled.hr`
  border: 0 solid #ddd;
`;

const Content = styled.div`
`;

const PrimaryButton = styled.button`
  border: 0;
  border-radius: 5px;
  background-color: #5f7dcf;
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
  &.date{
    margin-top: 0;
  }
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

export function TrainerHWPostMod() {
  const { id } = useParams();
  const pathName = useLocation().pathname;
  const link = pathName.substring(0, pathName.lastIndexOf("/"));
  const subjectId = pathName.split("/")[3];
  const [post, setPost] = useState(null);
  const [hwTitle, setHwTitle] = useState();
  const [hwContent, setHwContent] = useState();
  const [hwStartDate, setHwStartDate] = useState();
  const [hwEndDate, setHwEndDate] = useState();
  const [errorCheck, setErrorCheck] = useState();
  const navigate = useNavigate();

  useEffect(() => {
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

  useEffect(() => {
    if(post) {
      setHwTitle(post.title);
      setHwContent(post.content);
      setHwStartDate(post.startDate);
      setHwEndDate(post.endDate);
    }
  }, [post]);

  function onSubmit() {
    if(!hwTitle) {
      setErrorCheck(1);
    }
    else if(!hwStartDate) {
      setErrorCheck(2);
    }
    else if(!hwEndDate) {
      setErrorCheck(3);
    }
    else {
      const data = {
        academicId: sessionStorage.getItem("id"),
        subjectId: subjectId,
        title: hwTitle,
        content: hwContent,
        startDate: hwStartDate,
        endDate: hwEndDate,
      };
      console.log(data);
      axios
      .post(`/api/subject/homework/${id}/mod`, data)
      .then((res) => {
        navigate(link);
      })
      .catch((err) => {
        console.log(`${err} : 과목 과제 게시글 수정 실패`);
      });
    }
  }

  return<>
    <TableBox>
      <H2>과제 수정</H2>
      <form method="POST">
        <Input type="text" name="hw_title" id="hw_title" value={hwTitle} onChange={(e)=>setHwTitle(e.target.value)} />
        <Hr />
        <Content>
          <Box className="text">
            <P className="col-6">시작일</P>
            <P className="col-6">종료일</P>
          </Box>
          <Box className="date">
            <Input className="date" type="date" name="hw_start_date" id="hw_start_date" value={hwStartDate} onChange={(e)=>setHwStartDate(e.target.value)}/>
            <Input className="date" type="date" name="hw_end_date" id="hw_end_date" value={hwEndDate}  onChange={(e)=>setHwEndDate(e.target.value)}/>
          </Box>
          <ContentInput type="text" name="hw_content" id="hw_content" value={hwContent}  onChange={(e)=>setHwContent(e.target.value)}/>
        </Content>
        <Input type="file" name="hw_file" id="hw_file" accept="" />
      </form>
      {
        errorCheck === 1 && <ErrorMsg>제목을 입력해주세요</ErrorMsg>
      }
      {
        errorCheck === 2 && <ErrorMsg>시작일을 입력해주세요</ErrorMsg>
      }
      {
        errorCheck === 3 && <ErrorMsg>종료일을 입력해주세요</ErrorMsg>
      }
      <Box className="button">
        <PrimaryButton onClick={() => onSubmit()}><p>수정</p></PrimaryButton>
        <DeleteModal name={"삭제"}></DeleteModal>
        <SecondaryButton onClick={() => navigate(link)}><p>취소</p></SecondaryButton>
      </Box>
    </TableBox>
  </>
}