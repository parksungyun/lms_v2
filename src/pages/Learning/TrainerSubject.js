import styled from "styled-components";
import { Table } from "../../components/Table";
import '../../styles/trainer_subject_table.css';
import { courses, homeworks, lectures, students, studies, subject_answers, subject_board, subject_questions, subjects, submits, userList } from "../../assets/TempData";

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
  const id = 1; // subjectid 임의로 받아옴
  const subject = subjects.find(s => s.subject_id == id);
  const course = courses.find(c => c.course_id == subject.course_id);
  const student = students.filter(s => s.course_id == course.course_id);
  const homework = homeworks.filter(h => h.subject_id == id);
  const question = subject_questions.filter(s => s.subject_id == subject.subject_id);

  const items = courses.map((d,i)=>(
    {
      no: i+1,
      name: userList.find(u => u.uid == student[i].uid).user_name,
      birth: userList.find(u => u.uid == student[i].uid).user_birth,
      phone: userList.find(u => u.uid == student[i].uid).user_phone,
      lectureCount: studies.filter(s => s.student_id == student[i].student_id).filter(i => i.is_study == 2).length,
      HWCount: homework.filter((h) => (submits.filter(s => s.student_id == student[i].student_id).find((t) => t.homework_id == h.homework_id))).length
    }
  ));

  return<>
    <Container>
      <TableBox>
        <H2>과목 정보</H2>
        <Box>
          <ContentBox className="col-3">
            <Bold>과정명</Bold>
            <p>{course.course_name}</p>
          </ContentBox>
          <ContentBox className="col-3">
            <Bold>과목명</Bold>
            <p>{subject.subject_name}</p>
          </ContentBox>
          <ContentBox className="col-3">
            <Bold>기간</Bold>
            <p>{course.start_date} ~ {course.end_date}</p>
          </ContentBox>
          <ContentBox className="col-3">
            <Bold>학생수</Bold>
            <p>{student.length}명</p>
          </ContentBox>
        </Box>
        <Box>
          <ContentBox className="col-3">
            <Bold>등록한 공지</Bold>
            <p>{subject_board.filter(s => s.subject_id == subject.subject_id).length}</p>
          </ContentBox>
          <ContentBox className="col-3">
            <Bold>등록한 강의</Bold>
            <p>{lectures.filter(l => l.subject_id == subject.subject_id).length}</p>
          </ContentBox>
          <ContentBox className="col-3">
            <Bold>등록한 과제</Bold>
            <p>{homework.length}</p>
          </ContentBox>
          <ContentBox className="col-3">
            <Bold>답변 대기 질문</Bold>
            <p>{subject_questions.filter(s => s.subject_id == subject.subject_id).length - subject_answers.filter(s => question.find(q => q.s_question_id == s.s_question_id)).length}</p>
          </ContentBox>
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