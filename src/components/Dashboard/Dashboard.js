import React from 'react'
import LeftNavigation from './LeftNavigation'
import TopBar from './TopBar'
import DashboardLandingPage from './DashboardLandingPage'
import { BrowserRouter as Router, Route, Routes, BrowserRouter, useLocation } from 'react-router-dom';
import CreateSaathi from './CreateSaathi';
import List from './List';
import MyAccount from './MyAccount';
import ManageUsers from './ManageUsers';
import PatronDetails from './PatronDetails';
import AssignSaathi from './AssignSaathi';
import SubscribersList from './SubscribersList';
import SaathiList from './SaathiList';


const Dashboard = () => {

  const location = useLocation(); // Get the current location
  
  const user = localStorage.getItem('userType');

  // Check if the current path is "/login"
  const isLoginPage = location.pathname === '/login';
  
  return (
    <div>

{!isLoginPage && (
  
      <div className="d-flex">
      <LeftNavigation />
      <div className="flex-grow-1">
        <TopBar />
        {/* Add your page content here */}
        <div className=" content">
        <Routes>
      <Route path="/dashboard" element={<DashboardLandingPage/>}/>
      <Route path="/list" element={<List/>}/>
      
      <Route path="/createSaathi" element={<CreateSaathi/>}/>
      <Route path="/myAccount" element={<MyAccount/>}/>
      <Route path="/userRegisteration" element={<ManageUsers/>}/>
      <Route path="/assignSaathi" element={<AssignSaathi/>}/>
      <Route path="/subscribers" element={<SubscribersList/>}/>
      <Route path="/saathis" element={<SaathiList/>}/>
      <Route path="/patronDetails" element={<PatronDetails/>}/>

      </Routes>
        </div>
      

       

        


      </div>
    </div>
      
      
      
)}
    </div>
  )
}

export default Dashboard