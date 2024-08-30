import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import loginImage from "../../assets/images/saathiLoginImg.jpeg";
import Container from "react-bootstrap/esm/Container";
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Card from "react-bootstrap/Card";
import axios from "axios";

const Login = () => {
  const [validated, setValidated] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://saathi.etheriumtech.com:444/Saathi/subscribers/active`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const json = await response.json();
        console.log(json);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
  
    // Create a new FormData object
    const formData = new FormData();
  
    // Append email and password to the FormData object
    formData.append('email', JSON.stringify(email));
    formData.append('password', JSON.stringify(password));
  
    // Send a POST request using Axios with the form data
    axios
      .post(`https://saathi.etheriumtech.com:444/Saathi/admin/login`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Specify the content type as form data
        },
      })
      .then((res) => {
        console.log(res.data); // Handle the response from the server
        // localStorage.setItem('userid', res.data.userId);
        // const getid = localStorage.getItem('userid');
        // console.log('getid', getid, '660e81b21eb13a8336fdd26f');
      })
      .catch((err) => console.log(err)); // Handle errors
  };
  
  return (
    <>
      <Container
        className=" d-flex justify-content-center aligh-items-center mt-5"
        style={{ margin: "25px" }}
      >
        <Card className="shadow-sm pb-3">
          <Card.Body>
            <div className="signup">
              <Row>
                {/* <Col sm={7}>
         <img src={loginImage} alt="loginimg"/>
        </Col> */}

                <Col>
                  <div className="p-2">
                    <h2>Log in</h2>
                    <p>Enter your details below</p>

                    <Form onSubmit={handleSubmit}>
                      <Row className="mb-3">
                        <Form.Group
                          as={Col}
                          md="9"
                          controlId="validationCustom02"
                        >
                          <Form.Control
                            required
                            type="text"
                            placeholder="Email or phone number"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </Form.Group>
                      </Row>

                      <Row className="mb-3">
                        <Form.Group
                          as={Col}
                          md="9"
                          controlId="validationCustom03"
                        >
                          <Form.Control
                            required
                            type="text"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                        </Form.Group>

                        <div className="pt-4 d-flex">
                          <div>
                            <Button variant="danger" type="submit">
                              Login
                            </Button>
                          </div>
                          <div className="ms-auto">
                            {/* <p><Link to="#">Forgot Password</Link></p> */}
                          </div>
                        </div>
                      </Row>
                    </Form>
                  </div>
                </Col>
              </Row>
            </div>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default Login;
