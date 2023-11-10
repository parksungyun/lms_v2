import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components"
import { feedbacks, submits } from "../assets/TempData";

const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
`;
const ModalBox = styled.div`
  width: 600px;
  height: 300px;
  background-color: white;
  padding: 1.5rem 2rem;
  border-radius: 1.2rem;
`;

const H2 = styled.p`
  font-size: 1.7rem;
  font-weight: bold;
  margin: 10px 0;
  color: black;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.7rem;
  border: 1px solid lightgray;
  border-radius: 0.5rem;
`;

const ContentInput = styled.textarea`
  margin-top: 1rem;
  width: 100%;
  height: 100px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid lightgray;
  resize: none;
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


export function FeedbackModal(){
  const id = 1; //submitid 임시로 받아옴
  const navigate = useNavigate();
  const [score, setScore] = useState("");
  const [content, setContent] = useState("");
  const [isScore, setIsScore] = useState(0);

  useEffect(() => {
    const submit = submits.find(s => s.submit_id == id);
    if(feedbacks.find(f => f.submit_id == submit.submit_id)) {
      const feedback = feedbacks.find(f => f.submit_id == submit.submit_id);
      setScore(feedback.hw_score);
      setContent(feedback.hw_comment);
      setIsScore(1);
    }
  }, [])
  return<>
    <Container>
      <ModalBox>
        <H2>채점</H2>
        <form action="" method="POST">
          <Input type="text" name="feedback_score" id="feedback_score" value={score} onChange={(e)=>setScore(e.target.value)} placeholder="점수를 입력해주세요"/>
          <ContentInput type="text" name="feedback_content" id="feedback_content" value={content} onChange={(e)=>setContent(e.target.value)} placeholder="내용을 입력해주세요"/>
          <Box className="button">
          {
            isScore == 1 ? <>
              <PrimaryButton type="submit"><p>수정</p></PrimaryButton>
              <DangerButton><p>삭제</p></DangerButton>
            </> : <PrimaryButton type="submit"><p>등록</p></PrimaryButton>
          }
          <SecondaryButton onClick={()=>navigate(-1)}><p>취소</p></SecondaryButton>
          </Box>
        </form>
      </ModalBox>
    </Container>
  </>
}