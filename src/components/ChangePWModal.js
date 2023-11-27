import { Modal } from "bootstrap";
import { useState } from "react"
import styled from "styled-components";

const Button = styled.button`
  padding: 1rem 3rem;
  border-radius: 50px;
  background-color: #5f7dcf;
  border: 1px solid #eee;
  color: white;
  font-weight: 700;
  margin-top: 2rem;
  &:hover {
    background-color: #86a8db;
  }
`;

export function ChangePWModal() {
  const [userPw, setUserPw] = useState("")
  const [userPwCheck, setUserPwCheck] = useState("")
  const [errorCheck, setErrorCheck] = useState(0);
  const [show, setShow] = useState(true);

  function onSubmit(e) {
    e.preventDefault();
  }

  return<>
    <form onSubmit={onSubmit}>
      <Modal
        show={show}
        size="lg"
      >
          <Modal.Body className="d-flex flex-column justify-content-center align-items-center">
              <Button type="submit"><p>비밀번호 확인</p></Button>
          </Modal.Body>
      </Modal>
    </form>
  </>
}