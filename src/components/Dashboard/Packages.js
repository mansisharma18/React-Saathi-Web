import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Collapse from "react-bootstrap/Collapse"; // Bootstrap Collapse for toggling
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Packages = () => {
  // States for Package Section
  const [packageName, setPackageName] = useState("");
  const [packageDescription, setPackageDescription] = useState("");
  const [priceUSD, setPriceUSD] = useState("");
  const [priceINR, setPriceINR] = useState("");
  const [packageStatus, setPackageStatus] = useState("");
  const [services, setServices] = useState([]); // List of services fetched from the API
  const [selectedServices, setSelectedServices] = useState([]); // Services selected by the user
  const [openServices, setOpenServices] = useState(false); // For toggling service selection visibility

  // General state for alerts and errors
  const [alert, setAlert] = useState("");
  const [errors, setErrors] = useState({});

  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  // Fetch the list of services
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(
          `https://saathi.etheriumtech.com:444/Saathi/alacarteservices`
        );
        const res = response.data;
        const data = res.filter((item) => item.isAlaCarte == 0);
        setServices(data);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchServices();
  }, []);

  // Validation of input fields
  const validateFields = () => {
    const validationErrors = {};

    if (!packageName) validationErrors.packageName = "Package name is required";
    if (!packageDescription)
      validationErrors.packageDescription = "Package description is required";
    if (!priceUSD) validationErrors.priceUSD = "Price in USD is required";
    if (!priceINR) validationErrors.priceINR = "Price in INR is required";
    if (!packageStatus)
      validationErrors.packageStatus = "Package status is required";
    if (selectedServices.length === 0)
      validationErrors.selectedServices =
        "You must select at least one service";

    return validationErrors;
  };

  // Handle cancel button click
  const handleCancel = () => {
    navigate("/dashboard");
  };

  // Handle checkbox selection for services
  const handleServiceSelection = (serviceID) => {
    setSelectedServices(
      (prevSelected) =>
        prevSelected.includes(serviceID)
          ? prevSelected.filter((id) => id !== serviceID) // Deselect if already selected
          : [...prevSelected, serviceID] // Add if not selected
    );
  };

  // Handle form submission
  const handleSubmitPackage = async (event) => {
    event.preventDefault();

    const validationErrors = validateFields();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Create package services payload from selected services
    const packageServices = selectedServices.map((serviceID) => {
      const service = services.find((s) => s.serviceID === serviceID);
      return {
        serviceID: service.serviceID,
        frequency: service.frequencyInHours,
        frequencyUnit: "Hours", // Assuming frequency unit is in hours as per API response
        priceUSD: service.price, // Assuming package uses service price
        priceINR: service.price, // Adjust if different pricing is required for INR
        status: service.status,
      };
    });

    const packageData = {
      packageName,
      packageDescription,
      priceUSD: parseFloat(priceUSD),
      priceINR: parseFloat(priceINR),
      status: parseInt(packageStatus),
      createdBy: parseInt(userId),
      packageServices,
    };

    try {
      const response = await axios.post(
        `https://saathi.etheriumtech.com:444/Saathi/subscription-package`,
        packageData
      );
      console.log("Response:", response.data);
      setAlert("Package created successfully!");
      setTimeout(() => {
        setAlert("");
        navigate("/dashboard");
      }, 5000); // Hide alert after 5 seconds
    } catch (error) {
      console.error("Error creating package:", error);
      setAlert("An error occurred while creating the package.");
    }
  };

  return (
    <div>
      <div className="d-flex">
        <Container className="justify-content-center aligh-items-center mt-5 ml-5 px-5">
          <Card className="shadow-sm pb-3">
            <Card.Body>
              <div className="d-flex justify-content-center">
                <div className="mt-2">
                  <h4 className="heading-color">Add New Package</h4>
                </div>
              </div>
              <hr />
              <div>
                {/* Package Form */}
                <Form onSubmit={handleSubmitPackage}>
                  <Row>
                    <Col className="p-3">
                      <Form.Group controlId="packageName">
                        <Form.Label className="label-style">
                          Package Name
                        </Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter Package Name"
                          style={{ padding: "8px", fontSize: "12px" }}
                          value={packageName}
                          onChange={(event) =>
                            setPackageName(event.target.value)
                          }
                          isInvalid={!!errors.packageName}
                          required
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.packageName}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="p-3">
                      <Form.Group controlId="packageDescription">
                        <Form.Label className="label-style">
                          Package Description
                        </Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter Package Description"
                          style={{ padding: "8px", fontSize: "12px" }}
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
                  <Row>
                    <Col className="p-3">
                      <Row className="align-items-center">
                        <Col xs="auto" lg={6}>
                          <Form.Group controlId="priceUSD">
                            <Form.Label className="label-style">
                              Price in USD
                            </Form.Label>
                            <Form.Control
                              type="number"
                              placeholder="Enter Price in USD"
                              style={{ padding: "8px", fontSize: "12px" }}
                              value={priceUSD}
                              onChange={(event) =>
                                setPriceUSD(event.target.value)
                              }
                              isInvalid={!!errors.priceUSD}
                              required
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.priceUSD}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                        <Col xs="auto" lg={6}>
                          <Form.Group controlId="priceINR">
                            <Form.Label className="label-style">
                              Price in INR
                            </Form.Label>
                            <Form.Control
                              type="number"
                              placeholder="Enter Price in INR"
                              style={{ padding: "8px", fontSize: "12px" }}
                              value={priceINR}
                              onChange={(event) =>
                                setPriceINR(event.target.value)
                              }
                              isInvalid={!!errors.priceINR}
                              required
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.priceINR}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                      </Row>
                    </Col>
                  </Row>

                  {/* Services Selection Section */}
                  <Row className="d-flex justify-content-center align-items-center">
                    <Col xs={12} sm={8} md={6} lg={8} className="p-3">
                      <Button
                        variant="primary"
                        onClick={() => setOpenServices(!openServices)}
                        aria-controls="service-collapse"
                        aria-expanded={openServices}
                        style={{
                          backgroundColor: "#009efb",
                          borderColor: "#009efb",
                          color: "white",
                          fontSize: "14px", // Larger font size for better visibility
                          padding: "10px 20px", // More padding for a better button size
                          borderRadius: "25px", // Rounded button
                          width: "50%", // Set button width
                          display: "block", // To allow centering
                          margin: "0 auto", // Auto margins to center
                        }}
                      >
                        {openServices ? "Hide Services" : "Show Service"}
                      </Button>
                      <Collapse in={openServices}>
                        <div
                          id="service-collapse"
                          className="services-list"
                          style={{
                            maxWidth: "100%",
                            overflowY: "auto",
                            maxHeight: "150px", // Increased height for better visibility
                            borderWidth: 1,
                            marginTop: "15px",
                            borderRadius: "10px", // More rounded corners
                            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)", // Stronger shadow for depth
                            padding: "20px", // More padding for better spacing
                            backgroundColor: "white", // Keep background white for clean UI
                            borderColor: "#ddd", // Subtle border color
                          }}
                        >
                          <Form.Group controlId="services">
                            <Form.Label
                              className="mt-3"
                              style={{ fontWeight: "bold" }}
                            >
                              Services Offered
                            </Form.Label>
                            {services.map((service) => (
                              <Form.Check
                                key={service.serviceID}
                                type="checkbox"
                                id={`service-${service.serviceID}`}
                                label={service.serviceName}
                                checked={selectedServices.includes(
                                  service.serviceID
                                )}
                                required
                                onChange={() =>
                                  handleServiceSelection(service.serviceID)
                                }
                                style={{ marginBottom: "10px" }} // Spacing between checkboxes
                              />
                            ))}
                            {errors.selectedServices && (
                              <Form.Control.Feedback type="invalid">
                                {errors.selectedServices}
                              </Form.Control.Feedback>
                            )}
                          </Form.Group>
                        </div>
                      </Collapse>
                    </Col>
                  </Row>

                  <Row>
                    <Col className="p-3">
                      <Form.Group controlId="packageStatus">
                        <Form.Label className="label-style">
                          Package Status
                        </Form.Label>
                        <Form.Select
                          value={packageStatus}
                          onChange={(event) =>
                            setPackageStatus(event.target.value)
                          }
                          isInvalid={!!errors.packageStatus}
                          required
                          style={{ padding: "8px", fontSize: "12px" }}
                        >
                          <option value="">Select Status</option>
                          <option value="1">Active</option>
                          <option value="0">Inactive</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                  </Row>

                  <div className="d-flex justify-content-between mt-3">
                    <Button
                      variant="primary"
                      type="submit"
                      style={{
                        backgroundColor: "#009efb",
                        borderColor: "#009efb",
                        color: "white",
                        margin: "4px",
                        fontSize: "12px",
                      }}
                    >
                      Save
                    </Button>
                    <Button
                      variant="secondary"
                      type="button"
                      onClick={handleCancel}
                      style={{
                        color: "white",
                        margin: "4px",
                        fontSize: "12px",
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </Form>

                {/* Alert Section */}
                {alert && (
                  <Alert variant="success" className="h6 mx-3 mt-3 w-50">
                    {alert}
                  </Alert>
                )}
              </div>
            </Card.Body>
          </Card>
        </Container>
      </div>
    </div>
  );
};

export default Packages;
