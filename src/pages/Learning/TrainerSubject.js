import styled from "styled-components";
import { Table } from "../../components/Table";
import '../../styles/trainer_subject_table.css';

const headers = [
  {
    text: 'No.',
    value: 'no'
  },
  {
    text: '학생이름',
    value: 'name'
  },
  {
    text: '생년월일',
    value: 'birth'
  },
  {
    text: '연락처',
    value: 'phone'
  },
  {
    text: '수강한 강의 수',
    value: 'lectureCount'
  },
  {
    text: '제출한 과제 수',
    value: 'HWCount'
  },
];

const items = [
  {
    no: 1,
    name: '가나다',
    birth: '1999.01.01',
    phone: '010-1234-5678',
    lectureCount: '3',
    HWCount: '3'
  },
  {
    no: 2,
    name: '가나다',
    birth: '1999.01.01',
    phone: '010-1234-5678',
    lectureCount: '3',
    HWCount: '3'
  },
  {
    no: 3,
    name: '가나다',
    birth: '1999.01.01',
    phone: '010-1234-5678',
    lectureCount: '3',
    HWCount: '3'
  },
  {
    no: 4,
    name: '가나다',
    birth: '1999.01.01',
    phone: '010-1234-5678',
    lectureCount: '3',
    HWCount: '3'
  },
  {
    no: 5,
    name: '가나다',
    birth: '1999.01.01',
    phone: '010-1234-5678',
    lectureCount: '3',
    HWCount: '3'
  },
  {
    no: 6,
    name: '가나다',
    birth: '1999.01.01',
    phone: '010-1234-5678',
    lectureCount: '3',
    HWCount: '3'
  },
  {
    no: 7,
    name: '가나다',
    birth: '1999.01.01',
    phone: '010-1234-5678',
    lectureCount: '3',
    HWCount: '3'
  },
  {
    no: 8,
    name: '가나다',
    birth: '1999.01.01',
    phone: '010-1234-5678',
    lectureCount: '3',
    HWCount: '3'
  },
  {
    no: 9,
    name: '가나다',
    birth: '1999.01.01',
    phone: '010-1234-5678',
    lectureCount: '3',
    HWCount: '3'
  },
  {
    no: 10,
    name: '가나다',
    birth: '1999.01.01',
    phone: '010-1234-5678',
    lectureCount: '3',
    HWCount: '3'
  },
  {
    no: 11,
    name: '가나다',
    birth: '1999.01.01',
    phone: '010-1234-5678',
    lectureCount: '3',
    HWCount: '3'
  },
  {
    no: 12,
    name: '가나다',
    birth: '1999.01.01',
    phone: '010-1234-5678',
    lectureCount: '3',
    HWCount: '3'
  },
  {
    no: 13,
    name: '가나다',
    birth: '1999.01.01',
    phone: '010-1234-5678',
    lectureCount: '3',
    HWCount: '3'
  },
  {
    no: 14,
    name: '가나다',
    birth: '1999.01.01',
    phone: '010-1234-5678',
    lectureCount: '3',
    HWCount: '3'
  },
  {
    no: 15,
    name: '가나다',
    birth: '1999.01.01',
    phone: '010-1234-5678',
    lectureCount: '3',
    HWCount: '3'
  },
  {
    no: 16,
    name: '가나다',
    birth: '1999.01.01',
    phone: '010-1234-5678',
    lectureCount: '3',
    HWCount: '3'
  },
  {
    no: 17,
    name: '가나다',
    birth: '1999.01.01',
    phone: '010-1234-5678',
    lectureCount: '3',
    HWCount: '3'
  },
  {
    no: 18,
    name: '가나다',
    birth: '1999.01.01',
    phone: '010-1234-5678',
    lectureCount: '3',
    HWCount: '3'
  },
  {
    no: 19,
    name: '가나다',
    birth: '1999.01.01',
    phone: '010-1234-5678',
    lectureCount: '3',
    HWCount: '3'
  },
  {
    no: 20,
    name: '가나다',
    birth: '1999.01.01',
    phone: '010-1234-5678',
    lectureCount: '3',
    HWCount: '3'
  },
  {
    no: 21,
    name: '가나다',
    birth: '1999.01.01',
    phone: '010-1234-5678',
    lectureCount: '3',
    HWCount: '3'
  },
  {
    no: 22,
    name: '가나다',
    birth: '1999.01.01',
    phone: '010-1234-5678',
    lectureCount: '3',
    HWCount: '3'
  },
  {
    no: 23,
    name: '가나다',
    birth: '1999.01.01',
    phone: '010-1234-5678',
    lectureCount: '3',
    HWCount: '3'
  },
  {
    no: 24,
    name: '가나다',
    birth: '1999.01.01',
    phone: '010-1234-5678',
    lectureCount: '3',
    HWCount: '3'
  },
  {
    no: 25,
    name: '가나다',
    birth: '1999.01.01',
    phone: '010-1234-5678',
    lectureCount: '3',
    HWCount: '3'
  },
];

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
  border-bottom: 2px solid #ddd;
  border-top: 2px solid #ddd;
  width: 100%;
  display: flex;
  margin: 1.5rem 0;
  padding: 5px 15px;
`;

const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Bold = styled.p`
  font-weight: bold;
  font-size: 1.2rem;
`;

export function TrainerSubject() {
  return<>
    <Container>
      <TableBox>
        <H2>과목 정보</H2>
        <Box>
          <ContentBox className="col-3">
            <Bold>과정명</Bold>
            <p>스마트 UI/UX 디지털 디자인 2회차</p>
          </ContentBox>
          <ContentBox className="col-3">
            <Bold>과목명</Bold>
            <p>HTML</p>
          </ContentBox>
          <ContentBox className="col-3">
            <Bold>기간</Bold>
            <p>2023.06.07 ~ 2023.12.19</p>
          </ContentBox>
          <ContentBox className="col-3">
            <Bold>학생수</Bold>
            <p>30명</p>
          </ContentBox>
        </Box>
        <Box>
          <ContentBox className="col-3">
            <Bold>등록한 공지</Bold>
            <p>3</p>
          </ContentBox>
          <ContentBox className="col-3">
            <Bold>등록한 강의</Bold>
            <p>30</p>
          </ContentBox>
          <ContentBox className="col-3">
            <Bold>등록한 과제</Bold>
            <p>15</p>
          </ContentBox>
          <ContentBox className="col-3">
            <Bold>답변 대기 질문</Bold>
            <p>5</p>
          </ContentBox>
        </Box>
        <Table 
          headers={headers}
          items={items}
          selectable={false}
        />
      </TableBox>
    </Container>
  </>
}