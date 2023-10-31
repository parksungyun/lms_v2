import { useNavigate, useParams } from "react-router-dom";
import { academics, userList } from "../../assets/TempData";
import styled from "styled-components";

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

export function AdminTrainerDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const academic = academics.find((a) => a.academic_id == id);
  const user = userList.find((u) => u.uid == academic.uid);
  let dept;
  
  academic.dept === 0 ? dept = "행정팀" : dept = "교육팀";

  function onSubmit() {

  }

  return <>
    <Container>
      <H2>강사 상세 정보</H2>
      <Content>
        <Img src={academic.user_photo} alt={user.user_name} />
        <Details action="" method="POST">
            <Detail>
              <Label>이름</Label>
              <Input type="text" name="user_name" id="user_name" value={user.user_name} />
            </Detail>
            <Detail>
              <Label>아이디</Label>
              <Input type="text" name="user_id" id="user_id"  value={user.user_id} />
            </Detail>
            <Detail>
              <Label>비밀번호</Label>
              <PrimaryButton>비밀번호 초기화</PrimaryButton>
            </Detail>
            <Detail>
              <Label>생년월일</Label>
              <Input type="text" name="user_birth" id="user_birth" value={user.user_birth} />
            </Detail>
            <Detail>
              <Label>부서</Label>
              <Input type="text" name="user_dept" id="user_dept" value={dept} />
            </Detail>
            <Detail>
              <Label>사진</Label>
              <Input type="file" name="user_photo" id="user_photo" accept="image/png, image/jpeg" />
            </Detail>
            <Detail>
              <Label>포지션</Label>
              <Input type="text" name="user_position" id="user_position" value={academic.position} />
            </Detail>
            <Detail>
              <Label>연락처</Label>
              <Input type="text" name="user_phone" id="user_phone" value={user.user_phone} />
            </Detail>
            <Detail>
              <Label>주소</Label>
              <Input type="text" name="user_addr" id="user_addr" value={user.user_addr} />
            </Detail>
            <Detail>
              <Label>이메일</Label>
              <Input type="text" name="user_birth" id="user_birth" value={user.user_email} />
            </Detail>
            <Detail>
              <Label>활성화</Label>
              <DangerButton>비활성화</DangerButton>
            </Detail>
            <ButtonBox>
              <PrimaryButton type="submit" onClick={onSubmit}>수정</PrimaryButton>
              <SecondaryButton onClick={() => navigate("/lms/a/trainerSetting")}>목록</SecondaryButton>
            </ButtonBox>
        </Details>
      </Content>
    </Container>
  </>
}