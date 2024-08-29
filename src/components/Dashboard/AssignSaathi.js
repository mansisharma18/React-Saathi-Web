import React,{useState} from 'react'
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';



const AssignSaathi = () => {

    const[sub,setSub]=useState('')
    const[saathi,setSaathi]=useState('')
    
  return (
    <div>
    <div className="d-flex">
   <Container className="justify-content-center aligh-items-center mt-5" style={{margin:"25px"}}>

<Card className="shadow-sm pb-3">
<Card.Body>
<div className="d-flex justify-content-center">
  <div className="mt-2">
      <h4>Assign a Saathi</h4>
  </div>
</div>
<Form>

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
      
        <Form.Select
             style={{ padding: '8px',fontSize:"12px" }}
            aria-label="Select Option"
            value={saathi} 
            onChange={(event) => setSaathi(event.target.value)} 
          >
            <option>Select Saathi</option>
            <option value="1">Active</option>
            <option value="2">Inactive</option>
            
          </Form.Select>
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



</div>
  )
}

export default AssignSaathi