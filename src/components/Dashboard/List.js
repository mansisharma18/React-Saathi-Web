import React,{useState} from 'react'
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';



const List = () => {
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
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
    </tr>
    <tr>
      <th scope="row">2</th>
      <td>Jacob</td>
      <td>Thornton</td>
      <td>@fat</td>
    </tr>
    <tr>
      <th scope="row">3</th>
      <td>Larry</td>
      <td>the Bird</td>
      <td>@twitter</td>
    </tr>
    <tr>
      <th scope="row">4</th>
      <td>Barry</td>
      <td>the Bird</td>
      <td>@linkedin</td>
    </tr>

    <tr>
      <th scope="row">5</th>
      <td>Garry</td>
      <td>the Bird</td>
      <td>@twitter</td>
    </tr>
    
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