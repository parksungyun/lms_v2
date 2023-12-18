import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { department, managerPosition, userList } from "../../assets/TempData";
import axios from "axios";
import { getUserByUserId } from "../Api";

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
`;

const ContentDivide = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3rem;
`;

const LoadBox = styled.div`
  width: 100%;
  gap: 0.5rem;
  display: flex;
  flex-direction: column;
  padding: 1rem 2rem;
  margin-bottom: 2rem;
  background-color: #eee;
  border-radius: 1rem;
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

const Check = styled.input`

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

const LoadInfo = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
`;

const LoadUser = styled.div`
  margin: 0 auto;
`;

const LoadText = styled.p`
  font-size: 1.1rem;
  font-weight: 700;
  color: #5f7dcf;
`;

const ErrorMsg = styled.p`
  font-size: 1rem;
  color: red;
  margin: 0;
  padding: 0;
`;

export function AdminManagerAdd() {
  const navigate = useNavigate();
  
  const [search, setSearch] = useState("");
  const [user, setUser] = useState(null);
  const [loadText, setLoadText] = useState("");

  const [userUid, setUserUid] = useState("");
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState("");
  const [userBirth, setUserBirth] = useState("");
  const [userDept, setUserDept] = useState(0);
  const [userPhoto, setUserPhoto] = useState("");
  const [userPosition, setUserPosition] = useState("주임");
  const [userPhone, setUserPhone] = useState("");
  const [userAddr, setUserAddr] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userAvailable, setUserAvailable] = useState(false);
  const [userTAuth, setUserTAuth] = useState(false);
  const [userMAuth, setUserMAuth] = useState(false);
  const [userCAuth, setUserCAuth] = useState(false);
  const [auth, setAuth] = useState();
  const [userRemark, setUserRemark] = useState("");
  const [image, setImage] = useState("/upload/UserDefault.png");
  const [error, setError] = useState(0);
  let userAuth;
  let available;

  useEffect(()=> {
    if(user) {
      setUserUid(user.uid);
      setUserName(user.userName);
      setUserId(user.userId);
      setUserBirth(user.userBirth);
      setUserPhone(user.userPhone);
      setUserEmail(user.userEmail);
      setUserAddr(user.userAddr);
      setImage("/upload/UserDefault.png")
      setLoadText(`${user.userName} 님의 정보를 불러왔습니다.`);
    }
    else {
      setUserName("");
      setUserId("");
      setUserBirth("");
      setUserPhone("");
      setUserEmail("");
      setUserAddr("");
    }
  }, [user]);

  function onSearch(item) {
    if(item) {
      const promise = getUserByUserId(item);
      const getData = () => {
        promise.then((data) => {
          if (data) {
            setUser(data);
          } else {
            setUser(null);
            setLoadText("이미 등록된 사용자 입니다.")
          }
        });
      };
      getData();
    }
    else {
      setLoadText("사용자 검색 결과가 없습니다.");
    }
  }

  const [imageSrc, setImageSrc] = useState();

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
    if (userAvailable) {
      available = 0;
    } else {available = 1;}
  if (error == 0) {
    const data = {
      uid: userUid,
      userDept: userDept,
      userPosition: userPosition,
      userRemark: userRemark,
      userAuth: userAuth,
      userAvailable: available
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
    console.log(data);
    axios
      .post("/api/user/academic/add", data)
      .then((res) => {
        console.log(res.data);
        setError(2);
      })
      .catch((err) => {
        console.log(`${err} : Add 실패`);
        setError(3);
      });
      fetch(`/api/file/upload/${userUid}`, {
          method: 'POST',
          body: fd,
      })
      .then(response => response.json())
      .then(data => {
          console.log('File upload success:', data);
      })
      .catch(error => {
          console.error('File upload failed:', error);
          setError(3);
      });
    }
  }
  return <>
    <Container>
      <H2>매니저 등록</H2>
      <Content>
        <LoadBox>
          <LoadInfo>
            <Input type="text" name="user_search" id="user_search" value={search} onChange={(e) => {setSearch(e.target.value)}} placeholder="검색할 사용자 아이디를 입력하세요." />
            <PrimaryButton onClick={() => {onSearch(search); setSearch("");}}><p>사용자 불러오기</p></PrimaryButton>
          </LoadInfo>
          <LoadUser>
            <LoadText>{loadText}</LoadText>
          </LoadUser>
        </LoadBox>
        <ContentDivide>
          { imageSrc ? <Img src={imageSrc} alt="preview-img" /> : <Img src={image} alt="default" />}
          <Details action="" method="POST">
            <Detail>
              <Label>이름</Label>
              <Input type="text" name="user_name" id="user_name" value={userName} onChange={(e) => {setUserName(e.target.value)}} disabled />
            </Detail>
            <Detail>
              <Label>아이디</Label>
              <Input type="text" name="user_id" id="user_id"  value={userId} onChange={(e) => {setUserId(e.target.value)}} disabled />
            </Detail>
            <Detail>
              <Label>생년월일</Label>
              <Input type="date" name="user_birth" id="user_birth" value={userBirth} onChange={(e) => {setUserBirth(e.target.value)}} disabled />
            </Detail>
            <Detail>
              <Label>연락처</Label>
              <Input type="text" name="user_phone" id="user_phone" value={userPhone} onChange={(e) => {setUserPhone(e.target.value)}} disabled />
            </Detail>
            <Detail>
              <Label>주소</Label>
              <Input type="text" name="user_addr" id="user_addr" value={userAddr} onChange={(e) => {setUserAddr(e.target.value)}} disabled />
            </Detail>
            <Detail>
              <Label>이메일</Label>
              <Input type="text" name="user_birth" id="user_birth" value={userEmail} onChange={(e) => {setUserEmail(e.target.value)}} disabled />
            </Detail>
            <Detail>
              <Label>부서</Label>
              <Select name="user_dept" id="user_dept" onChange={(e) => setUserDept(e.target.value)} value={userDept} disabled>
                <option value={0}>행정팀</option>
                <option value={1}>교육팀</option>
              </Select>
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
              <Label>사진</Label>
              <Input type="file" name="user_photo" id="user_photo" accept="image/png, image/jpeg" onChange={(e) => {setUserPhoto(e.target.files[0]); encodeFileToBase64(e.target.files[0])}} />
            </Detail>
            <Detail>
              <Label>나의 한마디</Label>
              <Input  type="text" name="user_remark" id="user_remark" value={userRemark} onChange={(e) => {setUserRemark(e.target.value)}} placeholder="웹사이트 행정팀 소개페이지에 표시되는 내용입니다." />
            </Detail>
            <Detail>
              <Label>권한</Label>
              <Check type="checkbox" name="user_t_auth" id="user_t_auth" value={userTAuth} onChange={(e) => {setUserTAuth(e.target.value)}} /> 강사 관리
              <Check type="checkbox" name="user_m_auth" id="user_m_auth" value={userMAuth} onChange={(e) => {setUserMAuth(e.target.value)}} /> 매니저 관리
              <Check type="checkbox" name="user_c_auth" id="user_c_auth" value={userCAuth} onChange={(e) => {setUserCAuth(e.target.value)}} /> 과정 관리
              {error == 1 && <ErrorMsg>없는 권한입니다. 다시 확인해주세요.</ErrorMsg>}
            </Detail>
            <Detail>
              <Label>활성화</Label>
              <Check type="checkbox" name="user_available" id="user_available" value={userAvailable} onChange={(e) => {setUserAvailable(e.target.value)}} /> 비활성화
            </Detail>
              {error == 2 && window.location.reload()}
              {error == 3 && <ErrorMsg>등록이 실패하였습니다.</ErrorMsg>}
            <ButtonBox>
              <PrimaryButton type="submit" onClick={()=>onSubmit()}><p>등록</p></PrimaryButton>
              <SecondaryButton onClick={() => navigate("/lms/a/managerSetting")}><p>목록</p></SecondaryButton>
            </ButtonBox>
          </Details>
        </ContentDivide>
      </Content>
    </Container>
  </>
}