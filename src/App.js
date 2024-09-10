import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';
import DashboardLandingPage from './components/Dashboard/DashboardLandingPage';
import List from './components/Dashboard/List';
import CreateSaathi from './components/Dashboard/CreateSaathi';
import MyAccount from './components/Dashboard/MyAccount';
import ManageUsers from './components/Dashboard/ManageUsers';
import AssignSaathi from './components/Dashboard/AssignSaathi';
import SubscribersList from './components/Dashboard/SubscribersList';
import SaathiList from './components/Dashboard/SaathiList';
import PatronDetails from './components/Dashboard/PatronDetails';
import Login from './components/login/Login';
import SaathiLandingPage from './components/Dashboard/SaathiLandingPage';
import UpdateAdminUsers from './components/Dashboard/UpdateAdminUsers';
import UpdateSubscriber from './components/Dashboard/UpdateSubscriber';
import UpdateAdminSubscriber from './components/Dashboard/UpdateAdminSubscriber';
import SubscriberRegisteration from './components/Dashboard/SubscriberRegisteration';
import HomePage from './components/LandingPage/HomePage';

function App() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/';
  const isHomePage = location.pathname === '/home';

  return (
    <div className="">
      <Routes>
        {/* Route for Login Page */}
        <Route path="/" element={<Login />} />

        {/* Route for Home Page */}
        <Route path="/home" element={<HomePage />} />

        {/* Dashboard layout route */}
        <Route path="/dashboard" element={<Dashboard />}>
          <Route index element={<DashboardLandingPage />} />
          <Route path="list" element={<List />} />
          <Route path="create" element={<CreateSaathi />} />
          <Route path="myAccount" element={<MyAccount />} />
          <Route path="userRegisteration" element={<ManageUsers />} />
          <Route path="assignSaathi" element={<AssignSaathi />} />
          <Route path="subscribers" element={<SubscribersList />} />
          <Route path="saathis" element={<SaathiList />} />
          <Route path="patronDetails" element={<PatronDetails />} />
          <Route path="updateAdminUsers/:id" element={<UpdateAdminUsers />} />
          <Route path="updateSubscriber/:id" element={<UpdateSubscriber />} />
          <Route path="updateAdminSubscriber/:id" element={<UpdateAdminSubscriber />} />
          <Route path="subscriberRegisteration" element={<SubscriberRegisteration />} />
          <Route path="saathiDashboard" element={<SaathiLandingPage />} />
        </Route>
      </Routes>
    </div>
  );
}

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;
