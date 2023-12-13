import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { DeleteModal } from "../../components/DeleteModal";
import axios from "axios";
import { getLectureByLectureId } from "../Api";

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
  margin-bottom: 0.5rem;
`;

const Hr = styled.hr`
  border: 0 solid #ddd;
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

const DangerButton = styled.button`
  border: 0;
  border-radius: 5px;
  background-color: red;
  padding: 0.6rem 1.4rem;
  color: white;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.7rem;
  border: 1px solid lightgray;
  border-radius: 0.5rem;
  margin-top: 0.5rem;
`;

const ContentInput = styled.textarea`
  width: 100%;
  height: 300px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid lightgray;
  resize: none;
`;

const Box = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  text-align: center;
  margin: 0;
  justify-content: center;
  margin-top: 1rem;
  margin-bottom: 0;
`;

const P = styled.p`
  margin: 0;
  margin-top: 1rem;
  font-size: 1.2rem;
`

const Video = styled.video`
  display: none;
`

const ErrorMsg = styled.p`
  font-size: 1rem;
  color: red;
  margin: 0;
  padding: 0;
`;

export function TrainerLectureMod() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [lecture, setLecture] = useState(null)
  const [lectureTitle, setLectureTitle] = useState("");
  const [lectureContent, setLectureContent] = useState("");
  const [lectureVideo, setLectureVideo] = useState(); 
  const [lectureFile, setLectureFile] = useState();
  const [videoUrl, setVideoUrl] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    if(!lecture) {
      const promise = getLectureByLectureId(state);
      const getData = () => {
        promise.then((data) => {
          setLecture(data);
          setLectureContent(data.content);
          setLectureTitle(data.title)
        });
      };
      getData();
    }
  });

  function change(video){
    setVideoUrl(URL.createObjectURL(video));
  }

  function onSubmit() {
    if (!(lectureTitle && lectureContent)) {
      setError(1);
    } else {
      const fd = new FormData();
      if (lectureFile) {
        fd.append("file", lectureFile);

        fetch(`/api/file/upload/lecture/${state}`, {
          method: 'POST',
          body: fd
        })
        .then(response => response.json())
        .then(data => {
        })
        .catch(error => {
            console.error('File upload failed:', error);
            setError(2);
        });
      } else {
        console.error("No file selected.");
      }
  
      const videofd = new FormData();
      if (lectureVideo) {
        videofd.append("file", lectureVideo);
        
        const time = document.getElementById("video")

        const data = {
          title : lectureTitle,
          content : lectureContent,
          videoTime : Math.floor(time.duration),
        }
  
        axios
        .post(`/api/subject/${state}/lecture/mod`, data)
        .then((res) => {
        })
        .catch((err) => {
          console.log(`${err} : Write Error`)
          setError(2);
        })

        fetch(`/api/file/upload/video/${state}`, {
          method: 'POST',
          body: videofd
        })
        .then(response => response.json())
        .then(data => {
        })
        .catch(error => {
            console.error('File upload failed:', error);
            setError(2);
        });
      } else {
        const data = {
          title : lectureTitle,
          content : lectureContent,
          videoTime : lecture.lectureTime
        }
  
        axios
        .post(`/api/subject/${state}/lecture/mod`, data)
        .then((res) => {
        })
        .catch((err) => {
          console.log(`${err} : Write Error`)
          setError(2);
        })
        console.error("No file selected.")
      }
    }
  };

  return<>
    {
      lecture &&
        <Container>
          <TableBox>
            <H2>강의 수정</H2>
            <Input type="text" name="lecture_title" id="lecture_title" value={lectureTitle} onChange={(e)=>setLectureTitle(e.target.value)} placeholder="제목 입력해주세요"/>
            <Hr />
            <ContentInput type="text" name="lecture_content" id="lecture_content" value={lectureContent} onChange={(e)=>setLectureContent(e.target.value)} placeholder="내용을 입력해주세요"/>
            <P>영상 강의</P>
            <Input type="file" name="lecture_video" id="lecture_video" accept="video/*" onChange={(e)=>{setLectureVideo(e.target.files[0]); change(e.target.files[0])}}/>
            <P>강의 자료</P>
            <Input type="file" name="lecture_file" id="lecture_file" onChange={(e)=>setLectureFile(e.target.files[0])}/>
            {error == 1 && <ErrorMsg>제목 혹은 내용이 작성되어 있지 않습니다.</ErrorMsg>}
            {error == 2 && <ErrorMsg>수정에 실패하였습니다.</ErrorMsg>}
            <Box>
              <PrimaryButton onClick={()=>onSubmit()}><p>수정</p></PrimaryButton>
              <DeleteModal name={"삭제"}></DeleteModal>
              <SecondaryButton onClick={() => navigate(`/lms/t/${lecture.subjectId}/lecture/${state}`)}><p>취소</p></SecondaryButton>
            </Box>
            {
              videoUrl &&
              <Video id="video" src={videoUrl} muted></Video>
            }
          </TableBox>
        </Container>
    }
  </>
}