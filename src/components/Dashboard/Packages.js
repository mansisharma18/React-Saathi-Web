import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Collapse from "react-bootstrap/Collapse";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Packages = () => {
  const [packageName, setPackageName] = useState("");
  const [packageDescription, setPackageDescription] = useState("");
  const [priceUSD, setPriceUSD] = useState("");
  const [priceINR, setPriceINR] = useState("");
  const [packageStatus, setPackageStatus] = useState("");
  const [services, setServices] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [serviceFrequencies, setServiceFrequencies] = useState({});
  const [openServices, setOpenServices] = useState(false);
  const [discountPercentage, setDiscountPercentage] = useState("");
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

  const handleCancel = () => {
    navigate("/dashboard");
  };

  const handleServiceSelection = (serviceID) => {
    if (selectedServices.includes(serviceID)) {
      setSelectedServices(selectedServices.filter((id) => id !== serviceID));
      const newFrequencies = { ...serviceFrequencies };
      delete newFrequencies[serviceID];
      setServiceFrequencies(newFrequencies);
    } else {
      setSelectedServices([...selectedServices, serviceID]);
      const cost = selectedServices?.priceINR;
      const total = cost?.reduce((a, b) => a + b, 0);
      setPriceINR(total);
    }
  };

  const handleFrequencyChange = (serviceID, value) => {
    setServiceFrequencies({
      ...serviceFrequencies,
      [serviceID]: value,
    });
  };

  const handleSubmitPackage = async (event) => {
    event.preventDefault();

    // const validationErrors = validateFields();
    // if (Object.keys(validationErrors).length > 0) {
    //   setErrors(validationErrors);
    //   return;
    // }

    const packageServices = selectedServices.map((serviceID) => {
      const service = services.find((s) => s.serviceID === serviceID);
      const selectedFrequency =
        parseInt(serviceFrequencies[serviceID], 10) || 1;

      // Calculate the new frequency for the package
      const updatedFrequency = (service.frequency || 1) * selectedFrequency;

      return {
        serviceID: service.serviceID,
        frequency: updatedFrequency, // Send updated frequency
        frequencyUnit: service.frequencyUnit,
        priceUSD: service.priceUSD,
        priceINR: service.priceINR,
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
      }, 5000);
    } catch (error) {
      console.error("Error creating package:", error);
      setAlert("An error occurred while creating the package.");
    }
  };

  return (
    <div className="d-flex">
      <Container className="justify-content-center align-items-center mt-5 px-5">
        <Card className="shadow-sm pb-3">
          <Card.Body>
            <h4 className="heading-color text-center">Add New Package</h4>
            <hr />
            <Form onSubmit={handleSubmitPackage}>
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
                    <Form.Control.Feedback type="invalid">
                      {errors.packageName}
                    </Form.Control.Feedback>
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
              <Row>
                <Col className="p-3">
                  <Row>
                    <Col>
                      <Form.Group controlId="priceINR">
                        <Form.Label>Price in INR</Form.Label>
                        <Form.Control
                          type="number"
                          placeholder="Enter Price in INR"
                          value={priceINR}
                          onChange={(event) => setPriceINR(event.target.value)}
                          isInvalid={!!errors.priceUSD}
                          required
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.priceUSD}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group controlId="Disc">
                        <Form.Label>Price in USD</Form.Label>
                        <Form.Control
                          type="number"
                          placeholder="Enter Price in USD"
                          value={priceUSD}
                          onChange={(event) => setPriceUSD(event.target.value)}
                          isInvalid={!!errors.priceUSD}
                          required
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.priceUSD}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group controlId="priceINR">
                        <Form.Label>Discount Percentage </Form.Label>
                        <Form.Control
                          type="number"
                          placeholder="Discounted Price"
                          value={discountPercentage}
                          onChange={(event) =>
                            setDiscountPercentage(event.target.value)
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

              <Row className="d-flex justify-content-center align-items-center">
                <Col xs={12} sm={10} md={8} lg={8} className="p-3">
                  <Button
                    variant="primary"
                    onClick={() => setOpenServices(!openServices)}
                    aria-controls="service-collapse"
                    aria-expanded={openServices}
                    style={{
                      width: "100%", // Full width for consistency
                      marginBottom: "15px", // Add space below the button
                      padding: "12px 20px", // Increase padding for a larger clickable area
                      fontSize: "16px", // Increase font size for better readability
                      backgroundColor: "#007bff", // Use Bootstrap's primary color
                      borderColor: "#007bff",
                      borderRadius: "30px", // Rounder button
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Subtle shadow for depth
                    }}
                  >
                    {openServices ? "Hide Services" : "Show Services"}
                  </Button>
                  <Collapse in={openServices}>
                    <div
                      id="service-collapse"
                      className="services-list"
                      style={{
                        marginTop: "15px",
                        padding: "20px",
                        backgroundColor: "#f9f9f9", // Light grey for better contrast
                        borderRadius: "10px", // Smooth borders
                        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)", // Subtle shadow
                        borderColor: "#ddd",
                        borderWidth: "1px", // Add border
                        overflowY: "auto",
                        maxHeight: "300px", // Limit the height for scrollability
                      }}
                    >
                      {services.map((service) => (
                        <div
                          key={service.serviceID}
                          className="mb-4"
                          style={{
                            padding: "15px",
                            backgroundColor: "white", // White background for each item
                            borderRadius: "8px", // Rounded edges
                            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)", // Soft shadow for better separation
                          }}
                        >
                          <Form.Check
                            type="checkbox"
                            id={`service-${service.serviceID}`}
                            label={
                              <span
                                style={{ fontSize: "16px", fontWeight: "500" }}
                              >
                                {service.serviceName}
                              </span>
                            }
                            checked={selectedServices.includes(
                              service.serviceID
                            )}
                            onChange={() =>
                              handleServiceSelection(service.serviceID)
                            }
                            style={{ marginBottom: "10px" }} // Better spacing between the checkbox and the frequency input
                          />
                          {selectedServices.includes(service.serviceID) && (
                            <Form.Group
                              controlId={`frequency-${service.serviceID}`}
                            >
                              <Form.Label style={{ fontWeight: "bold" }}>
                                Frequency of this Service in this Package
                              </Form.Label>
                              <Form.Control
                                type="number"
                                placeholder="Enter frequency of this service"
                                value={
                                  serviceFrequencies[service.serviceID] || ""
                                }
                                onChange={(e) =>
                                  handleFrequencyChange(
                                    service.serviceID,
                                    e.target.value
                                  )
                                }
                                isInvalid={
                                  !!errors[`frequency-${service.serviceID}`]
                                }
                                style={{
                                  padding: "10px",
                                  borderRadius: "8px",
                                  borderColor: "#ced4da",
                                }}
                                required
                              />
                              <Form.Control.Feedback type="invalid">
                                {errors[`frequency-${service.serviceID}`]}
                              </Form.Control.Feedback>
                            </Form.Group>
                          )}
                        </div>
                      ))}
                    </div>
                  </Collapse>
                </Col>
              </Row>

              <Row>
                <Col className="p-3">
                  <Form.Group controlId="packageStatus">
                    <Form.Label>Package Status</Form.Label>
                    <Form.Select
                      value={packageStatus}
                      onChange={(event) => setPackageStatus(event.target.value)}
                      isInvalid={!!errors.packageStatus}
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
