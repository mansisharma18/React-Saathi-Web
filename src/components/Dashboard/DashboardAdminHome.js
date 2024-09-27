import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Modal,
  Form,
  Table,
} from "react-bootstrap";
import { KeyboardArrowUp, KeyboardArrowDown } from "@mui/icons-material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";

const DashboardAdminHome = () => {
  const userId = localStorage.getItem("userId");

  return (
    <div>
        <div className="d-flex">
        <Container className="justify-content-center aligh-items-center mt-5 px-5">
          <Card className="shadow-sm pb-3">
            <Card.Body>
              <div className="d-flex justify-content-center">
                <div className="mt-2">
                  {/* <h4>Service Requests</h4> */}
                </div>
              </div>
              {/* <hr /> */}

              <div className="mb-5 mt-5">
                <Row className="mt-3">
                  {/* Associated Patrons */}
                  <Col md={4} className="d-flex">
                    <Card className="shadow-sm flex-fill">
                      <Card.Body>
                        <Card.Title
                          style={{ fontSize: "16px", fontWeight: "bold" }}
                        >
                         User Stats
                        </Card.Title>
                        {/* registered users and subscribers */}
                        <hr />
                        <Card.Text style={{ fontSize: "14px" }}>
                          <div>
                            <p
                              className="text-center"
                              style={{
                                fontSize: "14px",
                                fontWeight: "bold",
                                color: "green",
                              }}
                            >
                          
                              <span
                                style={{
                                  fontSize: "36px",
                                  marginLeft: "10px",
                                }}
                              >
                                4
                              </span>
                            </p>
                          </div>
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>

                  {/* Package Details */}
                  <Col md={4} className="d-flex">
                    <Card className="shadow-sm flex-fill">
                      <Card.Body>
                        <Card.Title
                          style={{ fontSize: "16px", fontWeight: "bold" }}
                        >
                          Saathis Stats
                        </Card.Title>
                        <hr />
                        <Card.Text style={{ fontSize: "14px" }}>
                          <h5 style={{ fontSize: "16px" }}></h5>
                          {/* <ul style={{ paddingLeft: "20px", fontSize: "14px" }}>
                            {packageDetails?.packageServices?.map(
                              (service, index) => (
                                <li
                                  key={index}
                                  style={{ marginBottom: "10px" }}
                                >
                                  <strong>{service.serviceName}</strong>
                                  {service.description}
                                </li>
                              )
                            )}
                          </ul> */}
                          {/* total no of saathi */}
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>

                  {/* Empty Column with Same Height */}
                  <Col md={4} className="d-flex">
                    <Card className="shadow-sm flex-fill">
                      <Card.Body>
                        <Card.Title
                          style={{ fontSize: "16px", fontWeight: "bold" }}
                        >
                         Subscribers /and Packages
                        </Card.Title>
                        <hr />
                        <Card.Text>
                          <div className="d-flex justify-content-between">
                            <div>
                              {/* Completed Top Left */}
                              <p
                                style={{
                                  fontSize: "14px",
                                  fontWeight: "bold",
                                  color: "green",
                                }}
                              >
                              
                                <span
                                  style={{
                                    fontSize: "36px",
                                    marginLeft: "10px",
                                  }}
                                >
                                  
                                </span>
                              </p>
                            </div>
                            <div>
                              {/* Pending Bottom Right */}
                              <p
                                style={{
                                  fontSize: "14px",
                                  fontWeight: "bold",
                                  color: "red",
                                  textAlign: "right",
                                  position: "absolute",
                                  bottom: 0,
                                  right: 0,
                                }}
                              >
                                
                                <span
                                  className="text-center"
                                  style={{
                                    fontSize: "36px",
                                    marginLeft: "10px",
                                    marginRight: "10px",
                                  }}
                                >
                                  9
                                </span>
                              </p>
                            </div>
                          </div>
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              </div>

              <div className="mb-5 mt-5">
                <Row className="mt-3">
                  {/* Associated Patrons */}
                  <Col md={4} className="d-flex">
                    <Card className="shadow-sm flex-fill">
                      <Card.Body>
                        <Card.Title
                          style={{ fontSize: "16px", fontWeight: "bold" }}
                        >
                         Package Services
                        </Card.Title>
                        <hr />
                        <Card.Text style={{ fontSize: "14px" }}>
                          <div>
                            <p
                            className="text-center"
                              style={{
                                fontSize: "14px",
                                fontWeight: "bold",
                                color: "green",
                              }}
                            >
                          
                              <span
                                style={{
                                  fontSize: "36px",
                                  marginLeft: "10px",
                                }}
                              >
                                4
                              </span>
                            </p>
                          </div>
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>

                  {/* Package Details */}
                  

                  {/* Empty Column with Same Height */}
                  <Col md={4} className="d-flex">
                    <Card className="shadow-sm flex-fill">
                      <Card.Body>
                        <Card.Title
                          style={{ fontSize: "16px", fontWeight: "bold" }}
                        >
                          Ala-Carte Services
                        </Card.Title>
                        <hr />
                        <Card.Text>
                          <div className="d-flex justify-content-between">
                            <div>
                              {/* Completed Top Left */}
                              <p
                                className="text-center"
                                style={{
                                  fontSize: "14px",
                                  fontWeight: "bold",
                                  color: "green",
                                }}
                              >
                              
                                <span
                                  style={{
                                    fontSize: "36px",
                                    marginLeft: "10px",
                                  }}
                                >
                                  
                                </span>
                              </p>
                            </div>
                            <div>
                              {/* Pending Bottom Right */}
                              <p
                                style={{
                                  fontSize: "14px",
                                  fontWeight: "bold",
                                  color: "red",
                                  textAlign: "right",
                                  position: "absolute",
                                  bottom: 0,
                                  right: 0,
                                }}
                              >
                                
                                <span
                                  style={{
                                    fontSize: "36px",
                                    marginLeft: "10px",
                                    marginRight: "10px",
                                  }}
                                >
                                  9
                                </span>
                              </p>
                            </div>
                          </div>
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              </div>

            
            </Card.Body>
          </Card>
        </Container>
      </div>
    </div>
  )
}

export default DashboardAdminHome