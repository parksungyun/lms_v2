import styled from "styled-components";
import WebWrapper from "../../components/WebWrapper"
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { getAdmissionPostById, getAllCourses, getCourseById } from "../Api";
import axios from "axios";
import { DeleteModal } from "../../components/DeleteModal";

const Container = styled.div`
  margin: 2rem 15rem;
  padding-bottom: 3rem;
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

const Divider = styled.div`
  display: flex;
  gap: 1rem;
  width: 100%;
  `;

const Div = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  input {
    padding: 10px;
    border-radius: 5px;
    border: 1px solid lightgray;
    margin-bottom: 1rem;
  }
  label {
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
  }
`;

const TextInput = styled.input`
  padding: 10px;
  border-radius: 5px;
  border: 1px solid lightgray;
`;

const SelectBox = styled.div`
  select {
    padding: 10px;
    border-radius: 5px;
    width: 100%;
    border: 1px solid lightgray;
    margin-bottom: 1rem;
  }
`;

const ContentInput = styled.textarea`
  width: 100%;
  height: 400px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid lightgray;
`;

const ErrorMsg = styled.p`
  font-size: 1rem;
  color: red;
  margin: 0;
  padding: 1rem 0 0 0;
`;

export function AdmissionMod(){
  const { id } = useParams();
  const [post, setPost] = useState();
  const [name, setName] = useState();
  const [age, setAge] = useState();
  const [phone, setPhone] = useState();
  const [school, setSchool] = useState();
  const [desired, setDesired] = useState();
  const [title, setTitle] = useState();
  const [content, setContent] = useState();
  const [password, setPassword] = useState();
  const [course, setCourse] = useState(null);
  const [errorCheck, setErrorCheck] = useState(null);
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
  });

  useEffect(() => {
    if(post) {
      setName(post.question.writerName);
      setPassword(post.question.postPw);
      setAge(post.question.age);
      setPhone(post.question.phone);
      setSchool(post.question.finalSchool);
      setDesired(post.question.DesiredCourse);
      setTitle(post.question.title);
      setContent(post.question.content);
      setErrorCheck(0);

      if(!course) {
        const promise = getCourseById(post.question.desiredCourse);
        const getData = () => {
          promise.then((data) => {
            setCourse(data);
          });
        };
        getData();
      }
    }
  }, [post]);

  function onSubmit() {
    if(!(name && password && age && phone && title && content && school)) {
      setErrorCheck(1);
    }
    else {
      const data = {
        postPw: password,
        writerName: name,
        age: age,
        phone: phone,
        finalSchool: school,
        desiredCourse: post.question.desiredCourse,
        title: title,
        content: content
      };
      console.log(data);
      axios
      .post(`/api/admission/${post.question.admissionQuestionId}/mod`, data)
      .then((res) => {
        console.log(res);
        navigate("/admission");
      })
      .catch((err) => {
        console.log(`${err} : 입학 상담 게시글 수정 실패`);
      });
    }
  }

  return<>
  <WebWrapper pageName={"입학 상담"} />
  {
    (post && course) && <Container>
      <form>
        <Divider>
          <Div>
            <label>이름</label>
            <TextInput id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="이름을 입력해주세요" />
          </Div>
          <Div>
            <label>비밀번호</label>
            <TextInput type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="게시글 확인/수정을 위한 비밀번호를 입력해주세요" />
          </Div>
        </Divider>
        <Divider>
          <Div>
            <label>나이</label>
            <TextInput id="age" value={age} onChange={(e) => setAge(e.target.value)} placeholder="나이를 입력해주세요" />
          </Div>
          <Div>
            <label>연락처</label>
            <TextInput id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="연락처를 입력해주세요" />
          </Div>
        </Divider>
        <Divider>
          <Div>
            <label>최종학력</label>
            <SelectBox>
              <select className="school" value={school} onChange={(e) => setSchool(e.target.value)}>
                <option>최종학력 선택</option>
                <option key="1" value="중졸">중졸</option>
                <option key="2" value="고졸">고졸</option>
                <option key="3" value="초대졸">초대졸</option>
                <option key="4" value="대졸">대졸</option>
                <option key="5" value="대학원졸">대학원졸</option>
              </select>
            </SelectBox>
          </Div>
          <Div>
            <label>수강희망과정</label>
            <SelectBox>
              <select className="desired" value={desired} disabled>
                <option value={course.courseId}>{course.courseName}</option>
              </select>
            </SelectBox>
          </Div>
        </Divider>
        <Div>
          <label>제목</label>
          <TextInput id="title" value={title} onChange={(e) => setTitle(e.target.value)}  placeholder="제목을 입력해주세요" />
        </Div>
        <Div>
          <label>내용</label>
          <ContentInput id="content" value={content} onChange={(e) => setContent(e.target.value)} placeholder="내용을 입력해주세요" />
        </Div>
      </form>
      {errorCheck === 1 && <ErrorMsg>입학 상담을 위한 정보를 모두 입력해주세요.</ErrorMsg>}
      <ButtonBox>
        <PrimaryButton onClick={() => onSubmit()}><p>수정</p></PrimaryButton>
        <DeleteModal name={"삭제"}></DeleteModal>
        <SecondaryButton onClick={() => navigate("/admission")}><p>목록</p></SecondaryButton>
      </ButtonBox>
    </Container>
  }
  </>
}