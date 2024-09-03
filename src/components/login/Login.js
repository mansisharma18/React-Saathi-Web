import React, { useState, useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [validated, setValidated] = useState(false);
  const [email, setEmail] = useState("");
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
      email: email,
      password: password,
    };

    console.log("AdMap:", AdMap);

    const formData = new FormData();

    Object.keys(AdMap).forEach((key) => {
      formData.append(key, AdMap[key]);
    });

    axios
      .post(`https://saathi.etheriumtech.com:444/Saathi/admin/login`, formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Specify the content type as form data
        },
      })
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("userType", res.data.userType);
        const user = localStorage.getItem("userType");
        console.log("user", user);
        // Redirect to /dashboard after successful login
        navigate("/dashboard"); // Use navigate to redirect
      })
      .catch((err) => console.log(err)); // Handle errors
  };

  return (
    <>
      <div
        className="d-flex justify-content-center align-items-center vh-100"
        style={{ backgroundColor: "#f7f7f7" }} // Background color for the whole page
      >
        <Card className="shadow-sm" style={{ width: "400px", borderRadius: "10px" }}>
          <Card.Body>
            <div className="text-center mb-4">
              <h3 style={{ fontWeight: "bold", fontFamily: "'Helvetica Neue', sans-serif" ,color: "#6c757d" }}>Sign In</h3>
            </div>
            <Form onSubmit={handleSubmit} noValidate validated={validated}>
              <Form.Group className="mb-3" controlId="validationCustom02">
                <Form.Control
                  required
                  type="text"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ fontSize: "14px", padding: "10px" }}
                />
                <Form.Control.Feedback type="invalid">Please provide a valid email.</Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-4" controlId="validationCustom03">
                <Form.Control
                  required
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ fontSize: "14px", padding: "10px" }}
                />
                <Form.Control.Feedback type="invalid">Please provide a password.</Form.Control.Feedback>
              </Form.Group>

              <div className="d-flex align-items-center justify-content-between mb-3">
                <Button variant="primary" type="submit" style={{ fontSize: "12px", padding: "7px 16px" }}>
                  Login
                </Button>
                <Link to="#" style={{ fontSize: "14px", textDecoration: "none" }}>
                  Forgot Password?
                </Link>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </>
  );
};

export default Login;