import { useContext, useEffect, useState } from "react";
import { Menu, MenuItem, Sidebar, SubMenu } from "react-pro-sidebar";
import { BsFillPersonFill, BsDash } from "react-icons/bs";
import { RiMacbookLine, RiLogoutBoxRLine, RiMailLine, RiBookletFill } from "react-icons/ri";
import styled from "styled-components";
import { NavLink, useNavigate } from "react-router-dom";
import { SideContext } from "../pages/Router";
import { courses, subjects } from "../assets/TempData";
import { getCourseByAcademicId, getCourseById, getSubjectByAcademicId, getSubjectByCourseId } from "../pages/Api";

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

export function LmsSidebar() {
  // const { toggled, selectedMenu, setSelectedMenu } = useContext(SideContext);
  const navigate = useNavigate();
  const [isToggled, setIsToggled] = useState(sessionStorage.getItem("toggled"));
  const [label, setLabel] = useState("");
  const id = sessionStorage.getItem("id");
  const userType = sessionStorage.getItem("userType");
  const [datas, setDatas] = useState(null);
  const [selected, setSelected] = useState("Home");

  useEffect(() => {
    sessionStorage.setItem("selected", selected);
  }, [selected]);

  useEffect(() => {
    if(userType === "t") {
      setLabel("내 과목 관리");

      const promise = getSubjectByAcademicId(id);
      const getData = () => {
        promise.then((data) => {
          setDatas(data);
        });
      };
      getData();
    }
    if(userType === "m") {
      setLabel("내 클래스 관리");

      const promise = getCourseByAcademicId(id);
      const getData = () => {
        promise.then((data) => {
          setDatas(data);
        });
      };
      getData();
    }
    if(userType === "s") {
      setLabel("내 클래스");

      const promise = getSubjectByCourseId(id);
      const getData = () => {
        promise.then((data) => {
          setDatas(data);
        });
      };
      getData();
    }
  }, [userType]);

  return <>
    <Container>
      <Sidebar toggled={isToggled}>
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
            active={selected === "Home"}
            icon={<RiMacbookLine />}
            onClick={() => setSelected("Home")}
            component={<NavLink to={`/lms/${userType}`} />}>
            {label}
          </MenuItem>
          {/* Student Sidebar */}
          {
            (userType === "s" && datas) && datas.map((data, index) => (
              <SubMenu label={<Text>{data.subject.subjectName}</Text>} icon={<RiBookletFill />}>
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
                    active={selected === `subjectHome${index}`}
                    icon={<BsDash />}
                    onClick={() => {setSelected(`subjectHome${index}`)}}
                    component={<NavLink to={`/lms/${userType}/${data.subject.subjectId}/subject`} />}>
                    {"강의실"}
                  </MenuItem>
                  <MenuItem
                    active={selected === `subjectBoard${index}`}
                    icon={<BsDash />}
                    onClick={() => {setSelected(`subjectBoard${index}`)}}
                    component={<NavLink to={`/lms/${userType}/${data.subject.subjectId}/sboard`}/>}>
                    {"공지"}
                  </MenuItem>
                  <MenuItem
                    active={selected === `subjectHomework${index}`}
                    icon={<BsDash />}
                    onClick={() => {setSelected(`subjectHomework${index}`)}}
                    component={<NavLink to={`/lms/${userType}/${data.subject.subjectId}/homework`} />}>
                    {"과제"}
                  </MenuItem>
                  <MenuItem
                    active={selected === `subjectLecture${index}`}
                    icon={<BsDash />}
                    onClick={() => {setSelected(`subjectLecture${index}`)}}
                    component={<NavLink to={`/lms/${userType}/${data.subject.subjectId}/lecture`} />}>
                    {"강의"}
                  </MenuItem>
                  <MenuItem
                    active={selected === `subjectQna${index}`}
                    icon={<BsDash />}
                    onClick={() => {setSelected(`subjectQna${index}`)}}
                    component={<NavLink to={`/lms/${userType}/${data.subject.subjectId}/sqna`} />}>
                    {"Q&A"}
                  </MenuItem>
                </Menu>
              </SubMenu>
            ))
          }

          {/* Manager Sidebar */}
          {
            (userType === "m" && datas) && datas.map((data, index) => (
              <SubMenu label={<Text>{data.courseName}</Text>} icon={<RiBookletFill />}>
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
                    active={selected === `courseHome${index}`}
                    icon={<BsDash />}
                    onClick={() => setSelected(`courseHome${index}`)}
                    component={<NavLink to={`/lms/${userType}/${data.courseId}/info`} />}>
                    {"정보"}
                  </MenuItem>
                  <MenuItem
                    active={selected === `courseBoard${index}`}
                    icon={<BsDash />}
                    onClick={() => setSelected(`courseBoard${index}`)}
                    component={<NavLink to={`/lms/${userType}/${data.courseId}/board`}/>}>
                    {"공지"}
                  </MenuItem>
                  <MenuItem
                    active={selected === `courseQna${index}`}
                    icon={<BsDash />}
                    onClick={() => setSelected(`courseQna${index}`)}
                    component={<NavLink to={`/lms/${userType}/${data.courseId}/qna`} />}>
                    {"1:1 문의"}
                  </MenuItem>
                  <MenuItem
                    active={selected === `courseReview${index}`}
                    icon={<BsDash />}
                    onClick={() => setSelected(`courseReview${index}`)}
                    component={<NavLink to={`/lms/${userType}/${data.courseId}/review`} />}>
                    {"강의 평가"}
                  </MenuItem>
                </Menu>
              </SubMenu>
            ))
          }

          {/* Trainer Sidebar */}
          {
            (userType === "t" && datas) && datas.map((data, index) => (
              <SubMenu label={<TrainerText><CourseName>{data.course.courseName}</CourseName><SubjectName>{data.subject.subjectName}</SubjectName></TrainerText>} icon={<RiBookletFill />}>
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
                    active={selected === `courseSubjectHome${index}`}
                    icon={<BsDash />}
                    onClick={() => setSelected(`courseSubjectHome${index}`)}
                    component={<NavLink to={`/lms/${userType}/${data.subject.subjectId}/subject`} />}>
                    {"정보"}
                  </MenuItem>
                  <MenuItem
                    active={selected === `subjectTLecture${index}`}
                    icon={<BsDash />}
                    onClick={() => setSelected(`subjectTLecture${index}`)}
                    component={<NavLink to={`/lms/${userType}/${data.subject.subjectId}/lecture`} />}>
                    {"강의"}
                  </MenuItem>
                  <MenuItem
                    active={selected === `subjectTBoard${index}`}
                    icon={<BsDash />}
                    onClick={() => setSelected(`subjectTBoard${index}`)}
                    component={<NavLink to={`/lms/${userType}/${data.subject.subjectId}/board`}/>}>
                    {"공지"}
                  </MenuItem>
                  <MenuItem
                    active={selected === `subjectTHomework${index}`}
                    icon={<BsDash />}
                    onClick={() => setSelected(`subjectTHomework${index}`)}
                    component={<NavLink to={`/lms/${userType}/${data.subject.subjectId}/homework`} />}>
                    {"과제"}
                  </MenuItem>
                  <MenuItem
                    active={selected === `subjectTQna${index}`}
                    icon={<BsDash />}
                    onClick={() => setSelected(`subjectTQna${index}`)}
                    component={<NavLink to={`/lms/${userType}/${data.subject.subjectId}/qna`} />}>
                    {"Q&A"}
                  </MenuItem>
                </Menu>
              </SubMenu>
            ))
          }

          <Divider />
          <MenuItem
            active={selected === "myPage"}
            icon={<BsFillPersonFill />}
            onClick={() => setSelected("myPage")}
            component={<NavLink to={`/lms/${userType}/mypage`} />}>
            {"마이페이지"}
          </MenuItem>
          {
            userType === "s"
            && <MenuItem
                active={selected === "classQna"}
                icon={<RiMailLine />}
                onClick={() => setSelected("classQna")}
                component={<NavLink to={`/lms/${userType}/cqna`} />}>
                {"1:1 문의"}
              </MenuItem>
          }
          <MenuItem
            active={false}
            icon={<RiLogoutBoxRLine />}
            onClick={() => {sessionStorage.clear(); navigate("/");}}>
            {"로그아웃"}
          </MenuItem>
        </Menu>
      </Sidebar>
    </Container>
  </>
}