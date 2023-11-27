import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components"
import WebWrapper from "../../components/WebWrapper";
import { admission_questions } from "../../assets/TempData";
import { useEffect } from "react";
import { getAdmissionPostById } from "../Api";

const Container = styled.div`
  width: 100%;
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
  }
`;

const Header = styled.div`
  font-size: 2rem;
  text-align: center;
  margin-bottom: 2rem;
  font-weight: bold;
`;

const Div = styled.div`
  display: flex;
  flex-direction: column;
  input {
    width: 300px;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid lightgray;
  }
`;

const Button = styled.button`
  padding: 1rem 3rem;
  border-radius: 50px;
  background-color: #5f7dcf;
  border: 1px solid #eee;
  color: white;
  font-weight: 700;
  /* margin-top: 2rem; */
  &:hover {
    background-color: #86a8db;
  }
`;

const P = styled.p`
  color: red;
  font-size: 1.3rem;
  margin: 0;
`

export function AdmissionPwCheck() {
  const { id } = useParams();
  const [postPw, setPostPw] = useState("");
  const [isPost, setIsPost] = useState(0);
  const [post, setPost] = useState(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    if(!post) {
      const promise = getAdmissionPostById(id);
      const getData = () => {
        promise.then((data) => {
          setPost(data);
        });
      };
      getData();
    }
  })

  function checkPw() {
    if (post.question.postPw == postPw) {
      navigate(`/admission/${id}`);
    } else {
      setIsPost(1);
    }
  }

  return <>
    <WebWrapper pageName={"입학 상담"} />
    <Container>
      {
        post &&
        <div>
          <Header>비밀번호 확인</Header>
          <Div>
            <input type="password" id="userPw" value={postPw} onChange={(e) => setPostPw(e.target.value)} />
          </Div>
          {
            isPost == 1 && <P>비밀번호를 다시 입력해주세요</P>
          }
          <Button onClick={()=>checkPw()}><p>확인</p></Button>
        </div>
      }
    </Container>
  </>
}