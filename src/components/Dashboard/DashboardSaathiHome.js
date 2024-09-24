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

const DashboardSaathiHome = () => {
  const userId = localStorage.getItem("userId");
  const [list, setList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      axios
        .get(
          `https://saathi.etheriumtech.com:444/Saathi/admin-users/${userId}/subscribers/services`
        )
        .then((res) => {
          // Map the data to create a flat structure with services separated by subscriber
          const flattenedData = res.data.flatMap((subscriber) =>
            subscriber.services.map((service) => ({
              subscriberID: subscriber.subscriberID,
              subscriberName: subscriber.subscriberName,
              serviceName: service.serviceName,
              requestedTime: service.requestedTime,
              color: service.color,
              serviceID: service.serviceID,
            }))
          );
          console.log(flattenedData)
          setList(flattenedData);
        })
        .catch((err) => console.log(err));
    };
    fetchData();
  }, [userId]);

  return (
    <div>
      <div className="d-flex">
        <Container className="justify-content-center aligh-items-center mt-5 px-5">
          <Card className="shadow-sm pb-3">
            <Card.Body>
              <div className="d-flex justify-content-center">
                <div className="mt-2">
                  <h4>Service Requests</h4>
                </div>
              </div>
              <hr />
          
          <div className="mb-5 mt-5">
          <Row className="mt-3">
                  {/* Associated Patrons */}
                  <Col md={4} className="d-flex">
                    <Card className="shadow-sm flex-fill">
                      <Card.Body>
                        <Card.Title
                          style={{ fontSize: "16px", fontWeight: "bold" }}
                        >
                          Total Subscribers
                        </Card.Title>
                        <hr />
                        <Card.Text style={{ fontSize: "14px" }}>
                          {/* {patron[0] && (
                            <>
                              <strong>Patron 1:</strong> {patron[0].firstName}{" "}
                              {patron[0].lastName} <br />
                              <strong>Contact No:</strong> {patron[0].contactNo}{" "}
                              <br />
                              <br />
                            </>
                          )}
                          {patron[1] && (
                            <>
                              <strong>Patron 2:</strong> {patron[1].firstName}{" "}
                              {patron[1].lastName} <br />
                              <strong>Contact No:</strong> {patron[1].contactNo}
                            </>
                          )} */}
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
                          Packages Included: 
                        </Card.Title>
                        <hr />
                        <Card.Text style={{ fontSize: "14px" }}>
                          <h5 style={{ fontSize: "16px" }}>
                            
                          </h5>
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
                          Service Requests
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
                                Completed
                                <span
                                  style={{
                                    fontSize: "36px",
                                    marginLeft: "10px",
                                  }}
                                >
                                  0
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
                                Pending
                                <span
                                  style={{
                                    fontSize: "36px",
                                    marginLeft: "10px",
                                    marginRight: "10px",
                                  }}
                                >
                                  10
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

              <div>
                <Table striped bordered className="table-font-size">
                  <thead>
                    <tr className="table-info">
                      <th scope="col">S.No</th>
                      <th scope="col">Subscriber Name</th>
                      <th scope="col">Service Name</th>
                      <th scope="col">Requested Time</th>
                      <th scope="col">Status</th>
                      <th scope="col">Update</th>
                    </tr>
                  </thead>
                  <tbody>
                    {list.length > 0 ? (
                      list.map((item, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{item.subscriberName}</td>
                          <td>{item.serviceName}</td>
                          <td>{`${item.requestedTime}:00`}</td>
                          <td>
                            <span
                              style={{
                                color: item.color === "amber" ? "#FFBF00" : item.color,
                                padding: "5px",
                              }}
                            >
                              Pending
                            </span>
                          </td>
                          <td>
                            <Link
                              to={`/dashboard/serviceTaskList/${item.subscriberID}`}
                              style={{ color: "inherit", textDecoration: "none" }}
                            >
                              <i className="bi bi-pencil-fill edit-btn-color"></i>
                            </Link>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6">No Service Request</td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </div>
            </Card.Body>
          </Card>
        </Container>
      </div>
    </div>
  );
};

export default DashboardSaathiHome;
