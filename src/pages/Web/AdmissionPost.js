import styled from "styled-components";
import WebWrapper from "../../components/WebWrapper"

const Container = styled.div`
  margin: 2rem 15rem;
  padding-bottom: 3rem;
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
  height: 100px;
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
  padding: 2rem 0;
  display: flex;
  justify-content: center;
  gap: 0.5rem;
`;

export function AdmissionPost(){
  return<>
  <WebWrapper pageName={"입학 상담"} />
    <Container>
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
          <td>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusantium voluptas a ex velit animi quod nihil, voluptatibus perferendis sunt accusamus hic quasi neque doloremque illum consequuntur ullam. Corporis deleniti harum corrupti? At rerum, cum similique facere corrupti dolor ipsum impedit quae, numquam perferendis quasi pariatur reprehenderit provident ea deleniti quam expedita quis magni autem fugiat illum? Maiores magnam, laudantium totam nobis porro dignissimos minus, earum fugiat amet impedit id ab excepturi eaque sequi facere quo reiciendis natus nesciunt expedita dolores tenetur. Ipsa vitae laudantium magnam temporibus sunt aliquam corporis voluptatem esse beatae pariatur, ratione facilis minima nihil. Quis, doloremque dolorem?</td>
        </ContentRow>
      </Table>
      <CommentBox>
        <CommentWriter>
          <Text>황기현 | 2023-09-01</Text>
        </CommentWriter>
        <Comment>
          <Text>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</Text>
        </Comment>
      </CommentBox>
      <ButtonBox>
        <PrimaryButton>수정</PrimaryButton>
        <SecondaryButton>목록</SecondaryButton>
      </ButtonBox>
    </Container>
  </>
}