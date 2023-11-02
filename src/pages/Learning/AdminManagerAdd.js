import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { department, managerPosition, userList, academics } from "../../assets/TempData";
import defaultImg from "../../assets/img/default.png";

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

export function AdminManagerAdd() {
  const navigate = useNavigate();
  
  const [search, setSearch] = useState("");
  const [user, setUser] = useState();
  const [loadText, setLoadText] = useState("");

  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState("");
  const [userBirth, setUserBirth] = useState("");
  const [userDept, setUserDept] = useState(0);
  const [userPhoto, setUserPhoto] = useState(defaultImg);
  const [userPosition, setUserPosition] = useState();
  const [userPhone, setUserPhone] = useState("");
  const [userAddr, setUserAddr] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userAvailable, setUserAvailable] = useState();
  const [userTAuth, setUserTAuth] = useState();
  const [userMAuth, setUserMAuth] = useState();
  const [userCAuth, setUserCAuth] = useState();
  const [userRemark, setUserRemark] = useState();

  useEffect(()=> {
    if(user) {
      setUserName(user.user_name);
      setUserId(user.user_id);
      setUserBirth(user.user_birth);
      setUserPhone(user.user_phone);
      setUserEmail(user.user_email);
      setUserAddr(user.user_addr);
    }
  }, [user]);

  function onSearch(item) {
    const temp = userList.find((u) => u.user_id == item);
    if(temp) {
      setLoadText(`${temp.user_name} 님의 정보를 불러왔습니다.`);
      setUser(temp);
    }
    else {
      setLoadText("사용자 검색 결과가 없습니다.");
    }
  }

  function onSubmit() {

  }

  return <>
    <Container>
      <H2>강사 등록</H2>
      <Content>
        <LoadBox>
          <LoadInfo>
            <Input type="text" name="user_search" id="user_search" value={search} onChange={(e) => {setSearch(e.target.value)}} placeholder="검색할 사용자 아이디를 입력하세요." />
            <PrimaryButton onClick={() => {onSearch(search); setSearch("");}}>사용자 불러오기</PrimaryButton>
          </LoadInfo>
          <LoadUser>
            <LoadText>{loadText}</LoadText>
          </LoadUser>
        </LoadBox>
        <ContentDivide>
          <Img src={userPhoto} alt="default" />
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
              <Select name="user_position" id="user_position" onChange={(e) => setUserPosition(e.target.value)} value={userPosition}>
                {
                  managerPosition.map((data) => (
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
              <Label>사진</Label>
              <Input type="file" name="user_photo" id="user_photo" accept="image/png, image/jpeg" onChange={(e) => {setUserPhoto(e.target.files[0])}} />
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
            </Detail>
            <Detail>
              <Label>활성화</Label>
              <Check type="checkbox" name="user_available" id="user_available" value={userAvailable} onChange={(e) => {setUserAvailable(e.target.value)}} /> 비활성화
            </Detail>
            <ButtonBox>
              <PrimaryButton type="submit" onClick={onSubmit}>등록</PrimaryButton>
              <SecondaryButton onClick={() => navigate("/lms/a/trainerSetting")}>목록</SecondaryButton>
            </ButtonBox>
          </Details>
        </ContentDivide>
      </Content>
    </Container>
  </>
}