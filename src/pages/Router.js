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

export function Router() {
  return <>
    {/* <QueryClientProvider> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<WebNavbar />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="courses" element={<Courses />}>
              <Route path=":id" element={<CourseDetail />} />
            </Route>
            <Route path="trainers" element={<Trainers />} />
            <Route path="managers" element={<Managers />} />
            <Route path="step" element={<Step />} />
            <Route path="admission" element={<AdmissionBoard />}>
              <Route path="write" element={<AdmissionWrite />} />
              <Route path=":id" element={<AdmissionPost />} />
            </Route>
            <Route path="contact" element={<Contact />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="findID" element={<FindID />} />
            <Route path="findPW" element={<FindPW />} />
            {/* <Route path="student" element={<StudentWrapper />}>
              <Route path=":id" element={<StudentMain />}></Route>
            </Route> */}
            <Route path="course" element={<Course />} />
            <Route path="member" element={<MemberCard />} />
          </Route>
          <Route path="/lms" element={<LmsHeader />}>
            <Route path="s" element={<StudentHome />}></Route>
            <Route path="t" element={<TrainerHome />}></Route>
            <Route path="m" element={<ManagerHome />}></Route>
            <Route path="a" element={<AdminHome />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    {/* </QueryClientProvider> */}
  </> 
}