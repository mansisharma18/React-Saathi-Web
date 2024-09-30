import React, { useEffect, useState } from "react";
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
import { useParams } from "react-router-dom";
import { baseUrl } from "../../ApiPath";

function ServiceTaskList() {
  const [subscriber, setSubscriber] = useState(null);
  const [subId, setSubId] = useState(0);
  const [patron, setPatron] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [requests, setRequests] = useState(null);
  const [packageDetails, setPackageDetail] = useState(null);
  const [alert, setAlert] = useState();
  const [completedRequest, setCompletedRequest] = useState([]);
  const [pendingRequest, setPendingRequest] = useState([]);
  const userId = localStorage.getItem("userId");
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      setSubId(id);
    }
  }, [id]);

  // Function to fetch subscriber list
  const fetchSubscribers = async () => {
    try {
      const response = await fetch(
        `${baseUrl}/admin-users/${userId}/subscribers`
      );
      const json = await response.json();
      setSubscriber(json);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchSubscribers();
  }, []);

  // Fetch selected subscriber's details and patrons
  const fetchSubscriberDetails = async () => {
    try {
      const response = await fetch(
        `${baseUrl}/subscribers/${subId}`
      );
      const json = await response.json();
      setPackageDetail(json);
      setPatron(json.patrons); // Patrons are set here
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (subId !== 0) {
      fetchSubscriberDetails();
    }
  }, [subId]);

  // Fetch requests
  const fetchRequests = async () => {
    if (subId !== 0) {
      const response = await fetch(
        `${baseUrl}/subscribers/${subId}/services`
      );
      const json = await response.json();

      // Update logic for completedRequest
      const completedRequest = json.filter((item) => item.completions > 0);
      setCompletedRequest(completedRequest);

      // Update logic for pendingRequest
      const pendingRequest = json.filter((item) => item.pending > 0);
      setPendingRequest(pendingRequest);

      setRequests(json);
    }
  };

  useEffect(() => {
    if (subId !== 0) {
      fetchRequests();
    }
  }, [subId]);

  const [selectedRequest, setSelectedRequest] = useState(null);
  const [completionData, setCompletionData] = useState({
    notes: "",
    screenshot: null,
  });
  const [serviceNameSelected, setServiceNameSelected] = useState("");

  const handleShowModal = (task) => {
    setSelectedRequest(task);
    setServiceNameSelected(task.serviceName);
    setShowModal(true);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setCompletionData({
      ...completionData,
      [name]: files ? files[0] : value,
    });
  };

  // Handle form submission and refresh data
  const handleSubmit = async () => {
    if (!selectedRequest) return;

    const formData = new FormData();
    formData.append("description", completionData.notes);
    if (completionData.screenshot) {
      formData.append("image", completionData.screenshot);
    }

    if (selectedRequest.alaCarte) {
      formData.append("isAlaCarte", true);
      formData.append(
        "subscriberAlaCarteServicesID",
        selectedRequest.subscriberAlaCarteServicesID
      );
    } else {
      formData.append("isAlaCarte", false);
    }
    console.log("formData", formData);

    try {
      const response = await fetch(
        `${baseUrl}/subscribers/${subId}/services/${selectedRequest.serviceID}/complete`,
        {
          method: "POST",
          body: formData,
        }
      );
      if (response.ok) {
        setAlert(`Task completed for ${selectedRequest.serviceName}`);
        fetchRequests();
      } else {
        setAlert(`Failed to update task for ${selectedRequest.serviceName}`);
      }
    } catch (error) {
      console.error("Error submitting task update:", error);
      setAlert(`Error updating task for ${selectedRequest.serviceName}`);
    }

    setTimeout(() => setAlert(""), 3000);
    handleCloseModal();
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedRequest(null);
    setCompletionData({
      notes: "",
      screenshot: null,
    });
  };

  const totalPending = requests?.reduce((sum, item) => sum + item.pending, 0);
  const totalCompleted = requests?.reduce(
    (sum, item) => sum + item.completions,
    0
  );

  return (
    <div className="d-flex">
      <Container className="justify-content-center align-items-center mt-5 px-5">
        <Card className="shadow-sm pb-3">
          <Card.Body>
            <div className="d-flex justify-content-center">
              <div className="mt-2">
                <h4 className="heading-color">To Do List</h4>
              </div>
            </div>
            <hr />
            <Row>
              <Col md={4}>
                <Form.Label style={{ fontSize: "14px" }}>
                  Select a Subscriber
                </Form.Label>
                <Form.Select
                  aria-label="Select Subscriber"
                  value={subId}
                  style={{ fontSize: "14px" }}
                  onChange={(event) => setSubId(event.target.value)}
                >
                  <option value="">Select Subscriber</option>
                  {subscriber?.map((sub) => (
                    <option key={sub.subscriberID} value={sub.subscriberID}>
                      {sub.firstName} {sub.lastName}
                    </option>
                  ))}
                </Form.Select>
              </Col>
            </Row>

            {subId !== 0 && patron && (
              <>
                <Row className="mt-3">
                  <Col md={4} className="d-flex">
                    <Card className="shadow-sm flex-fill">
                      <Card.Body>
                        <Card.Title
                          style={{ fontSize: "16px", fontWeight: "bold" }}
                        >
                          Associated Patrons
                        </Card.Title>
                        <hr />
                        <Card.Text style={{ fontSize: "14px" }}>
                          {patron[0] && (
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
                          )}
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
                          Package Name: {packageDetails?.packageName}
                        </Card.Title>
                        <hr />
                        <Card.Text style={{ fontSize: "14px" }}>
                          <h5 style={{ fontSize: "16px" }}>
                            Services Included:
                          </h5>
                          <ul style={{ paddingLeft: "20px", fontSize: "14px" }}>
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
                          </ul>
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>

                  {/* Service Requests Summary */}
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
                                  {totalCompleted}
                                </span>
                              </p>
                            </div>
                            <div>
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
                                  {totalPending}
                                </span>
                              </p>
                            </div>
                          </div>
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>

                {/* Task Tables */}
                <Row className="mt-5">
                  <Col>
                    <h5
                      style={{
                        fontSize: "16px",
                        color: "#009efb",
                        textAlign: "center",
                      }}
                    >
                      Package Services
                    </h5>
                    <Table striped bordered hover responsive>
                      <thead>
                        <tr className="table-info">
                          <th>Service Name</th>
                          <th>Pending</th>
                          <th>Completed</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {pendingRequest
                          ?.filter((task) => !task.alaCarte) // Filter to show only package services
                          .map((task) => (
                            <tr key={task.serviceID}>
                              <td>{task.serviceName}</td>
                              <td>{task.pending}</td>
                              <td>{task.completions}</td>
                              <td>
                                <Button
                                  variant="primary"
                                  onClick={() => handleShowModal(task)}
                                  style={{
                                    backgroundColor: "#009efb",
                                    borderColor: "#009efb",
                                    color: "white",
                                    margin: "4px",
                                    fontSize: "12px",
                                  }}
                                >
                                  Update
                                </Button>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </Table>
                  </Col>
                </Row>

                {/* Conditionally render the Ala-Carte Services table only if there are pending Ala-Carte services */}
                {requests?.filter((task) => task.alaCarte && task.pending > 0)
                  .length > 0 && (
                  <Row>
                    <Col>
                      <h5
                        className="mt-3"
                        style={{
                          fontSize: "16px",
                          color: "#009efb",
                          textAlign: "center",
                        }}
                      >
                        Ala-Carte Services
                      </h5>
                      <Table striped bordered hover responsive>
                        <thead>
                          <tr className="table-info">
                            <th>Service Name</th>
                            <th>Pending</th>
                            <th>Completed</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {requests
                            ?.filter(
                              (task) => task.alaCarte && task.pending > 0
                            ) // Filter Ala-Carte services with pending tasks
                            .map((task) => (
                              <tr key={task.serviceID}>
                                <td>{task.serviceName}</td>
                                <td>{task.pending}</td>
                                <td>{task.completions}</td>
                                <td>
                                  <Button
                                    variant="primary"
                                    onClick={() => handleShowModal(task)}
                                    style={{
                                      backgroundColor: "#009efb",
                                      borderColor: "#009efb",
                                      color: "white",
                                      margin: "4px",
                                      fontSize: "12px",
                                    }}
                                  >
                                    Update
                                  </Button>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </Table>
                    </Col>
                  </Row>
                )}

                {/* Completed Services Table */}
                <Row className="mt-4">
                  <Col md={12}>
                    <h5
                      style={{
                        fontSize: "16px",
                        color: "#009efb",
                        textAlign: "center",
                      }}
                    >
                      Completed Services
                    </h5>
                    <Table striped bordered hover responsive>
                      <thead>
                        <tr className="table-info">
                          <th>Service Name</th>
                          <th>Service Type</th>
                          <th>Completion Notes</th>
                          <th>Date of Completion</th>
                        </tr>
                      </thead>
                      <tbody>
                        {completedRequest?.map((task, index) =>
                          task.interactions?.map(
                            (interaction, interactionIndex) => (
                              <tr key={interaction.interactionID}>
                                <td>
                                  {interactionIndex === 0 && (
                                    <strong>{task.serviceName}</strong>
                                  )}
                                </td>
                                <td>
                                  {task.alaCarte
                                    ? "Ala-Carte"
                                    : "Package Service"}
                                </td>
                                <td>{interaction.description}</td>
                                <td>{interaction.createdDate}</td>
                              </tr>
                            )
                          )
                        )}
                      </tbody>
                    </Table>
                  </Col>
                </Row>
              </>
            )}

            <Modal show={showModal} onHide={handleCloseModal}>
              <Modal.Header closeButton>
                <Modal.Title style={{ fontSize: "18px", color: "#009efb" }}>
                  Update {serviceNameSelected} Status
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group className="mb-3">
                    <Form.Label style={{ fontSize: "14px" }}>
                      Completion Notes
                    </Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      name="notes"
                      value={completionData.notes}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label style={{ fontSize: "14px" }}>
                      Upload Screenshot or File
                    </Form.Label>
                    <Form.Control
                      type="file"
                      name="screenshot"
                      onChange={handleChange}
                      style={{ fontSize: "14px" }}
                    />
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer style={{ justifyContent: "space-between" }}>
                <Button
                  variant="primary"
                  onClick={handleSubmit}
                  style={{
                    backgroundColor: "#009efb",
                    borderColor: "#009efb",
                    color: "white",
                    margin: "4px",
                    fontSize: "12px",
                  }}
                >
                  Update
                </Button>
                <Button
                  variant="secondary"
                  onClick={handleCloseModal}
                  style={{
                    color: "white",
                    margin: "4px",
                    fontSize: "12px",
                  }}
                >
                  Cancel
                </Button>
              </Modal.Footer>
            </Modal>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

export default ServiceTaskList;
