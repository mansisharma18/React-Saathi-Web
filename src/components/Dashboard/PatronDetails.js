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
   
  return (
    <div>
          <div className="d-flex">
         <Container className="justify-content-center aligh-items-center mt-5">

<Card className="shadow-sm pb-5">
      <Card.Body>
     <div className="d-flex justify-content-center">
        <div className="mt-4">
            <h2>Enter Patron Details</h2>
        </div>
     </div>
      <Form>
      <Row>
        <Col className="p-3">
          <Form.Control placeholder="First name"
          style={{ padding: '12px' }}
          value={first} 
            onChange={(event) => setFirst(event.target.value)}
          />
        </Col>
        <Col className="p-3">
          <Form.Control placeholder="Middle name"
          style={{ padding: '12px' }}
          value={middle} 
            onChange={(event) => setMiddle(event.target.value)} />
        </Col>
      </Row>
      <Row>
      <Col className="p-3">
          <Form.Control placeholder="Last name"
          style={{ padding: '12px' }} 
          value={last} 
            onChange={(event) => setLast(event.target.value)}/>
        </Col>
        <Col className="p-3">
          <Form.Control placeholder="Email Address"
          style={{ padding: '12px' }}
          value={email} 
            onChange={(event) => setEmail(event.target.value)} />
        </Col>
      </Row>
      <Row>
      <Col className="p-3">
          <Form.Control
            type="date"
            placeholder="D.O.B"
            style={{ padding: '12px' }}
            value={dob} 
            onChange={(event) => setDob(event.target.value)}
          />
        </Col>
        <Col className="p-3">
          <Form.Control placeholder="Phone Number"
          style={{ padding: '12px' }} 
          value={mob} 
            onChange={(event) => setMob(event.target.value)}/>
        </Col>
      </Row>
   
      
      
      <Button variant="primary"
       type="submit"
       style={{
        backgroundColor: 'darkslateblue',  
        borderColor: 'darkslateblue',    
        width: '200px',            
        color: 'white',
        margin:"4px"      
      }}
       >
        Submit
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