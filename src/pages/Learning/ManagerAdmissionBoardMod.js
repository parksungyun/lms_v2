import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

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

const Table = styled.table`
  border-bottom: 1px solid #ddd;
  text-align: start;
  tr{
    border-bottom: 1px solid #ddd;
  }
  td{
    border-bottom: 1px solid #ddd;
    padding: 10px 0;
    font-size: 1.1rem;
  }
  th{
    width: 11%;
    padding: 10px 0;
    font-size: 1.3rem;
  }
`;

const ContentRow = styled.tr`
  height: 400px;
  vertical-align: top;
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
  height: 150px;
  vertical-align: top;
  padding: 10px;
`;

const Text = styled.p`
  font-size: 1.1rem;
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

const ButtonBox = styled.div`
  padding-top: 2rem;
  display: flex;
  justify-content: center;
  gap: 0.5rem;
`;

const ContentInput = styled.textarea`
  margin-top: 2rem;
  width: 100%;
  height: 150px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid lightgray;
  resize: none;
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
`;

const P = styled.p`
  margin: 0;
`;

const Hr = styled.hr`
  border: 0 solid #ddd;
`;

const DangerButton = styled.button`
  border: 0;
  border-radius: 5px;
  background-color: red;
  padding: 0.6rem 1.4rem;
  color: white;
`;

export function ManagerAdmissionBoardMod(){
  const [admission_reply, setAdmission_reply] = useState("선생님은 바보가 아니에요");
  const navigate = useNavigate();
  return<>
    <Container>
      <TableBox>
        <H2>교육 상담[title]</H2>
        <Box>
          <P>안경태</P>
          <P>|</P>
          <P>2023-09-01</P>
        </Box>
        <Hr />
        <Table>
          <tr>
            <th>작성일</th>
            <td>2023-08-30</td>
          </tr>
          <tr>
            <th>이름</th>
            <td>유세나</td>
          </tr>
          <tr>
            <th>나이</th>
            <td>22</td>
          </tr>
          <tr>
            <th>연락처</th>
            <td>010-1234-5678</td>
          </tr>
          <tr>
            <th>최종학력</th>
            <td>고졸</td>
          </tr>
          <tr>
            <th>수강희망과목</th>
            <td>메타버스 에듀테크 개발</td>
          </tr>
          <tr>
            <th>제목</th>
            <td>교육상담</td>
          </tr>
          <ContentRow>
            <th>내용</th>
            <td className="overflow-y-scroll">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusantium voluptas a ex velit animi quod nihil, voluptatibus perferendis sunt accusamus hic quasi neque doloremque illum consequuntur ullam. Corporis deleniti harum corrupti? At rerum, cum similique facere corrupti dolor ipsum impedit quae, numquam perferendis quasi pariatur reprehenderit provident ea deleniti quam expedita quis magni autem fugiat illum? Maiores magnam, laudantium totam nobis porro dignissimos minus, earum fugiat amet impedit id ab excepturi eaque sequi facere quo reiciendis natus nesciunt expedita dolores tenetur. Ipsa vitae laudantium magnam temporibus sunt aliquam corporis voluptatem esse beatae pariatur, ratione facilis minima nihil. Quis, doloremque dolorem?</td>
          </ContentRow>
        </Table>
        <form action="" method="POST" >
          <ContentInput type="text" name="admission_reply" id="admission_reply" value={admission_reply}  onChange={(e)=>setAdmission_reply(e.target.value)}/>
          <ButtonBox>
            <PrimaryButton type="submit">답변 수정</PrimaryButton>
            <DangerButton>답변 삭제</DangerButton>
            <SecondaryButton onClick={()=>navigate(-1)}>목록</SecondaryButton>
          </ButtonBox>
        </form>
      </TableBox>
    </Container>
  </>
}