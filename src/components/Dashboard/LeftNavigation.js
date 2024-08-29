import React ,{useState} from 'react'
import { Link } from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import PeopleIcon from '@mui/icons-material/People';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';




const LeftNavigation = () => {

 
  return (
    <div className="leftbar">
       {/* <Navbar data-bs-theme="dark"> 
        <Container className="d-flex flex-column">
          <Navbar.Brand href="#home">Saathi</Navbar.Brand>
          <Nav className="me-auto flex-column">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/list">Saathi List</Nav.Link>
            <Nav.Link href="/createSaathi">Create Saathi</Nav.Link>
          </Nav>
        </Container>
      </Navbar> */}

<Navbar className="leftside" collapseOnSelect expand="lg" style={{ position: "relative" }}>
      <Container className="d-flex flex-column " >
        <Navbar.Brand href="/" className="brandMobile">Saathi</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav" style={{ width: "100%" }}>
          <Nav className="me-auto flex-column mt-3 leftNavbar">
            <Nav.Link href="/"  className="nav-link"><HomeIcon  className="me-2"/><span>Home</span></Nav.Link>
            <Nav.Link href="/list"  className="nav-link"><PeopleIcon className="me-2"/>My Subscribers</Nav.Link>
            <Nav.Link href="/myAccount"  className="nav-link"><AccountCircleIcon className="me-2"/>My Account</Nav.Link>
            <Nav.Link href="/assignSaathi"  className="nav-link"><AdminPanelSettingsIcon className="me-2"/>Assign a Saathi</Nav.Link>
            <Nav.Link href="/manageUsers"  className="nav-link"><ManageAccountsIcon className="me-2"/>Manage Users</Nav.Link>
            <Nav.Link href="/patronDetails"  className="nav-link"><ManageAccountsIcon className="me-2"/>Patron Details</Nav.Link>

          
          
        
          </Nav>
        
        </Navbar.Collapse>
      </Container>
    </Navbar>
      <br />
    
    </div>
  )
}

export default LeftNavigation
