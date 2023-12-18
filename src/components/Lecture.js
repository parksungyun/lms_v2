import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { BiPlay, BiStop } from "react-icons/bi";
import { VideoModal } from "./VideoModal";
import axios from "axios";

const ProgressBar = styled.div`
  width: 100%;
  height: 30px;
  background-color: #dedede;
  border-radius:12px;
  font-weight: 600;
  font-size: .8rem;
  overflow: hidden;
  margin-bottom: 1rem;
`;

const ProgressBox = styled.div`
  width: ${(props) => props.width}%; 
  height: 30px;
  padding: 0;
  text-align: start;
  background-color: #5f7dcf;
  color: #111;
`;

const Video = styled.video`
  width: 100%;
  /* pointer-events: none; */
  margin-bottom: 1rem;
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

 export function Lecture({src, videos, id, time}) {
  const [nowPlaying, setNowPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  const ref = useRef();

  const videoElement = ref && ref.current;

  const videoSrc = src || "";
  
  // 동영상 시간 업데이트 함수
  const addTimeUpdate = () => {
    const observedVideoElement = ref && ref.current;
    if (observedVideoElement) {
      observedVideoElement.addEventListener("timeupdate", function() {
        setCurrentTime(Math.floor(observedVideoElement.currentTime));
      });
      setNowPlaying(true);
    }
  };

  useEffect(() => {
    addTimeUpdate();
  }, []);

console.log(sessionStorage)

  // 강의 영상 재생 후 테스트 해봐야함
  useEffect(() => {
    if (sessionStorage.getItem("userType") == "s") {
      const data = {
        lectureId: id,
        studentId: sessionStorage.getItem("id"),
        progressTime: currentTime,
      };
      console.log(data);
      axios
      .post("/api/subject/study", data)
      .then((res) => {
        console.log(res.data.data)
      })
      .catch((err) => {
        console.log(`${err} : 실패`);
      });
    }
  }, [currentTime]);

  // play icon 클릭했을떄 실행되는 함수
  const onPlayIconClick = () => {
    if (videoElement) {
      if (nowPlaying) {
        videoElement.play();
        setNowPlaying(false);
      } else {
        videoElement.pause();
        setNowPlaying(true);
      }
    }
  };

  let i = (currentTime / time * 100);
  const reset = 0;

  if (time == 0 || currentTime == 0) {
    i = 0;
  } else if (i == 100) {
    return <VideoModal chart={videos} id={id}/>
  };

  if (videoSrc) {
    axios
    .get(`/api/file/video/${videoSrc.substring(videoSrc.lastIndexOf("\\") + 1)}`)
    .then((res) => {
      console.log(res.data.data)
    })
    .catch((err) => {
      console.log(`${err} : failed`)
    })
  }

  return (
    <>
      <Box>
      <PrimaryButton onClick={()=>onPlayIconClick()}>{ nowPlaying ? <BiPlay className="icon" /> : <BiStop className="icon" />}</PrimaryButton>
        <P>{currentTime ? Math.floor(currentTime/ 60).toString().padStart(2, '0') + ":" + Math.floor(currentTime % 60).toString().padStart(2, '0') : '00:00'} / {Math.floor(time/ 60).toString().padStart(2, '0') + ":" + Math.floor(time % 60).toString().padStart(2, '0')}</P>
      </Box>
      <ProgressBar>
        <ProgressBox width = {i}/>
      </ProgressBar>
      <Video
        muted={false}
        ref={ref}
        id="lectureVideo"
      >
        <source src={"/api/file/video/" + videoSrc.substring(videoSrc.lastIndexOf("\\") + 1)} type="video/mp4"/>
      </Video>
    </>
  );
};