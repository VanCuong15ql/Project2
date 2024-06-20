import React from "react";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Forgot from "./pages/auth/Forgot";
import Recover from "./pages/auth/Recover";
import NotFound from "./pages/NotFound";
import { UserDataProvider } from "./context/UserDataProvider";
import { AuthProvider } from "./context/AuthProvider";
import LayOut from "./components/LayOut";
import UserDashboardPage from "./pages/UserDashboardPage";
import CompanyDashboardPage from "./pages/CompanyDashboardPage";
import JobDetail from "./pages/JobDetail";
import Authenticate from "./components/common/Authenticate";
import ProtectedRoutes from "./components/common/ProtectedRoutes";
import UserJobs from "./components/user/UserJobs";
import PostJob from "./components/company/PostJob";
import CompanyPostedJobs from "./components/company/CompanyPostedJobs";
import UserProfile from "./components/user/UserProfile";
import PersistLogin from "./components/PersistLogin";
import CompanyProfile from "./components/company/CompanyProfile";
import UpdateJob from "./pages/UpdateJob";
import JobApplicants from "./components/company/JobApplicants";

const App = () => {
  return (
   
     
        <UserDataProvider>
          <Routes>
            <Route path="/" element={<LayOut />}>
              <Route index element={<Home />} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="forgot" element={<Forgot />} />
              <Route path="recover" element={<Recover />} />
              <Route path="job/:id" element={<JobDetail />} />
              <Route path="*" element={<NotFound />} />

              <Route element={<PersistLogin />}>
                <Route element={<Authenticate />}>
                  <Route
                    path="user-dashboard/*"
                    element={
                      <ProtectedRoutes role="user">
                        <UserDashboardPage />
                      </ProtectedRoutes>
                    }
                  >
                    <Route index element={<Home />} /> 
                    <Route path="job/:id" element={<JobDetail />} />
                    <Route path="home" element={<Home />} />
                    <Route path="profile" element={<UserProfile />} />
                    <Route path="jobs" element={<UserJobs />} />
                  </Route>
                  <Route
                    path="company-dashboard/*"
                    element={
                      <ProtectedRoutes role="company">
                        <CompanyDashboardPage />
                      </ProtectedRoutes>
                    }
                  >
                    <Route index element={<Home />} /> 
                    <Route path="home" element={<Home />} />
                    <Route path="post-job" element={<PostJob />} />
                    <Route path="posted-jobs" element={<CompanyPostedJobs />} />
                    <Route path="edit-job/:id" element={<UpdateJob />} />
                    <Route path="profile" element={<CompanyProfile />} />
                    <Route path="job-applicants/:id" element={<JobApplicants />} /> 
                  </Route>
                </Route>
              </Route>
            </Route>
          </Routes>
        </UserDataProvider>
   
  );
};

export default App;