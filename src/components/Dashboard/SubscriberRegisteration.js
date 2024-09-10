import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Alert from "react-bootstrap/Alert";

const SubscriberRegisteration = () => {
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [middle, setMiddle] = useState("");
  const [mob, setMob] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [image, setImage] = useState("");
  const [bio, setBio] = useState("");
  const [selectedOption, setSelectedOption] = useState("Admin");
  const [password, setPassword] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [status, setStatus] = useState("");
  const [alert, setAlert] = useState();
  const [list, setList] = useState("");
  const [subId, setSubId] = useState("");
  const [packages, setPackages] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardNo, setCardNo] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [comments, setComments] = useState("");
  const [packageList, setPackageList] = useState("");
  const [selectedPackage, setSelectedPackage] = useState("");
  const [selectedPackageID, setSelectedPackageId] = useState("");
  const [amount, setAmount] = useState("");

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    console.log("hello");
    const fetchSubList = async () => {
      axios
        .get(
          `https://saathi.etheriumtech.com:444/Saathi/admin-users/${userId}/subscribers`
        )
        .then((res) => {
          console.log(res.data[0].firstName);
          setList(res.data);
        })
        .catch((err) => console.log(err));
    };
    fetchSubList();

    const fetchData = async () => {
      try {
        axios
          .get(
            `https://saathi.etheriumtech.com:444/Saathi/subscribers/${subId}`
          )
          .then((res) => {
            console.log(res.data);
            //   console.log(res.data[0].firstName)
            setFirst(res.data.firstName);
            setLast(res.data.lastName);
            setMob(res.data.contactNo);
            setEmail(res.data.email);
            setDob(res.data.dob);
            setBio(res.data.briefBio);
            setSelectedOption(res.data.userType);
            setPassword(res.data.password);
            setCountryCode(res.data.countryCode);
            setStatus(res.data.status);
            setSelectedPackage(res.data.packageName);
          });
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };
    if (subId) {
      fetchData();
    }

    const fetchPackageList = async () => {
      axios
        .get(
          `https://saathi.etheriumtech.com:444/Saathi/subscription-package/all`
        )
        .then((res) => {
          console.log("packagess", res.data);
          setPackageList(res.data);
        })
        .catch((err) => console.log(err));
    };
    fetchPackageList();
  }, [subId]);

  const navigate = useNavigate();

  const handleCancel = () => {
    navigate("/dashboard");
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .put(`https://saathi.etheriumtech.com:444/Saathi/subscribers/${subId}`, {
        firstName: first,
        lastName: last,
        email: email,
        contactNo: mob,
        countryCode: countryCode,
        status: status,
        updatedBy: parseInt(userId),
        comments:comments,
        packageServiceId:selectedPackageID,
        creditCard: {
            nameOnCard: cardName,
            creditCardNumber: cardNo,
            expiryDate: cardExpiry,
            cvv: cardCvv,
          },

      })
      .then((response) => {
        console.log("Response:", response.data);
        if (response.data) {
          setAlert("Subscriber registered successfully!!");
        }
        
        else {
          setAlert("An error occurred. Please contact the development team.");
        }

        setTimeout(() => {
          setAlert("");
          navigate('/dashboard')
        }, 5000); // Hide alert after 3 seconds
      })
      .catch((error) => {
        console.error("Error:", error); // Handle errors
        setAlert(error.response.data);
      });
  };
  return (
    <div>
      <div>
        <div>
          <div className="d-flex">
            <Container className="justify-content-center aligh-items-center mt-5 ml-5 px-5">
              <Card className="shadow-sm pb-3">
                <Card.Body>
                  <div className="d-flex justify-content-center">
                    <div className="mt-2">
                      <h4>Activate Subscriber</h4>
                    </div>
                  </div>
                  <hr />
                  <div>
                    {/* Consolidated Form */}
                    <Form onSubmit={handleSubmit}>
                      <Row>
                        <Col className="p-3" md={4}>
                          <Form.Label className="label-style">
                            Select a Subscriber
                          </Form.Label>
                          <Form.Select
                            style={{ padding: "8px", fontSize: "12px" }}
                            aria-label="Select Option"
                            value={subId}
                            onChange={(event) => setSubId(event.target.value)}
                            required
                          >
                            <option value="">Select Subscriber</option>

                            {list.length > 0 &&
                              list.map((subscriber) => (
                                <option
                                  key={subscriber.subscriberID}
                                  value={subscriber.subscriberID}
                                >
                                  {subscriber.firstName} {subscriber.lastName}
                                </option>
                              ))}
                          </Form.Select>
                        </Col>
                      </Row>

                      <Row>
                        <Col className="p-3">
                          <Form.Label className="label-style">
                            First Name
                          </Form.Label>
                          <Form.Control
                            placeholder="First name"
                            style={{ padding: "8px", fontSize: "12px" }}
                            value={first}
                            onChange={(event) => setFirst(event.target.value)}
                            required
                          />
                        </Col>
                        <Col className="p-3">
                          <Form.Label className="label-style">
                            Last Name
                          </Form.Label>
                          <Form.Control
                            placeholder="Last name"
                            style={{ padding: "8px", fontSize: "12px" }}
                            value={last}
                            onChange={(event) => setLast(event.target.value)}
                            required
                          />
                        </Col>
                      </Row>
                      <Row>
                        <Col className="p-3">
                          <Form.Label className="label-style">
                            Username
                          </Form.Label>
                          <Form.Control
                            placeholder="Username"
                            style={{ padding: "8px", fontSize: "12px" }}
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            required
                          />
                        </Col>

                        <Col className="p-3">
                          <Row className="align-items-center">
                            {/* Country Code Select */}
                            <Col xs="auto" lg={2}>
                              <Form.Label className="label-style">
                                Code
                              </Form.Label>
                              <Form.Select
                                style={{ padding: "8px", fontSize: "12px" }}
                                aria-label="Select Country Code"
                                value={countryCode}
                                onChange={(event) =>
                                  setCountryCode(event.target.value)
                                }
                              >
                                <option>+91</option>
                                <option value="+91">+91 (India)</option>
                                <option value="+44">+44 (UK)</option>
                                {/* Add more options as needed */}
                              </Form.Select>
                            </Col>

                            {/* Phone Number Input */}
                            <Col>
                              <Form.Label className="label-style">
                                Phone Number
                              </Form.Label>
                              <Form.Control
                                placeholder="Phone Number"
                                style={{ padding: "8px", fontSize: "12px" }}
                                value={mob}
                                onChange={(event) => setMob(event.target.value)}
                                required
                              />
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                      <Row>
                        <Col className="p-3">
                          <Form.Label className="label-style">
                            Package
                          </Form.Label>
                          <Form.Select
                            style={{ padding: "8px", fontSize: "12px" }}
                            value={selectedPackage}
                            onChange={(event) => {
                                const selectedPackageId = event.target.value;
                                setSelectedPackage( event.target.value);
                                console.log("Selected package:", event.target.value)
                            
                                // Find the selected package based on packageID
                                const selectedPkg = packageList.find(
                                  (pkg) => pkg.packageID == selectedPackageId
                                );
                                console.log("Selected package:", selectedPkg)
                                // Set the amount to the package's price if the package is found
                                if (selectedPkg) {
                                    console.log(selectedPkg.priceUSD)
                                    const  price= `USD ${selectedPkg.priceUSD}  - INR ${selectedPkg.priceINR}`
                                  setAmount(price);
                                } else {
                                  setAmount(""); // Reset if no package is found
                                }
                            }}
                            required
                          >
                            <option value="">Select a package</option>
                            {packageList &&
                              packageList.map((pkg) => (
                                <option
                                  key={pkg.packageID}
                                  value={pkg.packageID}
                                >
                                  {pkg.packageName}
                                </option>
                              ))}
                          </Form.Select>
                        </Col>

                        <Col className="p-3">
                          <Form.Label className="label-style">
                            Package Amount
                          </Form.Label>
                          <Form.Control
                            placeholder="Package Amount"
                            style={{ padding: "8px", fontSize: "12px" }}
                            value={amount}
                            onChange={(event) => setAmount(event.target.value)}
                            required
                          />
                        </Col>
                      </Row>

                      <Row>
                        <Col className="p-3">
                          <Form.Label className="label-style">
                            Name on the Card
                          </Form.Label>
                          <Form.Control
                            placeholder="Name on the Card"
                            style={{ padding: "8px", fontSize: "12px" }}
                            value={cardName}
                            onChange={(event) =>
                              setCardName(event.target.value)
                            }
                          />
                        </Col>
                        <Col className="p-3">
                          <Form.Label className="label-style">
                            Credit Card Number
                          </Form.Label>
                          <Form.Control
                            placeholder="Credit card Number"
                            style={{ padding: "8px", fontSize: "12px" }}
                            value={cardNo}
                            onChange={(event) => setCardNo(event.target.value)}
                          />
                        </Col>
                        <Col className="p-3">
                          <Form.Label className="label-style">
                            Expiry Date
                          </Form.Label>
                          <Form.Control
                            type="date"
                            placeholder="Expiry Date"
                            style={{ padding: "8px", fontSize: "12px" }}
                            value={cardExpiry}
                            onChange={(event) =>
                              setCardExpiry(event.target.value)
                            }
                          />
                        </Col>
                        <Col className="p-3">
                          <Form.Label className="label-style">CVV</Form.Label>
                          <Form.Control
                            placeholder="CVV"
                            style={{ padding: "8px", fontSize: "12px" }}
                            value={cardCvv}
                            onChange={(event) => setCardCvv(event.target.value)}
                          />
                        </Col>
                        <Col className="p-3">
                          <Form.Label className="label-style">Amount</Form.Label>
                          <Form.Control
                            placeholder="Amount"
                            style={{ padding: "8px", fontSize: "12px" }}
                            value={""}
                            // onChange={(event) => setCardCvv(event.target.value)}
                          />
                        </Col>
                      </Row>

                      <Row>
                        {/* <Col className="p-3">
                                        <Form.Control
                                        type="password"
                                            placeholder="Password"
                                            style={{ padding: '8px', fontSize: "12px" }}
                                            value={password}
                                            onChange={(event) => setPassword(event.target.value)}
                                        />
                                    </Col> */}
                      </Row>

                      <Row>
                        <Col className="p-3">
                          <Form.Label className="label-style">
                            Add Comments
                          </Form.Label>
                          <Form.Control
                            as="textarea"
                            placeholder="Add Comments"
                            style={{ padding: "8px", fontSize: "12px" }}
                            rows={2}
                            value={comments}
                            onChange={(event) =>
                              setComments(event.target.value)
                            }
                            required
                          />
                        </Col>
                      </Row>
                      <Row>
                      <Col className="p-3" md={6}>
                        <Form.Label className="label-style">Status</Form.Label>
                        <Form.Select
                          style={{ padding: "8px", fontSize: "12px" }}
                          aria-label="Select Option"
                          value={status}
                          onChange={(event) => setStatus(event.target.value)} // Corrected setStatus
                          required
                        >
                          <option>Status</option>
                          <option value="1">Active</option>
                          <option value="2">Inactive</option>
                        </Form.Select>
                      </Col>
                      </Row>

                      {selectedOption == "Saathi" && (
                        <Row>
                          <Col className="p-3">
                            <Form.Control
                              as="textarea"
                              placeholder="Brief Bio"
                              style={{ padding: "8px", fontSize: "12px" }}
                              rows={3}
                              value={bio}
                              onChange={(event) => setBio(event.target.value)}
                            />
                          </Col>
                        </Row>
                      )}

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

                      {alert && (
                        <Alert variant="success" className="h6 mx-3 w-50">
                          {alert}
                        </Alert>
                      )}
                    </Form>
                  </div>
                </Card.Body>
              </Card>
            </Container>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriberRegisteration;
