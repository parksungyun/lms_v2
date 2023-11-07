import { useContext, useState } from "react";
import { Menu, MenuItem, Sidebar, SubMenu, sidebarClasses, menuClasses } from "react-pro-sidebar";
import { BsFillPersonFill, BsDash } from "react-icons/bs";
import { RiMacbookLine, RiLogoutBoxRLine, RiMailLine, RiBookletFill } from "react-icons/ri";
import styled from "styled-components";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { SideContext } from "../pages/Router";
import { useEffect } from "react";
import { courses, subjects } from "../assets/TempData";

const Container = styled.div`
  display: flex;
  height: 100%;
`;

const Divider = styled.hr`
  border: 0;
`;

const Text = styled.p`
  font-weight: 700;
  font-size: 0.9rem;
`;

const TrainerText = styled.div`
  display: flex;
  flex-direction: column;
`;

const CourseName = styled.p`
  margin: 0;
  font-size: 0.8rem;
`;

const SubjectName = styled.p`
  margin: 0;
  font-size: 0.9rem;
  font-weight: 700;
`;

export function LmsSidebar({ userType, uid }) {
  const { toggled, selectedMenu, setSelectedMenu } = useContext(SideContext);
  const navigate = useNavigate();
  let firstLabel;

  if(userType === "t") {
    firstLabel = "내 과목 관리";
  }
  else if(userType === "m") {
    firstLabel = "내 클래스 관리";
  }
  else if(userType === "a") {
    firstLabel = "관리자 페이지";
  }
  else if(userType === "s") {
    firstLabel = "내 클래스";
  }
  const subjectName = subjects[0].subject_name;
  const courseName = courses[0].course_name;

  return <>
    <Container>
      <Sidebar toggled={toggled}>
        <Menu transitionDuration={1000} menuItemStyles={{
          button: ({ active }) => {
              return {
                color: active ? '#5f7dcf' : 'black',
                backgroundColor: active ? '#eee' : undefined,
                fontWeight: active ? 'bold' : 'normal'
              };
          },
        }}>
          <MenuItem
            active={selectedMenu === "Home"}
            icon={<RiMacbookLine />}
            onClick={() => setSelectedMenu("Home")}
            component={<NavLink to={`/lms/${userType}`} />}>
            {firstLabel}
          </MenuItem>
          <SubMenu label={<Text>{subjectName}</Text>} icon={<RiBookletFill />}>
            <Menu transitionDuration={1000} menuItemStyles={{
                button: ({ active }) => {
                    return {
                      color: active ? '#5f7dcf' : 'black',
                      backgroundColor: active ? '#eee' : undefined,
                      fontWeight: active ? 'bold' : 'normal'
                    };
                },
              }}>
              <MenuItem
                active={selectedMenu === "subjectHome"}
                icon={<BsDash />}
                onClick={() => setSelectedMenu("subjectHome")}
                component={<NavLink to={"/lms/s/subject"} />}>
                {"강의실"}
              </MenuItem>
              <MenuItem
                active={selectedMenu === "subjectBoard"}
                icon={<BsDash />}
                onClick={() => setSelectedMenu("subjectBoard")}
                component={<NavLink to={"/lms/s/sboard"}/>}>
                {"공지"}
              </MenuItem>
              <MenuItem
                active={selectedMenu === "subjectHomework"}
                icon={<BsDash />}
                onClick={() => setSelectedMenu("subjectHomework")}
                component={<NavLink to={"/lms/s/homework"} />}>
                {"과제"}
              </MenuItem>
              <MenuItem
                active={selectedMenu === "subjectLecture"}
                icon={<BsDash />}
                onClick={() => setSelectedMenu("subjectLecture")}
                component={<NavLink to={"/lms/s/lecture"} />}>
                {"강의"}
              </MenuItem>
              <MenuItem
                active={selectedMenu === "subjectQna"}
                icon={<BsDash />}
                onClick={() => setSelectedMenu("subjectQna")}
                component={<NavLink to={"/lms/s/sqna"} />}>
                {"Q&A"}
              </MenuItem>
            </Menu>
          </SubMenu>
          <SubMenu label={<Text>{courseName}</Text>} icon={<RiBookletFill />}>
            <Menu transitionDuration={1000} menuItemStyles={{
                button: ({ active }) => {
                    return {
                      color: active ? '#5f7dcf' : 'black',
                      backgroundColor: active ? '#eee' : undefined,
                      fontWeight: active ? 'bold' : 'normal'
                    };
                },
              }}>
              <MenuItem
                active={selectedMenu === "courseHome"}
                icon={<BsDash />}
                onClick={() => setSelectedMenu("courseHome")}
                component={<NavLink to={"/lms/m/info"} />}>
                {"정보"}
              </MenuItem>
              <MenuItem
                active={selectedMenu === "courseBoard"}
                icon={<BsDash />}
                onClick={() => setSelectedMenu("courseBoard")}
                component={<NavLink to={"/lms/m/board"}/>}>
                {"공지"}
              </MenuItem>
              <MenuItem
                active={selectedMenu === "courseQna"}
                icon={<BsDash />}
                onClick={() => setSelectedMenu("courseQna")}
                component={<NavLink to={"/lms/m/qna"} />}>
                {"1:1 문의"}
              </MenuItem>
              <MenuItem
                active={selectedMenu === "courseReview"}
                icon={<BsDash />}
                onClick={() => setSelectedMenu("courseReview")}
                component={<NavLink to={"/lms/m/review"} />}>
                {"강의 평가"}
              </MenuItem>
            </Menu>
          </SubMenu>
          <SubMenu label={<TrainerText><CourseName>{courseName}</CourseName><SubjectName>{subjectName}</SubjectName></TrainerText>} icon={<RiBookletFill />}>
            <Menu transitionDuration={1000} menuItemStyles={{
                button: ({ active }) => {
                    return {
                      color: active ? '#5f7dcf' : 'black',
                      backgroundColor: active ? '#eee' : undefined,
                      fontWeight: active ? 'bold' : 'normal'
                    };
                },
              }}>
              <MenuItem
                active={selectedMenu === "courseSubjectHome"}
                icon={<BsDash />}
                onClick={() => setSelectedMenu("courseSubjectHome")}
                component={<NavLink to={"/lms/t/subject"} />}>
                {"정보"}
              </MenuItem>
              <MenuItem
                active={selectedMenu === "subjectTLecture"}
                icon={<BsDash />}
                onClick={() => setSelectedMenu("subjectTLecture")}
                component={<NavLink to={"/lms/t/lecture"} />}>
                {"강의"}
              </MenuItem>
              <MenuItem
                active={selectedMenu === "subjectTBoard"}
                icon={<BsDash />}
                onClick={() => setSelectedMenu("subjectTBoard")}
                component={<NavLink to={"/lms/t/board"}/>}>
                {"공지"}
              </MenuItem>
              <MenuItem
                active={selectedMenu === "subjectTHomework"}
                icon={<BsDash />}
                onClick={() => setSelectedMenu("subjectTHomework")}
                component={<NavLink to={"/lms/t/homework"} />}>
                {"과제"}
              </MenuItem>
              <MenuItem
                active={selectedMenu === "subjectTQna"}
                icon={<BsDash />}
                onClick={() => setSelectedMenu("subjectTQna")}
                component={<NavLink to={"/lms/t/qna"} />}>
                {"Q&A"}
              </MenuItem>
            </Menu>
          </SubMenu>
          <Divider />
          <MenuItem
            active={selectedMenu === "myPage"}
            icon={<BsFillPersonFill />}
            onClick={() => setSelectedMenu("myPage")}
            component={<NavLink to={"/lms/s/mypage"} />}>
            {"마이페이지"}
          </MenuItem>
          <MenuItem
            active={selectedMenu === "classQna"}
            icon={<RiMailLine />}
            onClick={() => setSelectedMenu("classQna")}
            component={<NavLink to={"/lms/s/cqna"} />}>
            {"1:1 문의"}
          </MenuItem>
          <MenuItem
            active={false}
            icon={<RiLogoutBoxRLine />}
            onClick={() => navigate("/")}>
            {"로그아웃"}
          </MenuItem>
        </Menu>
      </Sidebar>
    </Container>
  </>
}