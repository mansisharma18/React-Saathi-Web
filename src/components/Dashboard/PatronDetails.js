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
    const[first1,setFirst1]=useState('')
    const[last,setLast]=useState('')
    const[last1,setLast1]=useState('')
    const[middle,setMiddle]=useState('')
    const[mob,setMob]=useState('')
    const[mob1,setMob1]=useState('')
    const[email,setEmail]=useState('')
    const[email1,setEmail1]=useState('')
    const[dob,setDob]=useState('')
    const[dob1,setDob1]=useState('')
    const[add1,setAdd1]=useState('')
    const[add1Second,setAdd1Second]=useState('')
    const[add2,setAdd2]=useState('')
    const[add2Second,setAdd2Second]=useState('')
    const[city,setCity]=useState('')
    const[city1,setCity1]=useState('')
    const[state,setState]=useState('')
    const[state1,setState1]=useState('')
    const[country,setCountry]=useState('')
    const[country1,setCountry1]=useState('')
    const[relation,setRelation]=useState('')
    const[relation1,setRelation1]=useState('')
    const[countryCode,setCountryCode]=useState('')
    const[countryCode1,setCountryCode1]=useState('')
    const[sub,setSub]=useState('')
    const[alert,setAlert]=useState('')
    const[list,setList]=useState('')
    const[subId,setSubId]=useState('')
    const[newPatron,setNewPatron]=useState(false)
    const[comments,setComments]=useState('')
    const[comments1,setComments1]=useState('')
    const[displayAddButton,setDisplayAddButton]=useState(true)
    const[displayCancelButton,setDisplayCancelButton]=useState(true)
    const [loading, setLoading] = useState(false);
    

   

    const userId =localStorage.getItem("userId");

    useEffect(() => {

      console.log("hello")
      const fetchData = async () => {
     

      axios.get(`https://saathi.etheriumtech.com:444/Saathi/admin-users/${userId}/subscribers`)
      .then(res => {
          console.log(res.data[0].firstName)
          // setList(res.data)
          const filteredList = res.data.filter(item => 
            (!item.patrons || item.patrons.length === 0) && item.status === 1
          );

        console.log("Filtered data:", filteredList);
        setList(filteredList);
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
    setDisplayAddButton(false)

  }
  const cancelPatron =()=>{
    setNewPatron(false)
    setDisplayAddButton(true)
  }


  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true)
   
  
    const payload = [
      {
        firstName: first,
        lastName: last,
        email: email,
        dob: dob,
        contactNo: mob,
        countryCode: countryCode,
        createdBy: parseInt(userId),
        updatedBy: null,
        address1: add1,
        address2: add2,
        city: city,
        state: state,
        country: country,
        relation: relation,
        subscriberID: parseInt(subId),
      },
      {
        firstName: first1,
        lastName: last1,
        email: email1,
        dob: dob1,
        contactNo: mob1,
        countryCode: countryCode1,
        createdBy: parseInt(userId),
        updatedBy: null,
        address1: add1Second,
        address2: add2Second,
        city: city1,
        state: state1,
        country: country1,
        relation: relation1,
        subscriberID: parseInt(subId),
      }
    ];

    // Only add the second patron's data if the fields are filled out
    // if (first1 && last1 && email1 && mob1 && countryCode1) {
    //   payload.push({
    //     firstName: first1,
    //     lastName: last1,
    //     email: email1,
    //     dob: dob1,
    //     contactNo: mob1,
    //     countryCode: countryCode1,
    //     createdBy: parseInt(userId),
    //     updatedBy: null,
    //     address1: add1Second,
    //     address2: add2Second,
    //     city: city1,
    //     state: state1,
    //     country: country1,
    //     relation: relation1,
    //     subscriberID: parseInt(subId),
    //   });
    // }
    axios
      .post(`https://saathi.etheriumtech.com:444/Saathi/patrons`,payload
      )
      .then((response) => {
        console.log("Response:", response.data); 
        if (response.data) {
          setAlert('Patron created successfully!!');
          
        } 
         else {
          setAlert('An error occurred. Please contact the development team.');
        }

        setTimeout(() => {
          setAlert('');
          setLoading(false)
          navigate('/dashboard')
        }, 5000); // Hide alert after 3 seconds
      })
      .catch((err) => {
        console.log(err);
        if(err.status==500){
            setAlert("Some error occured. Please try again later")
        }
        else if(err.status==400){
          setAlert("Some error occured. Please try again later")
      }
        else{
        setAlert(err.response.data)
        }
        setTimeout(() => {
            setAlert('');
            setLoading(false)
          }, 5000); // Hide alert after 3 seconds
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
            <h4>Add Patron Details</h4>
        </div>
     </div>
     <hr/>
     <div style={{ position: 'relative' }}>
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
<Card className="shadow-sm pb-3">
<Card.Body>
                                    <div className="d-flex justify-content-center">
        <div className="mt-2">
            <h4>Add Patron 1</h4>
        </div>
     </div>
     <hr/>

      <Row>
        <Col className="p-3">
        <Form.Label className="label-style">First Name</Form.Label>
          <Form.Control placeholder=" Patron's First name"
          style={{ padding: '8px',fontSize:"12px" }}
          value={first} 
            onChange={(event) => setFirst(event.target.value)}
            required
          />
        </Col>
        <Col className="p-3">
        <Form.Label className="label-style">Last Name</Form.Label>
        <Form.Control placeholder="  Patron's Last name"
            style={{ padding: '8px',fontSize:"12px" }} 
          value={last} 
            onChange={(event) => setLast(event.target.value)}
            required/>
        </Col>
      </Row>
      <Row>
      <Col className="p-3">
      <Form.Label className="label-style">Email</Form.Label>
      <Form.Control placeholder="Patron's Email"
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
        placeholder="Patron's Phone Number"
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
        <Form.Control placeholder="Patron's Relation with Subscriber"
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

      <Row>
        <Col className="p-3">
        <Form.Label className="label-style">Add Comments</Form.Label>
        <Form.Control
            as="textarea"
            placeholder="Add Comments"
            style={{ padding: '8px',fontSize:"12px" }}
            rows={2} 
            value={comments} 
            onChange={(event) => setComments(event.target.value)}
            required
          />
        </Col>
        </Row>
</Card.Body>
        </Card>
   
      
        <>

<Card className="shadow-sm pb-5 mt-5">
  <Card.Body>

 
<div className="d-flex justify-content-center">
        <div className="mt-2">
            <h4> Add Patron 2</h4>
        </div>
     </div>
<hr/>
      <Row>
        <Col className="p-3">
        <Form.Label className="label-style">First Name</Form.Label>
          <Form.Control placeholder="Patron's First name"
          style={{ padding: '8px',fontSize:"12px" }}
          value={first1} 
            onChange={(event) => setFirst1(event.target.value)}
            required
          />
        </Col>
        <Col className="p-3">
        <Form.Label className="label-style">Last Name</Form.Label>
        <Form.Control placeholder="Patron's Last name"
            style={{ padding: '8px',fontSize:"12px" }} 
          value={last1} 
            onChange={(event) => setLast1(event.target.value)}
            required/>
        </Col>
      </Row>
      <Row>
      <Col className="p-3">
      <Form.Label className="label-style">Email</Form.Label>
      <Form.Control placeholder="Patron's Email"
            style={{ padding: '8px',fontSize:"12px" }}
          value={email1} 
            onChange={(event) => setEmail1(event.target.value)} 
            required/>
        </Col>
        <Col className="p-3">
        <Form.Label className="label-style">Date of Birth</Form.Label>
        <Form.Control
            type="date"
            placeholder="D.O.B"
            style={{ padding: '8px',fontSize:"12px" }}
            value={dob1} 
            onChange={(event) => setDob1(event.target.value)}
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
        value={countryCode1} // Add a state for countryCode
        onChange={(event) => setCountryCode1(event.target.value)} // Set the state for countryCode
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
        placeholder="Patron'sPhone Number"
        style={{ padding: '8px', fontSize: '12px' }}
        value={mob1} 
        onChange={(event) => setMob1(event.target.value)} 
        required
      />
    </Col>
  </Row>
        </Col>
        <Col className="p-3">
        <Form.Label className="label-style">Relation with the Subscriber</Form.Label>
        <Form.Control placeholder="Patron's Relation with Subscriber"
          style={{ padding: '8px',fontSize:"12px" }}
          value={relation1} 
            onChange={(event) => setRelation1(event.target.value)}
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
            value={add1Second} 
            onChange={(event) => setAdd1Second(event.target.value)}
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
            value={add2Second} 
            onChange={(event) => setAdd2Second(event.target.value)}
            required
          />
        </Col>
      </Row>

    
      <Row>
      <Col className="p-3">
        <Form.Label className="label-style">City</Form.Label>
        <Form.Control placeholder="City"
          style={{ padding: '8px',fontSize:"12px" }}
          value={city1} 
            onChange={(event) => setCity1(event.target.value)}
            required/>
        </Col>

        <Col className="p-3">
        <Form.Label className="label-style">State</Form.Label>
          <Form.Control placeholder="State"
          style={{ padding: '8px',fontSize:"12px" }}
          value={state1} 
            onChange={(event) => setState1(event.target.value)}
            required
          />
        </Col>
        <Col className="p-3">
        <Form.Label className="label-style">Country</Form.Label>
        <Form.Control placeholder="Country"
            style={{ padding: '8px',fontSize:"12px" }} 
          value={country1} 
            onChange={(event) => setCountry1(event.target.value)}
            required/>
        </Col>
      </Row>

      <Row>
        <Col className="p-3">
        <Form.Label className="label-style">Add Comments</Form.Label>
        <Form.Control
            as="textarea"
            placeholder="Add Comments"
            style={{ padding: '8px',fontSize:"12px" }}
            rows={2} 
            value={comments1} 
            onChange={(event) => setComments1(event.target.value)}
            required
          />
        </Col>
        </Row>

        </Card.Body>
        </Card>
   
        </>
      

{/* <div className="d-flex mt-3">

  {displayAddButton && (
    
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

  )}

  {displayCancelButton && (
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

  )}

 
  </div>       */}


      <div className="d-flex justify-content-between mt-3">
  <Button
    variant="primary"
    type="submit"
    disabled={loading}
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



    </Form>

    {alert && (
    <div
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 999, // Ensures it appears above the form
        width: '100%', // Adjust width if needed
        display: 'flex',
        justifyContent: 'center', // Centers alert horizontally
        alignItems: 'center', // Ensures proper alignment in flexbox
      }}
    >
      <Alert variant="success" className="h6 w-50" >
        {alert}
      </Alert>
    </div>
  )}
    </div>
      </Card.Body>
    </Card>
    </Container>
    </div>


    
    </div>
  )
}

export default PatronDetails