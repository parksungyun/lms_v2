import { useNavigate, useParams } from "react-router-dom";
import { academics, userList, courses, subjects } from "../../assets/TempData";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { BsPatchPlusFill, BsPatchMinusFill } from "react-icons/bs";
import { getAllManagers, getAllTrainers, getCourseById, getSubjectByCourseId } from "../Api";
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

const ErrorMsg = styled.p`
  font-size: 1rem;
  color: red;
  margin: 0;
  padding: 0;
`;

export function AdminCourseDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [selected, setSelected] = useState();
  const [subjectSelected, setSubjectSelected] = useState([]);
  const [subjectName, setSubjectName] = useState([]);
  const [courseName, setCourseName] = useState();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [recruitStart, setRecruitStart] = useState();
  const [recruitEnd, setRecruitEnd] = useState();
  const [capacity, setCapacity] = useState();
  const [coursePhoto, setCoursePhoto] = useState();
  const [courseInfo, setCourseInfo] = useState();
  const [subjectNo, setSubjectNo] = useState();
  const [subjects, setSubjects] = useState(null);
  const [courses, setCourses] = useState(null);
  const [managers, setManagers] = useState(null);
  const [trainers, setTrainers] = useState(null);
  const [imageSrc, setImageSrc] = useState();
  const [image, setImage] = useState();
  const date = new Date().toISOString().split('T')[0];
  const [del, setDel] = useState();
  const [error, setError] = useState(0);

  useEffect(()=>{
    if(!courses){
      const promise = getCourseById(id);
      const getData = () => {
        promise.then((data) => {
          setCourses(data);
          setDel(data.subjectNo);
          setSubjectNo(data.subjectNo);
        })
      };
      getData();
    };
    if(!subjects){
      const promise = getSubjectByCourseId(id);
      const getData = () => {
        promise.then((data) => {
          setSubjects(data);
          setSubjectName(data.map(d => d.subject.subjectName));
          setSubjectSelected(data.map(d => d.subject.academicId));
        })
      };
      getData();
    };
    if(!managers){
      const promise = getAllManagers();
      const getData = () => {
        promise.then((data) => {
          setManagers(data);
        })
      };
      getData();
    };
    if(!trainers){
      const promise = getAllTrainers();
      const getData = () => {
        promise.then((data) => {
          setTrainers(data);
        })
      };
      getData();
    };
  });

  useEffect(() => {
    if (courses && subjects) {
      const temp2 = subjects.map((s,i) => s.subjectName);
      setSubjectName(temp2);
  
      const temp = subjects.map((s) => s.academicId);
      setSubjectSelected(temp);
    }
  }, [subjectNo]);

  useEffect(() => {
    if (courses && subjects) {
      setSelected(courses.academicId);
      setCourseName(courses.courseName);
      setStartDate(courses.startDate);
      setEndDate(courses.endDate);
      setRecruitStart(courses.recruitStart);
      setRecruitEnd(courses.recruitEnd);
      setCapacity(courses.capacity);
      setCoursePhoto(courses.coursePhoto);
      setCourseInfo(courses.courseInfo);
      setImage("/upload/" + courses.coursePhoto.substring(courses.coursePhoto.lastIndexOf("\\") + 1));
    }
  }, [courses, subjects]);

  useEffect(()=>{
    if(trainers) {
      subjects.forEach((data, i)=>{
        data = {
          count: i,
          subjectName: subjectName[i],
          academicId: subjectSelected[i]
        }
        subjects[i] = data;
      })
    }
  },[subjectName, subjectSelected, trainers]);

  console.log(subjects);
  console.log(courses);

  function onDeleteSubject(i) {
    setSubjects(subjects.filter(s => s.count !== subjects[i].count));
    setSubjectNo(subjectNo - 1);
  };
  
  function addSubject() {
    const subject = {
      count: subjects[subjects.length - 1].count + 1,
      subjectName: '',
      academicId: 0,
    };
    setSubjects((add) => [...add, subject]);
    setSubjectNo(subjectNo + 1);
  };

  function onChangeSubject(e, i) {
    let temp = [...subjectSelected];
    temp[i] = e.target.value;
    setSubjectSelected(temp);
  };

  function onChangeSubjectName(e, i) {
    let temp = [...subjectName];
    temp[i] = e.target.value;
    setSubjectName(temp);
    console.log(subjectName)
  };

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

  console.log(subjectNo)

  function onSubmit() {
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

    const fd = new FormData();
    if (coursePhoto) {
      fd.append("file", coursePhoto);
      console.log(fd);
      for (const pair of fd.entries()) {
        console.log(pair[0] + ', ' + pair[1]);
    }
    } else {
      console.error("No file selected.");
    };

    console.log(data);
    axios
    .post(`/api/course/mod/${id}`, data)
    .then((res) => {
      console.log(res.data.data);
      setError(2);
    })
    .catch((err) => {
      console.log(`${err} : Mod Error`)
      setError(3);
    });
    let check;
    if (date >= startDate) {
      check = 1;
    } else { check = 0; };
    console.log(check)
    axios
    .post(`/api/subject/mod/${id}/${check}`, subjects)
    .then((res) => {
      console.log(res.data.data)
    })
    .catch((err) => {
      console.log(`${err} : Subject Mod 실패`)
      setError(3);
    })

    // fetch(`/api/file/upload/course/${id}`, {
    //   method: 'POST',
    //   body: fd
    // })
    // .then(response => response.json())
    // .then(data => {
    //     console.log('File upload success:', data);
    // })
    // .catch(error => {
    //     console.error('File upload failed:', error);
    //     setError(3);
    // });
  };    
  
  return <>
    {
      (courses && subjects && trainers && managers) && 
        <Container>
          <H2>과정 상세 정보</H2>
          <Content>
            {imageSrc ? <Img src={imageSrc} alt="preview-img" /> : <Img src={image} alt="default" />}
            <Details action="" method="POST">
                <Detail>
                  <Label>과정명</Label>
                  <Input type="text" name="course_name" id="course_name" value={courseName} onChange={(e) => {setCourseName(e.target.value)}} />
                </Detail>
                <Detail>
                  <Label>훈련기간</Label>
                  <InputDate type="date" name="start_date" id="start_date"  value={startDate} disabled/>
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
                      subjects.map((data, i) => (
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
                            {date >= startDate ? i + 1 == subjects.length && i != del - 1 ? <BsPatchMinusFill className="deleteIcon" onClick={() => onDeleteSubject(i)} /> : <BsPatchMinusFill className="notAvail" /> : i + 1 == subjects.length && i != 0 ? <BsPatchMinusFill className="deleteIcon" onClick={() => onDeleteSubject(i)} /> : <BsPatchMinusFill className="notAvail" />}
                          </DeleteBox>
                        </Subject>
                      ))
                    }
                    <AddBox><BsPatchPlusFill className="addIcon" onClick={() => addSubject()} /></AddBox>
                  </SubjectBox>
                </Detail>
                {/* <Detail>
                  <Label>활성화</Label>
                  {
                    courses.available == 1 ? <DangerButton><p>비활성화</p></DangerButton> : <PrimaryButton><p>활성화</p></PrimaryButton>
                  }
                </Detail> */}
                  {/* {error == 2 && window.location.reload()} */}
                  {error == 3 && <ErrorMsg>등록이 실패하였습니다.</ErrorMsg>}
                <ButtonBox>
                  <PrimaryButton type="submit" onClick={() => onSubmit()}><p>수정</p></PrimaryButton>
                  <SecondaryButton onClick={() => navigate("/lms/a/courseSetting")}><p>목록</p></SecondaryButton>
                </ButtonBox>
            </Details>
          </Content>
        </Container>
    }
  </>
}