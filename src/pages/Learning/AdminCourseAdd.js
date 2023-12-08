import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { BsPatchPlusFill, BsPatchMinusFill } from "react-icons/bs";
import { useEffect } from "react";
import { getAllManagers, getAllTrainers } from "../Api";
import axios from "axios";

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

const ErrorMsg = styled.p`
  font-size: 1rem;
  color: red;
  margin: 0;
  padding: 0;
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
  const [coursePhoto, setCoursePhoto] = useState("/upload/CourseDefault.png");
  const [courseInfo, setCourseInfo] = useState();
  // const [courseAvailable, setCourseAvailable] = useState();
  const [imageSrc, setImageSrc] = useState('');
  const [managers, setManagers] = useState(null);
  const [trainers, setTrainers] = useState(null);
  const [error, setError] = useState(0);
  const [courseId, setCourseId] = useState();
  let available;

  useEffect(() => {
    if(!managers) {
      const promise = getAllManagers();
      const getData = () => {
        promise.then((data) => {
          setManagers(data);
        })
      };
      getData();
    };
    if(!trainers) {
      const promise = getAllTrainers();
      const getData = () => {
        promise.then((data) => {
          setTrainers(data);
        })
      };
      getData();
    };
  });

  const temp = [
    {
      count: 0,
      subjectName: subjectName[subjectName.length - 1],
      academicId: subjectSelected[subjectSelected.length - 1],
    }
  ];

  const [subject, setSubject] = useState(temp);
  const [subjectNo, setSubjectNo] = useState(1);

  useEffect(() => {
    const temp2 = subject.map((s,i) => s.subjectName);
    setSubjectName(temp2);

    const temp = subject.map((s) => s.academicId);
    setSubjectSelected(temp);
  }, [subjectNo]);

  useEffect(() => {
    const temp = subject.map((s) => s.academicId);
    setSubjectSelected(temp);

    const temp2 = subject.map((s) => s.subjectName);
    setSubjectName(temp2);
  }, []);

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

  function onDeleteSubject(i) {
    setSubject(subject.filter(s => s.count !== subject[i].count));
    setSubjectNo(subjectNo - 1);
  }

  useEffect(()=>{
    if(trainers) {
      subject.forEach((data, i)=>{
        data = {
          count: i,
          subjectName: subjectName[i],
          academicId: subjectSelected[i]
        }
        subject[i] = data;
      })
    }
  },[subjectName, subjectSelected]);

  console.log(subject);

  function addSubject() {
    const tempsubject = {
      count: subject[subject.length - 1].count + 1,
      subjectName: "",
      academicId: 0,
    };
    setSubject((add) => [...add, tempsubject]);
    setSubjectNo(subjectNo + 1);
  }

  const encodeFileToBase64 = (fileBlob) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    return new Promise((resolve) => {
      reader.onload = () => {
        setImageSrc(reader.result);
        resolve();
      };
    });
  };

  function onSubmit() {
    // if(courseAvailable) {
    //   available = 0;
    // } else {available = 1;}
    const data = {
      academicId: selected,
      courseName: courseName,
      subjectNo: subjectNo,
      capacity: capacity,
      startDate: startDate,
      endDate: endDate,
      recruitStart: recruitStart,
      recruitEnd: recruitEnd,
      courseInfo: courseInfo
    };
    console.log(data);

    axios
    .post("/api/course/add", data)
    .then((res) => {
      console.log(res.data.data)
      console.log(res.data.data.courseId);
      setCourseId(res.data.data.courseId);
      console.log(courseId)
      setError(1);
    })
    .catch((err) => {
      console.log(`${err} : Course Add 실패`)
      setError(2);
    })
  }

  useEffect(()=>{
    const fd = new FormData();
    if (coursePhoto) {
      fd.append("file", coursePhoto);
      console.log(fd);
      for (const pair of fd.entries()) {
        console.log(pair[0] + ', ' + pair[1]);
    }
    } else {
      console.error("No file selected.");
    }
    if (courseId) {
      axios
      .post(`/api/subject/add/${courseId}`, subject)
      .then((res) => {
        console.log(res.data.data)
      })
      .catch((err) => {
        console.log(`${err} : Subject Add 실패`)
      })
  
      fetch(`/api/file/upload/course/${courseId}`, {
        method: 'POST',
        body: fd
      })
      .then(response => response.json())
      .then(data => {
          console.log('File upload success:', data);
      })
      .catch(error => {
          console.error('File upload failed:', error);
          setError(2);
      });
    };
  },[courseId]);

  return <>
    {
      (managers && trainers) &&
    <Container>
      <H2>과정 등록</H2>
      <Content>
        <ContentDivide>
          {imageSrc ? <Img src={imageSrc} alt="preview-img" /> : <Img src={coursePhoto} alt="default" />}
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
              <Input type="file" name="course_photo" id="course_photo" accept="image/*" onChange={(e) => {setCoursePhoto(e.target.files[0]); encodeFileToBase64(e.target.files[0])}} />
            </Detail>
            <Detail>
              <Label>과정 소개</Label>
              <TextArea name="course_info" id="course_info" value={courseInfo} onChange={(e) => {setCourseInfo(e.target.value)}} />
            </Detail>
            <Detail>
              <Label>담당 매니저</Label>
              <Select name="manager" id="manager" onChange={(e) => setSelected(e.target.value)} value={selected}>
                <option>매니저 선택</option>
                {
                  managers.map((data) => (
                    <option value={data.academic.academicId} key={data.academic.academicId}>
                      {data.user.userName}
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
                        <option>강사 선택</option>
                        {
                          trainers.map((t) => (
                            <option value={t.academic.academicId} key={t.academic.academicId}>
                              {t.user.userName}
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
            {/* <Detail>
              <Label>활성화</Label>
              <Check type="checkbox" name="user_available" id="user_available" checked={courseAvailable} onChange={(e) => {setCourseAvailable(e.target.checked)}} /> 비활성화
            </Detail> */}
            <ButtonBox>
              <PrimaryButton type="submit" onClick={()=>onSubmit()}><p>등록</p></PrimaryButton>
              <SecondaryButton onClick={() => navigate("/lms/a/courseSetting")}><p>목록</p></SecondaryButton>
            </ButtonBox>
        </Details>
        </ContentDivide>
      </Content>
    </Container>
    }
  </>
}
