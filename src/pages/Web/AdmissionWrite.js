import styled from "styled-components";
import WebWrapper from "../../components/WebWrapper"
import { useState } from "react";
import { useNavigate } from "react-router-dom";

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

export function AdmissionWrite(){
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [phone, setPhone] = useState("");
  const [school, setSchool] = useState("");
  const [desired, setDesired] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [password, setPassword] = useState("");

  function onSubmit(e) {
    e.preventDefault();
  }

  return<>
  <WebWrapper pageName={"입학 상담"} />
    <Container>
      <form onSubmit={onSubmit}>
        <Divider>
          <Div>
            <label>이름</label>
            <TextInput id="name" value={name} onChange={(e) => setName(e.target.value)} />
          </Div>
          <Div>
            <label>비밀번호</label>
            <TextInput type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </Div>
        </Divider>
        <Divider>
          <Div>
            <label>나이</label>
            <TextInput id="age" value={age} onChange={(e) => setAge(e.target.value)} />
          </Div>
          <Div>
            <label>연락처</label>
            <TextInput id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
          </Div>
        </Divider>
        <Divider>
          <Div>
            <label>최종학력</label>
            <SelectBox>
              <select className="school" onChange={(e) => setSchool(e.target.value)}>
                <option key="0" value="0">최종학력 선택</option>
                <option key="1" value="1">중졸</option>
                <option key="2" value="2">고졸</option>
                <option key="3" value="3">초대졸</option>
                <option key="4" value="4">대학원졸</option>
              </select>
            </SelectBox>
          </Div>
          <Div>
            <label>수강희망과목</label>
            <SelectBox>
              <select className="desired" onChange={(e) => setDesired(e.target.value)}>
                <option key="0" value="0">수강희망과목 선택</option>
                <option key="1" value="1">디지털 콘텐츠 UI/UX 디자인</option>
                <option key="2" value="2">데이터시각화 UI 개발</option>
                <option key="3" value="3">메타버스 에듀테크 개발</option>
                <option key="4" value="4">front-end 디지털 디자인</option>
              </select>
            </SelectBox>
          </Div>
        </Divider>
        <Div>
          <label>제목</label>
          <TextInput id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
        </Div>
        <Div>
          <label>내용</label>
          <ContentInput id="content" value={content} onChange={(e) => setContent(e.target.value)} />
        </Div>
        <ButtonBox>
          <PrimaryButton>등록</PrimaryButton>
          <SecondaryButton>목록</SecondaryButton>
        </ButtonBox>
      </form>
    </Container>
  </>
}