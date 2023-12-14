import  Modal  from "react-bootstrap/Modal";
import { useEffect, useState } from "react"
import { BsDownload } from "react-icons/bs";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { getAllAbsenceCode, getAttendanceById } from "../pages/Api";
import axios from "axios";

const Button = styled.button`
  padding: 1rem 3rem;
  border-radius: 50px;
  background-color: #5f7dcf;
  border: 1px solid #eee;
  color: white;
  font-weight: 700;
  margin-top: 2rem;
  margin-bottom: 1rem;
  &:hover {
    background-color: #86a8db;
  }
`;

const Div = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1rem 0;
`;

const ErrorMsg = styled.p`
  font-size: 1rem;
  color: red;
  margin: 0;
  padding: 0;
`;

const Select = styled.select`
  padding: 0.7rem;
  border: 1px solid lightgray;
  border-radius: 0.5rem;
  width: 300px;
`;

const Input = styled.input`
  padding: 0.7rem;
  border-radius: 0.5rem;
  border: 1px solid lightgray;
  width: 300px;
`;

const BadgeSuccess = styled.span`
  background-color: green;
  padding: 2px 15px;
  color: white;
  font-weight: 500;
  font-size: 0.8rem;
  border-radius: 5px;
  cursor: pointer;
`;

const BadgeSecondary = styled.span`
  background-color: gray;
  padding: 2px 15px;
  color: white;
  font-weight: 500;
  font-size: 0.8rem;
  border-radius: 5px;
  cursor: pointer;
`;

const AttachedBox = styled.div`
  border: 1px solid #ddd;
  width: 100%;
  display: flex;
  padding: 1rem;
  border-radius: 0.5rem;
`;

const Attached = styled.div`
  margin-right: 1rem;
  border-right: 1px solid #ddd;
  padding-right: 1rem;
`;

const A = styled.a`
  color: black;
`;

const Icon = styled.i`
  font-weight: bold;
  padding-left: 0.5rem;
`;

const Label = styled.label`
  text-align: center;
  font-size: 1.1rem;
  font-weight: bold;
`;

export function AttendanceModal({id, check}) {
  const [code, setCode] = useState(null);
  const [attendance, setAttendance] = useState(null);
  const [file, setFile] = useState();
  const [searchCode, setSearchCode] = useState();
  const [errorCheck, setErrorCheck] = useState(0);
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    if(!code) {
      const promise = getAllAbsenceCode();
      const getData = () => {
        promise.then((data) => {
          setCode(data);
        });
      };
      getData();
    }
    if(!attendance) {
      const promise = getAttendanceById(id);
      const getData = () => {
        promise.then((data) => {
          setAttendance(data);
        });
      };
      getData();
    }
  });

  useEffect(() => {
    if(show === false) {
      setFile(null);
      setSearchCode(null);
      setErrorCheck(0);
    }
  }, [show]);
  console.log(attendance);
  function onSubmit() {
    if (!searchCode) {
      setErrorCheck(1);
    } else if(!file) {
      setErrorCheck(2);
    } else {
      // 수정
      const fd = new FormData();
      fd.append("file", file);
      fetch(`/api/file/upload/attendance/${id}/${searchCode}`, {
        method: 'POST',
        body: fd
      })
      .then(response => response.json())
      .then(data => {
          console.log('File upload success:', data);
          setErrorCheck(4);
      })
      .catch(error => {
          console.error('File upload failed:', error);
          setErrorCheck(3);
      });
    }
  }

  if(attendance && attendance.absenceFileUrl) {
    axios
    .get(`/api/file/download/academic/${attendance.absenceFileUrl.substring(attendance.absenceFileUrl.lastIndexOf("\\") + 1)}`)
    .then((res) => {
      console.log(res.data.data)
    })
    .catch((err) => {
      console.log(`${err} : Error!`)
    })
  }

  return<>
    {
      check === 99 ? <BadgeSecondary onClick={handleShow}>대기</BadgeSecondary>
      : <BadgeSuccess onClick={handleShow}>승인</BadgeSuccess>
    }

    <Modal show={show} onHide={handleClose}>
      {
        check == 99 ?
        <>
          <Modal.Body className="d-flex flex-column justify-content-center align-items-center">
            <Div>
              <label>출결코드</label>
                <Select name="searchCode" id="searchCode" onChange={(e) => setSearchCode(e.target.value)} value={searchCode}>
                  <option>출결코드 선택</option>
                  {
                    code && code.map((data) => (
                      <option value={data.absenceId} key={data.absenceId}>
                        {data.absenceId}: {data.absenceName}
                      </option>
                    ))
                  }
                </Select>
            </Div>
            <Div>
              <label>결석 사유 파일 첨부</label>
              <Input type="file" id="file" onChange={(e) => setFile(e.target.files[0])} />
            </Div>
            {errorCheck === 1 && <ErrorMsg>출결코드를 선택해주세요.</ErrorMsg>}
            {errorCheck === 2 && <ErrorMsg>파일을 첨부해주세요.</ErrorMsg>}
            {errorCheck === 3 && <ErrorMsg>승인 실패하였습니다.</ErrorMsg>}
            {errorCheck === 4 && setShow(false)}
            <Button onClick={()=>onSubmit()}><p>승인</p></Button>
          </Modal.Body>
        </> : 
        <>
          {
            attendance &&
            <Modal.Body className="d-flex flex-column justify-content-center align-items-center">
                <AttachedBox>
                  <Attached><p className="fw-bold">첨부파일</p></Attached>
                  <div><A href={`/api/file/download/academic/${attendance.absenceFileUrl.substring(attendance.absenceFileUrl.lastIndexOf("\\") + 1)}`} onClick={()=>setShow(false)}>{attendance.absenceFileName}<Icon><BsDownload /></Icon></A></div>
                </AttachedBox>
              </Modal.Body>
          }
        </>
      }
    </Modal>
  </>
}