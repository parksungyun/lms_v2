import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { Table } from "../../components/Table";
import { userList, students, courses, attendances, absence_code } from "../../assets/TempData";
import { Pagination } from "../../components/Pagination";

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
  flex-direction: column;
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

const ButtonBox = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
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

const Select = styled.select`
  padding: 0.7rem;
  border: 1px solid lightgray;
  border-radius: 0.5rem;
`;

const Label = styled.label`
  font-weight: 700;
`;

const InputDate = styled.input`
  padding: 0.7rem;
  border: 1px solid lightgray;
  border-radius: 0.5rem;
`;

const Detail = styled.div`
  display: flex;
  gap: 1rem;
  margin-right: 2rem;
  align-items: center;
`;

const Search = styled.div`
  display: flex;
`;

const BadgePrimary = styled.span`
  background-color: #5f7dcf;
  padding: 2px 15px;
  color: white;
  font-weight: 500;
  font-size: 0.8rem;
  border-radius: 5px;
`;

const BadgeSuccess = styled.span`
  background-color: green;
  padding: 2px 15px;
  color: white;
  font-weight: 500;
  font-size: 0.8rem;
  border-radius: 5px;
`;

const BadgeSecondary = styled.span`
  background-color: gray;
  padding: 2px 15px;
  color: white;
  font-weight: 500;
  font-size: 0.8rem;
  border-radius: 5px;
`;

const BadgeWarning = styled.span`
  background-color: #ffc107;
  padding: 2px 15px;
  color: white;
  font-weight: 500;
  font-size: 0.8rem;
  border-radius: 5px;
`;

const BadgeDanger = styled.span`
  background-color: red;
  padding: 2px 15px;
  color: white;
  font-weight: 500;
  font-size: 0.8rem;
  border-radius: 5px;
`;

const headers = [
  {
    text: 'No.',
    value: 'no'
  },
  {
    text: '날짜',
    value: 'date'
  },
  {
    text: '입실시간',
    value: 'attendTime'
  },
  {
    text: '퇴실시간',
    value: 'leaveTime'
  },
  {
    text: '출결여부',
    value: 'attend'
  },
  {
    text: '출결코드',
    value: 'codeId'
  },
  {
    text: '출결사항 승인',
    value: 'state'
  },
];



export function ManagerCourseStudentAttendance() {
  const navigate = useNavigate();
  const { id } = useParams();
  const student = students.find((s) => s.student_id == id);
  const user = userList.find((u) => u.uid == student.uid);
  const course = courses.find((c) => c.course_id == student.course_id);
  const attendance = attendances.filter(data => data.student_id == student.student_id);
  const absence = attendance.filter(data => data.absence_id > 0);
  const wait = absence.filter(data => data.absence_id == 99);
  const [searchCode, setSearchCode] = useState();
  const [searchStartDate, setSearchStartDate] = useState();
  const [searchEndDate, setSearchEndDate] = useState();
  const [page, setPage] = useState(1);
  const limit = 10;
  const offset = (page - 1) * limit;
  
  const items = attendance.map((a, i) => (
    {
      no: i,
      date: a.attend_date,
      attendTime: a.attend_time,
      leaveTime: a.leave_time,
      attend: changeCode(a.absence_id),
      codeId: a.absence_id,
      state: changeState(a.attendance_id, a.absence_id),
    }
  ))

  const postsData = (posts) => {
    if(posts) {
      let result = posts.slice(offset, offset + limit);
      return result;
    }
  };

  function changeCode(code) {
    if(code === 0) {return(<BadgePrimary>출석</BadgePrimary>)}
    else if(code === 99) {return(<BadgeDanger>결석</BadgeDanger>)}
    else {return(<BadgeWarning>결석</BadgeWarning>)};
  };

  function changeState(id, state) {
    if(state === 99) {return(<BadgeSecondary onClick={attendConfirm(id)}>대기</BadgeSecondary>)}
    else {return(<BadgeSuccess onClick={attendMod(id)}>승인</BadgeSuccess>)};
  };

  function attendConfirm(id) {

  }

  function attendMod(id) {

  }

  function onSearch() {

  }

  return <>
    <Container>
    <H2>학생 출결 관리</H2>
      <Content>
        <Box>
          <ContentBox className="col-3">
            <Bold>학생이름</Bold>
            <p>{user.user_name}</p>
          </ContentBox>
          <ContentBox className="col-3">
            <Bold>훈련기간</Bold>
            <p>{course.start_date} ~ {course.end_date}</p>
          </ContentBox>
          <ContentBox className="col-2">
            <Bold>출석일수</Bold>
            <p>{attendance.length - absence.length}</p>
          </ContentBox>
          <ContentBox className="col-2">
            <Bold>결석일수</Bold>
            <p>{absence.length}</p>
          </ContentBox>
          <ContentBox className="col-2">
            <Bold>출결 승인대기</Bold>
            <p>{wait.length}</p>
          </ContentBox>
        </Box>
        <Search>
          <Detail>
            <Label>출결코드</Label>
            <Select name="searchCode" id="searchCode" onChange={(e) => setSearchCode(e.target.value)} value={searchCode}>
              {
                absence_code.map((data) => (
                  <option value={data.absence_id} key={data.absence_id}>
                    {data.absence_id}: {data.absence_name}
                  </option>
                ))
              }
            </Select>
          </Detail>
          <Detail>
            <Label>기간</Label>
            <InputDate type="date" name="start_date" id="start_date"  value={searchStartDate} onChange={(e) => {setSearchStartDate(e.target.value)}} />
            ~
            <InputDate type="date" name="end_date" id="end_date"  value={searchEndDate} onChange={(e) => {setSearchEndDate(e.target.value)}} />
          </Detail>
          <PrimaryButton onClick={onSearch}>검색</PrimaryButton>
        </Search>
        <Table 
          headers={headers}
          items={postsData(items)}
          selectable={false}
        />
        <Pagination limit={limit} page={page} totalPosts={items.length} setPage={setPage} />
        <ButtonBox>
          <SecondaryButton onClick={() => navigate("/lms/m/info")}>목록</SecondaryButton>
        </ButtonBox>
      </Content>
    </Container>
  </>
}