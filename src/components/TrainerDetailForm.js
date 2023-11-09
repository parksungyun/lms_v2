import { useNavigate } from "react-router-dom";
import { academics, userList, department, trainerPosition } from "../assets/TempData";
import styled from "styled-components";
import { useState } from "react";

const Content = styled.div`
  padding: 2rem 0;
  padding-top: 2rem;
  background-color: white;
  border-radius: 1rem;
  margin-bottom: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3rem;
`;

const PrimaryButton = styled.button`
  border: 0;
  border-radius: 5px;
  background-color: #5f7dcf;
  padding: 0.8rem 1.4rem;
  color: white;
`;

const Details = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
`;

const Detail = styled.div`
  display: flex;
  gap: 1rem;
  width: 100%;
  padding-right: 2rem;
  align-items:center;
`;

const Label = styled.label`
  width: 10%;
`;

const Input = styled.input`
  width: 90%;
  padding: 0.7rem;
  border: 1px solid lightgray;
  border-radius: 0.5rem;
`;

const ButtonBox = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
`;

const Select = styled.select`
  width: 90%;
  padding: 0.7rem;
  border: 1px solid lightgray;
  border-radius: 0.5rem;
`;

export function TrainerDetailForm() {
  const navigate = useNavigate();
  const id = 1; // 임시
  const academic = academics.find((a) => a.academic_id == id);
  const user = userList.find((u) => u.uid == academic.uid);
  const dept = department.find((d) => d.dept_id == academic.dept);
  
  const [userName, setUserName] = useState(user.user_name);
  const [userId, setUserId] = useState(user.user_id);
  const [userBirth, setUserBirth] = useState(user.user_birth);
  const [userDept, setUserDept] = useState(academic.dept);
  const [userPosition, setUserPosition] = useState(academic.position);
  const [userPhone, setUserPhone] = useState(user.user_phone);
  const [userAddr, setUserAddr] = useState(user.user_addr);
  const [userEmail, setUserEmail] = useState(user.user_email);
  const [Remark, setRemark] = useState(academic.remark);

  function onSubmit() {

  }

  return <>
    <Content>
      <Details action="" method="POST">
        <Detail>
          <Label>이름</Label>
          <Input type="text" name="user_name" id="user_name" value={userName} onChange={(e) => {setUserName(e.target.value)}} disabled/>
        </Detail>
        <Detail>
          <Label>아이디</Label>
          <Input type="text" name="user_id" id="user_id"  value={userId} onChange={(e) => {setUserId(e.target.value)}} disabled/>
        </Detail>
        <Detail>
          <Label>생년월일</Label>
          <Input type="date" name="user_birth" id="user_birth" value={userBirth} onChange={(e) => {setUserBirth(e.target.value)}} disabled/>
        </Detail>
        <Detail>
          <Label>부서</Label>
          <Select name="user_dept" id="user_dept" onChange={(e) => setUserDept(e.target.value)} value={userDept} disabled>
            {
              department.map((data) => (
                <option value={data.dept_id} key={data.dept_id}>
                  {
                    data.dept_name
                  }
                </option>
              ))
            }
          </Select>
        </Detail>
        <Detail>
          <Label>포지션</Label>
          <Select name="user_position" id="user_position" onChange={(e) => setUserPosition(e.target.value)} value={userPosition} disabled>
            {
              trainerPosition.map((data) => (
                <option value={data.position_id} key={data.position_id}>
                  {
                    data.position_name
                  }
                </option>
              ))
            }
          </Select>
        </Detail>
        <Detail>
          <Label>연락처</Label>
          <Input type="text" name="user_phone" id="user_phone" value={userPhone} onChange={(e) => {setUserPhone(e.target.value)}} />
        </Detail>
        <Detail>
          <Label>주소</Label>
          <Input type="text" name="user_addr" id="user_addr" value={userAddr} onChange={(e) => {setUserAddr(e.target.value)}} />
        </Detail>
        <Detail>
          <Label>이메일</Label>
          <Input type="text" name="user_birth" id="user_birth" value={userEmail} onChange={(e) => {setUserEmail(e.target.value)}} />
        </Detail>
        <Detail>
          <Label>나의 한마디</Label>
          <Input type="text" name="remark" id="remark" value={Remark} onChange={(e) => {setRemark(e.target.value)}} />
        </Detail>
        <ButtonBox>
          <PrimaryButton type="submit" onClick={onSubmit}><p>수정</p></PrimaryButton>
        </ButtonBox>
      </Details>
    </Content>
  </>
}