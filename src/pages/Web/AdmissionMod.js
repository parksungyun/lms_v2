import styled from "styled-components";
import WebWrapper from "../../components/WebWrapper"
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { admission_questions, courses } from "../../assets/TempData";

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

export function AdmissionMod(){
  const { id } = useParams();
  const post = admission_questions.find(a => a.a_question_id == id);
  const [name, setName] = useState(post.writer_name);
  const [age, setAge] = useState(post.age);
  const [phone, setPhone] = useState(post.phone);
  const [school, setSchool] = useState(post.final_school);
  const [desired, setDesired] = useState(post.desired_course);
  const [title, setTitle] = useState(post.a_question_title);
  const [content, setContent] = useState(post.a_question_content);
  const [password, setPassword] = useState(post.post_pw);

  const navigate = useNavigate();

  const currentDate = new Date().getTime();

  const course = courses.filter(c => new Date(c.recruit_end).getTime() >= currentDate);

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
            <label>수강희망과목</label>
            <SelectBox>
              <select className="desired" value={desired} disabled>
                {
                  courses.map((data) => (
                    <option value={data.course_id} key={data.course_id}>
                      {data.course_name}
                    </option>
                  ))
                }
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
          <PrimaryButton><p>등록</p></PrimaryButton>
          <SecondaryButton onClick={()=>navigate("/admission")}><p>목록</p></SecondaryButton>
        </ButtonBox>
      </form>
    </Container>
  </>
}