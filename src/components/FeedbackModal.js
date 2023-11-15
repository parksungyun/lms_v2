import { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components"
import { feedbacks, submits } from "../assets/TempData";
import  Modal  from "react-bootstrap/Modal";

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
    margin-top: 0.5rem;
    margin-bottom: 1.2rem;
  }
`;

const PrimaryButton = styled.button`
  border: 0;
  border-radius: 5px;
  background-color: #5f7dcf;
  padding: 0.6rem 1.4rem;
  color: white;
`;

const SuccessButton = styled.button`
  background-color: green;
  padding: 2px 15px;
  color: white;
  font-weight: 500;
  font-size: 0.8rem;
  border-radius: 5px;
  border: 0;
  cursor: pointer;
`;

const DangerButton = styled.button`
  border: 0;
  border-radius: 5px;
  background-color: red;
  padding: 0.6rem 1.4rem;
  color: white;
`;

const SecondaryButton = styled.button`
  background-color: gray;
  padding: 2px 15px;
  color: white;
  font-weight: 500;
  font-size: 0.8rem;
  border-radius: 5px;
  border: 0;
  cursor: pointer;
`;

export function FeedbackModal({name, feedbackid}){
  const [score, setScore] = useState("");
  const [content, setContent] = useState("");
  const [isScore, setIsScore] = useState(0);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    const submit = submits.find(s => s.submit_id == feedbackid);
    if(feedbacks.find(f => f.submit_id == submit.submit_id)) {
      const feedback = feedbacks.find(f => f.submit_id == submit.submit_id);
      setScore(feedback.hw_score);
      setContent(feedback.hw_comment);
      setIsScore(1);
    }
  }, [])
  return<>
    {
      isScore == 1 ? <SuccessButton onClick={handleShow}><p>{name}</p></SuccessButton> : <SecondaryButton onClick={handleShow}><p>{name}</p></SecondaryButton>
    }

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <H2>채점</H2>
        </Modal.Header>
        <form action="" method="POST">
          <Modal.Body>
            <Input type="text" name="feedback_score" id="feedback_score" value={score} onChange={(e)=>setScore(e.target.value)} placeholder="점수를 입력해주세요"/>
            <ContentInput type="text" name="feedback_content" id="feedback_content" value={content} onChange={(e)=>setContent(e.target.value)} placeholder="내용을 입력해주세요"/>
          </Modal.Body>
            <Box className="button">
            {
              isScore == 1 ? <>
                <PrimaryButton type="submit"><p>수정</p></PrimaryButton>
                <DangerButton><p>삭제</p></DangerButton>
              </> : <PrimaryButton type="submit"><p>등록</p></PrimaryButton>
            }
            </Box>
        </form>
      </Modal>
  </>
}