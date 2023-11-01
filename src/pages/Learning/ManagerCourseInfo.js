import styled from "styled-components";
import { Table } from "../../components/Table";
import { userList, students } from "../../assets/TempData";
import '../../styles/trainer_subject_table.css';
import { useNavigate } from "react-router-dom";

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

const PrimaryButton = styled.button`
  border: 0;
  border-radius: 5px;
  background-color: #5f7dcf;
  padding: 0.8rem 1.4rem;
  color: white;
`;

const SecondaryButton = styled.button`
  border: 0;
  border-radius: 5px;
  background-color: gray;
  padding: 0.8rem 1.4rem;
  color: white;
`;

const courseInfo = [
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
    text: '출결관리',
    value: 'attendance'
  },
  {
    text: '상세정보',
    value: 'info'
  },
];

export function ManagerCourseInfo(){
  const navigate = useNavigate();

  const items = [
    {
      no: 1,
      name: userList[students[0].uid - 1].user_name,
      birth: userList[students[0].uid - 1].user_birth,
      phone: userList[students[0].uid - 1].user_phone,
      attendance: <PrimaryButton onClick={()=>navigate('/lms/m/info')}>출결관리</PrimaryButton>,
      info: <SecondaryButton onClick={()=>navigate('/lms/m/info')}>상세정보</SecondaryButton>
    },
    {
      no: 2,
      name: userList[students[1].uid - 1].user_name,
      birth: userList[students[1].uid - 1].user_birth,
      phone: userList[students[1].uid - 1].user_phone,
      attendance: <PrimaryButton onClick={()=>navigate('/lms/m/info')}>출결관리</PrimaryButton>,
      info: <SecondaryButton onClick={()=>navigate('/lms/m/info')}>상세정보</SecondaryButton>
    },
  ];

  return<>
    <Container>
      <TableBox>
        <H2>과정 정보</H2>
        <Box>
          <ContentBox className="col-3">
            <Bold>과정명</Bold>
            <p>스마트 UI/UX 디지털 디자인 2회차</p>
          </ContentBox>
          <ContentBox className="col-3">
            <Bold>과목수</Bold>
            <p>5</p>
          </ContentBox>
          <ContentBox className="col-3">
            <Bold>기간</Bold>
            <p>2023.06.07 ~ 2023.12.29</p>
          </ContentBox>
          <ContentBox className="col-3">
            <Bold>학생수</Bold>
            <p>30명</p>
          </ContentBox>
        </Box>
        <Table 
          headers={courseInfo}
          items={items}
          selectable={false}
        />
      </TableBox>
    </Container>
  </>
}