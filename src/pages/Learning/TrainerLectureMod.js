import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { lectures } from "../../assets/TempData";

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

export function TrainerLectureMod() {
  const id = 2;
  const lecture = lectures.find(data => data.lecture_id == id);
  const navigate = useNavigate();
  const [lecture_title, setLecture_title] = useState(lecture.lecture_title);
  const [lecture_content, setLecture_content] = useState(lecture.lecture_content);
  const [lecture_video, setLecture_video] = useState(`${lecture.lecture_videoURL}`.mp4);   // 이게 맞는 문법인지는 잘 모르겠음!!!!
  const [lecture_file, setLecture_file] = useState(lecture.lecture_fileURL);


  return<>
    <Container>
      <TableBox>
        <H2>강의 수정</H2>
        <form action="" method="POST">
          <Input type="text" name="lecture_title" id="lecture_title" value={lecture_title} onChange={(e)=>setLecture_title(e.target.value)} placeholder="제목 입력해주세요"/>
          <Hr />
          <ContentInput type="text" name="lecture_content" id="lecture_content" value={lecture_content} onChange={(e)=>setLecture_content(e.target.value)} placeholder="제목 입력해주세요"/>
          <P>영상 강의</P>
          <Input type="file" name="lecture_video" id="lecture_video" value={lecture_video} onChange={(e)=>setLecture_video(e.target.value)}/>
          <P>강의 자료</P>
          <Input type="file" name="lecture_file" id="lecture_file" value={lecture_file} onChange={(e)=>setLecture_file(e.target.value)}/>
          <Box>
            <PrimaryButton type="submit"><p>수정</p></PrimaryButton>
            <DangerButton><p>삭제</p></DangerButton>
            <SecondaryButton onClick={() => navigate(-1)}><p>목록</p></SecondaryButton>
          </Box>
        </form>
      </TableBox>
    </Container>
  </>
}