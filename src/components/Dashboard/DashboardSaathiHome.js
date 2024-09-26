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

const DashboardSaathiHome = () => {
  const userId = localStorage.getItem("userId");
  const [list, setList] = useState([]);
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });

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
          console.log(flattenedData);
          setList(flattenedData);
        })
        .catch((err) => console.log(err));
    };
    fetchData();
  }, [userId]);

  const sortList = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });

    const sortedList = [...list].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === "ascending" ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === "ascending" ? 1 : -1;
      }
      return 0;
    });
    setList(sortedList);
  };

  // Function to highlight the active sort direction
  const getArrowStyle = (key, direction) => {
    return sortConfig.key === key && sortConfig.direction === direction
      ? { fontWeight: "bold", color: "blue" }
      : {};
  };

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
                         Subscribers
                        </Card.Title>
                        <hr />
                        <Card.Text style={{ fontSize: "14px" }}>
                          <div>
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
                          ..
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
                          Pending Requests
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

              <div>
                <Table striped bordered className="table-font-size">
                  <thead>
                    <tr className="table-info">
                      <th scope="col" style={{ verticalAlign: 'middle' }}>S.No</th>
                      {/* <th scope="col">Subscriber Name</th> */}
                      <th scope="col" style={{ verticalAlign: 'middle' }}>
                        Subscriber Name
                        <span style={{ cursor: "pointer" }}>
                          <ArrowDropUpIcon
                            onClick={() =>
                              sortList("subscriberName", "ascending")
                            }
                            style={{
                              ...getArrowStyle("subscriberName", "ascending"),
                              marginRight: "-10px",
                            }}
                          />
                          <ArrowDropDownIcon
                            onClick={() =>
                              sortList("subscriberName", "descending")
                            }
                            style={{
                              ...getArrowStyle("subscriberName", "descending"),
                            }}
                          />
                        </span>
                      </th>
                      <th scope="col" style={{ verticalAlign: 'middle' }}>Service Name</th>
                      {/* <th scope="col">Requested Time</th> */}
                      <th
                        scope="col"
                        style={{ verticalAlign: 'middle' }}
                      >
                        Requested Time
                        <span style={{ cursor: "pointer" }}>
                          <ArrowDropUpIcon
                            onClick={() =>
                              sortList("requestedTime", "ascending")
                            }
                            style={{
                              ...getArrowStyle("requestedTime", "ascending"),
                              marginRight: "-10px",
                            }}
                          />
                          <ArrowDropDownIcon
                            onClick={() =>
                              sortList("requestedTime", "descending")
                            }
                            style={{
                              ...getArrowStyle("requestedTime", "descending"),
                            }}
                          />
                        </span>
                      </th>
                      <th scope="col" style={{ verticalAlign: 'middle' }}>Status</th>
                      <th scope="col" style={{ verticalAlign: 'middle' }}>Update</th>
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
                                color:
                                  item.color === "amber"
                                    ? "#FFBF00"
                                    : item.color,
                                padding: "5px",
                              }}
                            >
                              Pending
                            </span>
                          </td>
                          <td>
                            <Link
                              to={`/dashboard/serviceTaskList/${item.subscriberID}`}
                              style={{
                                color: "inherit",
                                textDecoration: "none",
                              }}
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
