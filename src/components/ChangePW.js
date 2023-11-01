import { useNavigate, useParams } from "react-router-dom";
import { academics, userList, department, trainerPosition } from "../assets/TempData";
import styled from "styled-components";
import { useState } from "react";

const Content = styled.div`
  padding: 2rem;
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
  padding-left: 3rem;
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

export function ChangePW() {
  const navigate = useNavigate();
  const  id  = 5;
  const academic = academics.find((a) => a.academic_id == id);
  const user = userList.find((u) => u.uid == academic.uid);
  
  const [userName, setUserName] = useState(user.user_name);
  const [userId, setUserId] = useState(user.user_id);

  function onSubmit() {

  }

  return <>
    <Content>
      <Details action="" method="POST">
        <Detail>
          <Label>현재 비밀번호</Label>
          <Input type="text" name="user_name" id="user_name" value={''} onChange={(e) => {setUserName(e.target.value)}}/>
        </Detail>
        <Detail>
          <Label>새 비밀번호</Label>
          <Input type="text" name="user_id" id="user_id"  value={''} onChange={(e) => {setUserId(e.target.value)}}/>
        </Detail>
        <Detail>
          <Label>새 비밀번호 확인</Label>
          <Input type="text" name="user_id" id="user_id"  value={''} onChange={(e) => {setUserId(e.target.value)}}/>
        </Detail>
        <ButtonBox>
          <PrimaryButton type="submit" onClick={onSubmit}>수정</PrimaryButton>
        </ButtonBox>
      </Details>
    </Content>
  </>
}