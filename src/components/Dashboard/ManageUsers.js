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


  return (
    <div className="d-flex">
         <Container className="justify-content-center aligh-items-center mt-5">

<Card className="shadow-sm pb-5">
      <Card.Body>
     <div className="d-flex justify-content-center">
        <div className="mt-4">
            <h4>Create a User</h4>
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
          <Form.Control placeholder="Middle name"
            style={{ padding: '8px',fontSize:"12px" }}
          value={middle} 
            onChange={(event) => setMiddle(event.target.value)} />
        </Col>
      </Row>
      <Row>
      <Col className="p-3">
          <Form.Control placeholder="Last name"
            style={{ padding: '8px',fontSize:"12px" }}
          value={last} 
            onChange={(event) => setLast(event.target.value)}/>
        </Col>
        <Col className="p-3">
          <Form.Control placeholder="Email Address"
           style={{ padding: '8px',fontSize:"12px" }}
          value={email} 
            onChange={(event) => setEmail(event.target.value)} />
        </Col>
      </Row>
      <Row>
      <Col className="p-3">
          <Form.Control
            type="date"
            placeholder="D.O.B"
            style={{ padding: '8px',fontSize:"12px" }}
            value={dob} 
            onChange={(event) => setDob(event.target.value)}
          />
        </Col>
        <Col className="p-3">
          <Form.Control placeholder="Phone Number"
           style={{ padding: '8px',fontSize:"12px" }}
          value={mob} 
            onChange={(event) => setMob(event.target.value)}/>
        </Col>
      </Row>
      <Row>
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
        <Col className="p-3">
          <Form.Select
             style={{ padding: '8px',fontSize:"12px" }}
            aria-label="Select Option"
            value={selectedOption} 
            onChange={(event) => setSelectedOption(event.target.value)} 
          >
            <option>Select Option</option>
            <option value="1">Admin</option>
            <option value="2">Saathi</option>
            
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
  )
}

export default ManageUsers