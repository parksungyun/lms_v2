import styled from "styled-components";
import { Table } from "../../components/Table";
import { academics } from "../../assets/TempData";
import { userList } from "../../assets/TempData";
import '../../styles/admin_table.css';
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  padding: 1.5rem 2rem;
  padding-bottom: 2rem;
  background-color: #f6f9ff;
  height: 100%;
`;

const Content = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
  align-items: center;
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
  margin: 10px 0;
  &.title{
    margin: 0;
  }
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
  padding: 0.6rem 1.4rem;
  color: white;
`;

const managerSetting = [
  {
    text: 'No.',
    value: 'no'
  },
  {
    text: '매니저이름',
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
    text: '이메일',
    value: 'email'
  },
  {
    text: '직급',
    value: 'position'
  },
  {
    text: '담당 과정 수',
    value: 'course'
  },
  {
    text: '상세정보',
    value: 'info'
  }
];

export function AdminManagerSetting() {
  const items = [
    {
      no: 1,
      name: userList[academics[0].uid - 1].user_name,
      birth: userList[academics[0].uid - 1].user_birth,
      phone: userList[academics[0].uid - 1].user_phone,
      email: userList[academics[0].uid - 1].user_email,
      position: academics[0].position,
      course: 1,
      info: <SecondaryButton onClick={() => onDetail(academics[0].academic_id)}>상세정보</SecondaryButton>
    },
    {
      no: 2,
      name: userList[academics[2].uid - 1].user_name,
      birth: userList[academics[2].uid - 1].user_birth,
      phone: userList[academics[2].uid - 1].user_phone,
      email: userList[academics[2].uid - 1].user_email,
      position: academics[2].position,
      course: 1,
      info: <SecondaryButton onClick={() => onDetail(academics[2].academic_id)}>상세정보</SecondaryButton>
    },
    {
      no: 3,
      name: userList[academics[3].uid - 1].user_name,
      birth: userList[academics[3].uid - 1].user_birth,
      phone: userList[academics[3].uid - 1].user_phone,
      email: userList[academics[3].uid - 1].user_email,
      position: academics[3].position,
      course: 0,
      info: <SecondaryButton onClick={() => onDetail(academics[3].academic_id)}>상세정보</SecondaryButton>
    },
  ]

  const navigate = useNavigate();

  function onDetail(id) {
    navigate(`${id}`);
  }

  return <>
    <Container>
      <Content>
        <H2 className="title">매니저 관리</H2>
        <PrimaryButton onClick={() => navigate("add")}>매니저 등록</PrimaryButton>
      </Content>
      <TableBox>
        <Table 
          headers={managerSetting}
          items={items}
          selectable={false}
        />
      </TableBox>
    </Container>
  </>
}