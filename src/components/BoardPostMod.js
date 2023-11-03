import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

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
  margin: 0;
  justify-content: center;
  margin-top: 1rem;
  margin-bottom: 0;
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
  margin-top: 1rem;
`;

const ContentInput = styled.textarea`
  width: 100%;
  height: 400px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid lightgray;
  resize: none;
`;

export function BoardPostMod() {
  const [board_content, setBoard_content] = useState("안녕하세요, Y&Y아카데미학원입니다.2023년 8월에 개강하는 과목을 안내해 드립니다. 앞으로의 개강 일정은 공식 홈페이지 [학과 및 모집 안내]←클릭 또는 HRD-Net←클릭 에서 가장 먼저 알아보실 수 있습니다. [기업프로젝트] 데이터시각화 UI 개발자 트랙 프론트엔드 전문 실무기술을 배워 데이터시각화 기술을 통해 기업 과제를 풀어내고 포트폴리오에 녹여내어 취업하는 과정입니다.기업과 연계되어 있어 기업이 원하는 기술이 적용된 포폴 제작이 가능합니다. 실무 팀프로젝트(과제) 내용 1. 코로나 현황 모리터링 시스템 UI 개발 2. 스마트팩토리 통합 관제 모니터링 시스템 UI 개발 교육비 :8,908,380원 전액 지원 (자비부담 0원) 교재비: 전액 무료 지원 훈련수당: 매달 최대 81만 6천 원 차등 지급(식비+교통비 훈련기간: 2023.08.28. - 2024.02.21. 훈련시간: 09:00 - 17:30 모집인원: 선착순 30명 신청안내: 고용센터에서 국민내일배움카드를 발급받은 후 온라인 신청←클릭 교육내용: 교육 안내 페이지 이동←클릭 교육 관련 문의는 042-222-2402로 전화주시면 친절히 안내해 드리겠습니다. Y&Y아카데미학원은 훈련생들이 전문가로 인정받고, 대우받고, 쓰임받고, 사랑받도록 늘 정성과 사랑으로 최상의 교육을 하겠습니다. JAVA라 IT개발자의 길, Y&Y아카데미학원");
  const [board_title, setBoard_title] = useState("수업 공지 사항입니다.");
  const navigate = useNavigate();
  return<>
    <TableBox>
      <H2>공지 수정</H2>
      <form action="" method="POST">
        <Input type="text" name="board_title" id="board_title" value={board_title} onChange={(e)=>setBoard_title(e.target.value)}/>
        <Hr />
        <ContentInput type="text" name="board_content" id="board_content" value={board_content}  onChange={(e)=>setBoard_content(e.target.value)}/>
        <Input type="file" name="board_file" id="board_file" accept="" />
        <Box>
          <PrimaryButton type="submit">수정</PrimaryButton>
          <DangerButton>삭제</DangerButton>
          <SecondaryButton onClick={() => navigate(-1)}>목록</SecondaryButton>
        </Box>
      </form>
    </TableBox>
  </>
}