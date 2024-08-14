import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { Avatar } from '@mui/material';




const TopBar = () => {


  return (
    <div>
      <nav className="navbar  navbar-expand-lg bg-body-light sticky-top" id="navbar" style={{ position: "sticky", top: "0" }}>
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
                      <div className="col-md-12 mt-2 ml-3">
                        <div className="input-group">

                          <input type="text" className="form-control" placeholder="Search " aria-label="" aria-describedby="basic-addon1" />
                          <span className="input-group-text" id="basic-addon1">
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
                    <div className="dropstart" style={{ width: "fit-content" }}>
                      <Link className="nav-link" role="button" data-bs-toggle="dropdown" data-bs-display="static" aria-expanded="false" to="#">
                        {/* <span className="ms-2" style={{ fontSize: "20px" }}>
                        <i className="bi bi-bell-fill"  ></i>
                        
                        </span> */}

<Avatar sx={{backgroundColor:'#F8F8F8',width:"30px",height:"30px"}}>
                                   <span style={{color:"black", fontSize: "20px"}}> N </span>
                                    </Avatar>
                          </Link>
                      <ul className="dropdown-menu">


                   
                      </ul>

                    </div>

                  </li>
                  <li className="nav-item " style={{ marginRight: "20px" }}>
                    <Link className="nav-link" to="#">
                        
                    <Avatar sx={{backgroundColor:'#F8F8F8',width:"30px",height:"30px"}}>
                                   <span style={{color:"black", fontSize: "20px"}}> M </span>
                                    </Avatar>
                      </Link>
                  </li>
                  <li className="nav-item d-lg-block d-sm-none d-md-none">
                    {/* <Link className="nav-link" to="/profile"> */}


                    <div className="dropstart">
                     
                      <ul className="dropdown-menu px-1">

                        <li>
                          <div className="d-flex bg-light px-1">
                            <div><img src="../images/ellipse1.png" alt="avatar" style={{ width: "30px", height: "30px" }} /></div>
                            <div className="ms-2">
                              <div className="row"><span className="fw-bold">John Doe</span></div>
                              <div className="row"><span style={{ fontSize: "12px" }} >johndoe@gmail.com</span></div>
                              <div className="row" style={{ color: "#3347B0" }}><span style={{ fontSize: "12px" }}>+91 9876543256</span></div>
                            </div>
                          </div>

                        </li>

                        <li>
                          <div className="d-flex align-items-center mt-2 ms-1 ">
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


                  </li>




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