import styled from "styled-components";
import { Table } from "../../components/Table";
import '../../styles/trainer_subject_table.css';
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getHomeworksBySubjectId, getLecturesBySubjectId, getStudentsBySubjectId, getStudyBySubjectId, getSubjectBoardBySubjectId, getSubjectById, getSubjectQnaBySubjectId, getSubmitsBySubjectId } from "../Api"

const headers = [
  {
    text: 'No.',
    value: 'no'
  },
  {
    text: '학생이름',
    value: 'name'
  },
  {
    text: '생년월일',
    value: 'birth'
  },
  {
    text: '연락처',
    value: 'phone'
  },
  {
    text: '수강한 강의 수',
    value: 'lectureCount'
  },
  {
    text: '제출한 과제 수',
    value: 'HWCount'
  },
];

const Container = styled.div`
  padding: 1.5rem 2rem;
  padding-bottom: 2rem;
  background-color: #f6f9ff;
  height: 100%;
`;

const TableBox = styled.div`
  padding: 2rem;
  padding-top: 1.3rem;
  background-color: white;
  border-radius: 1rem;
  margin-bottom: 2rem;
`;

const H2 = styled.p`
  font-size: 1.7rem;
  font-weight: bold;
  margin-top: 10px;
  margin-bottom: 0;
`;

const Box = styled.div`
  border-bottom: 2px solid #ddd;
  border-top: 2px solid #ddd;
  width: 100%;
  display: flex;
  margin: 1.5rem 0;
  padding: 5px 15px;
`;

const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Bold = styled.p`
  font-weight: bold;
  font-size: 1.2rem;
`;

export function TrainerSubject() {
  const { id } = useParams();
  const [subject, setSubject] = useState(null);
  const [students, setStudents] = useState(null);
  const [homeworks, setHomeworks] = useState(null);
  const [board, setBoard] = useState(null);
  const [lectures, setLectures] = useState(null);
  const [question, setQuestion] = useState(null);
  const [study, setStudy] = useState(null);
  const [submit, setSubmit] = useState(null);
  let items;
  let wait = 0;

  useEffect(() => {
    setSubject(null);
    setStudents(null);
    setHomeworks(null);
    setBoard(null);
    setLectures(null);
    setQuestion(null);
    setStudy(null);
    setSubmit(null);
  }, [id]);

  useEffect(() => {
    if(!subject){
      const promise = getSubjectById(id);
      const getData = () => {
        promise.then((data) => {
          setSubject(data);
        });
      };
      getData();
    }
    if(!students){
      const promise = getStudentsBySubjectId(id);
      const getData = () => {
        promise.then((data) => {
          setStudents(data);
        });
      };
      getData();
    }
    if(!homeworks){
      const promise = getHomeworksBySubjectId(id);
      const getData = () => {
        promise.then((data) => {
          setHomeworks(data);
        });
      };
      getData();
    }
    if(!board){
      const promise = getSubjectBoardBySubjectId(id);
      const getData = () => {
        promise.then((data) => {
          setBoard(data);
        });
      };
      getData();
    }
    if(!lectures){
      const promise = getLecturesBySubjectId(id);
      const getData = () => {
        promise.then((data) => {
          setLectures(data);
        });
      };
      getData();
    }
    if(!question){
      const promise = getSubjectQnaBySubjectId(id);
      const getData = () => {
        promise.then((data) => {
          setQuestion(data);
        });
      };
      getData();
    }
    if(!study){
      const promise = getStudyBySubjectId(id);
      const getData = () => {
        promise.then((data) => {
          setStudy(data);
        });
      };
      getData();
    }
    if(!submit){
      const promise = getSubmitsBySubjectId(id);
      const getData = () => {
        promise.then((data) => {
          setSubmit(data);
        });
      };
      getData();
    }
  });

  if(students && study && submit) {
    items = students.map((d, i)=>(
      {
        no: i + 1,
        name: d.user.userName,
        birth: d.user.userBirth,
        phone: d.user.userPhone,
        lectureCount: study.filter((s) => s.studentId === d.student.studentId).length,
        HWCount: submit.filter((s) => s.submit.studentId === d.student.studentId).length
      }
    ));
  }

  if(submit) {
    submit.map((s) => {
      if(!submit.answer) wait++;
    })
  }

  return<>
    <Container>
      <TableBox>
        <H2>과목 정보</H2>
        {
          subject &&
          <Box>
              <ContentBox className="col-3">
                <Bold>과정명</Bold>
                <p>{subject.course.courseName}</p>
              </ContentBox>
            <ContentBox className="col-3">
              <Bold>과목명</Bold>
              <p>{subject.subject.subjectName}</p>
            </ContentBox>
            <ContentBox className="col-3">
              <Bold>기간</Bold>
              <p>{subject.course.startDate} ~ {subject.course.endDate}</p>
            </ContentBox>
            {
              students &&
              <ContentBox className="col-3">
                <Bold>학생수</Bold>
                <p>{students.length}명</p>
              </ContentBox>
            }
          </Box>
        }
        <Box>
          {
            board &&
            <ContentBox className="col-3">
              <Bold>등록한 공지</Bold>
              <p>{board.length}</p>
            </ContentBox>
          }
          {
            lectures &&
            <ContentBox className="col-3">
              <Bold>등록한 강의</Bold>
              <p>{lectures.length}</p>
            </ContentBox>
          }
          {
            homeworks &&
            <ContentBox className="col-3">
              <Bold>등록한 과제</Bold>
              <p>{homeworks.length}</p>
            </ContentBox>
          }
          {
            submit &&
            <ContentBox className="col-3">
              <Bold>답변 대기 질문</Bold>
              <p>{wait}</p>
            </ContentBox>
          }
        </Box>
        <Table 
          headers={headers}
          items={items}
          selectable={false}
        />
      </TableBox>
    </Container>
  </>
}