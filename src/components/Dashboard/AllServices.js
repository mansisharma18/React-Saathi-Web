import React, { useState, useEffect } from "react";
import {
  Card,
  Container,
  Table,
  Button,
  Modal,
  Form,
  Spinner,
} from "react-bootstrap";
import axios from "axios";

function AllServices() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [currentService, setCurrentService] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(
          `https://saathi.etheriumtech.com:444/Saathi/alacarteservices`
        );
        setServices(response.data);
      } catch (err) {
        console.error("Error fetching services:", err);
        setError("Failed to load services. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  const handleEditClick = (service) => {
    setCurrentService({ ...service });
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setCurrentService(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentService((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveChanges = async () => {
    if (currentService) {
      const url = `https://saathi.etheriumtech.com:444/Saathi/alacarteservices/${currentService.serviceID}`;
      try {
        await axios.put(url, currentService);
        const updatedServices = services.map((service) =>
          service.serviceID === currentService.serviceID
            ? currentService
            : service
        );
        setServices(updatedServices);
        setShowModal(false);
      } catch (error) {
        console.error("Failed to update service:", error);
        setError("Failed to update service. Please try again.");
      }
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center mt-5 px-5">
      <Card className="shadow-sm w-100 pb-3">
        <Card.Body>
          <div className="text-center mt-2">
            <h4>All Services</h4>
          </div>
          <hr />

          {/* Loading Spinner */}
          {loading ? (
            <div className="d-flex justify-content-center my-4">
              <Spinner animation="border" />
            </div>
          ) : error ? (
            // Display error message if an error occurred
            <div className="d-flex justify-content-center my-4 text-danger">
              {error}
            </div>
          ) : services.length > 0 ? (
            // Services Table
            <Table
              striped
              bordered
              hover
              responsive
              className="table-font-size"
            >
              <thead>
                <tr className="table-info">
                  <th>S.No</th>
                  <th>Service Name</th>
                  <th>Description</th>
                  <th>Price INR</th>
                  <th>Price USD</th>
                  <th>Frequency </th>
                  <th>Duration (Hours)</th>
                  <th>Business Hours</th>
                  <th>Status</th>
                  <th>Update</th>
                </tr>
              </thead>
              <tbody>
                {services.map((service, index) => (
                  <tr key={service.serviceID}>
                    <td>{index + 1}</td>
                    <td>{service.serviceName}</td>
                    <td>{service.serviceDescription}</td>
                    <td>
                      {/* Check if priceINR exists before applying toFixed() */}
                      {service.priceINR !== null &&
                      service.priceINR !== undefined
                        ? service.priceINR.toFixed(2)
                        : "N/A"}
                    </td>
                    <td>
                      {/* Check if priceUSD exists before applying toFixed() */}
                      {service.priceUSD !== null &&
                      service.priceUSD !== undefined
                        ? service.priceUSD.toFixed(2)
                        : "N/A"}
                    </td>
                    <td>
                      {service.frequency} ({service.frequencyUnit})
                    </td>
                    <td>{service.durationInHours}</td>
                    <td>
                      {service.businessHoursStart} - {service.businessHoursEnd}
                    </td>
                    <td>{service.status === 1 ? "Active" : "Inactive"}</td>
                    <td>
                      <i
                        className="bi bi-pencil-fill edit-btn-color"
                        onClick={() => handleEditClick(service)}
                      ></i>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            // Display if no services are available
            <div className="d-flex justify-content-center my-4">
              <p>No services available</p>
            </div>
          )}
        </Card.Body>
      </Card>

      {/* Modal for editing service */}
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Service</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {currentService && (
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Service Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter service name"
                  name="serviceName"
                  value={currentService.serviceName}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  placeholder="Enter description"
                  name="serviceDescription"
                  value={currentService.serviceDescription}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Price in INR</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter price in INR"
                  name="priceINR"
                  value={currentService.priceINR}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Price in USD</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter price in USD"
                  name="priceUSD"
                  value={currentService.priceUSD}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Frequency</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Frequency"
                  name="frequency"
                  value={currentService.frequency}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Frequency Unit</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Frequency Unit"
                  name="frequencyUnit"
                  value={currentService.frequencyUnit}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Duration (Hours)</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter duration in hours"
                  name="durationInHours"
                  value={currentService.durationInHours}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Business Start Time</Form.Label>
                <Form.Control
                  type="time"
                  name="businessHoursStart"
                  value={currentService.businessHoursStart}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Business End Time</Form.Label>
                <Form.Control
                  type="time"
                  name="businessHoursEnd"
                  value={currentService.businessHoursEnd}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Status</Form.Label>
                <Form.Select
                  name="status"
                  value={currentService.status}
                  onChange={handleInputChange}
                >
                  <option value={1}>Active</option>
                  <option value={0}>Inactive</option>
                </Form.Select>
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleSaveChanges}>
            Update Changes
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default AllServices;
