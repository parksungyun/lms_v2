import styled from "styled-components";
import WebWrapper from "../../components/WebWrapper"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { courses } from "../../assets/TempData";
import axios from "axios";
import { useEffect } from "react";
import { getRecruitingCourses } from "../Api";

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

export function AdmissionWrite(){
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [phone, setPhone] = useState("");
  const [school, setSchool] = useState("");
  const [desired, setDesired] = useState();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [password, setPassword] = useState("");
  const [courses, setCourses] = useState(null);
  const [errorCheck, setErrorCheck] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    if(!courses) {
      const promise = getRecruitingCourses();
      const getData = () => {
        promise.then((data) => {
          setCourses(data);
        });
      };
      getData();
    }
  })

  function onSubmit() {
    if(!(name && password && age && phone && title && content && school && desired)) {
      setErrorCheck(1);
    }
    else {
      const data = {
        postPw: password,
        writerName: name,
        age: age,
        phone: phone,
        finalSchool: school,
        desiredCourse: desired,
        title: title,
        content: content
      };
      console.log(data);
      axios
      .post("/api/admission/write", data)
      .then((res) => {
        console.log(res);
        navigate("/admission");
      })
      .catch((err) => {
        console.log(`${err} : 입학 상담 게시글 작성 실패`);
      });
    }
  }

  return<>
  <WebWrapper pageName={"입학 상담"} />
    <Container>
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
                <option value="" selected>최종학력 선택</option>
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
              <select className="desired" value={desired} onChange={(e) => setDesired(e.target.value)}>
                <option value="" selected>수강희망과정 선택</option>
                {
                  courses && courses.map((data) => (
                    <option value={data.courseId} key={data.courseId}>
                      {data.courseName}
                    </option>
                  ))
                }
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
        <PrimaryButton onClick={() => onSubmit()}><p>등록</p></PrimaryButton>
        <SecondaryButton onClick={() => navigate("/admission")}><p>목록</p></SecondaryButton>
      </ButtonBox>
    </Container>
  </>
}