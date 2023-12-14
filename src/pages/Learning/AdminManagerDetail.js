import { useNavigate, useParams } from "react-router-dom";
import { academics, userList, department, managerPosition } from "../../assets/TempData";
import styled from "styled-components";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { getAcademicByAcademicId } from "../Api";
import { DeleteModal } from "../../components/DeleteModal";

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

const Details = styled.div`
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

const Check = styled.input`

`;

const ErrorMsg = styled.p`
  font-size: 1rem;
  color: red;
  margin: 0;
  padding: 0;
`;

export function AdminManagerDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  
  const [user, setUser] = useState(null);
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState("");
  const [userBirth, setUserBirth] = useState("");
  const [userDept, setUserDept] = useState();
  const [userPhoto, setUserPhoto] = useState("");
  const [userPosition, setUserPosition] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [userAddr, setUserAddr] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userRemark, setUserRemark] = useState("");
  const [imageSrc, setImageSrc] = useState('');
  const [userAvailable, setUserAvailable] = useState();
  const [userTAuth, setUserTAuth] = useState(false);
  const [userMAuth, setUserMAuth] = useState(false);
  const [userCAuth, setUserCAuth] = useState(false);
  const [auth, setAuth] = useState(false);
  const [image, setImage] = useState("");
  const [error, setError] = useState(0);
  let userAuth;

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
      setUserDept(user.academic.dept);
      setUserPhoto(user.academic.userPhoto);
      setUserPosition(user.position);
      setUserPhone(user.user.userPhone);
      setUserAddr(user.user.userAddr);
      setUserEmail(user.user.userEmail);
      setUserRemark(user.academic.remark);
      setAuth(user.academic.auth);
      setUserAvailable(user.academic.available);
      setImage("/upload/" + user.academic.userPhoto.substring(user.academic.userPhoto.lastIndexOf("\\") + 1))
    }
  },[user]);

  useEffect(()=>{
    if (auth == 0) {
      setUserCAuth(true);
    } else if (auth == 1) {
      setUserTAuth(true);
    } else if (auth == 2) {
      setUserCAuth(true);
      setUserMAuth(true);
    } else if (auth == 3) {
      setUserCAuth(true);
      setUserTAuth(true);
      setUserMAuth(true);
    }
  },[auth]);

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
    .post(`/api/auth/${user.user.uid}/resetPW`)
    .then((res) => {
      console.log(res.data.data);
    })      
    .catch((err) => {
      console.log(`${err} : ResetPW 실패`);
    });
  };

  function changeAvailable() {
    axios
    .post(`/api/user/${user.user.uid}/changeAvailable/${userAvailable}`)
    .then((res) => {
      console.log(res.data.data);
    })
    .catch((err) => {
      console.log(`${err} : changeAvailable 실패`);
    });
    window.location.reload();
  };

  function onSubmit() {
    if (userCAuth && userMAuth && userTAuth) {
      userAuth = 3;
      setError(0);
    } else if (userCAuth && userMAuth && !(userTAuth)) {
      userAuth = 2;
      setError(0);
    } else if (userTAuth && !(userCAuth) && !(userMAuth)) {
      userAuth = 1;
      setError(0);
    } else if (userCAuth && !(userTAuth) && !(userMAuth)) {
      userAuth = 0;
      setError(0);
    } else {
      setError(1);
      userAuth = auth;
    }
    console.log(userAuth);
    if (error == 0) {
      const data = {
        uid: user.user.uid,
        userId: userId,
        userName: userName,
        userBirth: userBirth,
        userDept: userDept,
        userPhone: userPhone,
        userPosition: userPosition,
        userAddr: userAddr,
        userEmail: userEmail,
        userRemark: userRemark,
        userAuth: userAuth,
        userAvailable: userAvailable
      }
      const fd = new FormData();
      if (userPhoto) {
        fd.append("file", userPhoto);
        console.log(fd);
        for (const pair of fd.entries()) {
          console.log(pair[0] + ', ' + pair[1]);
      }
      } else {
        console.error("No file selected.");
      }
      axios
      .post("/api/user/academic/mod", data)
      .then((res) => {
        setError(2);
      })
      .catch((err) => {
        console.log(`${err} : Mod 실패`);
        setError(3);
      });
      fetch(`/api/file/upload/${user.user.uid}`, {
          method: 'POST',
          body: fd,
      })
      .then(response => response.json())
      .then(data => {
      })
      .catch(error => {
        console.error('File upload failed:', error);
        setError(3);
      });
    }
  };

  return <>
    <Container>
      <H2>매니저 상세 정보</H2>
      <Content>
      { imageSrc ? <Img src={imageSrc} alt="preview-img" /> :<Img src={image} alt={userName} /> }
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
                <option value={0}>행정팀</option>
                <option value={1}>교육팀</option>
              </Select>
            </Detail>
            <Detail>
              <Label>사진</Label>
              <Input type="file" name="user_photo" id="user_photo" accept="image/png, image/jpeg" onChange={(e) => {setUserPhoto(e.target.files[0]); encodeFileToBase64(e.target.files[0])}} />
            </Detail>
            <Detail>
              <Label>포지션</Label>
              <Select name="user_position" id="user_position" onChange={(e) => setUserPosition(e.target.value)} value={userPosition}>
                <option value="주임">주임</option>
                <option value="대리">대리</option>
                <option value="과장">과장</option>
                <option value="부장">부장</option>
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
              <Input  type="text" name="user_remark" id="user_remark" value={userRemark} onChange={(e) => {setUserRemark(e.target.value)}} />
            </Detail>
            <Detail>
              <Label>권한</Label>
              <Check type="checkbox" name="user_t_auth" id="user_t_auth" checked={userTAuth} onChange={(e) => {setUserTAuth(e.target.checked)}} /> 강사 관리
              <Check type="checkbox" name="user_m_auth" id="user_m_auth" checked={userMAuth} onChange={(e) => {setUserMAuth(e.target.checked)}} /> 매니저 관리
              <Check type="checkbox" name="user_c_auth" id="user_c_auth" checked={userCAuth} onChange={(e) => {setUserCAuth(e.target.checked)}} /> 과정 관리
             {error == 1 && <ErrorMsg>없는 권한입니다. 다시 확인해주세요.</ErrorMsg>}
            </Detail>
            <Detail>
              <Label>활성화</Label>
              {
                userAvailable == 1 ? <DangerButton onClick={()=>changeAvailable()}><p>비활성화</p></DangerButton> : <PrimaryButton onClick={()=>changeAvailable()}><p>활성화</p></PrimaryButton>
              }
            </Detail>
              {error == 2 && navigate("/lms/a/managerSetting")}
              {error == 3 && <ErrorMsg>수정이 실패하였습니다.</ErrorMsg>}
            <ButtonBox>
              <PrimaryButton type="submit" onClick={()=>onSubmit()}><p>수정</p></PrimaryButton>
              <SecondaryButton onClick={() => navigate("/lms/a/managerSetting")}><p>목록</p></SecondaryButton>
            </ButtonBox>
        </Details>
      </Content>
    </Container>
  </>
}