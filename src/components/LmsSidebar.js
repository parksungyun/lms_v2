import { useEffect, useState } from "react";
import { Menu, MenuItem, Sidebar, SubMenu } from "react-pro-sidebar";
import { BsFillPersonFill, BsDash, BsMegaphone, BsHouseDoor, BsListCheck, BsPencil,BsQuestionCircle, BsInfoCircle, BsStar } from "react-icons/bs";
import { RiMacbookLine, RiLogoutBoxRLine, RiMailLine, RiBookletFill, RiUserSettingsLine } from "react-icons/ri";
import styled from "styled-components";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { getCourseByAcademicId, getSubjectByAcademicId, getSubjectByStudentId } from "../pages/Api";

const Container = styled.div`
  display: flex;
  height: 100%;
`;

const Divider = styled.hr`
  border: 0;
  margin: 0.5rem 0;
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
  const navigate = useNavigate();
  const [isToggled, setIsToggled] = useState(sessionStorage.getItem("toggled"));
  const [label, setLabel] = useState("");
  const id = sessionStorage.getItem("id");
  const userType = sessionStorage.getItem("userType");
  const [datas, setDatas] = useState(null);
  const pathName = useLocation().pathname;

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
      setLabel("내 과정 관리");

      const promise = getCourseByAcademicId(id);
      const getData = () => {
        promise.then((data) => {
          setDatas(data);
        });
      };
      getData();
    }
    if(userType === "s") {
      setLabel("내 과정");

      const promise = getSubjectByStudentId(id);
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
                backgroundColor: active ? '#ddd' : undefined,
                fontWeight: active ? 'bold' : 'normal'
              };
          },
        }}>
          <MenuItem
            active={pathName === `/lms/${userType}`}
            icon={<RiMacbookLine />}
            component={<NavLink to={`/lms/${userType}`} />}>
            {label}
          </MenuItem>
          {/* Student Sidebar */}
          {
            (userType === "s" && datas) && <>
              <MenuItem
                active={pathName.startsWith(`/lms/${userType}/cboard`)}
                icon={<BsMegaphone  />}
                component={<NavLink to={`/lms/${userType}/cboard`} />}>
                {"과정 공지"}
              </MenuItem>
              <Divider />
              {
                datas.map((data, index) => (
                  <SubMenu label={<Text>{data.subject.subjectName}</Text>} icon={<RiBookletFill />}>
                    <Menu transitionDuration={1000} menuItemStyles={{
                        button: ({ active }) => {
                            return {
                              color: active ? '#5f7dcf' : 'black',
                              backgroundColor: active ? '#ddd' : '#eee',
                              fontWeight: active ? 'bold' : 'normal'
                            };
                        },
                      }}>
                      <MenuItem
                        active={pathName.startsWith(`/lms/${userType}/${data.subject.subjectId}/subject`)}
                        icon={<BsHouseDoor />}
                        component={<NavLink to={`/lms/${userType}/${data.subject.subjectId}/subject`} />}>
                        {"강의실"}
                      </MenuItem>
                      <MenuItem
                        active={pathName.startsWith(`/lms/${userType}/${data.subject.subjectId}/sboard`)}
                        icon={<BsMegaphone />}
                        component={<NavLink to={`/lms/${userType}/${data.subject.subjectId}/sboard`}/>}>
                        {"공지"}
                      </MenuItem>
                      <MenuItem
                        active={pathName.startsWith(`/lms/${userType}/${data.subject.subjectId}/homework`)}
                        icon={<BsListCheck />}
                        component={<NavLink to={`/lms/${userType}/${data.subject.subjectId}/homework`} />}>
                        {"과제"}
                      </MenuItem>
                      <MenuItem
                        active={pathName.startsWith(`/lms/${userType}/${data.subject.subjectId}/lecture`)}
                        icon={<BsPencil />}
                        component={<NavLink to={`/lms/${userType}/${data.subject.subjectId}/lecture`} />}>
                        {"강의"}
                      </MenuItem>
                      <MenuItem
                        active={pathName.startsWith(`/lms/${userType}/${data.subject.subjectId}/sqna`)}
                        icon={<BsQuestionCircle />}
                        component={<NavLink to={`/lms/${userType}/${data.subject.subjectId}/sqna`} />}>
                        {"Q&A"}
                      </MenuItem>
                    </Menu>
                  </SubMenu>
                ))
              }
            </>
          }

          {/* Manager Sidebar */}
          {
            (userType === "m" && datas) && datas.map((data, index) => (
              <SubMenu label={<Text>{data.courseName}</Text>} icon={<RiBookletFill />}>
                <Menu transitionDuration={1000} menuItemStyles={{
                    button: ({ active }) => {
                        return {
                          color: active ? '#5f7dcf' : 'black',
                          backgroundColor: active ? '#ddd' : '#eee',
                          fontWeight: active ? 'bold' : 'normal'
                        };
                    },
                  }}>
                  <MenuItem
                    active={pathName.startsWith(`/lms/${userType}/${data.courseId}/info`)}
                    icon={<BsInfoCircle />}
                    component={<NavLink to={`/lms/${userType}/${data.courseId}/info`} />}>
                    {"정보"}
                  </MenuItem>
                  <MenuItem
                    active={pathName.startsWith(`/lms/${userType}/${data.courseId}/board`)}
                    icon={<BsMegaphone />}
                    component={<NavLink to={`/lms/${userType}/${data.courseId}/board`}/>}>
                    {"공지"}
                  </MenuItem>
                  <MenuItem
                    active={pathName.startsWith(`/lms/${userType}/${data.courseId}/qna`)}
                    icon={<RiMailLine />}
                    component={<NavLink to={`/lms/${userType}/${data.courseId}/qna`} />}>
                    {"1:1 문의"}
                  </MenuItem>
                  <MenuItem
                    active={pathName.startsWith(`/lms/${userType}/${data.courseId}/review`)}
                    icon={<BsStar />}
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
                          backgroundColor: active ? '#ddd' : '#eee',
                          fontWeight: active ? 'bold' : 'normal'
                        };
                    },
                  }}>
                  <MenuItem
                    active={pathName.startsWith(`/lms/${userType}/${data.subject.subjectId}/subject`)}
                    icon={<BsInfoCircle />}
                    component={<NavLink to={`/lms/${userType}/${data.subject.subjectId}/subject`} />}>
                    {"정보"}
                  </MenuItem>
                  <MenuItem
                    active={pathName.startsWith(`/lms/${userType}/${data.subject.subjectId}/lecture`)}
                    icon={<BsPencil />}
                    component={<NavLink to={`/lms/${userType}/${data.subject.subjectId}/lecture`} />}>
                    {"강의"}
                  </MenuItem>
                  <MenuItem
                    active={pathName.startsWith(`/lms/${userType}/${data.subject.subjectId}/board`)}
                    icon={<BsMegaphone />}
                    component={<NavLink to={`/lms/${userType}/${data.subject.subjectId}/board`}/>}>
                    {"공지"}
                  </MenuItem>
                  <MenuItem
                    active={pathName.startsWith(`/lms/${userType}/${data.subject.subjectId}/homework`)}
                    icon={<BsListCheck />}
                    component={<NavLink to={`/lms/${userType}/${data.subject.subjectId}/homework`} />}>
                    {"과제"}
                  </MenuItem>
                  <MenuItem
                    active={pathName.startsWith(`/lms/${userType}/${data.subject.subjectId}/qna`)}
                    icon={<BsQuestionCircle />}
                    component={<NavLink to={`/lms/${userType}/${data.subject.subjectId}/qna`} />}>
                    {"Q&A"}
                  </MenuItem>
                </Menu>
              </SubMenu>
            ))
          }

          <Divider />
          <MenuItem
            active={pathName === `/lms/${userType}/mypage`}
            icon={<BsFillPersonFill />}
            component={<NavLink to={`/lms/${userType}/mypage`} />}>
            {"마이페이지"}
          </MenuItem>
          {
            userType === "s"
            && <MenuItem
                active={pathName.startsWith(`/lms/${userType}/cqna`)}
                icon={<RiMailLine />}
                component={<NavLink to={`/lms/${userType}/cqna`} />}>
                {"1:1 문의"}
              </MenuItem>
          }
          {
            (userType === "t" || userType === "m")
            && <MenuItem
                active={pathName.startsWith(`/lms/a`)}
                icon={<RiUserSettingsLine />}
                component={<NavLink to={`/lms/a`} />}>
                {"관리자 페이지"}
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