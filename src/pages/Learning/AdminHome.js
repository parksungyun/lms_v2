import styled from "styled-components"
import { RiUserReceivedLine } from "react-icons/ri";
import { LmsHomeButtonWrapper } from "../../components/LmsHomeButtonWrapper";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { getAcademicByAcademicId } from "../Api";

const Container = styled.div`
  padding: 1.5rem 2rem;
  padding-bottom: 2rem;
  background-color: #f6f9ff;
  height: 100%;
`;

const H2 = styled.p`
  font-size: 1.7rem;
  font-weight: bold;
  margin: 10px 0;
  &.title{
    margin: 0;
  }
`

const PrimaryButton = styled.button`
  border: 0;
  border-radius: 5px;
  background-color: #5f7dcf;
  padding: 0.8rem 1.4rem;
  color: white;
`;

const Content = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
  align-items: center;
`;

const Box = styled.div`
  background-color: white;
  border-radius: 1rem;
  padding: 2rem;
`;

const ButtonBox = styled.div`
  height: 15rem;
`;

const HeaderBox = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const AuthBox = styled.div`
  display: flex;
  gap: 0.3rem;
`;

const BadgePrimary = styled.span`
  background-color: #5f7dcf;
  padding: 3px 15px;
  color: white;
  font-weight: 500;
  font-size: 1rem;
  border-radius: 5px;
  margin-bottom: 10px;
  `;

export function AdminHome() {
  const navigate = useNavigate();
  const id = sessionStorage.getItem("id");
  const userType = sessionStorage.getItem("userType");
  const [user, setUser] = useState(null);
  let items;

  useEffect(() => {
    if(!user) {
      const promise = getAcademicByAcademicId(id);
      const getData = () => {
        promise.then((data) => {
          setUser(data);
        });
      };
      getData();
    }
  });

  console.log(user);

  function authBadge(auth) {
    if(auth === 3) {
      return (<>
        <BadgePrimary>Trainers</BadgePrimary>
        <BadgePrimary>Managers</BadgePrimary>
        <BadgePrimary>Courses</BadgePrimary>
      </>);
    }
    else if(auth === 2) {
      return (<>
        <BadgePrimary>Managers</BadgePrimary>
        <BadgePrimary>Courses</BadgePrimary>
      </>);
    }
    else if(auth === 1) {
      return (<BadgePrimary>Trainers</BadgePrimary>);
    }
    else {
      return (<BadgePrimary>Courses</BadgePrimary>);
    }
  }

  if(user) {
    if(user.academic.auth === 3) {
      items = [
        {
          text: "강사 관리",
          link: 'trainerSetting'
        },
        {
          text: "매니저 관리",
          link: 'managerSetting'
        },
        {
          text: "과정 관리",
          link: 'courseSetting'
        },
      ];
    }
    else if(user.academic.auth === 2) {
      items = [
        {
          text: "매니저 관리",
          link: 'managerSetting'
        },
        {
          text: "과정 관리",
          link: 'courseSetting'
        },
      ];
    }
    else if(user.academic.auth === 1) {
      items = [
        {
          text: "강사 관리",
          link: 'trainerSetting'
        },
      ];
    }
    else {
      items = [
        {
          text: "과정 관리",
          link: 'courseSetting'
        },
      ];
    }
  }


  return <>
    <Container>
      <Content>
        <div>
          <H2 className='title'>관리자 페이지</H2>
        </div>
        <PrimaryButton onClick={()=>navigate(`/lms/${userType}`)}><p>사용자 페이지<RiUserReceivedLine /></p></PrimaryButton>
      </Content>
      {
        user &&
        <Box>
        <HeaderBox><H2>보유 권한: </H2><AuthBox> {authBadge(user.academic.auth)} </AuthBox></HeaderBox>
          {
            items.map((item, i) => (
              <ButtonBox><LmsHomeButtonWrapper items={item} /></ButtonBox>
            ))
          } 
        </Box>
      }
    </Container>
  </>
}