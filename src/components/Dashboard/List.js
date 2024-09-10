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

  const userId =localStorage.getItem("userId");

  const [list, setList] = useState("");

    
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
  return (
    <div>
       <div className="d-flex">
   <Container className="justify-content-center aligh-items-center mt-5 px-5">

<Card className="shadow-sm pb-3">
<Card.Body>
<div className="d-flex justify-content-center">
  <div className="mt-2">
      <h4>Subscriber's List</h4>
      
  </div>

 
</div>
<hr/>
<div>
<table class="table table-striped table-font-size">
  <thead>
    <tr  class="table-info">
      <th scope="col">S.No</th>
      <th scope="col">First Name</th>
      <th scope="col">Last Name</th>
      <th scope="col">Email</th>
      <th scope="col">Package</th>
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
                        <td>{item.packageName}</td>
                        <td>
                        <span className="text-decoration-none me-3">
                          <Link to={`/dashboard/updateSubscriber/${item.subscriberID}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                            <i className="bi bi-pencil-fill edit-btn-color"></i>
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