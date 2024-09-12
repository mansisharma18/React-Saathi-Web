import React, { useState, useEffect } from "react";
import {
  Card,
  Container,
  Table,
  Button,
  Badge,
  Collapse,
  Modal,
  Form,
} from "react-bootstrap";
import axios from "axios";

const ViewAllPackages = () => {
  const [list, setList] = useState([]);
  const [openServiceIndex, setOpenServiceIndex] = useState(null); // For toggling service details
  const [showModal, setShowModal] = useState(false); // For opening/closing modal
  const [currentPackage, setCurrentPackage] = useState(null); // For storing the package being edited

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `https://saathi.etheriumtech.com:444/Saathi/subscription-package/all`
        );
        setList(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const toggleServices = (index) => {
    setOpenServiceIndex(openServiceIndex === index ? null : index); // Toggle services on click
  };

  const handleEditClick = (item) => {
    setCurrentPackage(item);
    setShowModal(true); // Open modal
  };

  const handleClose = () => setShowModal(false); // Close modal

  const handlePackageChange = (e) => {
    setCurrentPackage({ ...currentPackage, [e.target.name]: e.target.value });
  };

  const handleServiceStatusChange = (index, value) => {
    const updatedServices = [...currentPackage.packageServices];
    updatedServices[index].status = value;
    setCurrentPackage({ ...currentPackage, packageServices: updatedServices });
  };
  const handleSave = async () => {
    const url = `https://saathi.etheriumtech.com:444/Saathi/subscription-package/${currentPackage.packageID}`;
    const updatedPackage = {
      packageName: currentPackage.packageName,
      packageDescription: currentPackage.packageDescription,
      priceUSD: currentPackage.priceUSD,
      priceINR: currentPackage.priceINR,
      status: currentPackage.status,
      updatedBy: 1, // assuming the user ID of the updater is 1, adjust as necessary
      packageServices: currentPackage.packageServices.map((service) => ({
        serviceID: service.serviceID,
        frequency: service.frequency,
        frequencyUnit: service.frequencyUnit,
        priceUSD: service.priceUSD,
        priceINR: service.priceINR,
        status: service.status,
      })),
    };

    try {
      const response = await axios.put(url, updatedPackage);
      console.log("Updated successfully:", response.data);
      setList(
        list.map((pkg) =>
          pkg.packageID === currentPackage.packageID
            ? { ...pkg, ...updatedPackage }
            : pkg
        )
      );
      setShowModal(false); // Close modal after update
    } catch (error) {
      console.error("Failed to update package:", error);
    }
  };

  return (
    <div className="d-flex">
      <Container className="mt-5">
        <Card className="shadow-sm pb-3">
          <Card.Body>
            <div className="d-flex justify-content-center">
              <h4>All Subscription Packages</h4>
            </div>
            <Table striped bordered hover responsive className="mt-4">
              <thead className="table-info">
                <tr>
                  <th>S.No</th>
                  <th>Package Name</th>
                  <th>Description</th>
                  <th>Price (USD/INR)</th>
                  <th>Services</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {list.length > 0 ? (
                  list.map((item, index) => (
                    <React.Fragment key={index}>
                      <tr>
                        <td>{index + 1}</td>
                        <td>{item.packageName}</td>
                        <td>{item.packageDescription}</td>
                        <td>
                          ${item.priceUSD} USD / ₹{item.priceINR} INR
                        </td>
                        <td>
                          {item.packageServices &&
                          item.packageServices.length > 0 ? (
                            <Button
                              variant="outline-info"
                              size="sm"
                              onClick={() => toggleServices(index)}
                              aria-controls={`services-collapse-${index}`}
                              aria-expanded={openServiceIndex === index}
                            >
                              {openServiceIndex === index
                                ? "Hide Services"
                                : `View Services (${item.packageServices.length})`}
                            </Button>
                          ) : (
                            <Badge bg="danger">No services</Badge>
                          )}
                        </td>
                        <td>
                          <i
                            className="bi bi-pencil-fill edit-btn-color"
                            onClick={() => handleEditClick(item)}
                          ></i>
                        </td>
                      </tr>
                      {item.packageServices &&
                        item.packageServices.length > 0 && (
                          <tr>
                            <td colSpan="6" style={{ padding: 0 }}>
                              <Collapse in={openServiceIndex === index}>
                                <div
                                  id={`services-collapse-${index}`}
                                  className="bg-light p-3"
                                >
                                  <strong>Services:</strong>
                                  <ul>
                                    {item.packageServices.map(
                                      (service, serviceIndex) => (
                                        <li key={serviceIndex}>
                                          <strong>{service.serviceID}</strong> -{" "}
                                          {service.frequency}{" "}
                                          {service.frequencyUnit}, $
                                          {service.priceUSD} USD, ₹
                                          {service.priceINR} INR
                                        </li>
                                      )
                                    )}
                                  </ul>
                                </div>
                              </Collapse>
                            </td>
                          </tr>
                        )}
                    </React.Fragment>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center">
                      No packages available
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </Card.Body>
        </Card>

        {/* Edit Modal */}
        <Modal show={showModal} onHide={handleClose} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Edit Package</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {currentPackage && (
              <Form>
                <Form.Group controlId="packageName">
                  <Form.Label>Package Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="packageName"
                    value={currentPackage.packageName}
                    onChange={handlePackageChange}
                  />
                </Form.Group>

                <Form.Group controlId="packageDescription" className="mt-3">
                  <Form.Label>Package Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="packageDescription"
                    value={currentPackage.packageDescription}
                    onChange={handlePackageChange}
                  />
                </Form.Group>

                <Form.Group controlId="priceUSD" className="mt-3">
                  <Form.Label>Price (USD)</Form.Label>
                  <Form.Control
                    type="number"
                    name="priceUSD"
                    value={currentPackage.priceUSD}
                    onChange={handlePackageChange}
                  />
                </Form.Group>

                <Form.Group controlId="priceINR" className="mt-3">
                  <Form.Label>Price (INR)</Form.Label>
                  <Form.Control
                    type="number"
                    name="priceINR"
                    value={currentPackage.priceINR}
                    onChange={handlePackageChange}
                  />
                </Form.Group>

                <hr />

                <h5>Services</h5>
                {currentPackage.packageServices.map((service, index) => (
                  <Form.Group
                    key={index}
                    controlId={`service-status-${service.serviceID}`}
                    className="mb-3"
                  >
                    <Form.Label>
                      {service.serviceID} - {service.frequency}{" "}
                      {service.frequencyUnit}, ${service.priceUSD} USD, ₹
                      {service.priceINR} INR
                    </Form.Label>
                    <Form.Check
                      type="switch"
                      id={`service-status-switch-${service.serviceID}`}
                      label="Active"
                      checked={service.status === 1}
                      onChange={(e) =>
                        handleServiceStatusChange(
                          index,
                          e.target.checked ? 1 : 0
                        )
                      }
                    />
                  </Form.Group>
                ))}
              </Form>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleSave}>
              Update Changes
            </Button>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </div>
  );
};

export default ViewAllPackages;