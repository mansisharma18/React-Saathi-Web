import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import DashboardLandingPage from "./components/Dashboard/DashboardLandingPage";
import List from "./components/Dashboard/List";
import CreateSaathi from "./components/Dashboard/CreateSaathi";
import MyAccount from "./components/Dashboard/MyAccount";
import ManageUsers from "./components/Dashboard/ManageUsers";
import AssignSaathi from "./components/Dashboard/AssignSaathi";
import SubscribersList from "./components/Dashboard/SubscribersList";
import SaathiList from "./components/Dashboard/SaathiList";
import PatronDetails from "./components/Dashboard/PatronDetails";
import Login from "./components/login/Login";
import TopBar from "./components/Dashboard/TopBar";
import LeftNavigation from "./components/Dashboard/LeftNavigation";
import UpdateAdminUsers from "./components/Dashboard/UpdateAdminUsers";
import SaathiLandingPage from "./components/Dashboard/SaathiLandingPage";
import HomePage from "./components/LandingPage/HomePage";
import UpdateSubscriber from "./components/Dashboard/UpdateSubscriber";

function App() {
  const location = useLocation(); // Get the current location

  // Determine if the current route is the login page
  const isLoginPage = location.pathname === "/";
  const isHomePage=location.pathname ==="/home"

  return (
    <div className="">
      {/* Conditional rendering: only show LeftNavigation and TopBar if not on login page */}
      {(!isLoginPage && !isHomePage) && (
        <div className="d-flex">
          <LeftNavigation />
          <div className="flex-grow-1">
            <TopBar />
            {/* Content area for routes */}
            <div className="content">
              <Routes>
                <Route path="/dashboard" element={<DashboardLandingPage />} />
                <Route path="/saathiDashboard" element={<SaathiLandingPage />} />
                
                <Route path="/list" element={<List />} />
                <Route path="/createSaathi" element={<CreateSaathi />} />
                <Route path="/myAccount" element={<MyAccount />} />
                <Route path="/userRegisteration" element={<ManageUsers />} />
                <Route path="/assignSaathi" element={<AssignSaathi />} />
                <Route path="/subscribers" element={<SubscribersList />} />
                <Route path="/saathis" element={<SaathiList />} />
                <Route path="/patronDetails" element={<PatronDetails />} />
                <Route path="/updateAdminUsers/:id" element={<UpdateAdminUsers />} />
                <Route path="/updateSubscriber/:id" element={<UpdateSubscriber />} />
              </Routes>
            </div>
          </div>
        </div>
      )}

      {/* Render the Login page when on the login route */}
      {isLoginPage && (
        <Routes>
          <Route path="/" element={<Login />} />
        </Routes>
      )}

{isHomePage && (
        <Routes>
          <Route path="/home" element={<HomePage />} />
        </Routes>
      )}
    </div>
  );
}

// Wrap App with Router so we can use useLocation hook in App component
function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;
