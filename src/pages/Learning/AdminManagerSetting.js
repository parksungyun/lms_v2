import styled from "styled-components";
import { Table } from "../../components/Table";
import { academics, courses, managerPosition } from "../../assets/TempData";
import { userList } from "../../assets/TempData";
import '../../styles/admin_table.css';
import { useNavigate } from "react-router-dom";
import { getAllManagers } from "../Api";
import { useState } from "react";
import { useEffect } from "react";

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
  const [managers, setManagers] = useState(null);
  let items;
  useEffect(() => {
    if(!managers) {
      const promise = getAllManagers();
      const getData = () => {
        promise.then((data) => {
          setManagers(data);
        });
      };
      getData();
    }
  });
  if(managers) {
    items = managers.map((a, i) => (
      {
        no: i + 1,
        name: a.user.userName,
        birth: a.user.userBirth,
        phone: a.user.userPhone,
        email: a.user.userEmail,
        position: a.position,
        course: a.num,
        info: <SecondaryButton onClick={() => onDetail(a.academic.academicId)}><p>상세정보</p></SecondaryButton>
      }
    ))
  }

  const navigate = useNavigate();

  function onDetail(id) {
    navigate(`${id}`);
  }
  console.log(items);
  return <>
    <Container>
      <Content>
        <H2 className="title">매니저 관리</H2>
        <PrimaryButton onClick={() => navigate("add")}><p>매니저 등록</p></PrimaryButton>
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