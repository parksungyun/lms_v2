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
import { AdminTrainerAdd } from "./Learning/AdminTrainerAdd"
import { AdminManagerAdd } from "./Learning/AdminManagerAdd"
import { AdminCourseAdd } from "./Learning/AdminCourseAdd"
import { ManagerCourseBoard } from "./Learning/ManagerCourseBoard"
import { ManagerCourseQna } from "./Learning/ManagerCourseQna"
import { StudentCourseBoard } from "./Learning/StudentCourseBoard"
import { StudentCourseQna } from "./Learning/StudentCourseQna"
import { StudentHW } from "./Learning/StudentHW"
import { StudentLecture } from "./Learning/StudentLecture"
import { StudentSubject } from "./Learning/StudentSubject"
import { StudentSubjectBoard } from "./Learning/StudentSubjectBoard"
import { StudentSubjectQna } from "./Learning/StudentSubjectQna"
import { TrainerHW } from "./Learning/TrainerHW"
import { TrainerLecture } from "./Learning/TrainerLecture"
import { TrainerSubject } from "./Learning/TrainerSubject"
import { TrainerSubjectBoard } from "./Learning/TrainerSubjectBoard"
import { TrainerSubjectQna } from "./Learning/TrainerSubjectQna"
import { ManagerCourseInfo } from "./Learning/ManagerCourseInfo"
import { ManagerCourseReview } from "./Learning/ManagerCourseReview"
import { useEffect } from "react"
import { AdminCourseStudentDetail } from "./Learning/AdminCourseStudentDetail"
import { ManagerCourseStudentDetail } from "./Learning/ManagerCourseStudentDetail"
import { ManagerCourseStudentAttendance } from "./Learning/ManagerCourseStudentAttendance"
import { TrainerMypage } from "./Learning/TrainerMypage"
import { ManagerMypage } from "./Learning/ManagerMypage"
import { StudentMypage } from "./Learning/StudentMypage"
import { SubjectReview } from "./Learning/SubjectReview"
import { BoardPost } from "../components/BoardPost"
import { BoardPostWrite } from "../components/BoardPostWrite"
import { BoardPostMod } from "../components/BoardPostMod"
import { TrainerHWPostWrite } from "./Learning/TrainerHWPostWrite"
import { TrainerHWPostMod } from "./Learning/TrainerHWPostMod"
import { StudentCourseQnaPost } from "./Learning/StudentCourseQnaPost"
import { StudentCourseQnaWrite } from "./Learning/StudentCourseQnaWrite"
import { StudentCourseQnaMod } from "./Learning/StudentCourseQnaMod"
import { StudentHWSubmit } from "./Learning/StudentHWSubmit"
import { StudentHWReview } from "./Learning/StudentHWReview"
import { StudentSubjectQnaPost } from "./Learning/StudentSubjectQnaPost"
import { StudentSubjectQnaWrite } from "./Learning/StudentSubjectQnaWrite"
import { StudentSubjectQnaMod } from "./Learning/StudentSubjectQnaMod"
import { LecturePost } from "../components/LecturePost"
import { TrainerLectureWrite } from "./Learning/TrainerLectureWrite"
import { TrainerLectureMod } from "./Learning/TrainerLectureMod"
import { TrainerSubjectQnaPost } from "./Learning/TrainerSubjectQnaPost"
import { ManagerCourseQnaPost } from "./Learning/ManagerCourseQnaPost"
import { ManagerAdmissionBoard } from "./Learning/ManagerAdmissionBoard"
import { ManagerAdmissionBoardPost } from "./Learning/ManagerAdmissionBoardPost"
import { TrainerHWFeedback } from "./Learning/TrainerHWFeedback"
import { TrainerHWPost } from "./Learning/TrainerHWPost"
import { StudentHWPost } from "./Learning/StudentHWPost"
import { AdmissionPwCheck } from "./Web/AdmissionPwCheck"
import { AdmissionMod } from "./Web/AdmissionMod"
import axios from "axios"
import { AdminCourseStudentAdd } from "./Learning/AdminCourseStudentAdd"

// export const SideContext = createContext();

export function Router() {
  // const [toggled, setToggled] = useState(false);
  // const [selectedMenu, setSelectedMenu] = useState("Home");
  // const [userType, setUserType] = useState("");
  // const [location, setLocation] = useState({...window.location});

  return <>
    {/* <QueryClientProvider> */}
      <BrowserRouter>
        {/* <SideContext.Provider value={{toggled, setToggled, selectedMenu, setSelectedMenu, userType}}> */}
          <Routes>
            <Route path="/" element={<WebNavbar />}>
              <Route index element={<Home />} />
              <Route path="about" element={<About />} />
              <Route path="courses" element={<Courses />} />
              <Route path="course" element={<ParentsWrapper />}>
                <Route path=":id" element={<CourseDetail />} />
              </Route>
              <Route path="trainers" element={<Trainers />} />
              <Route path="managers" element={<Managers />} />
              <Route path="step" element={<Step />} />
              <Route path="admission" element={<ParentsWrapper />}>
                <Route index element={<AdmissionBoard />} />
                <Route path="write" element={<AdmissionWrite />} />
                <Route path=":id" element={<ParentsWrapper />}>
                  <Route index element={<AdmissionPost />} />
                  <Route path="check" element={<AdmissionPwCheck />} />
                  <Route path="mod" element={<AdmissionMod />} />
                </Route>
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
                <Route path="cboard" element={<ParentsWrapper />}>
                  <Route index element={<StudentCourseBoard />} />
                  <Route path=":id" element={<BoardPost />} />
                </Route>
                <Route path=":id" element={<ParentsWrapper />}>
                  <Route path="subject" element={<StudentSubject />} />
                  <Route path="sboard" element={<ParentsWrapper />}>
                    <Route index element={<StudentSubjectBoard />} />
                    <Route path=":id" element={<BoardPost />} />
                  </Route>
                  <Route path="homework" element={<ParentsWrapper />}>
                    <Route index element={<StudentHW />} />
                    <Route path=":id" element={<ParentsWrapper />}>
                      <Route index element={<StudentHWPost />} />
                      <Route path="submit" element={<StudentHWSubmit />} />
                      <Route path="feedback" element={<StudentHWReview />} />
                    </Route>
                  </Route>
                  <Route path="lecture" element={<ParentsWrapper />}>
                    <Route index element={<StudentLecture />} />
                    <Route path=":id" element={<LecturePost />} />
                  </Route>
                  <Route path="sqna" element={<ParentsWrapper />}>
                    <Route index element={<StudentSubjectQna />} />
                    <Route path="write" element={<StudentSubjectQnaWrite />} />
                    <Route path=":id" element={<ParentsWrapper />}>
                      <Route index element={<StudentSubjectQnaPost />} />
                      <Route path="mod" element={<StudentSubjectQnaMod />} />
                    </Route>
                  </Route>
                </Route>
                <Route path="mypage" element={<ParentsWrapper />}>
                  <Route index element={<StudentMypage />} />
                  <Route path="review" elements={<ParentsWrapper />}>
                    <Route path=":id" element={<SubjectReview />} />
                  </Route>
                </Route>
                <Route path="cqna" element={<ParentsWrapper />}>
                  <Route index element={<StudentCourseQna />} />
                  <Route path="write" element={<StudentCourseQnaWrite />} />
                  <Route path=":id" element={<ParentsWrapper />}>
                    <Route index element={<StudentCourseQnaPost />} />
                    <Route path="mod" element={<StudentCourseQnaMod />} />
                  </Route>
                </Route>
              </Route>

              <Route path="t" element={<ParentsWrapper />}>
                <Route index element={<TrainerHome />} />
                <Route path=":id" element={<ParentsWrapper />}>
                  <Route path="subject" element={<TrainerSubject />} />
                  <Route path="lecture" element={<ParentsWrapper />}>
                    <Route index element={<TrainerLecture />} />
                    <Route path="write" element={<TrainerLectureWrite />} />
                    <Route path=":id" element={<ParentsWrapper />}>
                      <Route index element={<LecturePost />} />
                      <Route path="mod" element={<TrainerLectureMod />} />
                    </Route>
                  </Route>
                  <Route path="board" element={<ParentsWrapper />}>
                    <Route index element={<TrainerSubjectBoard />} />
                    <Route path="write" element={<BoardPostWrite />} />
                    <Route path=":id" element={<ParentsWrapper />}>
                      <Route index element={<BoardPost />} />
                      <Route path="mod" element={<BoardPostMod />} />
                    </Route>
                  </Route>
                  <Route path="homework" element={<ParentsWrapper />}>
                    <Route index element={<TrainerHW />} />
                    <Route path="write" element={<TrainerHWPostWrite />} />
                    <Route path=":id" element={<ParentsWrapper />}>
                      <Route index element={<TrainerHWPost />} />
                      <Route path="mod" element={<TrainerHWPostMod />} />
                      <Route path="feedback" element={<TrainerHWFeedback />} />
                    </Route>
                  </Route>
                  <Route path="qna" element={<ParentsWrapper />}>
                    <Route index element={<TrainerSubjectQna />} />
                    <Route path=":id" element={<TrainerSubjectQnaPost />} />
                  </Route>
                </Route>
                <Route path="mypage" element={<TrainerMypage />} />
              </Route>

              <Route path="m" element={<ParentsWrapper />}>
                <Route index element={<ManagerHome />} />
                <Route path=":id" element={<ParentsWrapper />}>
                  <Route path="info" element={<ParentsWrapper />}>
                    <Route index element={<ManagerCourseInfo />} />
                    <Route path="detail" element={<ParentsWrapper />}>
                      <Route path=":id" element={<ManagerCourseStudentDetail />} />
                    </Route>
                    <Route path="attend" elements={<ParentsWrapper />}>
                      <Route path=":id" element={<ManagerCourseStudentAttendance />} />
                    </Route>
                  </Route>
                  <Route path="board" element={<ParentsWrapper />}>
                    <Route index element={<ManagerCourseBoard />} />
                    <Route path="write" element={<BoardPostWrite />} />
                    <Route path=":id" element={<ParentsWrapper />}>
                      <Route index element={<BoardPost />} />
                      <Route path="mod" element={<BoardPostMod />} />
                    </Route>
                  </Route>
                  <Route path="qna" element={<ParentsWrapper />}>
                    <Route index element={<ManagerCourseQna />} />
                    <Route path=":id" element={<ManagerCourseQnaPost />} />
                  </Route>
                  <Route path="review" element={<ManagerCourseReview />} />
                </Route>
                <Route path="admission" element={<ParentsWrapper />}>
                  <Route index element={<ManagerAdmissionBoard />} />
                  <Route path=":id" element={<ManagerAdmissionBoardPost />} />
                </Route>
                <Route path="mypage" element={<ManagerMypage />} />
              </Route>

              <Route path="a" element={<ParentsWrapper />}>
                <Route index element={<AdminHome />} />
                <Route path="trainerSetting" element={<ParentsWrapper />}>
                  <Route index element={<AdminTrainerSetting />} />
                  <Route path="add" element={<AdminTrainerAdd />} />
                  <Route path=":id" element={<AdminTrainerDetail />} />
                </Route>
                <Route path="managerSetting" element={<ParentsWrapper />}>
                  <Route index element={<AdminManagerSetting />} />
                  <Route path="add" element={<AdminManagerAdd />} />
                  <Route path=":id" element={<AdminManagerDetail />} />
                </Route>
                <Route path="courseSetting" element={<ParentsWrapper />}>
                  <Route index element={<AdminCourseSetting />} />
                  <Route path="add" element={<AdminCourseAdd />} />
                  <Route path=":id" element={<ParentsWrapper />}>
                    <Route index element={<AdminCourseDetail />} />
                    <Route path="s" element={<ParentsWrapper />}>
                      <Route index element={<AdminCourseStudentDetail />} />
                      <Route path="add" element={<AdminCourseStudentAdd />} />
                    </Route>
                  </Route>
                </Route>
              </Route>

              <Route path="*" element={<Error />} />
            </Route>
          </Routes>
        {/* </SideContext.Provider> */}
      </BrowserRouter>
    {/* </QueryClientProvider> */}
  </> 
}