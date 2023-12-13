import  Modal  from "react-bootstrap/Modal";
import { useEffect, useState } from "react"
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getAllAbsenceCode } from "../pages/Api";

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

export function AttendanceModal({id, check}) {
  const [code, setCode] = useState(null);
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
  });

  useEffect(() => {
    if(show === false) {
      setFile(null);
      setSearchCode(null);
      setErrorCheck(0);
    }
  }, [show]);

  useEffect(() => {
    if(check <= 99) {
      axios
      .get(`/api/user/attendance/approve/${id}`)
      .then((res) => {
        // 수정
      })
      .catch((err) => {
        console.log(`${err} : 출결 승인 정보 불러오기 실패`);
      });
    }
  }, [check]);

  function onSubmit() {
    if (!searchCode) {
      setErrorCheck(1);
    } else if(!file) {
      setErrorCheck(2);
    } else {
      // 수정
      const data = {
        absenceId: searchCode,
        absenceFileName: file,
        absenceFileUrl: file,
      };
      axios
      .put(`/api/user/attendance/${id}/approve`, data)
      .then((res) => {
        setShow(false);
        setFile(null);
        setSearchCode(null);
        setErrorCheck(0);
      })
      .catch((err) => {
        console.log(`${err} : 출결 승인 실패`);
      });
    }
  }

  return<>
    {
      check === 99 ? <BadgeSecondary onClick={handleShow}>대기</BadgeSecondary>
      : <BadgeSuccess onClick={handleShow}>승인</BadgeSuccess>
    }

    <Modal show={show} onHide={handleClose}>
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
        <Button onClick={()=>onSubmit()}><p>승인</p></Button>
      </Modal.Body>
    </Modal>
  </>
}