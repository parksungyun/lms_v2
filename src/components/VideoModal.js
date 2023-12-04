import { useState } from "react";
import styled from "styled-components"
import  Modal  from "react-bootstrap/Modal";
import gift  from "../assets/img/gift.png";
import { useNavigate } from "react-router-dom";

const P = styled.p`
  font-size: 1.2rem;
  margin: 10px 0;
  color: black;
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
  &.disable{
    background-color: grey;
  }
`;


const Img = styled.img`
  width: 80%;
`;

export function VideoModal({chart, id}){
  const userType = sessionStorage.getItem("userType");
  const now = chart.findIndex((c) => c.id == id);
  const next = chart[now + 1];
  console.log(now)
  const [isVideo, setIsVideo] = useState(now);
  const [show, setShow] = useState(true);

  const handleClose = () => {setShow(false); window.location.reload();};
  const navigate = useNavigate();

  return<>
      <Modal 
        show={show}
        size="lg"
      >
        <Modal.Header className="justify-content-center">
          <P>동영상을 모두 감상하셨습니다!</P>
        </Modal.Header>
          <Modal.Body className="d-flex flex-column justify-content-center align-items-center">
            <Img src={gift} alt="축하합니다" />
            <Box className="button">
              <PrimaryButton onClick={() => navigate(`/lms/${userType}/${now.subject}/lecture`)}><p>목록</p></PrimaryButton>
              <PrimaryButton onClick={handleClose}><p>다시 보기</p></PrimaryButton>
            {
              isVideo != chart.length - 1 ? <>
                <PrimaryButton onClick={()=>{navigate(`/lms/s/${next.subject}/lecture/${next.id}`); handleClose();}}><p>다음 강의</p></PrimaryButton>
              </> : <PrimaryButton className="disable" disabled><p>다음 강의</p></PrimaryButton>
            }
            </Box>
          </Modal.Body>
      </Modal>
  </>
}