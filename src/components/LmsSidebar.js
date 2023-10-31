import { useContext, useState } from "react";
import { Menu, MenuItem, Sidebar, SubMenu, sidebarClasses, menuClasses } from "react-pro-sidebar";
import { BsFillPersonFill, BsDash } from "react-icons/bs";
import { RiMacbookLine, RiLogoutBoxRLine, RiMailLine, RiBookletFill } from "react-icons/ri";
import styled from "styled-components";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { SideContext } from "../pages/Router";
import { useEffect } from "react";

const Container = styled.div`
  display: flex;
  height: 100%;
`;

const Divider = styled.hr`
  border: 0;
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
  const subjectName = "HTML";

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
          <SubMenu label={subjectName} icon={<RiBookletFill />}>
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
                component={<NavLink to={"/lms/s"} />}>
                {"강의실"}
              </MenuItem>
              <MenuItem
                active={selectedMenu === "subjectBoard"}
                icon={<BsDash />}
                onClick={() => setSelectedMenu("subjectBoard")}
                component={<NavLink to={"/lms/s"} />}>
                {"공지"}
              </MenuItem>
              <MenuItem
                active={selectedMenu === "subjectHomework"}
                icon={<BsDash />}
                onClick={() => setSelectedMenu("subjectHomework")}
                component={<NavLink to={"/lms/s"} />}>
                {"과제"}
              </MenuItem>
              <MenuItem
                active={selectedMenu === "subjectLecture"}
                icon={<BsDash />}
                onClick={() => setSelectedMenu("subjectLecture")}
                component={<NavLink to={"/lms/s"} />}>
                {"강의"}
              </MenuItem>
              <MenuItem
                active={selectedMenu === "subjectQna"}
                icon={<BsDash />}
                onClick={() => setSelectedMenu("subjectQna")}
                component={<NavLink to={"/lms/s"} />}>
                {"Q&A"}
              </MenuItem>
            </Menu>
          </SubMenu>
          <Divider />
          <MenuItem
            active={selectedMenu === "myPage"}
            icon={<BsFillPersonFill />}
            onClick={() => setSelectedMenu("myPage")}
            component={<NavLink to={"/lms/s"} />}>
            {"마이페이지"}
          </MenuItem>
          <MenuItem
            active={selectedMenu === "classQna"}
            icon={<RiMailLine />}
            onClick={() => setSelectedMenu("classQna")}
            component={<NavLink to={"/lms/s"} />}>
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