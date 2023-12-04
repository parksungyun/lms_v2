import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { BiPlay, BiStop } from "react-icons/bi";
import { VideoModal } from "./VideoModal";

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

 export function Lecture({src, videos, id}) {
  const [nowPlaying, setNowPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [totalTime, setTotalTime] = useState(0);

  // const ref = useRef<HTMLVideoElement>(null);
  const ref = useRef();

  window.onload = () => {
    const video = document.getElementById('lectureVideo');
    setTotalTime(Math.floor(video.duration));
  };

  const videoElement = ref && ref.current;

  const videoSrc = src || "";

  // 동영상 시간 업데이트 함수
  const addTimeUpdate = () => {
    const observedVideoElement = ref && ref.current;
    if (observedVideoElement) {
      observedVideoElement.addEventListener("timeupdate", function() {
        setCurrentTime(Math.floor(observedVideoElement.currentTime));
      });
      setNowPlaying(true)
    }
  };

  useEffect(() => {
    addTimeUpdate();
  }, []);

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

  let i = (currentTime / totalTime * 100);
  const reset = 0;

  if (totalTime == 0 || currentTime == 0) {
    i = 0;
  } else if (i == 100) {
    return <VideoModal chart={videos} id={id}/>
  };

  return (
    <>
      <Box>
      <PrimaryButton onClick={()=>onPlayIconClick()}>{ nowPlaying ? <BiPlay className="icon" /> : <BiStop className="icon" />}</PrimaryButton>
        <P>{currentTime ? Math.floor(currentTime/ 60).toString().padStart(2, '0') + ":" + Math.floor(currentTime % 60).toString().padStart(2, '0') : '00:00'} / {Math.floor(totalTime/ 60).toString().padStart(2, '0') + ":" + Math.floor(totalTime % 60).toString().padStart(2, '0')}</P>
      </Box>
      <ProgressBar>
        <ProgressBox width = {i}/>
      </ProgressBar>
      <Video controls
        muted={false}
        ref={ref}
        id="lectureVideo"
      >
        <source src={videoSrc} type="video/mp4"/>
      </Video>
    </>
  );
};