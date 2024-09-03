import React,{useState} from 'react'
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';


const PatronDetails = () => {

    
    const[first,setFirst]=useState('')
    const[last,setLast]=useState('')
    const[middle,setMiddle]=useState('')
    const[mob,setMob]=useState('')
    const[email,setEmail]=useState('')
    const[dob,setDob]=useState('')
    const[add1,setAdd1]=useState('')
    const[add2,setAdd2]=useState('')
    const[city,setCity]=useState('')
    const[state,setState]=useState('')
    const[country,setCountry]=useState('')
    const[relation,setRelation]=useState('')
    const[countryCode,setCountryCode]=useState('')
    const[sub,setSub]=useState('')
   
  return (
    <div>
          <div className="d-flex">
         <Container className="justify-content-center aligh-items-center mt-5" style={{margin:"25px"}}>

<Card className="shadow-sm pb-3">
      <Card.Body>
     <div className="d-flex justify-content-center">
        <div className="mt-2">
            <h4> Patron Details</h4>
        </div>
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
      <Form.Select
           style={{ padding: '8px',fontSize:"12px" }}
          aria-label="Select Option"
          value={sub} 
          onChange={(event) => setSub(event.target.value)} 
        >
          <option>Select Subscriber</option>
          <option value="1">Active</option>
          <option value="2">Inactive</option>
          
        </Form.Select>
        </Col>
        <Col className="p-3">
        <Form.Control placeholder="Relation"
          style={{ padding: '8px',fontSize:"12px" }}
          value={state} 
            onChange={(event) => setState(event.target.value)}
          />
        </Col>
      </Row>



      <Row>
        <Col className="p-3">
        <Form.Control
            as="textarea"
            placeholder="Address line 1"
            style={{ padding: '8px',fontSize:"12px" }}
            rows={3} 
            value={add1} 
            onChange={(event) => setAdd1(event.target.value)}
          />
        </Col>
        <Col className="p-3">
        <Form.Control
            as="textarea"
            placeholder="Address Line 2"
            style={{ padding: '8px',fontSize:"12px" }}
            rows={3} 
            value={add2} 
            onChange={(event) => setAdd2(event.target.value)}
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
        <Form.Control placeholder="City"
          style={{ padding: '8px',fontSize:"12px" }}
          value={city} 
            onChange={(event) => setCity(event.target.value)}/>
        </Col>
      </Row>

      <Row>
        <Col className="p-3">
          <Form.Control placeholder="State"
          style={{ padding: '8px',fontSize:"12px" }}
          value={state} 
            onChange={(event) => setState(event.target.value)}
          />
        </Col>
        <Col className="p-3">
        <Form.Control placeholder="Country"
            style={{ padding: '8px',fontSize:"12px" }} 
          value={country} 
            onChange={(event) => setCountry(event.target.value)}/>
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
        Save
      </Button>


    </Form>
      </Card.Body>
    </Card>
    </Container>
    </div>


    
    </div>
  )
}

export default PatronDetails