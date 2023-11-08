import styled from "styled-components";
import { BsFillEyeFill } from "react-icons/bs";
import { BsDownload } from "react-icons/bs";

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

const IconBox = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Hr = styled.hr`
  border: 0 solid #ddd;
`;

const Content = styled.div`
  height: 500px;
  overflow-y: scroll;
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

export function BoardPost({userState}) {
  return<>
    <TableBox>
      <H2>수업 공지 사항입니다.</H2>
      <Box>
        <P>안경태</P>
        <P>|</P>
        <P>2023-09-01</P>
        <P>|</P>
        <IconBox>
          <BsFillEyeFill />
          <P>50</P>
        </IconBox>
      </Box>
      <Hr />
      <Content>
        안녕하세요, Y&Y아카데미학원입니다. <br />
        2023년 8월에 개강하는 과목을 안내해 드립니다.
        <br /><br />
        앞으로의 개강 일정은 공식 홈페이지 [학과 및 모집 안내]←클릭 또는 HRD-Net←클릭 에서 가장 먼저 알아보실 수 있습니다.  
        <br />
        [기업프로젝트] 데이터시각화 UI 개발자 트랙 
        <br />
        프론트엔드 전문 실무기술을 배워 데이터시각화 기술을 통해 기업 과제를 풀어내고 포트폴리오에 녹여내어 취업하는 과정입니다.<br />기업과 연계되어 있어 기업이 원하는 기술이 적용된 포폴 제작이 가능합니다.
        <br /><br />
        실무 팀프로젝트(과제) 내용<br />
        1. 코로나 현황 모리터링 시스템 UI 개발<br />
        2. 스마트팩토리 통합 관제 모니터링 시스템 UI 개발 <br />
        <br />
        교육비 :8,908,380원 전액 지원 (자비부담 0원)<br />
        교재비: 전액 무료 지원<br />
        훈련수당: 매달 최대 81만 6천 원 차등 지급(식비+교통비)<br />
        훈련기간: 2023.08.28. - 2024.02.21.<br />
        훈련시간: 09:00 - 17:30<br />
        모집인원: 선착순 30명<br />
        <br />
        신청안내: 고용센터에서 국민내일배움카드를 발급받은 후 온라인 신청←클릭<br />
        교육내용: 교육 안내 페이지 이동←클릭
        <br />
        <br />
        <br />
        교육 관련 문의는 042-222-2402로 전화주시면 친절히 안내해 드리겠습니다.
        <br />
        <br />
        <br />
        DW아카데미학원은 훈련생들이 전문가로 인정받고, 대우받고, 쓰임받고, 사랑받도록 늘 정성과 사랑으로 최상의 교육을 하겠습니다.<br />
        JAVA라 IT개발자의 길, DW아카데미학원
      </Content>
      <AttachedBox>
        <Attached><p className="fw-bold">첨부파일</p></Attached>
        <div><A href="">파일.pdf<Icon><BsDownload /></Icon></A></div>
      </AttachedBox>
      <Box className="button">
        {userState = 0 ? null : <PrimaryButton><p>수정</p></PrimaryButton>}
        <SecondaryButton><p>목록</p></SecondaryButton>
      </Box>
    </TableBox>
  </>
}