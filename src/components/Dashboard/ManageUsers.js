import React,{useState} from 'react'
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';


const ManageUsers = () => {

    const[first,setFirst]=useState('')
    const[last,setLast]=useState('')
    const[middle,setMiddle]=useState('')
    const[mob,setMob]=useState('')
    const[email,setEmail]=useState('')
    const[dob,setDob]=useState('')
    const[image,setImage]=useState('')
    const[bio,setBio]=useState('')
    const [selectedOption, setSelectedOption] = useState('Admin');
    const[password,setPassword]=useState('')
    const[countryCode,setCountryCode]=useState('')




  return (
    <div className="d-flex">
         <Container className="justify-content-center aligh-items-center mt-5 ml-5" style={{margin:"25px"}}>

<Card className="shadow-sm pb-3" >
      <Card.Body>

      <div className="d-flex justify-content-center">
        <div className="mt-2">
            <h4>Create a User</h4>

        </div>
       
     </div>
      <div>
          <Form>
          <Row>
     
        <Col lg={3} className="p-3">
          <Form.Select
             style={{ padding: '8px',fontSize:"12px" }}
            aria-label="Select Option"
            value={selectedOption} 
            onChange={(event) => setSelectedOption(event.target.value)} 
          >
            <option>User Type</option>
            <option value="1">Admin</option>
            <option value="2">Saathi</option>
            
          </Form.Select>
        </Col>
      </Row>
          </Form>
        </div>
   
      <Form>
      <Row>
        <Col className="p-3">
          <Form.Control placeholder="First name"
          style={{ padding: '8px',fontSize:"12px" }}
          value={first} 
            onChange={(event) => setFirst(event.target.value)}
          />
        </Col>
        <Col className="p-3">
        <Form.Control placeholder="Last name"
            style={{ padding: '8px',fontSize:"12px" }}
          value={last} 
            onChange={(event) => setLast(event.target.value)}/>
        </Col>
      </Row>
      <Row>
      <Col className="p-3">
      <Form.Control placeholder="Email Address"
           style={{ padding: '8px',fontSize:"12px" }}
          value={email} 
            onChange={(event) => setEmail(event.target.value)} />
        </Col>
        <Col className="p-3">
        <Form.Control
            type="date"
            placeholder="D.O.B"
            style={{ padding: '8px',fontSize:"12px" }}
            value={dob} 
            onChange={(event) => setDob(event.target.value)}
          />
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
        value={countryCode} // Add a state for countryCode
        onChange={(event) => setCountryCode(event.target.value)} // Set the state for countryCode
      >
        {/* Replace the options below with a full list of country codes as needed */}
        <option >+91</option>
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
        value={mob} // Use state to manage the phone number input
        onChange={(event) => setMob(event.target.value)} // Update state on change
      />
    </Col>
  </Row>
        </Col>
        <Col className="p-3">
        <Form.Control
            type="file"
            accept="image/*"
            placeholder="Select Image"
            style={{ padding: '8px',fontSize:"12px" }}
            value={image} 
            onChange={(event) => setImage(event.target.value)}
          />
        </Col>
      </Row>

      <Row>
      <Col className="p-3">
      <Form.Control placeholder="Password"
           style={{ padding: '8px',fontSize:"12px" }}
          value={password} 
            onChange={(event) => setPassword(event.target.value)}/>
        </Col>
        <Col className="p-3">
      
        <Form.Select
             style={{ padding: '8px',fontSize:"12px" }}
            aria-label="Select Option"
            value={selectedOption} 
            onChange={(event) => setSelectedOption(event.target.value)} 
          >
            <option>Status</option>
            <option value="1">Active</option>
            <option value="2">Inactive</option>
            
          </Form.Select>
        </Col>
      </Row>


    
      <Row>
        <Col className="p-3">
          <Form.Control
            as="textarea"
            placeholder="Brief Bio"
            style={{ padding: '8px',fontSize:"12px" }}
            rows={3} 
            value={bio} 
            onChange={(event) => setBio(event.target.value)}
          />
        </Col>
      </Row>


      
      <Button variant="primary"
       type="submit"
       style={{
        width: '200px',            
        backgroundColor: '#009efb',  
        borderColor: '#009efb',    
        width: '200px',            
        color: 'white',
        margin:"4px",
        fontSize:"12px"     
      }}
       >
        Submit
      </Button>

    </Form>
      </Card.Body>
    </Card>
    </Container>
    </div>
  )
}

export default ManageUsers