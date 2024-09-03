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
import { useNavigate,Link } from 'react-router-dom';

const Login = () => {
  const [validated, setValidated] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  

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



    const AdMap = {
      email:email,
      password:password
    };
  
    console.log('AdMap:', AdMap);
  
  
    const formData = new FormData();
  
    Object.keys(AdMap).forEach((key) => {
      formData.append(key, AdMap[key]);
    });
  
    axios
      .post(`https://saathi.etheriumtech.com:444/Saathi/admin/login`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Specify the content type as form data
        },
      })
      .then((res) => {
        console.log(res.data); 
        localStorage.setItem('userType', res.data.userType);
        const user = localStorage.getItem('userType');
        console.log('user', user);
         // Redirect to /dashboard after successful login
         navigate('/dashboard'); // Use navigate to redirect
      })
      .catch((err) => console.log(err)); // Handle errors
  };
  
  return (
    <>
      <Container
        className=" d-flex justify-content-center align-items-center"
        style={{marginTop:"150px"}}
      >
        <Card className="shadow-sm pb-2">
          <Card.Body>
            <div className="">
              <Row>
              
                <Col>
                  <div className="">
                  <div className="text-center">
  <p className="" style={{
    fontSize: "20px", 
    fontFamily: "'Helvetica Neue', sans-serif", 
    fontWeight: "300", 
    letterSpacing: "0.5px"
  }}>
    Sign In
  </p>
</div>




                  
                   

                    <Form onSubmit={handleSubmit}>
                      <Row className="mb-3">
                        <Form.Group
                          as={Col}
                          md="12"
                          controlId="validationCustom02"
                        >
                          <Form.Control
                            required
                            type="text"
                            placeholder="Username"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={{fontSize:"14px"}}
                          />
                        </Form.Group>
                      </Row>

                      <Row className="mb-3">
                        <Form.Group
                          as={Col}
                          md="12"
                          controlId="validationCustom03"
                        >
                          <Form.Control
                            required
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={{fontSize:"14px"}}
                          />
                        </Form.Group>

                        <div className="pt-4 d-flex">
                          <div>
                            <Button variant="primary" type="submit" style={{fontSize:"12px"}}>
                              Login
                            </Button>
                          </div>
                          <div className="ms-auto">
                            <span style={{fontSize:"14px"}}><Link to="#">Forgot Password</Link></span>
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