import React from 'react'
import LeftNavigation from './LeftNavigation'
import TopBar from './TopBar'
import DashboardLandingPage from './DashboardLandingPage'
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom';
import CreateSaathi from './CreateSaathi';
import List from './List';
import MyAccount from './MyAccount';
import ManageUsers from './ManageUsers';
import PatronDetails from './PatronDetails';


const Dashboard = () => {
  return (
    <div>
  <BrowserRouter>
      <div className="d-flex">
      <LeftNavigation />
      <div className="flex-grow-1">
        <TopBar />
        {/* Add your page content here */}
        <div className=" content">
        <Routes>
      <Route path="/" element={<DashboardLandingPage/>}/>
      <Route path="/list" element={<List/>}/>
      
      <Route path="/createSaathi" element={<CreateSaathi/>}/>
      <Route path="/myAccount" element={<MyAccount/>}/>
      <Route path="/manageUsers" element={<ManageUsers/>}/>
      <Route path="/manageUsers" element={<ManageUsers/>}/>
      <Route path="/patronDetails" element={<PatronDetails/>}/>

      </Routes>
        </div>
      

       

        


      </div>
    </div>
      
      
      </BrowserRouter>

    </div>
  )
}

export default Dashboard