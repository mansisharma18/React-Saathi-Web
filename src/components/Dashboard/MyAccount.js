import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import axios from "axios";
import { Link } from 'react-router-dom';

const MyAccount = () => {
  const [list, setList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`https://saathi.etheriumtech.com:444/Saathi/admin-users`);
        // Filter users with status 1
        const activeUsers = res.data.filter(user => user.status === 1);
        setList(activeUsers);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    const AdMap = {
      status: 0,
    };

    const formData = new FormData();
    Object.keys(AdMap).forEach((key) => {
      formData.append(key, AdMap[key]);
    });

    try {
      const response = await axios.post(`https://saathi.etheriumtech.com:444/Saathi/admin-users/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data) {
        // Filter the list locally after deleting
        const updatedList = list.filter(user => user.adminUserID !== id);
        setList(updatedList);
      } else {
        console.error('An error occurred. Please contact the development team.');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div>
      <Container className="justify-content-center align-items-center mt-5" style={{ margin: "25px" }}>
        <Card className="shadow-sm pb-3">
          <Card.Body>
            <div className="d-flex justify-content-center">
              <div className="mt-2">
                <h3>Users List</h3>
                <hr />
              </div>
            </div>
            <div>
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">User Type</th>
                    <th scope="col">First Name</th>
                    <th scope="col">Last Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Edit/Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {list.length > 0 ? list.map((item, index) => (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>{item.userType}</td>
                      <td>{item.firstName}</td>
                      <td>{item.lastName}</td>
                      <td>{item.email}</td>
                      <td>
                        <span className="text-decoration-none me-3">
                          <Link to={`/updateAdminUsers/${item.adminUserID}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                            <i className="bi bi-pencil-fill"></i>
                          </Link>
                        </span>
                        <span>
                          <i
                            className="bi bi-trash3-fill"
                            onClick={() => handleDelete(item.adminUserID)}
                            style={{ cursor: 'pointer' }}
                          ></i>
                        </span>
                      </td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan="6">No data available</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

export default MyAccount;
