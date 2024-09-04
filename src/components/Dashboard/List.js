import React,{useState,useEffect} from 'react'
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import axios from "axios";
import { Link } from 'react-router-dom';



const List = () => {

  const [list, setList] = useState("");

    
  useEffect(() => {

      console.log("hello")
      const fetchData = async () => {
     

      axios.get(`https://saathi.etheriumtech.com:444/Saathi/admin-users/8/subscribers`)
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
  return (
    <div>
       <div className="d-flex">
   <Container className="justify-content-center aligh-items-center mt-5" style={{margin:"25px"}}>

<Card className="shadow-sm pb-3">
<Card.Body>
<div className="d-flex justify-content-center">
  <div className="mt-2">
      <h3>Subscriber's List</h3>
      <hr/>
  </div>

 
</div>

<div>
<table class="table table-striped">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">First Name</th>
      <th scope="col">Last Name</th>
      <th scope="col">Email</th>
      <th scope="col">Update</th>
    </tr>
  </thead>
  <tbody>
                    {list.length > 0 ? list.map((item, index) => (
                      <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td>{item.firstName}</td>
                        <td>{item.lastName}</td>
                        <td>{item.email}</td>
                        <td>
                        <span className="text-decoration-none me-3">
                          <Link to={`/updateSubscriber/${item.subscriberID}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                            <i className="bi bi-pencil-fill"></i>
                          </Link>
                        </span>
                        </td>
                      </tr>
                    )) : (
                      <tr>
                        <td colSpan="4">No data available</td>
                      </tr>
                    )}
                  </tbody>
</table>
  </div>

</Card.Body>
</Card>
</Container>
</div>

    </div>
  )
}

export default List