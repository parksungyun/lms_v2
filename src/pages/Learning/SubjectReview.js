import { useNavigate, useParams } from "react-router-dom"
import { academics, subjects, userList } from "../../assets/TempData";
import styled from "styled-components";
import { BsStarFill } from "react-icons/bs";
import { useState } from "react";
import { useEffect } from "react";
import { getAllTrainers, getSubjectById } from "../Api";
import axios from "axios";

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
  margin-top: 1rem;
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
  margin: 0;
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
  margin: 0;
`;

const MiniText = styled.p`
  font-size: 0.9rem;
  &.red {
    color: red;
    margin-top: 5px;
  }
`;

const ErrorMsg = styled.p`
  font-size: 1rem;
  color: red;
  margin: 0;
  padding: 1rem 0 0 0;
  text-align: center;
`;

export function SubjectReview() {
  const { id } = useParams();
  const navigate = useNavigate();
  const studentId = sessionStorage.getItem("id");
  const [subject, setSubject] = useState(null);
  const [academic, setAcademic] = useState(null);
  const [rating, setRating] = useState([true, false, false, false, false]);
  const [content, setContent] = useState("");
  const [errorCheck, setErrorCheck] = useState();
  const temp = [0, 1, 2, 3, 4];

  useEffect(() => {
    if(!academic) {
      const promise = getAllTrainers();
      const getData = () => {
        promise.then((data) => {
          setAcademic(data);
        });
      };
      getData();
    }
    if(!subject) {
      const promise = getSubjectById(id);
      const getData = () => {
        promise.then((data) => {
          setSubject(data);
        });
      };
      getData();
    }
  })

  function onSubmit() {
    let score = rating.filter(Boolean).length;

    if(!content) {
      setErrorCheck(1);
    }
    else {
      const data = {
        subjectId: id,
        reviewScore: score,
        reviewComment: content,
        studentId: studentId,
      };
      console.log(data);
      axios
      .post(`/api/course/review/write`, data)
      .then((res) => {
        navigate("/lms/s/mypage");
      })
      .catch((err) => {
        console.log(`${err} : 강의평가 등록 실패`);
      });
    }
  }

  function handleStarClick(index) {
    let clickStates = [...rating];
    for (let i = 0; i < 5; i++) {
      clickStates[i] = i <= index ? true : false;
    }
    setRating(clickStates);
  }

  return <>
    {
      (subject && academic) &&
      <Container>
        <Content>
          <SubjectInfo>
            <SubjectName>{subject.subject.subjectName}</SubjectName>
            <TrainerName>{academic.find((a) => a.academic.academicId === subject.subject.academicId).user.userName}</TrainerName>
            <MiniText className="red">
              * 강의평가는 한번 등록하면 수정하거나 확인할 수 없으니 주의해주세요!
            </MiniText>
          </SubjectInfo>
          <Divider />
          <Text>
            강의점수를 입력해주세요. (1점 ~ 5점)
          </Text>
          <MiniText>
            * 강의점수를 입력하지 않으면 기본 1점이 입력됩니다.
          </MiniText>
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
          <TextArea name="reviewContent" id="reviewContent" value={content} onChange={(e) => {setContent(e.target.value)}} />
          {
            errorCheck === 1 && <ErrorMsg>강의평을 입력해주세요</ErrorMsg>
          }
        </Content>
        <ButtonBox>
          <PrimaryButton onClick={() => onSubmit()}><p>등록</p></PrimaryButton>
          <SecondaryButton onClick={() => navigate(-1)}><p>목록</p></SecondaryButton>
        </ButtonBox>
      </Container>
    }
  </>
}