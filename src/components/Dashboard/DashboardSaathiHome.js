import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { Link } from "react-router-dom";


const DashboardSaathiHome = () => {

  const userId = localStorage.getItem("userId");

  const [list, setList] = useState("");

  useEffect(() => {
    console.log("hello");
    const fetchData = async () => {
      axios
        .get(
          `https://saathi.etheriumtech.com:444/Saathi/admin-users/${userId}/subscribers/services`
        )
        .then((res) => {
          // Filter the data where status is 1
         
     console.log(res.data)
          
          setList(res.data);
        })
        .catch((err) => console.log(err));
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
      <h4>Pending Requests</h4>
      
  </div>

 
</div>
<hr/>
<div>
<table class="table  table-bordered table-striped table-font-size">
  <thead>
    <tr  class="table-info">
      <th scope="col">S.No</th>
      <th scope="col">Subscriber Name</th>
      <th scope="col">Service Name</th>
      <th scope="col">Requested Time</th>
      <th scope="col">Status</th>
      <th scope="col">Update</th>
    </tr>
  </thead>
  <tbody>
                    {list.length > 0 ? list.map((item, index) => (
                      <tr key={index}>
                        <th scope="row"> <div style={{  padding: '5px' }} className="m-2">{index + 1}</div></th>
                        <td> <div style={{  padding: '5px' }} className="m-2"> {item.subscriberName} </div></td>
                        <td>
  {item.services && item.services.length > 0 ? (
    <ol>
      {item.services.map((p, index) => (
        <li key={index}>
           <div style={{  padding: '5px' }} className="m-2"> 
          {p.serviceName}
          </div>
        </li>
      ))}
    </ol>
  ) : (
    <span></span>
  )}
</td>
<td>
  {item.services && item.services.length > 0 ? (
    <ul style={{ listStyleType: 'none', paddingLeft: '0' }}>
      {item.services.map((p, index) => (
        <li key={index}>
          <div style={{  padding: '5px' }} className="m-2"> 
            {p.requestedTime && (
              <>
          {`${p.requestedTime}:00`}
          </>
            )}
          
          </div>
        </li>
      ))}
    </ul>
  ) : (
    <span></span>
  )}
</td>
<td>
{item.services && item.services.length > 0 ? (
  <ul style={{ listStyleType: 'none', paddingLeft: '0' }}>
    {item.services.map((p, index) => (
      <li key={index}>
        <div
          style={{
            color: p.color === 'amber' ? '#FFBF00' : p.color, // Conditional color setting
            padding: '5px'
          }}
          className="m-2"
        >
          Pending
        </div>
      </li>
    ))}
  </ul>
) : (
  <span></span>
)}
</td>
                        <td>
                        
                        <span className="text-decoration-none me-3">
                          <Link to={`/dashboard/serviceTaskList/${item.subscriberID}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                          <div style={{  padding: '5px' }} className="m-2">
                            <i className="bi bi-pencil-fill edit-btn-color"></i> </div>
                          </Link>
                        </span>
                        {/* <span>
                          <i
                            className="bi bi-trash3-fill delete-btn-color"
                            onClick={() => handleDelete(item.subscriberID)}
                            style={{ cursor: 'pointer' }}
                          ></i>
                        </span> */}
                        
                        </td>
                      </tr>
                    )) : (
                      <tr>
                        <td colSpan="7">No Subscriber</td>
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

export default DashboardSaathiHome