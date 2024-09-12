import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Table } from "react-bootstrap";

const Packages = () => {
  const [packageName, setPackageName] = useState("");
  const [packageDescription, setPackageDescription] = useState("");
  const [priceINR, setPriceINR] = useState(0); // Store the total price in INR
  const [packagePriceINR, setPackagePriceINR] = useState(0); // Store final discounted price
  const [packageStatus, setPackageStatus] = useState("");
  const [services, setServices] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [serviceFrequencies, setServiceFrequencies] = useState({});
  const [discountPercentage, setDiscountPercentage] = useState(0); // Discount percentage
  const [alert, setAlert] = useState("");
  const [errors, setErrors] = useState({});
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(
          `https://saathi.etheriumtech.com:444/Saathi/alacarteservices`
        );
        const res = response.data;
        setServices(res);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchServices();
  }, []);

  // Handle service selection and total price calculation
  const handleServiceSelection = (serviceID) => {
    if (selectedServices.includes(serviceID)) {
      setSelectedServices(selectedServices.filter((id) => id !== serviceID));
      const newFrequencies = { ...serviceFrequencies };
      delete newFrequencies[serviceID];
      setServiceFrequencies(newFrequencies);
    } else {
      setSelectedServices([...selectedServices, serviceID]);
      setServiceFrequencies({
        ...serviceFrequencies,
        [serviceID]: 1, // Default frequency to 1 when the service is selected
      });
    }
  };

  const handleFrequencyChange = (serviceID, value) => {
    setServiceFrequencies({
      ...serviceFrequencies,
      [serviceID]: value,
    });
  };

  useEffect(() => {
    // Calculate total price in INR when services are selected/deselected or frequency is updated
    const calculateTotalPrice = () => {
      const total = selectedServices.reduce((acc, serviceID) => {
        const service = services.find((s) => s.serviceID === serviceID);
        const frequency = serviceFrequencies[serviceID] || 1; // Get the selected frequency or default to 1
        return acc + (service?.priceINR || 0) * frequency; // Multiply price by frequency
      }, 0);
      setPriceINR(total);
    };

    calculateTotalPrice();
  }, [selectedServices, services, serviceFrequencies]);

  // Handle discount calculation
  useEffect(() => {
    const applyDiscount = () => {
      const discountedPrice = priceINR - (priceINR * discountPercentage) / 100;
      setPackagePriceINR(discountedPrice); // Store discounted price
    };

    applyDiscount();
  }, [discountPercentage, priceINR]);

  const handleSubmitPackage = async (event) => {
    event.preventDefault();

    const packageServices = selectedServices.map((serviceID) => {
      const service = services.find((s) => s.serviceID === serviceID);
      const selectedFrequency =
        parseInt(serviceFrequencies[serviceID], 10) || 1;

      return {
        serviceID: service.serviceID,
        frequency: selectedFrequency,
        frequencyUnit: service.frequencyUnit,
        priceUSD: service.priceUSD,
        priceINR: service.priceINR,
        status: service.status,
      };
    });

    const packageData = {
      packageName,
      packageDescription,
      priceINR: parseFloat(priceINR), // Use total price in INR
      packagePriceINR: parseFloat(packagePriceINR), // Use final discounted price
      status: parseInt(packageStatus),
      createdBy: parseInt(userId),
      packageServices,
    };

    try {
      const response = await axios.post(
        `https://saathi.etheriumtech.com:444/Saathi/subscription-package`,
        packageData
      );
      setAlert("Package created successfully!");
      setTimeout(() => {
        setAlert("");
        navigate("/dashboard");
      }, 5000);
    } catch (error) {
      console.error("Error creating package:", error);
      setAlert("An error occurred while creating the package.");
    }
  };

  const handleCancel = () => {
    navigate("/dashboard");
  };

  return (
    <div className="d-flex">
      <Container className="justify-content-center align-items-center mt-5 px-5">
        <Card className="shadow-sm pb-3">
          <Card.Body>
            <h4 className="heading-color text-center">Add New Package</h4>
            <hr />
            <Form onSubmit={handleSubmitPackage}>
              {/* Package Name, Description, and other details */}
              <Row>
                <Col className="p-3">
                  <Form.Group controlId="packageName">
                    <Form.Label>Package Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Package Name"
                      value={packageName}
                      onChange={(event) => setPackageName(event.target.value)}
                      isInvalid={!!errors.packageName}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col className="p-3">
                  <Form.Group controlId="packageDescription">
                    <Form.Label>Package Description</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Package Description"
                      value={packageDescription}
                      onChange={(event) =>
                        setPackageDescription(event.target.value)
                      }
                      isInvalid={!!errors.packageDescription}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.packageDescription}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>

              {/* Service selection */}
              <div className="text-center mt-2">
                <h4 style={{ fontSize: "18px", fontWeight: "bold" }}>
                  List of All Services
                </h4>
              </div>

              <div className="d-flex">
                <Card className="shadow-sm w-100 pb-3">
                  <Card.Body>
                    {/* Services Table */}
                    {services.length > 0 ? (
                      <Table
                        striped
                        bordered
                        hover
                        responsive
                        className="table-font-size"
                        style={{ height: "300px", overflowY: "scroll" }}
                      >
                        <thead>
                          <tr className="table-info">
                            <th>Add a Service</th>
                            <th>Service Name</th>
                            <th>Price (INR)</th>
                            <th>Frequency of Service</th>
                            <th>Duration (Hours)</th>
                            <th>Business Hours</th>
                            <th>No. of Services</th>
                            <th>Total Price</th>
                          </tr>
                        </thead>
                        <tbody>
                          {services.map((service) => (
                            <tr key={service.serviceID}>
                              <td className="d-flex justify-content-center">
                             
                                {/* Centered checkbox */}
                                <Form.Check
                                  type="checkbox"
                                  id={`service-${service.serviceID}`}
                                  checked={selectedServices.includes(
                                    service.serviceID
                                  )}
                                  onChange={() =>
                                    handleServiceSelection(service.serviceID)
                                  }
                                />
                              </td>
                              <td>{service.serviceName}</td>
                              <td>{service.priceINR}</td>
                              <td>{service.frequencyUnit}</td>
                              <td>{service.durationInHours}</td>
                              <td style={{ maxWidth: "100px" }}>
                                {service.businessHoursStart}-
                                {service.businessHoursEnd}
                              </td>
                              <td>
                                {selectedServices.includes(
                                  service.serviceID
                                ) && (
                                  <Form.Group
                                    controlId={`frequency-${service.serviceID}`}
                                  >
                                    <Form.Control
                                      type="number"
                                      placeholder="Enter frequency"
                                      value={
                                        serviceFrequencies[service.serviceID] ||
                                        1
                                      }
                                      onChange={(e) =>
                                        handleFrequencyChange(
                                          service.serviceID,
                                          e.target.value
                                        )
                                      }
                                      style={{ width: "80px" }}
                                      required
                                    />
                                  </Form.Group>
                                )}
                              </td>
                              <td>
                                ₹
                                {selectedServices.includes(service.serviceID)
                                  ? service.priceINR *
                                    (serviceFrequencies[service.serviceID] || 1)
                                  : service.priceINR}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    ) : (
                      <div className="d-flex justify-content-center my-4">
                        <p>No services available</p>
                      </div>
                    )}
                  </Card.Body>
                </Card>
              </div>

              {/* Price and Discount Section */}
              <Row>
                <Col className="p-3">
                  <Row>
                    <Col>
                      <Form.Group controlId="priceINR">
                        <Form.Label>Package Price in INR</Form.Label>
                        <Form.Control type="number" value={priceINR} readOnly />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group controlId="discountPercentage">
                        <Form.Label>Package Discount (%)</Form.Label>
                        <Form.Control
                          type="number"
                          placeholder="Enter Discount Percentage"
                          value={discountPercentage}
                          onChange={(event) =>
                            setDiscountPercentage(event.target.value)
                          }
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group controlId="packagePriceINR">
                        <Form.Label>Final Package Price in INR</Form.Label>
                        <Form.Control
                          type="number"
                          value={packagePriceINR}
                          readOnly
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                </Col>
              </Row>

              <Row>
                <Col className="p-3">
                  <Form.Group controlId="packageStatus">
                    <Form.Label>Package Status</Form.Label>
                    <Form.Select
                      value={packageStatus}
                      onChange={(event) => setPackageStatus(event.target.value)}
                      required
                    >
                      <option value="">Select Status</option>
                      <option value="1">Active</option>
                      <option value="0">Inactive</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>

              <div className="d-flex justify-content-between mt-3">
                <Button variant="primary" type="submit">
                  Save
                </Button>
                <Button
                  variant="secondary"
                  type="button"
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
              </div>
            </Form>

            {alert && (
              <Alert variant="success" className="h6 mx-3 mt-3 w-50">
                {alert}
              </Alert>
            )}
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default Packages;
