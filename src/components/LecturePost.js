import styled from "styled-components";
import { academics, lectures, userList } from "../assets/TempData";
import { BsFillEyeFill, BsDownload } from "react-icons/bs";
import { BiPlay } from "react-icons/bi";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import getBlobDuration from "get-blob-duration";

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
  text-align: center;
  background-color: #5f7dcf;
  color: #111;
`;

const Video = styled.video`
  width: 100%;
  /* pointer-events: none; */
  margin-bottom: 1rem;
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
  const lecture = lectures.find(data => data.lecture_id == id);
  const user = userList.find(d=> d.uid == academics.find(d => d.academic_id == lectures.find(d => d.lecture_id == id).academic_id).uid);
  const video = lecture.lecture_videoURL;

  let vduration = '';
  let vtime = '';
  
  async function setTotalTime() {
    const duration = await getBlobDuration(video);
    vduration = Math.floor(duration / 60).toString().padStart(2, '0') + ":" + Math.floor(duration % 60).toString().padStart(2, '0');
    vtime = '0'.padStart(2, '0') + ":" + '0'.padStart(2, '0');
  }


  let playIcon = document.getElementById("playIcon");

  
  function videocontroll() {
    let min = 0;
    let sec = 0;

    if(video.paused){
      video.play();
      const interval = setInterval(function() { 

        vtime = Math.floor(video.currentTime / 60).toString().padStart(2, '0') + ":" + Math.floor(video.currentTime % 60).toString().padStart(2, '0');

        if(video.currentTime >= video.duration){
          clearInter(interval);
        }
      }, 100)
      playIcon.classList.remove("bi-play-fill");
      playIcon.classList.add("bi-stop-fill");
    }else{
      video.pause();
      playIcon.classList.remove("bi-stop-fill");
      playIcon.classList.add("bi-play-fill");
    }
  }

  function clearInter(interval){
    alert('동영상을 모두 감상하셨습니다!');
    playIcon.classList.remove("bi-stop-fill");
    playIcon.classList.add("bi-play-fill");
    clearInterval(interval);
  }
  const maxItem = vduration;
	let availableItem = vtime;
  let type;
  const isStudent = 0;
  if(isStudent == 0) type = "t";
  else type = "s";
  
  return<>
    <Container>
      <TableBox>
        <H2>{lecture.lecture_title}</H2>
        <Box>
          <P>{user.user_name}</P>
          <P>|</P>
          <P>{lecture.lecture_reg_date}</P>
          <P>|</P>
          <IconBox>
            <BsFillEyeFill />
            <P>{lecture.lecture_hits}</P>
          </IconBox>
        </Box>
        <Hr />
        <Box>
          <PrimaryButton onClick={()=>videocontroll()}><i className="bi bi-play-fill icon" id="playIcon"/></PrimaryButton>
          <P>{availableItem} / {maxItem}</P>
        </Box>
        <ProgressBar>
          <ProgressBox width = {100-(availableItem*100/maxItem)}/>
        </ProgressBar>
        <Video autoplay loop controls onClick={() => setTotalTime()}>
         <source src={video} type="video/mp4"/>
        </Video>
        <P>{lecture.lecture_content}</P>
        <AttachedBox>
        <Attached><p className="fw-bold">첨부파일</p></Attached>
        <div><A href="">파일.pdf<Icon><BsDownload /></Icon></A></div>
      </AttachedBox>
      <Box className="button">
        {isStudent == 1 ? null : <PrimaryButton className="button" onClick={()=>navigate("mod", { state: lecture.lecture_id })}><p>수정</p></PrimaryButton>}
        <SecondaryButton onClick={()=>navigate(`/lms/${type}/${lecture.subject_id}/lecture`)}><p>목록</p></SecondaryButton>
      </Box>
      </TableBox>
    </Container>
  </>
}