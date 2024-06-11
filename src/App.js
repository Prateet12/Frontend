import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import LoginSignup from "./LoginSignup/LoginSignup";
import AcademicRepo from "./AcademicRepo/AcademicRepo";
import UploadDocument from "./UploadDocument/UploadDocument";
import UploadResume from "./UploadResume/UploadResume";
import Profile from "./profile/profile";
import Registration from "./Registration/Registration";
import Dashboard from "./Dashboard/Dashboard";
import { useState, useEffect } from "react";
import NavBar from "../src/Components/Shared/NavBar/NavBar";
import "bootstrap/dist/css/bootstrap.min.css";
import GraduateRepo from "./GraduateRepo/GraduateRepo";
import Approval from "./Approval/Approval";
import createStore from "react-auth-kit/createStore";
import AuthProvider from "react-auth-kit";
import createRefresh from "react-auth-kit/createRefresh";
import axios from "axios";
import Inbox from "./inbox/inbox";
import Home from "./Home/Home";
import UploadBestPractices from "./BestPractices/UploadBestPractices";
import BestPractices from "./BestPractices/BestPractices";

function App() {
  const [loggedIn, setLoggedIn] = useState(
    () => sessionStorage.getItem("loggedIn") || false
  );
  const [user, setUser] = useState({});

  useEffect(() => {
    // When loggedIn state changes, update sessionStorage
    sessionStorage.setItem("loggedIn", JSON.stringify(loggedIn));
  }, [loggedIn]);

  const handleLogout = () => {
    // Clear local storage
    if (!loggedIn) {
      console.log("Logging out");
      localStorage.clear();
      sessionStorage.clear();
      setUser({});
    }
  };

  const refresh = createRefresh({
    interval: 10,
    refreshApiCallback: async (param) => {
      try {
        const response = await axios.post("/v1/auth/refresh-tokens", param, {
          headers: { Authorization: `Bearer ${param.authToken}` },
        });
        console.log("Refreshing token and details are:" + response.data);
        return {
          isSuccess: true,
          newAuthToken: response.data.token,
          newAuthTokenExpireIn: 10,
          newRefreshTokenExpiresIn: 60,
        };
      } catch (error) {
        console.error(error);
        return {
          isSuccess: false,
        };
      }
    },
  });

  const store = createStore({
    authName: "_auth",
    authType: "cookie",
    cookieDomain: window.location.hostname,
    cookieSecure: window.location.protocol === "http:",
    refresh: refresh,
  });

  return (
    <div>
      <AuthProvider store={store}>
        <BrowserRouter>
          <div className="app-container">
            {loggedIn && (
              <div className="navbar-container">
                <NavBar setLoggedIn={setLoggedIn} />
              </div>
            )}
            <div className="page-container">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route
                  path="/login-signup"
                  element={
                    loggedIn ? (
                      <Navigate to="/" />
                    ) : (
                      <LoginSignup
                        setLoggedIn={setLoggedIn}
                        setUser={setUser}
                      />
                    )
                  }
                />
                <Route
                  path="/academic-repo"
                  element={loggedIn ? <AcademicRepo /> : <Navigate to="/" />}
                />
                <Route path="/registration" element={<Registration />} />
                <Route
                  path="/graduate-repo"
                  element={loggedIn ? <GraduateRepo /> : <Navigate to="/" />}
                />
                <Route
                  path="/upload-document"
                  element={loggedIn ? <UploadDocument /> : <Navigate to="/" />}
                />
                <Route
                  path="/upload-resume"
                  element={loggedIn ? <UploadResume /> : <Navigate to="/" />}
                />
                <Route
                  path="/profile"
                  element={loggedIn ? <Profile /> : <Navigate to="/" />}
                />
                <Route
                  path="/dashboard"
                  element={
                    loggedIn ? <Dashboard user={user} /> : <Navigate to="/" />
                  }
                />
                <Route
                  path="/approvals-inbox"
                  element={loggedIn ? <Approval /> : <Navigate to="/" />}
                />
                <Route
                  path="/inbox"
                  element={loggedIn ? <Inbox /> : <Navigate to="/" />}
                />
                <Route
                  path="/uploadBestPractices"
                  element={
                    loggedIn ? <UploadBestPractices /> : <Navigate to="/" />
                  }
                />

                <Route
                  path="/bestPractices"
                  element={
                    loggedIn ? <BestPractices /> : <Navigate to="/" />
                  }
                />

                <Route
                  path="/logout"
                  element={
                    loggedIn ? (
                      <LoginSignup
                        setLoggedIn={setLoggedIn}
                        setUser={setUser}
                      />
                    ) : (
                      <Navigate to="/" />
                    )
                  }
                />
              </Routes>
            </div>
          </div>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
