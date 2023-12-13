import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

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

export function TrainerLectureWrite() {
  const navigate = useNavigate();
  const pathName = useLocation().pathname;
  const subjectId = pathName.split("/")[3];
  const [lectureTitle, setLectureTitle] = useState();
  const [lectureContent, setLectureContent] = useState();
  const [lectureVideo, setLectureVideo] = useState();
  const [lectureFile, setLectureFile] = useState();
  const [videoUrl, setVideoUrl] = useState();
  const [error, setError] = useState();
  const [lectureId, setLectureId] = useState();

  function change(video){
    setVideoUrl(URL.createObjectURL(video));
  }

  function onSubmit() {
    if (!(lectureTitle && lectureContent && lectureVideo)) {
      setError(1);
    } else {
      const time = document.getElementById("video")
      const data = {
        title : lectureTitle,
        content : lectureContent,
        videoTime : Math.floor(time.duration),
        academicId: sessionStorage.getItem("id")
      }
      axios
      .post(`/api/subject/${subjectId}/lecture/write`, data)
      .then((res) => {
        console.log(res.data.data)
        setLectureId(res.data.data.lectureId)
        setError(3);
      })
      .catch((err) => {
        console.log(`${err} : Write Error`)
        setError(2);
      })
    }
  };

  useEffect(()=>{
    const fd = new FormData();
    if (lectureFile) {
      fd.append("file", lectureFile);
      console.log(fd);
      for (const pair of fd.entries()) {
        console.log(pair[0] + ', ' + pair[1]);
    }
    } else {
      console.error("No file selected.");
    }

    const videofd = new FormData();
    if (lectureVideo) {
      videofd.append("file", lectureVideo);
      console.log(videofd);
      for(const pair of videofd.entries()) {
        console.log(pair[0] + ', ' + pair[1]);
      }
    } else {
      console.error("No file selected.")
    }
    if (lectureId) {  
      fetch(`/api/file/upload/lecture/${lectureId}`, {
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

      fetch(`/api/file/upload/video/${lectureId}`, {
        method: 'POST',
        body: videofd
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
  },[lectureId]);

  return<>
    <Container>
      <TableBox>
        <H2>강의 등록</H2>
        <Input type="text" name="lecture_title" id="lecture_title" value={lectureTitle} onChange={(e)=>setLectureTitle(e.target.value)} placeholder="제목을 입력해주세요"/>
        <Hr />
        <ContentInput type="text" name="lecture_content" id="lecture_content" value={lectureContent} onChange={(e)=>setLectureContent(e.target.value)} placeholder="내용을 입력해주세요"/>
        <P>영상 강의</P>
        <Input type="file" name="lecture_video" id="lecture_video" accept="video/*" onChange={(e)=>{setLectureVideo(e.target.files[0]); change(e.target.files[0])}}/>
        <P>강의 자료</P>
        <Input type="file" name="lecture_file" id="lecture_file" onChange={(e)=>setLectureFile(e.target.files[0])}/>
        {error == 1 && <ErrorMsg>입력하지 않은 항목이 있습니다.</ErrorMsg>}
        {error == 2 && <ErrorMsg>등록에 실패하였습니다.</ErrorMsg>}
        {error == 3 && navigate(`/lms/t/${subjectId}/lecture`)}
        <Box>
          <PrimaryButton onClick={()=>onSubmit()}><p>등록</p></PrimaryButton>
          <SecondaryButton onClick={() => navigate(`/lms/t/${subjectId}/lecture`)}><p>목록</p></SecondaryButton>
        </Box>
        {
          videoUrl &&
          <Video id="video" src={videoUrl} muted></Video>
        }
      </TableBox>
    </Container>
  </>
}