import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadCoordinator, loadSupervisor, loadUser } from "./redux/actions/authAction";
import { Routes, Route } from "react-router-dom";

import Login from "../src/register/Login";

// STUDENT -
import StudentSidebar from "../src/components/student/StudentSidebar";
import StudentDashboard from "../src/components/student/home/StudentDashboard";
import Registration from "../src/components/student/home/Registration";
import Supervisorlist from "../src/components/student/home/Supervisorlist";
import Fyp1 from "../src/components/student/home/Fyp1";
import Fyp2 from "../src/components/student/home/Fyp2";
import Fyp3 from "../src/components/student/home/Fyp3";
import Status from "./components/student/home/Status";
import Feedback from "./components/student/home/Feedback";

// COORDINATOR -
import CoordinatorSidebar from "./components/coordinator/CoordinatorSidebar";
import CoordinatorDashboard from "./components/coordinator/home/CoordinatorDashboard";
import Manageannouncement from "./components/coordinator/home/Manageannouncement";
import Supervisors from "../src/components/coordinator/home/Supervisors";
import Students from "../src/components/coordinator/home/Students";
// EXAM PAGES
import Exams from "./components/coordinator/home/exam/Exams";
import CreateExamQues from "./components/coordinator/home/exam/CreateExamQues";
import CreateExam from "./components/coordinator/home/exam/CreateExam";
import ScheduleExam from "./components/coordinator/home/exam/ScheduleExam";
import AssignExam from "./components/coordinator/home/exam/AssignExam";
import CreateExamType from "./components/coordinator/home/exam/CreateExamType";
// EXAM PAGES

// CLO PAGES
import CLOs from "./components/coordinator/home/clo/CLOs";
import CreateClo from "./components/coordinator/home/clo/CreateClo";
// import ManageClo from "./components/coordinator/home/clo/ManageClo";
// CLO PAGES

// import Manageclo from "./components/coordinator/home/Manageclo";
// import Manageplo from "./components/coordinator/home/Manageplo";
import Registersupervisor from "./components/coordinator/home/Registersupervisor";
import Panels from "./components/coordinator/home/Panels";
// COORDINATOR -

//SUPERVISOR -
import SuperSidebar from "../src/components/supervisor/SuperSidebar";
import SuperDashboard from "../src/components/supervisor/home/SuperDashboard";
import EmailCoordinator from "./components/supervisor/home/EmailCoordinator";
import FypRequests from "./components/supervisor/home/FypRequests";
import SupervisorFeedback from "./components/supervisor/home/SupervisorFeedback.jsx";
import ForgotPassword from "./register/ForgotPassword.js";
import ResetPassword from "./register/ResetPassword.js";

function App() {
  const { isAuth, user } = useSelector((state) => state.AUTH);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(loadUser());
    dispatch(loadCoordinator());
    dispatch(loadSupervisor());
  
  }, [dispatch]);

  return (
    <>
      <div className="App">
        <Routes>
          {isAuth && user?.role === "student" ? (
            <Route
              path="/*"
              element={
                <StudentSidebar>
                  <Routes>
                    <Route path="dashboard" element={<StudentDashboard />} />
                    <Route path="registration" element={<Registration />} />
                    <Route path="supervisor" element={<Supervisorlist />} />
                    <Route path="fyp1" element={<Fyp1 />} />
                    <Route path="fyp2" element={<Fyp2 />} />
                    <Route path="fyp3" element={<Fyp3 />} />
                    <Route path="status" element={<Status/>} />
                    <Route path="feedback" element={<Feedback/>} />
                  </Routes>
                </StudentSidebar>
              }
            />
          ) : null}

          {isAuth && user?.role === "coordinator" ? (
            <Route
              path="/*"
              element={
                <CoordinatorSidebar>
                  <Routes>
                    <Route
                      path="/coordinatorDashboard"
                      element={<CoordinatorDashboard />}
                    />
                    <Route
                      path="/manageAnnouncement"
                      element={<Manageannouncement />}
                    />
                     <Route
                      path="/supervisorList"
                      element={< Supervisors />}
                    />
                    <Route
                      path="/studentList"
                      element={< Students />}
                    />
                    {/* EXAM PAGES */}
                    <Route path="/Exams" element={<Exams />} />
                    <Route path="/Exams/CreateExamType" element={<CreateExamType />} />
                    <Route path="/Exams/CreateExam" element={<CreateExam />} />
                    <Route
                      path="/Exams/ScheduleExam"
                      element={<ScheduleExam />}
                    />
                    <Route
                      path="/Exams/CreateExamQues"
                      element={<CreateExamQues />}
                    />
                    <Route path="/Exams/AssignExam" element={<AssignExam />} />
                    {/* EXAM PAGES */}

                    {/*CLO PAGES */}
                    <Route path="/CLOs" element={<CLOs />} />
                    <Route path="/CLOs/CreateClo" element={<CreateClo />} />
                   
                    <Route
                      path="/registerSupervisor"
                      element={<Registersupervisor />}
                    />
                    <Route
                      path="/Panels"
                      element={<Panels />}
                    />
                  </Routes>
                </CoordinatorSidebar>
              }
            />
          ) : null}

          {isAuth && user?.role === "supervisor" ? (
            <Route
              path="/*"
              element={
                <SuperSidebar>
                  <Routes>
                    <Route
                      path="/superdashboard"
                      element={<SuperDashboard />}
                    />
                    <Route path="/fyprequests" element={<FypRequests />} />
                    <Route
                      path="/emailcoordinator"
                      element={<EmailCoordinator />}
                    />
                    <Route
                      path="/supervisorfeedback"
                      element={<SupervisorFeedback />}
                    />
                  </Routes>
                </SuperSidebar>
              }
            />
          ) : null}

          {/* Default route for login */}
          <Route path="/" element={<Login />} index/>
          <Route path="/password/forgot" element={<ForgotPassword />} />
          <Route path="/password/reset/:token" element={<ResetPassword />}/>
        </Routes>
      </div>
    </>
  );
}

export default App;
