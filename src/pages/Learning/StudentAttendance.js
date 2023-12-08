import { useEffect, useState } from "react";
import styled from "styled-components";
import { Table } from "../../components/Table";
import { Pagination } from "../../components/Pagination";
import { getAllAbsenceCode, getAllManagers, getCourseByStudentId, getStudentAttendanceByStudentId, getStudentAttendanceByStudentIdAndAbsenceCode, getStudentAttendanceByStudentIdAndAbsenceCodeAndPeriod, getStudentAttendanceByStudentIdAndPeriod } from "../Api";

const Container = styled.div`
  padding: 1.5rem 2rem;
  padding-bottom: 2rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const PrimaryButton = styled.button`
  border: 0;
  border-radius: 5px;
  background-color: #5f7dcf;
  padding: 0.8rem 1.4rem;
  color: white;
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
  padding: 0.6rem;
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
  justify-content: center;
`;

const Search = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
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



export function StudentAttendance() {
  const id = sessionStorage.getItem("id"); // studentId
  const [course, setCourse] = useState(null);
  const [academic, setAcademic] = useState(null);
  const [attendance, setAttendance] = useState(null);
  const [code, setCode] = useState(null);
  const [searchCode, setSearchCode] = useState();
  const [searchStartDate, setSearchStartDate] = useState();
  const [searchEndDate, setSearchEndDate] = useState();
  const [page, setPage] = useState(1);
  const limit = 10;
  const offset = (page - 1) * limit;
  let items;
  let absenceDays = 0;

  useEffect(() => {
    if(!course) {
      const promise = getCourseByStudentId(id);
      const getData = () => {
        promise.then((data) => {
          setCourse(data);
        });
      };
      getData();
    }
    if(!academic) {
      const promise = getAllManagers();
      const getData = () => {
        promise.then((data) => {
          setAcademic(data);
        });
      };
      getData();
    }
    if(!attendance) {
      const promise = getStudentAttendanceByStudentId(id);
      const getData = () => {
        promise.then((data) => {
          setAttendance(data);
        });
      };
      getData();
    }
    if(!code) {
      const promise = getAllAbsenceCode();
      const getData = () => {
        promise.then((data) => {
          setCode(data);
        });
      };
      getData();
    }
  })

  if(attendance) {
    items = attendance.map((a, i) => (
      {
        no: i + 1,
        date: new Date(a.attendDate).toLocaleDateString("fr-CA"),
        attendTime: timeConvert(a.attendTime),
        leaveTime: timeConvert(a.leaveTime),
        attend: changeCode(a.absenceId),
        codeId: a.absenceId,
        state: changeState(a.absenceId),
      }
    ))
  }

  const postsData = (posts) => {
    if(posts) {
      let result = posts.slice(offset, offset + limit);
      return result;
    }
  }

  function timeConvert(time) {
    if(!time) {
      return "";
    }
    const temp = new Date(time);
    return temp.toLocaleDateString("fr-CA") + " " + temp.toLocaleTimeString("af-ZA");
  }

  function changeCode(code) {
    if(code === 0) {
      return(<BadgePrimary>출석</BadgePrimary>)
    }
    else if(code === 99) {
      absenceDays++;
      return(<BadgeDanger>결석</BadgeDanger>)
    }
    else {
      return(<BadgeWarning>결석</BadgeWarning>)
    }
  }

  function changeState(state) {
    if(state === 99) {
      return(<BadgeSecondary>대기</BadgeSecondary>)
    }
    else {
      return(<BadgeSuccess>승인</BadgeSuccess>)
    }
  }

  function onSearch() {
    console.log(searchCode);
    console.log(searchStartDate);
    console.log(searchEndDate);
    if((searchCode >= 0 && searchCode <= 99) && searchStartDate && searchEndDate) {
      const promise = getStudentAttendanceByStudentIdAndAbsenceCodeAndPeriod(id, searchCode, searchStartDate, searchEndDate);
      const getData = () => {
        promise.then((data) => {
          setAttendance(data);
        });
      };
      getData();
    }
    else if(searchCode >= 0 && searchCode <= 99) {
      const promise = getStudentAttendanceByStudentIdAndAbsenceCode(id, searchCode);
      const getData = () => {
        promise.then((data) => {
          setAttendance(data);
        });
      };
      getData();
    }
    else if(searchStartDate && searchEndDate) {
      const promise = getStudentAttendanceByStudentIdAndPeriod(id, searchStartDate, searchEndDate);
      const getData = () => {
        promise.then((data) => {
          setAttendance(data);
        });
      };
      getData();
    }
    else {
      const promise = getStudentAttendanceByStudentId(id);
      const getData = () => {
        promise.then((data) => {
          setAttendance(data);
        });
      };
      getData();
    }
  }

  return<>
    <Container>
      {
        (course && academic && attendance) &&
        <Box>
          <ContentBox className="col-3">
            <Bold>과정명</Bold>
            <p>{course.courseName}</p>
          </ContentBox>
          <ContentBox className="col-2">
            <Bold>담당 매니저</Bold>
            <p>{academic.find((a) => a.academic.academicId === course.academicId).user.userName}</p>
          </ContentBox>
          <ContentBox className="col-3">
            <Bold>훈련기간</Bold>
            <p>{course.startDate} ~ {course.endDate}</p>
          </ContentBox>
          <ContentBox className="col-2">
            <Bold>출석일수</Bold>
            <p>{attendance.length - absenceDays}</p>
          </ContentBox>
          <ContentBox className="col-2">
            <Bold>결석일수</Bold>
            <p>{absenceDays}</p>
          </ContentBox>
        </Box>
      }
      <Search>
        <Detail>
          <Label>출결코드</Label>
          <Select name="searchCode" id="searchCode" onChange={(e) => setSearchCode(e.target.value)} value={searchCode}>
            <option>출결코드 선택</option>
            {
              code &&
              code.map((data) => (
                <option value={data.absenceId} key={data.absenceId}>
                  {data.absenceId}: {data.absenceName}
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
        <PrimaryButton onClick={() => onSearch()}><p>검색</p></PrimaryButton>
      </Search>
      {
        items && <>        
          <Table 
            headers={headers}
            items={postsData(items)}
            selectable={false}
          />
          <Pagination limit={limit} page={page} totalPosts={items.length} setPage={setPage} />
        </>
      }
    </Container>
  </>
}