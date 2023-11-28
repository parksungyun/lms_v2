import { useNavigate, useParams } from "react-router-dom";
import { academics, userList, department, trainerPosition } from "../../assets/TempData";
import styled from "styled-components";
import { useState } from "react";
import { useEffect } from "react";
import { getAcademicByAcademicId } from "../Api";
import axios from "axios";

const Container = styled.div`
  padding: 1.5rem 2rem;
  padding-bottom: 2rem;
  background-color: #f6f9ff;
  height: 100%;
`;

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
  padding: 0.8rem 1.4rem;
  color: white;
`;

const DangerButton = styled.button`
  border: 0;
  border-radius: 5px;
  background-color: red;
  padding: 0.8rem 1.4rem;
  color: white;
`;

const Img = styled.img`
  width: 400px;
  border-radius: 1rem;
`;

const Details = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  padding-left: 3rem;
  border-left: 1px solid lightgray;
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

export function AdminTrainerDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  
  const [user, setUser] = useState(null);
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState("");
  const [userBirth, setUserBirth] = useState("");
  const [userDept, setUserDept] = useState("");
  const [userPhoto, setUserPhoto] = useState("");
  const [userPosition, setUserPosition] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [userAddr, setUserAddr] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [imageSrc, setImageSrc] = useState('');

  useEffect(()=>{
    if(!user) {
      const promise = getAcademicByAcademicId(id)
      const getData = () => {
        promise.then((data) => {
          setUser(data);
        });
      };
      getData();
    };
  })

  useEffect(()=>{
    if(user) {
      setUserName(user.user.userName);
      setUserId(user.user.userId);
      setUserBirth(user.user.userBirth);
      setUserDept(user.academic.department);
      setUserPhoto(user.user.userPhoto);
      setUserPosition(user.position);
      setUserPhone(user.user.userPhone);
      setUserAddr(user.user.userAddr);
      setUserEmail(user.user.userEmail);
    }
  })

  const encodeFileToBase64 = (fileBlob) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    return new Promise((resolve) => {
      reader.onload = () => {
        setImageSrc(reader.result);
        resolve();
      };
    });
  };

  function resetPW(){
    axios
    .post(`/api/auth/resetPW`, id)
    .then((res) => {
      console.log(res.data.data);
    })      
    .catch((err) => {
      console.log(`${err} : ResetPW 실패`);
    });
  };

  function onSubmit() {

  };

  return <>
    {
      user &&
      <Container>
        <H2>강사 상세 정보</H2>
        <Content>
          { imageSrc ? <Img src={imageSrc} alt="preview-img" /> :<Img src={userPhoto} alt={user.userName} /> }
          <Details action="" method="POST">
            <Detail>
              <Label>이름</Label>
              <Input type="text" name="user_name" id="user_name" value={userName} onChange={(e) => {setUserName(e.target.value)}} />
            </Detail>
            <Detail>
              <Label>아이디</Label>
              <Input type="text" name="user_id" id="user_id"  value={userId} onChange={(e) => {setUserId(e.target.value)}} />
            </Detail>
            <Detail>
              <Label>비밀번호</Label>
              <PrimaryButton onClick={()=>resetPW()}><p>비밀번호 초기화</p></PrimaryButton>
            </Detail>
            <Detail>
              <Label>생년월일</Label>
              <Input type="date" name="user_birth" id="user_birth" value={userBirth} onChange={(e) => {setUserBirth(e.target.value)}} />
            </Detail>
            <Detail>
              <Label>부서</Label>
              <Select name="user_dept" id="user_dept" onChange={(e) => setUserDept(e.target.value)} value={userDept}>
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
              <Label>사진</Label>
              <Input type="file" name="user_photo" id="user_photo" accept="image/png, image/jpeg" onChange={(e) => {setUserPhoto(e.target.files[0]); encodeFileToBase64(e.target.files[0])}} />
            </Detail>
            <Detail>
              <Label>포지션</Label>
              <Select name="user_position" id="user_position" onChange={(e) => setUserPosition(e.target.value)} value={userPosition}>
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
              <Label>활성화</Label>
              {
                user.academic.available == 1 ? <DangerButton><p>비활성화</p></DangerButton> : <PrimaryButton><p>활성화</p></PrimaryButton>
              }
            </Detail>
            <ButtonBox>
              <PrimaryButton type="submit" onClick={onSubmit}><p>수정</p></PrimaryButton>
              <SecondaryButton onClick={() => navigate("/lms/a/trainerSetting")}><p>목록</p></SecondaryButton>
            </ButtonBox>
          </Details>
        </Content>
      </Container>
    }
  </>
}