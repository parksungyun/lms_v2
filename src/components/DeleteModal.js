import styled from "styled-components"
import  Modal  from "react-bootstrap/Modal";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

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
  const userType = sessionStorage.getItem("userType");
  const pathName = useLocation().pathname;
  const link = pathName.substring(0, pathName.lastIndexOf("/"));
  const postId = link.substring(link.lastIndexOf("/") + 1, link.length);
  const replyId = pathName.substring(pathName.lastIndexOf("/"), pathName.length);
  const type = link.split("/");
  const navigate = useNavigate();

  function onDelete() {
    if(userType === "t") {
      if(type[4] === "board") {
        axios
        .delete(`/api/subject/board/${postId}/delete`)
        .then((res) => {
          navigate(link.substring(0, link.lastIndexOf("/")));
        })
        .catch((err) => {
          console.log(`${err} : 과정 공지 게시글 삭제 실패`);
        });
      }
      if(type[4] === "qna") {
        axios
        .delete(`/api/subject/qna/reply/${replyId}/delete`)
        .then((res) => {
          navigate(link);
        })
        .catch((err) => {
          console.log(`${err} : 과정 문의 답변 삭제 실패`);
        });
      }
      if(type[4] === "lecture") {
        axios
        .delete(`/api/subject/lecture/${postId}/delete`)
        .then((res) => {
          navigate(link.substring(0, link.lastIndexOf("/")));
        })
        .catch((err) => {
          console.log(`${err} : 강의 게시글 삭제 실패`);
        });
      }
      if(type[4] === "homework") {
        axios
        .delete(`/api/subject/homework/${postId}/delete`)
        .then((res) => {
          navigate(link.substring(0, link.lastIndexOf("/")));
        })
        .catch((err) => {
          console.log(`${err} : 과제 게시글 삭제 실패`);
        });
      }
      if(type[type.length - 1] === "feedback") {
        axios
        .delete(`/api/subject/feedback/${postId}/delete`)
        .then((res) => {
          window.location.reload();
        })
        .catch((err) => {
          console.log(`${err} : 과제 피드백 삭제 실패`);
        });
      }
    }
    else if(userType === "m") {
      if(type[4] === "board") {
        axios
        .delete(`/api/course/board/${postId}/delete`)
        .then((res) => {
          navigate(link.substring(0, link.lastIndexOf("/")));
        })
        .catch((err) => {
          console.log(`${err} : 과목 공지 게시글 삭제 실패`);
        });
      }
      if(type[4] === "qna") {
        axios
        .delete(`/api/course/qna/reply/${replyId}/delete`)
        .then((res) => {
          navigate(link);
        })
        .catch((err) => {
          console.log(`${err} : 과목 문의 답변 삭제 실패`);
        });
      }
      if(type[3] === "admission") {
        axios
        .delete(`/api/admission/reply/${replyId}/delete`)
        .then((res) => {
          navigate(link);
        })
        .catch((err) => {
          console.log(`${err} : 입학 상담 답변 삭제 실패`);
        });
      }
    }
    else if(userType === "s") {
      if(type[3] === "cqna") {
        axios
        .delete(`/api/course/qna/${postId}/delete`)
        .then((res) => {
          navigate(link.substring(0, link.lastIndexOf("/")));
        })
        .catch((err) => {
          console.log(`${err} : 과정 질문 게시글 삭제 실패`);
        });
      }
      if(type[4] === "sqna") {
        axios
        .delete(`/api/subject/qna/${postId}/delete`)
        .then((res) => {
          navigate(link.substring(0, link.lastIndexOf("/")));
        })
        .catch((err) => {
          console.log(`${err} : 과목 질문 게시글 삭제 실패`);
        });
      }
    }
    else {
      if(type[1] === "admission") {
        axios
        .delete(`/api/admission/${postId}/delete`)
        .then((res) => {
          navigate("/admission");
        })
        .catch((err) => {
          console.log(`${err} : 입학 상담 게시글 삭제 실패`);
        });
      }
    }
  }

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
        <DangerButton onClick={() => onDelete()}><p>삭제</p></DangerButton>
      </Box>
    </Modal>
  </>
}