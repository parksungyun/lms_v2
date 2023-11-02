import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { userList, academics } from "../../assets/TempData";
import defaultImg from "../../assets/img/default2.png";

const Container = styled.div`
  padding: 1.5rem 2rem;
  padding-bottom: 2rem;
  background-color: #f6f9ff;
  height: 100%;
`;

const Content = styled.div`
  padding: 2rem;
  padding-top: 2rem;
  background-color: white;
  border-radius: 1rem;
  margin-bottom: 2rem;
`;

const ContentDivide = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3rem;
`;

const H2 = styled.p`
  font-size: 1.7rem;
  font-weight: bold;
  margin: 10px 0;
  &.title{
    margin: 0;
  }
`;

const PrimaryButton = styled.button`
  border: 0;
  border-radius: 5px;
  background-color: #5f7dcf;
  padding: 0.8rem 1.4rem;
  color: white;
`;

const SecondaryButton = styled.button`
  border: 0;
  border-radius: 5px;
  background-color: gray;
  padding: 0.8rem 1.4rem;
  color: white;
`;

const Img = styled.img`
  width: 400px;
  border-radius: 1rem;
`;

const Details = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  padding-left: 3rem;
  border-left: 1px solid lightgray;
`;

const Detail = styled.div`
  display: flex;
  gap: 1rem;
  width: 100%;
  padding-right: 2rem;
  align-items:center;
`;

const Label = styled.label`
  width: 10%;
`;


const InputDate = styled.input`
  width: 44%;
  padding: 0.7rem;
  border: 1px solid lightgray;
  border-radius: 0.5rem;
`;

const Input = styled.input`
  width: 90%;
  padding: 0.7rem;
  border: 1px solid lightgray;
  border-radius: 0.5rem;
`;

const Check = styled.input`

`;

const ButtonBox = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
`;

const Select = styled.select`
  width: 90%;
  padding: 0.7rem;
  border: 1px solid lightgray;
  border-radius: 0.5rem;
`;

const TextArea = styled.textarea`
  width: 90%;
  padding: 0.7rem;
  border: 1px solid lightgray;
  border-radius: 0.5rem;
  resize: none;
  height: 10rem;
`;

const SubjectBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  width: 90%;
`;

const Subject = styled.div`
  display: flex;
  gap: 0.3rem;
`;

const SubjectSelect = styled.select`
  padding: 0.7rem;
  border: 1px solid lightgray;
  border-radius: 0.5rem;
  width: 50%;
`;

const AddButton = styled.button`
  padding: 0.7rem;
  border: 1px solid lightgray;
  border-radius: 0.5rem;
`;

export function AdminCourseAdd() {
  const navigate = useNavigate();

  const [selected, setSelected] = useState();
  const [subjectSelected, setSubjectSelected] = useState([]);
  const [subjectName, setSubjectName] = useState([]);
  const [courseName, setCourseName] = useState();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [recruitStart, setRecruitStart] = useState();
  const [recruitEnd, setRecruitEnd] = useState();
  const [capacity, setCapacity] = useState();
  const [coursePhoto, setCoursePhoto] = useState(defaultImg);
  const [courseInfo, setCourseInfo] = useState();
  const [courseAvailable, setCourseAvailable] = useState();

  let countSubject = 0;

  function onChangeSubject(e, i) {
    let temp = [...subjectSelected];
    temp[i] = e.target.value;
    setSubjectSelected(temp);
  }

  function onChangeSubjectName(e, i) {
    let temp = [...subjectName];
    temp[i] = e.target.value;
    setSubjectName(temp);
  }

  function addSubject() {
    countSubject++;
    return <>
      <Subject>
        <Input type="text" name={`subject${countSubject}`} id={`subject${countSubject}`} value={subjectName[countSubject]} onChange={(e) => onChangeSubjectName(e, countSubject)} placeholder="과목 이름" />
        <SubjectSelect name={`subjectT${countSubject}`} id={`subjectT${countSubject}`} onChange={(e) => onChangeSubject(e, countSubject)} value={subjectSelected[countSubject]}>
              {
                academics.filter(a => a.dept == 1).map((trainer) => (
                  <option value={trainer.academic_id} key={trainer.academic_id}>
                    {
                      userList.find((u) => u.uid == trainer.uid).user_name
                    }
                  </option>
                ))
              }
            </SubjectSelect>
      </Subject>
    </>
  }

  function onSubmit() {

  }

  return <>
    <Container>
      <H2>강사 등록</H2>
      <Content>
        <ContentDivide>
          <Img src={defaultImg} alt="default" />
          <Details action="" method="POST">
            <Detail>
              <Label>과정명</Label>
              <Input type="text" name="course_name" id="course_name" value={courseName} onChange={(e) => {setCourseName(e.target.value)}} />
            </Detail>
            <Detail>
              <Label>훈련기간</Label>
              <InputDate type="date" name="start_date" id="start_date"  value={startDate} onChange={(e) => {setStartDate(e.target.value)}} />
              ~
              <InputDate type="date" name="end_date" id="end_date"  value={endDate} onChange={(e) => {setEndDate(e.target.value)}} />
            </Detail>
            <Detail>
              <Label>모집기간</Label>
              <InputDate type="date" name="recruit_start" id="recruit_start"  value={recruitStart} onChange={(e) => {setRecruitStart(e.target.value)}} />
              ~
              <InputDate type="date" name="recruit_end" id="recruit_end"  value={recruitEnd} onChange={(e) => {setRecruitEnd(e.target.value)}} />
            </Detail>
            <Detail>
              <Label>정원</Label>
              <Input type="number" name="capacity" id="capacity" value={capacity} onChange={(e) => {setCapacity(e.target.value)}} />
            </Detail>
            <Detail>
              <Label>사진</Label>
              <Input type="file" name="course_photo" id="course_photo" accept="image/*" onChange={(e) => {setCoursePhoto(e.target.files[0])}} />
            </Detail>
            <Detail>
              <Label>과정 소개</Label>
              <TextArea name="course_info" id="course_info" value={courseInfo} onChange={(e) => {setCourseInfo(e.target.value)}} />
            </Detail>
            <Detail>
              <Label>담당 매니저</Label>
              <Select name="manager" id="manager" onChange={(e) => setSelected(e.target.value)} value={selected}>
                {
                  academics.filter(a => a.dept == 0).map((data) => (
                    <option value={data.academic_id} key={data.academic_id}>
                      {
                        userList.find((u) => u.uid == data.uid).user_name
                      }
                    </option>
                  ))
                }
              </Select>
            </Detail>
            <Detail>
              <Label>과목</Label>
              <SubjectBox>
                <Subject>
                  <Input type="text" name="subject0" id="subject0" value={subjectName[0]} onChange={(e) => onChangeSubjectName(e, 0)} placeholder="과목 이름" />
                  <SubjectSelect name="subjectT0" id="subjectT0" onChange={(e) => onChangeSubject(e, 0)} value={subjectSelected[0]}>
                        {
                          academics.filter(a => a.dept == 1).map((trainer) => (
                            <option value={trainer.academic_id} key={trainer.academic_id}>
                              {
                                userList.find((u) => u.uid == trainer.uid).user_name
                              }
                            </option>
                          ))
                        }
                      </SubjectSelect>
                </Subject>
                <AddButton onClick={() => addSubject}>과목 추가</AddButton>
              </SubjectBox>
            </Detail>
            <Detail>
              <Label>활성화</Label>
              <Check type="checkbox" name="user_available" id="user_available" value={courseAvailable} onChange={(e) => {setCourseAvailable(e.target.value)}} /> 비활성화
            </Detail>
            <ButtonBox>
              <PrimaryButton type="submit" onClick={onSubmit}>수정</PrimaryButton>
              <SecondaryButton onClick={() => navigate("/lms/a/courseSetting")}>목록</SecondaryButton>
            </ButtonBox>
        </Details>
        </ContentDivide>
      </Content>
    </Container>
  </>
}
