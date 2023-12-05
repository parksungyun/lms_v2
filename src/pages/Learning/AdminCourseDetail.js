import { useNavigate, useParams } from "react-router-dom";
import { academics, userList, courses, subjects } from "../../assets/TempData";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { BsPatchPlusFill, BsPatchMinusFill } from "react-icons/bs";

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

const DangerButton = styled.button`
  border: 0;
  border-radius: 5px;
  background-color: red;
  padding: 0.8rem 1.4rem;
  color: white;
`;

const Img = styled.img`
  width: 400px;
  border-radius: 1rem;
`;

const Details = styled.div`
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

const Select = styled.select`
  width: 90%;
  padding: 0.7rem;
  border: 1px solid lightgray;
  border-radius: 0.5rem;
`;

const ButtonBox = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
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

const TextArea = styled.textarea`
  width: 90%;
  padding: 0.7rem;
  border: 1px solid lightgray;
  border-radius: 0.5rem;
  resize: none;
  height: 10rem;
`;

const AddBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  .addIcon {
    width: 30px;
    height: 30px;
    color: #5f7dcf;
    cursor: pointer;
  }
`;

const DeleteBox = styled.div`
  width: 5%;
  display: flex;
  justify-content: end;
  align-items: center;
  .deleteIcon {
    margin-left: 10px;
    width: 30px;
    height: 30px;
    color: red;
    cursor: pointer;
  }
  .notAvail {
    margin-left: 10px;
    width: 30px;
    height: 30px;
    opacity: 0;
  }
`;

export function AdminCourseDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const course = courses.find((c) => c.course_id == id);
  const academic = academics.find((a) => a.academic_id == course.academic_id);
  const user = userList.find((u) => u.uid == academic.uid);

  const [selected, setSelected] = useState(course.academic_id);
  const [subjectSelected, setSubjectSelected] = useState([]);
  const [subjectName, setSubjectName] = useState([]);
  const [courseName, setCourseName] = useState(course.course_name);
  const [startDate, setStartDate] = useState(course.start_date);
  const [endDate, setEndDate] = useState(course.end_date);
  const [recruitStart, setRecruitStart] = useState(course.recruit_start);
  const [recruitEnd, setRecruitEnd] = useState(course.recruit_end);
  const [capacity, setCapacity] = useState(course.capacity);
  const [coursePhoto, setCoursePhoto] = useState(course.course_photo);
  const [courseInfo, setCourseInfo] = useState(course.course_info);
  const [subjectNo, setSubjectNo] = useState(course.subject_no);
  const [subject, setSubject] = useState(subjects.filter(s => s.course_id == id));
  
  useEffect(() => {
    const temp2 = subject.map((s,i) => s.subject_name.value);
    setSubjectName(temp2);

    const temp = subject.map((s) => s.academic_id.value);
    setSubjectSelected(temp);
  }, [subjectNo]);

  useEffect(() => {
    const temp = subject.map((s) => s.academic_id);
    setSubjectSelected(temp);

    const temp2 = subject.map((s) => s.subject_name);
    setSubjectName(temp2);
  }, []);

  function onSubmit() {

  }

  function onDeleteSubject(i) {
    setSubject(subject.filter(s => s.subject_id !== subject[i].subject_id));
    setSubjectNo(subjectNo - 1);
  }
  
  function addSubject() {
    const tempsubject = {
      subject_id: subject[subject.length - 1].subject_id + 1,
      subject_name: '',
      academic_id: 0,
    };
    setSubject((add) => [...add, tempsubject]);
    setSubjectNo(subjectNo + 1);
  }

  function onChangeSubject(e, i) {
    let temp = [...subjectSelected];
    temp[i] = e.target.value;
    setSubjectSelected(temp);
  }

  function onChangeSubjectName(e, i) {
    let temp = [...subjectName];
    temp[i] = e.target.value;
    setSubjectName(temp);
    console.log(subjectName)
  }

  return <>
    <Container>
      <H2>과정 상세 정보</H2>
      <Content>
        <Img src={course.course_photo} alt={course.course_name} />
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
                {
                  subject.map((data, i) => (
                    <Subject key={i}>
                      <Input type="text" name={`subject${i}`} id={`subject${i}`} value={subjectName[i]} onChange={(e) => onChangeSubjectName(e, i)} />
                      <SubjectSelect name={`subjectT${i}`} id={`subjectT${i}`} onChange={(e) => onChangeSubject(e, i)} value={subjectSelected[i]}>
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
                      <DeleteBox>
                        {i + 1 == subject.length && i != 0 ? <BsPatchMinusFill className="deleteIcon" onClick={() => onDeleteSubject(i)} /> : <BsPatchMinusFill className="notAvail" />}
                      </DeleteBox>
                    </Subject>
                  ))
                }
                <AddBox><BsPatchPlusFill className="addIcon" onClick={() => addSubject()} /></AddBox>
              </SubjectBox>
            </Detail>
            <Detail>
              <Label>활성화</Label>
              {
                course.available == 1 ? <DangerButton><p>비활성화</p></DangerButton> : <PrimaryButton><p>활성화</p></PrimaryButton>
              }
            </Detail>
            <ButtonBox>
              <PrimaryButton type="submit" onClick={onSubmit}><p>수정</p></PrimaryButton>
              <SecondaryButton onClick={() => navigate("/lms/a/courseSetting")}><p>목록</p></SecondaryButton>
            </ButtonBox>
        </Details>
      </Content>
    </Container>
  </>
}