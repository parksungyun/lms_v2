import { useNavigate, useParams } from "react-router-dom"
import { academics, subjects, userList } from "../../assets/TempData";
import styled from "styled-components";
import { BsStarFill } from "react-icons/bs";
import { useState } from "react";

const Container = styled.div`
  padding: 1.5rem 2rem;
  padding-bottom: 2rem;
  background-color: #f6f9ff;
  height: 100%;
`;

const Content = styled.div`
  padding: 2rem;
  padding-top: 1.3rem;
  background-color: white;
  border-radius: 1rem;
  margin-bottom: 2rem;
`;

const ButtonBox = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
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

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.7rem;
  border: 1px solid lightgray;
  border-radius: 0.5rem;
  resize: none;
  height: 10rem;
`;

const StarArea = styled.div`
  margin-bottom: 3rem;
  display: flex;
  gap: 0.6rem;
`;

const Star = styled(BsStarFill)`
  font-size: 3rem;
  color: lightgray;
  cursor: pointer;
  &:hover {
    color: #ffc107;
  }
  &.active {
    color: #ffc107;
  }
`;

const SubjectName = styled.p`
  font-size: 1.7rem;
  font-weight: bold;
  margin: 0;
`;

const TrainerName = styled.p`
  font-size: 1.1rem;
`;

const SubjectInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const Divider = styled.hr`
  border: 0;
  color: lightgray;
  margin-bottom: 2rem;
`;

const Text = styled.p`
  font-size: 1.2rem;
  font-weight: 700;
`;

export function SubjectReview() {
  const { id } = useParams();
  const navigate = useNavigate();
  const subject = subjects.find((s) => s.subject_id == id);
  const trainer = userList.find((u) => u.uid == (academics.find((a) => a.academic_id == subject.academic_id).uid));
  const [rating, setRating] = useState([true, false, false, false, false]);
  const [content, setContent] = useState("");
  const temp = [0, 1, 2, 3, 4];

  function onSubmit() {
    let score = rating.filter(Boolean).length;
  }

  function handleStarClick(index) {
    let clickStates = [...rating];
    for (let i = 0; i < 5; i++) {
      clickStates[i] = i <= index ? true : false;
    }
    setRating(clickStates);
  }

  return <>
    <Container>
      <Content>
        <SubjectInfo>
          <SubjectName>{subject.subject_name}</SubjectName>
          <TrainerName>{trainer.user_name}</TrainerName>
        </SubjectInfo>
        <Divider />
        <Text>
          강의 점수를 입력해주세요. (1점 ~ 5점)
        </Text>
        <StarArea>
          {
            temp.map((i) => (
              <Star key={i} onClick={() => handleStarClick(i)} className={rating[i] && 'active'} />
            ))
          }
        </StarArea>
        <Text>
          강의평을 입력해주세요.
        </Text>
        <TextArea name="review_content" id="review_content" value={content} onChange={(e) => {setContent(e.target.value)}} />
      </Content>
      <ButtonBox>
        <PrimaryButton type="submit" onClick={onSubmit}><p>등록</p></PrimaryButton>
        <SecondaryButton onClick={() => navigate(-1)}><p>목록</p></SecondaryButton>
      </ButtonBox>
    </Container>
  </>
}