import React,{useState,useEffect} from 'react'
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import axios from "axios";
import Avatar from '@mui/material/Avatar';
import { imagePath } from '../../ImagePath';


const SaathiList = () => {

    const [list, setList] = useState("");

    useEffect(() => {

        console.log("hello")
        const fetchData = async () => {
       

        axios.get(`https://saathi.etheriumtech.com:444/Saathi/admin-users/saathi/subscribers`)
        .then(res => {
            console.log(res.data[0].firstName)
            // console.log(res.data[0].picture.split('webapps/')[1])
            const activeUsers = res.data.filter(user => user.status === 1);
            // Sort by createdDate in descending order (latest first)
     const sortedUsers = activeUsers.sort((a, b) => new Date(b.createdDate) - new Date(a.createdDate));
     
    //  setList(sortedUsers);
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
           <div>
       <div className="d-flex">
   <Container className="justify-content-center aligh-items-center mt-5 px-5">

<Card className="shadow-sm pb-3">
<Card.Body>
<div className="d-flex justify-content-center">
  <div className="mt-2">
      <h4>Saathis- Subscribers Associated</h4>
     
  </div>

 
</div>
<hr/>

<div>
  <table class="table  table-bordered   table-striped table-font-size">
  <thead>
    <tr  class="table-info">
      <th scope="col"className="col-1">S.No</th>
      <th scope="col" className="col-5">Saathi Name</th>
     
      {/* <th scope="col">Email</th> */}
      <th scope="col" className="col-6">Subscribers</th>
      {/* <th scope="col">Contact No</th> */}
    </tr>
  </thead>
  <tbody>
  {list.length > 0 ? list.map((item, index) => {
    // Extract the image path or provide a fallback if the picture is null
    const picturePath = item.picture ? `${imagePath}${item.picture.split('webapps/')[1]}` : null;

    return (
      <tr key={index}>
        <th scope="row">{index + 1}</th>
        <td>
          <div className="d-flex align-items-center">
            <div className="me-3">
              <Avatar 
                alt={`${item.firstName} ${item.lastName}`} 
                src={picturePath} 
                sx={{ width: 34, height: 34 }} 
              />
            </div>
            <div>{item.firstName} {item.lastName}</div>
          </div>
        </td>
        <td>
        <ol>
              <li>Mansi</li>
              <li>Hamza</li>
              <li>Arnav</li>
              <li>Diksha</li>
            </ol>
        </td>
       
      </tr>
    );
  }) : (
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
    </div>
  )
}

export default SaathiList