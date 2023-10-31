import { useNavigate, useParams } from "react-router-dom";
import { academics, userList, courses } from "../../assets/TempData";
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

const InputDate = styled.input`
  width: 44%;
  padding: 0.7rem;
  border: 1px solid lightgray;
  border-radius: 0.5rem;
`;

const Input = styled.input`
  width: 90%;
  padding: 0.7rem;
  border: 1px solid lightgray;
  border-radius: 0.5rem;
`;

const Select = styled.select`

`;

const ButtonBox = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
`;

export function AdminCourseDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const course = courses.find((c) => c.course_id == id);
  const academic = academics.find((a) => a.academic_id == course.academic_id);
  const user = userList.find((u) => u.uid == academic.uid);

  function onSubmit() {

  }

  return <>
    <Container>
      <H2>과정 상세 정보</H2>
      <Content>
        <Img src={course.course_photo} alt={course.course_name} />
        <Details action="" method="POST">
            <Detail>
              <Label>과정명</Label>
              <Input type="text" name="course_name" id="course_name" value={course.course_name} />
            </Detail>
            <Detail>
              <Label>훈련기간</Label>
              <InputDate type="date" name="start_date" id="start_date"  value={course.start_date} />
              ~
              <InputDate type="date" name="end_date" id="end_date"  value={course.end_date} />
            </Detail>
            <Detail>
              <Label>모집기간</Label>
              <InputDate type="date" name="recruit_start" id="recruit_start"  value={course.recruit_start} />
              ~
              <InputDate type="date" name="recruit_end" id="recruit_end"  value={course.recruit_end} />
            </Detail>
            <Detail>
              <Label>정원</Label>
              <Input type="text" name="capacity" id="capacity" value={course.capacity} />
            </Detail>
            <Detail>
              <Label>사진</Label>
              <Input type="file" name="course_photo" id="course_photo" accept="image/png, image/jpeg" />
            </Detail>
            <Detail>
              <Label>과정 소개</Label>
              <Input type="text" name="course_info" id="course_info" value={course.course_info} />
            </Detail>
            <Detail>
              <Label>담당 매니저</Label>
              <Select>
                {/* option */}
              </Select>
            </Detail>
            <Detail>
              <Label>과목</Label>
              <Select>
                {/* option */}
              </Select>
            </Detail>
            <Detail>
              <Label>활성화</Label>
              <DangerButton>비활성화</DangerButton>
            </Detail>
            <ButtonBox>
              <PrimaryButton type="submit" onClick={onSubmit}>수정</PrimaryButton>
              <SecondaryButton onClick={() => navigate("/lms/a/courseSetting")}>목록</SecondaryButton>
            </ButtonBox>
        </Details>
      </Content>
    </Container>
  </>
}