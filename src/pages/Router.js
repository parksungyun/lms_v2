import { QueryClient, QueryClientProvider } from "react-query"
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom"
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
import { AdminTrainerDetail } from "./Learning/AdminTrainerDetail"
import { AdminManagerDetail } from "./Learning/AdminManagerDetail"
import { AdminCourseDetail } from "./Learning/AdminCourseDetail"

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
                  {/* <Route path="sqna" element={<StudentSubjectQna />} /> */}
                  {/* <Route path="mypage" element={<StudentMypage />} /> */}
                  {/* <Route path="cqna" element={<StudentCourseQna />} /> */}
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
                  <Route path="trainerSetting" element={<ParentsWrapper />}>
                    <Route index element={<AdminTrainerSetting />} />
                    <Route path=":id" element={<AdminTrainerDetail />} />
                  </Route>
                  <Route path="ManagerSetting" element={<ParentsWrapper />}>
                    <Route index element={<AdminManagerSetting />} />
                    <Route path=":id" element={<AdminManagerDetail />} />
                  </Route>
                  <Route path="CourseSetting" element={<ParentsWrapper />}>
                    <Route index element={<AdminCourseSetting />} />
                    <Route path=":id" element={<AdminCourseDetail />} />
                  </Route>
                </Route>
                <Route path="*" element={<Error />} />
              </Route>
          </Routes>
        </SideContext.Provider>
      </BrowserRouter>
    {/* </QueryClientProvider> */}
  </> 
}