import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react';
import Button from 'react-bootstrap/Button'
import Avatar from '@mui/material/Avatar';
import avimg from '../../assets/images/download.png'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate } from "react-router-dom";




const TopBar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear the user session data from localStorage
    localStorage.removeItem("userType");
    localStorage.removeItem("userId");

    // Redirect to the login page
    navigate("/");
  };


  return (
    <div className="">
      <nav className="navbar topbar navbar-expand bg-body-light sticky-top" id="navbar" style={{ width:"100%",position: "sticky", top: "0",height:"69px" }}>
        <div className="container-fluid">
          <div className="d-flex justify-content-end justify-content-right">





            <div className="nav-item d-md-block me-auto d-sm-block d-lg-none ">
              {/* <Link className="nav-link" to="/profile"> */}


              <div className="dropstart ">
              
                <ul className="dropdown-menu">

                  <li>
                    <div className="d-flex bg-light">
                      <div><img src="#" alt="avatar" style={{ width: "30px", height: "30px" }} /></div>
                      <div className="ms-2">
                        <div className="row"><span className="fw-bold">John Doe</span></div>
                        <div className="row"><span style={{ fontSize: "12px" }} >johndoe@gmail.com</span></div>
                        <div className="row" style={{ color: "#3347B0" }}><span style={{ fontSize: "12px" }}>+91 9876543256</span></div>
                      </div>
                    </div>

                  </li>

                  <li>
                    <div className="d-flex align-items-center mt-2 ms-1">
                      <i className="bi bi-person"></i>
                      <Link className="dropdown-item" to="/profile">View Profile</Link>
                    </div>
                  </li>
                  <li>
                    <div className="d-flex align-items-center ms-1">
                      <i className="bi bi-file-bar-graph"></i>
                      <Link className="dropdown-item" to="#">Dashboard</Link>
                    </div>
                  </li>
                  <li>
                    <div className="d-flex align-items-center ms-1">
                      <i className="bi bi-file-lock"></i>
                      <Link className="dropdown-item" href="#">Change Password</Link>
                    </div>
                  </li>
                  <li>
                    <div className="d-flex align-items-center ms-1">
                      <i className="bi bi-box-arrow-in-right"></i>
                      <Link className="dropdown-item" href="#">Logout</Link>
                    </div>
                  </li>

                </ul>
              </div>


            </div>

            <div > <button style={{ border: "none" }} className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#navbarOffcanvasLg" aria-controls="sidebarOffcanvasLg" aria-label="Toggle navigation">
              <span style={{ fontSize: "18px" }}>S</span>
            </button> </div>











          </div>


          <div className="offcanvas offcanvas-end" tabindex="-1" id="navbarOffcanvasLg" aria-labelledby="navbarOffcanvasLgLabel">
            <div className="offcanvas-header">
              <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
                <Link className="navbar-brand" to="/">
                I
                </Link>
              </h5>
              <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div className="offcanvas-body">
              <ul className="navbar-nav me-auto d-flex flex-row flex-sm-row ">
                <li className="nav-item search" >
                  <form>
                    <div className="row">
                      <div className="col-md-12 mt-1 ml-3" style={{width:"250px"}}>

                      <div className="search-bar-container" style={{ position: 'relative', display: 'inline-block', width: '100%' }}>
  <input
    type="text"
    className="form-control"
    placeholder="Search For..."
    aria-label="Search For..."
    style={{ borderRadius: '23px', padding: '5px',fontSize:"12px",marginTop:"2px" }} // Extra padding for the icon space
  />
  <span
    className="search-icon"
    style={{
      position: 'absolute',
      right: '10px',  // Position from the right side
      top: '50%',
      transform: 'translateY(-50%)',
      color: '#999',
      cursor: 'pointer',
    }}
  >
    <i className="bi bi-search"></i>
  </span>
</div>




                      </div>
                    </div>
                  </form>
                </li>

              </ul>
              <span className="nav-item ">
                <ul className="navbar-nav me-auto ">

                  <li className="nav-item" style={{ marginRight: "20px" }}>
                    <div>
                     
                        <span className="ms-2" style={{ fontSize: "20px",color:"white" }}>
                        <i className="bi bi-bell-fill"  ></i>
                        
                        </span>


                  

                    </div>

                  </li>
                  <li className="nav-item " style={{ marginRight: "20px" }}>
                 
                  <div>
                     
                        <span className="ms-2" style={{ fontSize: "20px",color:"white" }}>
                        <i class="bi bi-envelope-fill"></i>
                        
                        </span>


                  

                    </div>
                  </li>
              

                  <li className="nav-item " style={{ marginRight: "20px" }}>
                 
                 <div>
                    
                 <Avatar alt="Remy Sharp" src={avimg}
                  sx={{ width: 34, height: 34 }} />


                 

                   </div>
                 </li>

                 {/* <li className="nav-item " style={{ marginRight: "20px" }}>
                 
                 <div>
                    
              <button onClick={handleLogout}>Logout</button>


                 

                   </div>
                 </li> */}




                </ul>


              </span>

            </div>
          </div>


        </div>
      </nav>



    </div>
  )
}

export default TopBar