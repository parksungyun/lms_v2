import styled from "styled-components";
import { academics, lectures, userList } from "../assets/TempData";
import { BsFillEyeFill, BsDownload } from "react-icons/bs";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Lecture } from "./Lecture";
import { useState } from "react";
import { useEffect } from "react";
import { getAllTrainers, getLectureByLectureId, getLecturesBySubjectId } from "../pages/Api";

const Container = styled.div`
  padding: 1.5rem 2rem;
  padding-bottom: 2rem;
  background-color: #f6f9ff;
  height: 100%;
`;

const TableBox = styled.div`
  padding: 2rem;
  padding-top: 1.3rem;
  background-color: white;
  border-radius: 1rem;
  margin-bottom: 2rem;
`;

const H2 = styled.p`
  font-size: 1.7rem;
  font-weight: bold;
  margin-top: 10px;
  margin-bottom: 0;
`;

const Box = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  text-align: center;
  margin: 10px 0;
  &.button{
    justify-content: center;
    margin-top: 1rem;
    margin-bottom: 0;
  }
`;

const P = styled.p`
  margin: 0;
`;

const Hr = styled.hr`
  border: 0 solid #ddd;
`;

const IconBox = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const PrimaryButton = styled.button`
  border: 0;
  border-radius: 5px;
  background-color: #5f7dcf;
  padding: 0.6rem 1.2rem;
  color: white;
  align-items: center;
  .icon{
    font-size: 2rem;
    font-weight: bold;
  }
  &.button{
    padding: 0.6rem 1.4rem;
    font-size: 1rem;
  }
`;

const AttachedBox = styled.div`
  border: 1px solid #ddd;
  display: flex;
  margin-top: 2rem;
  padding: 1rem;
  border-radius: 0.5rem;
`;

const Attached = styled.div`
  margin-right: 1rem;
  border-right: 1px solid #ddd;
  padding-right: 1rem;
`;

const A = styled.a`
  color: black;
`;

const Icon = styled.i`
  font-weight: bold;
  padding-left: 0.5rem;
`;

const SecondaryButton = styled.button`
  border: 0;
  border-radius: 5px;
  background-color: gray;
  padding: 0.6rem 1.4rem;
  color: white;
  font-size: 1rem;
`;

export function LecturePost() {
  const navigate = useNavigate();
  const { id } = useParams();
  const userType = sessionStorage.getItem("userType");
  const [lecture, setLecture] = useState(null);
  const [academic, setAcademic] = useState(null);
  const [lectures, setLectures] = useState(null);
  let videos;

  useEffect(() => {
    if(!lecture) {
      const promise = getLectureByLectureId(id);
      const getData = () => {
        promise.then((data) => {
          setLecture(data);
        });
      };
      getData();
    }
    if(!academic) {
      const promise = getAllTrainers();
      const getData = () => {
        promise.then((data) => {
          setAcademic(data);
        });
      };
      getData();
    }
  })

  useEffect(() => {
    if(lecture) {
      if(!lectures) {
        const promise = getLecturesBySubjectId(lecture.subjectId);
        const getData = () => {
        promise.then((data) => {
          setLectures(data);
        });
      };
      getData();
      }
    }
  }, [lecture]);

  if(lectures) {
    videos = lectures.map((v) => (    
      {
        subject: v.subjectId,
        id: v.lectureId,
        videoUrl: v.videoURL
      }
    ));
  }
  
  return<>
    {
      (lecture && academic) &&
      <Container>
        <TableBox>
          <H2>{lecture.title}</H2>
          <Box>
            <P>{academic.find((a) => a.academic.academicId === lecture.academicId).user.userName}</P>
            <P>|</P>
            <P>{new Date(lecture.regDate).toISOString().split('T')[0]}</P>
            <P>|</P>
            <IconBox>
              <BsFillEyeFill />
              <P>{lecture.hits}</P>
            </IconBox>
          </Box>
          <Hr />
          <Lecture src={lecture.videoURL} videos={videos} id={id}/>
          <P>{lecture.content}</P>
          <AttachedBox>
          <Attached><p className="fw-bold">첨부파일</p></Attached>
          <div><A href="">파일.pdf<Icon><BsDownload /></Icon></A></div>
        </AttachedBox>
        <Box className="button">
          {userType === "s" ? null : <PrimaryButton className="button" onClick={()=>navigate("mod", { state: lecture.lectureId })}><p>수정</p></PrimaryButton>}
          <SecondaryButton onClick={()=>navigate(`/lms/${userType}/${lecture.subjectId}/lecture`)}><p>목록</p></SecondaryButton>
        </Box>
        </TableBox>
      </Container>
    }
  </>
}