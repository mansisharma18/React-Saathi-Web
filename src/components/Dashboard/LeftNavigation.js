import React ,{useState} from 'react'
import { Link ,useLocation} from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import { Accordion, Nav } from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import PeopleIcon from '@mui/icons-material/People';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { useNavigate } from "react-router-dom";
import LogoutIcon from '@mui/icons-material/Logout';





const LeftNavigation = () => {

  const navigate = useNavigate();
  const location = useLocation(); 
  
  const user = localStorage.getItem('userType');
  console.log("user",user)

  const handleLogout = () => {
    // Clear the user session data from localStorage
    localStorage.removeItem("userType");
    localStorage.removeItem("userId");

    // Redirect to the login page
    navigate("/");
  };

 
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

<Navbar className="leftside" collapseOnSelect expand="lg" style={{ position: "fixed",top:0 }}>
      <Container className="d-flex flex-column " >
        <Navbar.Brand href="/" className="brandMobile">Saathi</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav" style={{ width: "100%" }}>
          <Nav className="me-auto flex-column mt-3 leftNavbar">
            {user=='Admin' && (
              <>
                <Nav.Link href="/dashboard"  className="nav-link"><HomeIcon  className="me-2"/><span>Home</span></Nav.Link>
                {/* <Nav.Link href="/list"  className="nav-link"><PeopleIcon className="me-2"/>My Subscribers</Nav.Link> */}


                <Accordion flush>
            <Accordion.Item eventKey="0">
              <Accordion.Header className="accordion-head">
              <Nav.Link as="div" className="nav-link">
                <ManageAccountsIcon className="me-2" />
                <span>Manage Accounts</span>
              </Nav.Link>
              </Accordion.Header>
              <Accordion.Body>
              <Nav.Link href="/userRegisteration"  className="nav-link"><ManageAccountsIcon className="me-2"/>User Registration</Nav.Link>
              <Nav.Link href="/assignSaathi"  className="nav-link"><AdminPanelSettingsIcon className="me-2"/>Assign a Saathi</Nav.Link>
              <Nav.Link href="/myAccount"  className="nav-link"><AccountCircleIcon className="me-2"/>Manage Users</Nav.Link>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>






          <Accordion flush>
            <Accordion.Item eventKey="0">
              <Accordion.Header className="accordion-head">
              <Nav.Link as="div" className="nav-link">
                <ManageAccountsIcon className="me-2" />
                <span>Packages & Services</span>
                </Nav.Link>
              </Accordion.Header>
              <Accordion.Body>
              <Nav.Link href="/createPackage"  className="nav-link"><ManageAccountsIcon className="me-2"/>Create New Package</Nav.Link>
              <Nav.Link href="/createService"  className="nav-link"><AdminPanelSettingsIcon className="me-2"/>Create New Service</Nav.Link>
              <Nav.Link href="/packages"  className="nav-link"><AccountCircleIcon className="me-2"/>Packages</Nav.Link>
              <Nav.Link href="/services"  className="nav-link"><AccountCircleIcon className="me-2"/>Services</Nav.Link>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>


          


               
               
               
                <Nav.Link href="/subscribers"  className="nav-link"><PeopleIcon className="me-2"/> Subscribers</Nav.Link>
                <Nav.Link href="/saathis"  className="nav-link"><PeopleIcon className="me-2"/> Saathis</Nav.Link>
                <Nav.Link onClick={handleLogout}  className=""><LogoutIcon className="me-2"/>Logout</Nav.Link>

              
               
                {/* <Nav.Link href="/patronDetails"  className="nav-link"><ManageAccountsIcon className="me-2"/>Subscriber Registration</Nav.Link> */}
                </>
            )}

            {user=='Saathi' &&(
              <>
            

              <Nav.Link href="/saathiDashboard"  className="nav-link"><HomeIcon  className="me-2"/><span>Home</span></Nav.Link>
            {/* <Nav.Link href="/list"  className="nav-link"><PeopleIcon className="me-2"/>My Subscribers</Nav.Link> */}
           
            {/* <Nav.Link href="/userRegisteration"  className="nav-link"><ManageAccountsIcon className="me-2"/>User Registration</Nav.Link>
            <Nav.Link href="/assignSaathi"  className="nav-link"><AdminPanelSettingsIcon className="me-2"/>Assign a Saathi</Nav.Link> */}
            {/* <Nav.Link href="/subscribers"  className="nav-link"><PeopleIcon className="me-2"/> Subscribers</Nav.Link>
            <Nav.Link href="/saathis"  className="nav-link"><PeopleIcon className="me-2"/> Saathis</Nav.Link>
            <Nav.Link href="/myAccount"  className="nav-link"><AccountCircleIcon className="me-2"/>Manage Users</Nav.Link> */}




{/*            
            <Nav.Link href="/subscriberRegisteration"  className="nav-link"><ManageAccountsIcon className="me-2"/>Subscriber Registration</Nav.Link>
            <Nav.Link href="/patronDetails"  className="nav-link"><ManageAccountsIcon className="me-2"/>Patron Registration</Nav.Link>
           
            <Nav.Link href="/list"  className="nav-link"><AccountCircleIcon className="me-2"/>Subscribers</Nav.Link> */}



             {/* Main Link with Accordion for Submenu */}
          <Accordion flush>
            <Accordion.Item eventKey="0">
              <Accordion.Header className="accordion-head">
              <Nav.Link as="div" className="nav-link">
                <ManageAccountsIcon className="me-2" />
                <span>Manage Accounts</span>
                </Nav.Link>
              </Accordion.Header>
              <Accordion.Body>
                <Nav.Link href="/subscriberRegisteration" className="nav-link">
                  Subscriber Registration
                </Nav.Link>
                <Nav.Link href="/patronDetails" className="nav-link">
                  Patron Registration
                </Nav.Link>
                <Nav.Link href="/list" className="nav-link">
                  Manage Users
                </Nav.Link>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>


          <Nav.Link href="/services"  className="nav-link"><ManageAccountsIcon className="me-2"/>Services</Nav.Link>

          <Nav.Link onClick={handleLogout}  className=""><LogoutIcon className="me-2"/>Logout</Nav.Link>



            
            </>)}
            
          
          
        
          </Nav>
        
        </Navbar.Collapse>
      </Container>
    </Navbar>
      <br />
    
    </div>
  )
}

export default LeftNavigation
