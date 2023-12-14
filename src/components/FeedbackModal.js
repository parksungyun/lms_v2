import { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components"
import  Modal  from "react-bootstrap/Modal";
import axios from "axios";
import { DeleteModal } from "./DeleteModal";

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

const ErrorMsg = styled.p`
  font-size: 1rem;
  color: red;
  margin: 0;
  padding: 1rem 0 0 0;
  text-align: center;
`;

export function FeedbackModal({name, submit}){
  const [score, setScore] = useState("");
  const [content, setContent] = useState("");
  const [isScore, setIsScore] = useState(0);
  const [show, setShow] = useState(false);
  const [errorCheck, setErrorCheck] = useState();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    if(submit.feedback) {
      setScore(submit.feedback.hwScore);
      setContent(submit.feedback.hwComment);
      setIsScore(1);
    }
  }, []);

  function onSubmit() {
    if(!score) {
      setErrorCheck(1);
    }
    else {
      const data = {
        academicId: sessionStorage.getItem("id"),
        hwScore: score,
        hwComment: content,
      };
      console.log(data);
      axios
      .post(`/api/subject/${submit.submit.submitId}/feedback`, data)
      .then((res) => {
        handleClose();
        window.location.reload();
      })
      .catch((err) => {
        console.log(`${err} : 과목 과제 피드백 작성 실패`);
      });
    }
  }

  return<>
    {
      isScore === 1 ? <SuccessButton onClick={handleShow}><p>{name}</p></SuccessButton> : <SecondaryButton onClick={handleShow}><p>{name}</p></SecondaryButton>
    }

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <H2>채점</H2>
        </Modal.Header>
        <form>
          <Modal.Body>
            <Input type="text" name="feedback_score" id="feedback_score" value={score} onChange={(e)=>setScore(e.target.value)} placeholder="점수를 입력해주세요"/>
            <ContentInput type="text" name="feedback_content" id="feedback_content" value={content} onChange={(e)=>setContent(e.target.value)} placeholder="내용을 입력해주세요"/>
          </Modal.Body>
        </form>
        {
          errorCheck === 1 && <ErrorMsg>점수를 입력해주세요</ErrorMsg>
        }
        <Box className="button">
        {
          isScore === 1 ? <>
            <PrimaryButton onClick={() => onSubmit()}><p>수정</p></PrimaryButton>
            <DeleteModal name={"삭제"}></DeleteModal>
          </> : <PrimaryButton onClick={() => onSubmit()}><p>등록</p></PrimaryButton>
        }
        </Box>
      </Modal>
  </>
}