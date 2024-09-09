import React,{useState,useEffect} from 'react'
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Alert from 'react-bootstrap/Alert';


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
    const[alert,setAlert]=useState('')
    const[list,setList]=useState('')
    const[subId,setSubId]=useState('')
    const[newPatron,setNewPatron]=useState(false)
   

    const userId =localStorage.getItem("userId");

    useEffect(() => {

      console.log("hello")
      const fetchData = async () => {
     

      axios.get(`https://saathi.etheriumtech.com:444/Saathi/admin-users/${userId}/subscribers`)
      .then(res => {
          console.log(res.data[0].firstName)
          setList(res.data)
      })
      .catch(err => 
          console.log(err)
      )
      };
      fetchData();
    }, []);


    const navigate = useNavigate(); 
    const handleCancel = () => {
      navigate('/dashboard'); 
  };

  const handlePatron =()=>{
    setNewPatron(true)
  }
  const cancelPatron =()=>{
    setNewPatron(false)
  }


  const handleSubmit = async (event) => {
    event.preventDefault();
   
  
    // Send a POST request using Axios with the form data
    axios
      .post(`https://saathi.etheriumtech.com:444/Saathi/patrons`, {

       "firstName": first,
       "lastName": last,
        "email": email,
        "dob": dob,
        "contactNo": mob,
        "countryCode": countryCode,
        "status": 1, // You can adjust this based on your form inputs
        "createdBy": parseInt(userId),
        "updatedBy": null,
        "address1":add1,
        "address2":add2,
        "city":city,
        "state":state,
        "country":country,
        "relation":relation,
        "subscriberID":parseInt(subId)
      }
      )
      .then((response) => {
        console.log("Response:", response.data); 
        if (response.data) {
          setAlert('Patron created successfully!!');
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
        console.error('Error creating user:', error); // Handle errors
        setAlert('An error occurred. Please try again later.');
      });
  };
  

  return (
    <div>
          <div className="d-flex">
         <Container className="justify-content-center align-items-center mt-5 px-5">

<Card className="shadow-sm pb-3">
      <Card.Body>
     <div className="d-flex justify-content-center">
        <div className="mt-2">
            <h4> Patron Details</h4>
        </div>
     </div>
     <hr/>
      <Form  onSubmit={handleSubmit}>
      <Row>
                                    <Col className="p-3" md={4}>
                                    <Form.Label className="label-style">Select a Subscriber</Form.Label>
                                        <Form.Select
                                            style={{ padding: '8px', fontSize: "12px" }}
                                            aria-label="Select Option"
                                            value={subId} 
                                            onChange={(event) => setSubId(event.target.value)} 
                                            required
                                        >
                                          <option value="">Select Subscriber</option>
                                            
                                            {list.length > 0 && list.map((subscriber) => (
                                                <option key={subscriber.subscriberID} value={subscriber.subscriberID}>
                                                    {subscriber.firstName} {subscriber.lastName}
                                                </option>
                                            ))}
                                        </Form.Select>
                                    </Col>
                                    </Row>
      <Row>
        <Col className="p-3">
        <Form.Label className="label-style">First Name</Form.Label>
          <Form.Control placeholder="First name"
          style={{ padding: '8px',fontSize:"12px" }}
          value={first} 
            onChange={(event) => setFirst(event.target.value)}
            required
          />
        </Col>
        <Col className="p-3">
        <Form.Label className="label-style">Last Name</Form.Label>
        <Form.Control placeholder="Last name"
            style={{ padding: '8px',fontSize:"12px" }} 
          value={last} 
            onChange={(event) => setLast(event.target.value)}
            required/>
        </Col>
      </Row>
      <Row>
      <Col className="p-3">
      <Form.Label className="label-style">Email</Form.Label>
      <Form.Control placeholder="Email"
            style={{ padding: '8px',fontSize:"12px" }}
          value={email} 
            onChange={(event) => setEmail(event.target.value)} 
            required/>
        </Col>
        <Col className="p-3">
        <Form.Label className="label-style">Date of Birth</Form.Label>
        <Form.Control
            type="date"
            placeholder="D.O.B"
            style={{ padding: '8px',fontSize:"12px" }}
            value={dob} 
            onChange={(event) => setDob(event.target.value)}
            required
          />
        </Col>
      </Row>


      <Row>
      <Col className="p-3">
      <Row className="align-items-center">
    {/* Country Code Select */}
    <Col xs="auto" lg={2}>
    <Form.Label className="label-style">Code</Form.Label>
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
    <Form.Label className="label-style">Phone No</Form.Label>
      <Form.Control
        placeholder="Phone Number"
        style={{ padding: '8px', fontSize: '12px' }}
        value={mob} // Use state to manage the phone number input
        onChange={(event) => setMob(event.target.value)} // Update state on change
        required
      />
    </Col>
  </Row>
        </Col>
        <Col className="p-3">
        <Form.Label className="label-style">Relation with Subscriber</Form.Label>
        <Form.Control placeholder="Relation"
          style={{ padding: '8px',fontSize:"12px" }}
          value={relation} 
            onChange={(event) => setRelation(event.target.value)}
            required
          />
        </Col>
      </Row>



      <Row>
        <Col className="p-3">
        <Form.Label className="label-style">Address Line 1</Form.Label>
        <Form.Control
            as="textarea"
            placeholder="Address line 1"
            style={{ padding: '8px',fontSize:"12px" }}
            rows={2} 
            value={add1} 
            onChange={(event) => setAdd1(event.target.value)}
            required
          />
        </Col>
        <Col className="p-3">
        <Form.Label className="label-style">Address Line 2</Form.Label>
        <Form.Control
            as="textarea"
            placeholder="Address Line 2"
            style={{ padding: '8px',fontSize:"12px" }}
            rows={2} 
            value={add2} 
            onChange={(event) => setAdd2(event.target.value)}
            required
          />
        </Col>
      </Row>

      <Row>

      <Col className="p-3">
        <Form.Label className="label-style">City</Form.Label>
        <Form.Control placeholder="City"
          style={{ padding: '8px',fontSize:"12px" }}
          value={city} 
            onChange={(event) => setCity(event.target.value)}
            required/>
        </Col>
        <Col className="p-3">
        <Form.Label className="label-style">State</Form.Label>
          <Form.Control placeholder="State"
          style={{ padding: '8px',fontSize:"12px" }}
          value={state} 
            onChange={(event) => setState(event.target.value)}
            required
          />
        </Col>
        <Col className="p-3">
        <Form.Label className="label-style">Country</Form.Label>
        <Form.Control placeholder="Country"
            style={{ padding: '8px',fontSize:"12px" }} 
          value={country} 
            onChange={(event) => setCountry(event.target.value)}
            required/>
        </Col>
      </Row>
   
      {newPatron && (
        <>


<div className="d-flex justify-content-center">
        <div className="mt-2">
            <h4> Add Another Patron</h4>
        </div>
     </div>
<hr/>
      <Row>
        <Col className="p-3">
        <Form.Label className="label-style">First Name</Form.Label>
          <Form.Control placeholder="First name"
          style={{ padding: '8px',fontSize:"12px" }}
          value={first} 
            onChange={(event) => setFirst(event.target.value)}
            required
          />
        </Col>
        <Col className="p-3">
        <Form.Label className="label-style">Last Name</Form.Label>
        <Form.Control placeholder="Last name"
            style={{ padding: '8px',fontSize:"12px" }} 
          value={last} 
            onChange={(event) => setLast(event.target.value)}
            required/>
        </Col>
      </Row>
      <Row>
      <Col className="p-3">
      <Form.Label className="label-style">Email</Form.Label>
      <Form.Control placeholder="Email"
            style={{ padding: '8px',fontSize:"12px" }}
          value={email} 
            onChange={(event) => setEmail(event.target.value)} 
            required/>
        </Col>
        <Col className="p-3">
        <Form.Label className="label-style">Date of Birth</Form.Label>
        <Form.Control
            type="date"
            placeholder="D.O.B"
            style={{ padding: '8px',fontSize:"12px" }}
            value={dob} 
            onChange={(event) => setDob(event.target.value)}
            required
          />
        </Col>
      </Row>


      <Row>
      <Col className="p-3">
      <Row className="align-items-center">
    {/* Country Code Select */}
    <Col xs="auto" lg={2}>
    <Form.Label className="label-style">Code</Form.Label>
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
    <Form.Label className="label-style">Phone No</Form.Label>
      <Form.Control
        placeholder="Phone Number"
        style={{ padding: '8px', fontSize: '12px' }}
        value={mob} // Use state to manage the phone number input
        onChange={(event) => setMob(event.target.value)} // Update state on change
        required
      />
    </Col>
  </Row>
        </Col>
        <Col className="p-3">
        <Form.Label className="label-style">Relation with Subscriber</Form.Label>
        <Form.Control placeholder="Relation"
          style={{ padding: '8px',fontSize:"12px" }}
          value={relation} 
            onChange={(event) => setRelation(event.target.value)}
            required
          />
        </Col>
      </Row>



      <Row>
        <Col className="p-3">
        <Form.Label className="label-style">Address Line 1</Form.Label>
        <Form.Control
            as="textarea"
            placeholder="Address line 1"
            style={{ padding: '8px',fontSize:"12px" }}
            rows={2} 
            value={add1} 
            onChange={(event) => setAdd1(event.target.value)}
            required
          />
        </Col>
        <Col className="p-3">
        <Form.Label className="label-style">Address Line 2</Form.Label>
        <Form.Control
            as="textarea"
            placeholder="Address Line 2"
            style={{ padding: '8px',fontSize:"12px" }}
            rows={2} 
            value={add2} 
            onChange={(event) => setAdd2(event.target.value)}
            required
          />
        </Col>
      </Row>

    
      <Row>
      <Col className="p-3">
        <Form.Label className="label-style">City</Form.Label>
        <Form.Control placeholder="City"
          style={{ padding: '8px',fontSize:"12px" }}
          value={city} 
            onChange={(event) => setCity(event.target.value)}
            required/>
        </Col>

        <Col className="p-3">
        <Form.Label className="label-style">State</Form.Label>
          <Form.Control placeholder="State"
          style={{ padding: '8px',fontSize:"12px" }}
          value={state} 
            onChange={(event) => setState(event.target.value)}
            required
          />
        </Col>
        <Col className="p-3">
        <Form.Label className="label-style">Country</Form.Label>
        <Form.Control placeholder="Country"
            style={{ padding: '8px',fontSize:"12px" }} 
          value={country} 
            onChange={(event) => setCountry(event.target.value)}
            required/>
        </Col>
      </Row>
   
        </>
      )}

<div className="d-flex">
      <Button
    variant="primary"
    onClick={handlePatron}
    style={{
      backgroundColor: '#009efb',
      borderColor: '#009efb',
      color: 'white',
      margin: "4px",
      fontSize: "12px"
    }}
  >
    Add Patron
  </Button>

  <Button
    variant="secondary"
    type="button"
    onClick={cancelPatron}
    style={{
   
      color: 'white',
      margin: "4px",
      fontSize: "12px"
    }}
  >
    Cancel
  </Button>
  </div>
           
      <div className="d-flex justify-content-between mt-3">
  <Button
    variant="primary"
    type="submit"
    style={{
      backgroundColor: '#009efb',
      borderColor: '#009efb',
      color: 'white',
      margin: "4px",
      fontSize: "12px"
    }}
  >
    Save
  </Button>

  <Button
    variant="secondary"
    type="button"
    onClick={handleCancel}
    style={{
   
      color: 'white',
      margin: "4px",
      fontSize: "12px"
    }}
  >
    Cancel
  </Button>
</div>


{alert && (
                <Alert variant="success" className="h6 mx-3 mt-3 w-50" >
                  {alert}
                </Alert>
              )}
    </Form>
      </Card.Body>
    </Card>
    </Container>
    </div>


    
    </div>
  )
}

export default PatronDetails