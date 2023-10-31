import { QueryClient, QueryClientProvider } from "react-query"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Home } from "./Web/Home"
import { About } from "./Web/About"
import { Courses } from "./Web/Courses"
import { Trainers } from "./Web/Trainers"
import { Managers } from "./Web/Managers"
import { Step } from "./Web/Step"
import { AdmissionBoard } from "./Web/AdmissionBoard"
import { AdmissionWrite } from "./Web/AdmissionWrite"
import { AdmissionPost } from "./Web/AdmissionPost"
import { Contact } from "./Web/Contact"
import { Login } from "./Web/Login"
import { Register } from "./Web/Register"
import { FindID } from "./Web/FindID"
import { FindPW } from "./Web/FindPW"
import { WebNavbar } from "../components/WebNavbar"
import { CourseDetail } from "./Web/CourseDetail"
import { Course } from "../components/Course"
import { MemberCard } from "../components/MemberCard"
import { StudentHome } from "./Learning/StudentHome"
import { TrainerHome } from "./Learning/TrainerHome"
import { ManagerHome } from "./Learning/ManagerHome"
import { AdminHome } from "./Learning/AdminHome"
import { LmsHeader } from "../components/LmsHeader"
import { ParentsWrapper } from "../components/ParentsWrapper"
import { createContext, useState } from "react"
import { Error } from "./Error"
import { AdminTrainerSetting } from "./Learning/AdminTrainerSetting"
import { AdminManagerSetting } from "./Learning/AdminManagerSetting"
import { AdminCourseSetting } from "./Learning/AdminCourseSetting"

export const SideContext = createContext();

export function Router() {
  const [toggled, setToggled] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState("Home");

  return <>
    {/* <QueryClientProvider> */}
      <BrowserRouter>
        <SideContext.Provider value={{toggled, setToggled, selectedMenu, setSelectedMenu}}>
          <Routes>
            <Route path="/" element={<WebNavbar />}>
              <Route index element={<Home />} />
              <Route path="about" element={<About />} />
              <Route path="courses" element={<ParentsWrapper />}>
                <Route index element={<Courses />} />
                <Route path="detail" element={<CourseDetail />} />
              </Route>
              <Route path="trainers" element={<Trainers />} />
              <Route path="managers" element={<Managers />} />
              <Route path="step" element={<Step />} />
              <Route path="admission" element={<ParentsWrapper />}>
                <Route index element={<AdmissionBoard />} />
                <Route path="write" element={<AdmissionWrite />} />
                <Route path="post" element={<AdmissionPost />} />
              </Route>
              <Route path="contact" element={<Contact />} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="findID" element={<FindID />} />
              <Route path="findPW" element={<FindPW />} />
              <Route path="*" element={<Error />} />
            </Route>
              <Route path="/lms" element={<LmsHeader />}>
                <Route index element={<Error />} />
                <Route path="s" element={<ParentsWrapper />}>
                  <Route index element={<StudentHome />} />
                  {/* <Route path="cboard" element={<StudentCourseBoard />} /> */}
                  {/* <Route path="subject" element={<StudentSubject />} /> */}
                  {/* <Route path="sboard" element={<StudentSubjectBoard />} /> */}
                  {/* <Route path="homework" element={<StudentHW />} /> */}
                  {/* <Route path="lecture" element={<StudentLecture />} /> */}
                  {/* <Route path="qna" element={<StudentSubjectQna />} /> */}
                  {/* <Route path="mypage" element={<StudentMypage />} /> */}
                </Route>
                <Route path="t" element={<ParentsWrapper />}>
                  <Route index element={<TrainerHome />} />
                  {/* <Route path="subject" element={<TrainerSubject />} /> */}
                  {/* <Route path="lecture" element={<TrainerLecture />} /> */}
                  {/* <Route path="board" element={<TrainerSubjectBoard />} /> */}
                  {/* <Route path="homework" element={<TrainerHW />} /> */}
                  {/* <Route path="qna" element={<TrainerSubjectQna />} /> */}
                  {/* <Route path="mypage" element={<TrainerMypage />} /> */}
                </Route>
                <Route path="m" element={<ParentsWrapper />}>
                  <Route index element={<ManagerHome />} />
                  {/* <Route path="info" element={<ManagerCourseInfo />} /> */}
                  {/* <Route path="board" element={<ManagerCourseBoard />} /> */}
                  {/* <Route path="qna" element={<ManagerCourseQna />} /> */}
                  {/* <Route path="review" element={<ManagerCourseReview />} /> */}
                  {/* <Route path="mypage" element={<ManagerMypage />} /> */}
                </Route>
                <Route path="a" element={<ParentsWrapper />}>
                  <Route index element={<AdminHome />} />
                  <Route path="trainerSetting" element={<AdminTrainerSetting />} />
                  <Route path="ManagerSetting" element={<AdminManagerSetting />} />
                  <Route path="CourseSetting" element={<AdminCourseSetting />} />
                </Route>
                <Route path="*" element={<Error />} />
              </Route>
          </Routes>
        </SideContext.Provider>
      </BrowserRouter>
    {/* </QueryClientProvider> */}
  </> 
}