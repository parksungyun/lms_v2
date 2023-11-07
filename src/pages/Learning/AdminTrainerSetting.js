import styled from "styled-components";
import { Table } from "../../components/Table";
import { academics, subjects, trainerPosition } from "../../assets/TempData";
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

const trainerSetting = [
  {
    text: 'No.',
    value: 'no'
  },
  {
    text: '강사이름',
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
    text: '포지션',
    value: 'position'
  },
  {
    text: '담당 과목 수',
    value: 'subject'
  },
  {
    text: '상세정보',
    value: 'info'
  }
];

export function AdminTrainerSetting() {
  const trainers = academics.filter((a) => a.dept == 1);
  const items = trainers.map((a, i) => (
    {
      no: i + 1,
      name: userList[a.uid - 1].user_name,
      birth: userList[a.uid - 1].user_birth,
      phone: userList[a.uid - 1].user_phone,
      email: userList[a.uid - 1].user_email,
      position: trainerPosition.find((p) => p.position_id == a.position).position_name,
      subject: subjects.filter((s) => s.academic_id == a.academic_id).length,
      info: <SecondaryButton onClick={() => onDetail(a.academic_id)}><p>상세정보</p></SecondaryButton>
    }
  ))

  const navigate = useNavigate();

  function onDetail(id) {
    navigate(`${id}`);
  }

  return <>
    <Container>
      <Content>
        <H2 className="title">강사 관리</H2>
        <PrimaryButton onClick={() => navigate("add")}><p>강사 등록</p></PrimaryButton>
      </Content>
      <TableBox>
        <Table 
          headers={trainerSetting}
          items={items}
          selectable={false}
        />
      </TableBox>
    </Container>
  </>
}