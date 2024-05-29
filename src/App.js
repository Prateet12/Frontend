import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import LoginSignup from "./LoginSignup/LoginSignup";
import AcademicRepo from "./AcademicRepo/AcademicRepo";
import UploadDocument from "./UploadDocument/UploadDocument";
import Registration from "./Registration/Registration";
import Dashboard from "./Dashboard/Dashboard";
import { useState, useEffect } from "react";
import NavBar from "../src/Components/Shared/NavBar/NavBar";
import "bootstrap/dist/css/bootstrap.min.css";
import GraduateRepo from "./GraduateRepo/GraduateRepo";
import { BASE_URL } from "./utils/baseUrl";
import Approval from "./Approval/Approval";
import createStore from "react-auth-kit/createStore";
import AuthProvider from "react-auth-kit";
import createRefresh from "react-auth-kit/createRefresh";
import axios from "axios";
import Inbox from "./inbox/inbox";

function App() {
  const [loggedIn, setLoggedIn] = useState(
    () => JSON.parse(localStorage.getItem("loggedIn")) || false
  );
  const [user, setUser] = useState({});
  const [currRole, setCurrRole] = useState({});

  const refresh = createRefresh({
    interval: 10, // The time in sec to refresh the Access token,
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
    cookieSecure: window.location.protocol === "http:", // TODO(team): check this
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
                <Route
                  path="/"
                  element={
                    <LoginSignup
                      setLoggedIn={setLoggedIn}
                      setUser={setUser}
                      setCurrRole={setCurrRole}
                    />
                  }
                />
                <Route path="/academic-repo" element={<AcademicRepo />} />
                <Route
                  path="/registration"
                  element={
                    <Registration
                      setLoggedIn={setLoggedIn}
                      setUser={setUser}
                      setCurrRole={setCurrRole}
                    />
                  }
                />
                <Route path="/graduate-repo" element={<GraduateRepo />} />
                <Route path="/upload-document" element={<UploadDocument />} />
                <Route path="/dashboard" element={<Dashboard user={user} />} />
                <Route path="/approvals-inbox" element={<Approval />} />
                <Route path="/inbox" element={<Inbox />} />
                <Route
                  path="/logout"
                  element={
                    <LoginSignup setLoggedIn={setLoggedIn} setUser={setUser} />
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
