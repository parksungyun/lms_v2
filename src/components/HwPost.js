import styled from "styled-components";
import { BsFillEyeFill } from "react-icons/bs";
import { BsDownload } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

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
  &.btn{
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

export function HWPost({userState}) {
  const navigate = useNavigate();
  return<>
    <TableBox>
      <H2>피라미드 만들기</H2>
      <Box>
        <P>안경태</P>
        <P>|</P>
        <P>2023-09-01</P>
        <P>|</P>
        <IconBox>
          <BsFillEyeFill />
          <P>3</P>
        </IconBox>
      </Box>
      <Hr />
      <Content>
        <Box className="Badge">
          <BadgePrimary>시작일</BadgePrimary>
          <P>2023-09-05</P>
          <BadgeDanger>종료일</BadgeDanger>
          <P>2023-09-10</P>
        </Box>
        안녕하세요, Y&Y아카데미학원입니다. <br />
        2023년 8월에 개강하는 과목을 안내해 드립니다.
      </Content>
      <AttachedBox>
        <Attached><p className="fw-bold">첨부파일</p></Attached>
        <div><A href="">파일.pdf<Icon><BsDownload /></Icon></A></div>
      </AttachedBox>
      <Box className="btn">
        {userState = 0 ? null : <PrimaryButton>수정</PrimaryButton>}
        <SecondaryButton onClick={()=>navigate(-1)}>목록</SecondaryButton>
      </Box>
    </TableBox>
  </>
}