import styled from "styled-components"
import  Modal  from "react-bootstrap/Modal";
import { useState } from "react";

const H2 = styled.p`
  font-size: 1.7rem;
  font-weight: bold;
  margin: 0;
  color: black;
  margin-top: 10px;
`;

const DangerButton = styled.button`
  border: 0;
  border-radius: 5px;
  background-color: red;
  padding: 0.6rem 1.4rem;
  color: white;
`;

const P = styled.p`
  font-size: 1.3rem;
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

export function DeleteModal({name}){
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return<>
    <DangerButton onClick={handleShow} className="title"><p>{name}</p></DangerButton>

    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <H2>삭제 확인</H2>
      </Modal.Header>
      <Modal.Body>
        <P>정말 삭제하시겠습니까?</P>
      </Modal.Body>
      <Box className="button">
        <DangerButton><p>삭제</p></DangerButton>
      </Box>
    </Modal>
  </>
}