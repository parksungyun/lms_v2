import styled from "styled-components";
import { BsDownload } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { BsFillEyeFill } from "react-icons/bs";

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

const H2 = styled.p`
  font-size: 1.7rem;
  font-weight: bold;
  margin-top: 10px;
  margin-bottom: 0;
`;

const Hr = styled.hr`
  border: 0 solid #ddd;
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

const Content = styled.p`
  height: 300px;
  overflow-y: scroll;
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
  height: 100px;
  vertical-align: top;
  padding: 10px;
  overflow-y: scroll;
`;

const Text = styled.p`
  font-size: 1.1rem;
`;

const Box = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  text-align: center;
  margin: 10px 0;
  &.btn{
    justify-content: center;
    margin-top: 1rem;
    margin-bottom: 0;
  }
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

const P = styled.p`
  margin: 0;
`;

export function StudentCourseQnaPost() {
  const navigate = useNavigate();
  return<>
    <Container>
      <TableBox>
        <H2>휴가를 사용하고 싶어요</H2>
        <Box>
          <P>안경태</P>
          <P>|</P>
          <P>2023-09-01</P>
        </Box>
        <Hr />
        <Content>
          휴가계 올립니다.
        </Content>
        <AttachedBox>
          <Attached><p className="fw-bold">첨부파일</p></Attached>
          <div><A href="">휴가계.pdf<Icon><BsDownload /></Icon></A></div>
        </AttachedBox>
        <Hr />
        <CommentBox>
        <CommentWriter>
          <Text>황기현 | 2023-09-01</Text>
        </CommentWriter>
        <Comment>
          <Text>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</Text>
        </Comment>
      </CommentBox>
      <Box className="btn">
        <PrimaryButton onClick={()=>navigate("/lms/s")}>수정</PrimaryButton>
        <SecondaryButton onClick={()=>navigate(-1)}>목록</SecondaryButton>
      </Box>
      </TableBox>
    </Container>
  </>
}