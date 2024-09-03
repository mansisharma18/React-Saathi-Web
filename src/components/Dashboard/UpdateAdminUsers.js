import React, { useState ,useEffect} from 'react';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import axios from "axios";
import FloatingLabel from 'react-bootstrap/FloatingLabel';

const UpdateAdminUsers = () => {
    const [first, setFirst] = useState('');
    const [last, setLast] = useState('');
    const [middle, setMiddle] = useState('');
    const [mob, setMob] = useState('');
    const [email, setEmail] = useState('');
    const [dob, setDob] = useState('');
    const [image, setImage] = useState('');
    const [bio, setBio] = useState('');
    const [selectedOption, setSelectedOption] = useState('Admin');
    const [password, setPassword] = useState('');
    const [countryCode, setCountryCode] = useState('');
    const [status, setStatus] = useState('');
    const[alert,setAlert]=useState();


    
  useEffect(() => {
    const fetchData = async () => {
      try {
       
      axios.get(`https://saathi.etheriumtech.com:444/Saathi/admin-users/1`)
      .then(res => {
          console.log(res.data.firstName)
          setFirst(res.data.firstName)
          setLast(res.data.lastName)
          setMob(res.data.contactNo)
          setEmail(res.data.email)
          setDob(res.data.dob)
          setBio(res.data.briefBio)
          setSelectedOption(res.data.userType)
          setPassword(res.data.password)
          setCountryCode(res.data.countryCode)
          setStatus(res.data.status)
          
      })
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };
    fetchData();
  }, []);

  const handleSubmit=(e)=>{
    e.preventDefault()

    const AdMap = {
        firstName: first,
        lastName: last,
        email: email,
        dob: dob,
        contactNo: mob,
        countryCode: countryCode,
        briefBio: bio,
        userType: selectedOption,
        password: password,
        status: 1, // You can adjust this based on your form inputs
        // createdBy: 87,
        updatedBy: 1,
        picture:image
      };
    
      console.log('AdMap:', AdMap);
      const formData = new FormData();
    
      Object.keys(AdMap).forEach((key) => {
        formData.append(key, AdMap[key]);
      });
    
      for (let [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
      }
    axios
    .post(`https://saathi.etheriumtech.com:444/Saathi/admin-users/1`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
    .then((response) => {
      console.log("Response:", response.data); 
      if (response.data) {
        setAlert('User updated successfully!!');
      } 
    //   else if (response.data === 0) {
    //     setAlert('Company not created. Please check all fields and try again.');
    //   }
       else {
        setAlert('An error occurred. Please contact the development team.');
      }

      setTimeout(() => {
        setAlert('');
      }, 5000); // Hide alert after 3 seconds
    })
    .catch((error) => {
      console.error('Error creating ad:', error); // Handle errors
    });

    
  }


  return (
    <div>
            <div className="d-flex">
            <Container className="justify-content-center aligh-items-center mt-5 ml-5" style={{ margin: "25px" }}>
                <Card className="shadow-sm pb-3">
                    <Card.Body>
                        <div className="d-flex justify-content-center">
                            <div className="mt-2">
                                {/* <h4>Update User</h4> */}
                            </div>
                        </div>
                        <div>
                            {/* Consolidated Form */}
                            <Form onSubmit={handleSubmit}>
                                <Row>
                                    <Col lg={3} className="p-3">
                                        <Form.Select
                                            style={{ padding: '8px', fontSize: "12px" }}
                                            aria-label="Select Option"
                                            value={selectedOption}
                                            onChange={(event) => setSelectedOption(event.target.value)}
                                        >
                                            <option>User Type</option>
                                            <option value="Admin">Admin</option>
                                            <option value="Saathi">Saathi</option>
                                        </Form.Select>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className="p-3">
                                        <Form.Control
                                            placeholder="First name"
                                            style={{ padding: '8px', fontSize: "12px" }}
                                            value={first}
                                            onChange={(event) => setFirst(event.target.value)}
                                        />
                                    </Col>
                                    <Col className="p-3">
                                        <Form.Control
                                            placeholder="Last name"
                                            style={{ padding: '8px', fontSize: "12px" }}
                                            value={last}
                                            onChange={(event) => setLast(event.target.value)}
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className="p-3">
                                        <Form.Control
                                            placeholder="Email Address"
                                            style={{ padding: '8px', fontSize: "12px" }}
                                            value={email}
                                            onChange={(event) => setEmail(event.target.value)}
                                        />
                                    </Col>
                                    <Col className="p-3">
                                    <Form.Group className="position-relative">
        <Form.Control
            type="date"
            className="date-input-with-label"
            style={{ paddingLeft: '45px', fontSize: '12px' }}  // Adjust padding to accommodate the label
            value={dob}
            onChange={(event) => setDob(event.target.value)}
        />
    </Form.Group>

                                        
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className="p-3">
                                        <Row className="align-items-center">
                                            {/* Country Code Select */}
                                            <Col xs="auto" lg={2}>
                                                <Form.Select
                                                    style={{ padding: '8px', fontSize: '12px' }}
                                                    aria-label="Select Country Code"
                                                    value={countryCode}
                                                    onChange={(event) => setCountryCode(event.target.value)}
                                                >
                                                    <option>+91</option>
                                                    <option value="+91">+91 (India)</option>
                                                    <option value="+44">+44 (UK)</option>
                                                    {/* Add more options as needed */}
                                                </Form.Select>
                                            </Col>

                                            {/* Phone Number Input */}
                                            <Col>
                                                <Form.Control
                                                    placeholder="Phone Number"
                                                    style={{ padding: '8px', fontSize: '12px' }}
                                                    value={mob}
                                                    onChange={(event) => setMob(event.target.value)}
                                                />
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col className="p-3">
                                        <Form.Control
                                            type="file"
                                            accept="image/*"
                                            placeholder="Select Image"
                                            style={{ padding: '8px', fontSize: "12px" }}
                                            value={image}
                                            onChange={(event) => setImage(event.target.value)}
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
                                    <Col className="p-3" md={6}>
                                        <Form.Select
                                            style={{ padding: '8px', fontSize: "12px" }}
                                            aria-label="Select Option"
                                            value={status}
                                            onChange={(event) => setStatus(event.target.value)} // Corrected setStatus
                                        >
                                            <option>Status</option>
                                            <option value="1">Active</option>
                                            <option value="2">Inactive</option>
                                        </Form.Select>
                                    </Col>
                                </Row>



{selectedOption== "Saathi" &&
(
    <Row>
    <Col className="p-3">
        <Form.Control
            as="textarea"
            placeholder="Brief Bio"
            style={{ padding: '8px', fontSize: "12px" }}
            rows={3}
            value={bio}
            onChange={(event) => setBio(event.target.value)}
        />
    </Col>
</Row>

)}
                             

                                {/* Submit Button */}
                                <Button
                                    variant="primary"
                                    type="submit"
                                    style={{
                                        width: '200px',
                                        backgroundColor: '#009efb',
                                        borderColor: '#009efb',
                                        color: 'white',
                                        margin: "4px",
                                        fontSize: "12px"
                                    }}
                                >
                                    Update
                                </Button>

                                {alert && (
                <Alert variant="success" className="h6 mx-3">
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
  )
}

export default UpdateAdminUsers