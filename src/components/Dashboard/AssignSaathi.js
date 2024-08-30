import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

const AssignSaathi = () => {
    // States for fetched data
    const [sub, setSub] = useState([]);
    const [saathi, setSaathi] = useState([]);

    // States for selected values
    const [selectedSub, setSelectedSub] = useState('');
    const [selectedSaathi, setSelectedSaathi] = useState('');
    const [alert, setAlert] = useState('');

    useEffect(() => {
        const fetchList = async () => {
            try {
                const res = await axios.get(`https://saathi.etheriumtech.com:444/Saathi/subscribers/active`);
                console.log(res.data[0].firstName);
                setSub(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchList();

        const fetchData = async () => {
            try {
                const res = await axios.get(`https://saathi.etheriumtech.com:444/Saathi/admin-users/saathi`);
                console.log(res.data[0].firstName);
                setSaathi(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent default form submission
        axios.post(`https://saathi.etheriumtech.com:444/Saathi/subscribers/`, {
            saathiID: selectedSaathi, // Use the selectedSaathi state
        })
        .then((res) => {
            console.log(res.data);
            setAlert('Assignment successful');
        })
        .catch((err) => {
            console.log(err);
        });
    }

    return (
        <div>
            <div className="d-flex">
                <Container className="justify-content-center aligh-items-center mt-5" style={{ margin: "25px" }}>
                    <Card className="shadow-sm pb-3">
                        <Card.Body>
                            <div className="d-flex justify-content-center">
                                <div className="mt-2">
                                    <h4>Assign a Saathi</h4>
                                </div>
                            </div>
                            <Form onSubmit={handleSubmit}>
                                <Row>
                                    <Col className="p-3">
                                        <Form.Select
                                            style={{ padding: '8px', fontSize: "12px" }}
                                            aria-label="Select Option"
                                            value={selectedSub} 
                                            onChange={(event) => setSelectedSub(event.target.value)} 
                                        >
                                            <option value="">Select Subscriber</option>
                                            {sub.length > 0 && sub.map((subscriber) => (
                                                <option key={subscriber.subscriberID} value={subscriber.subscriberID}>
                                                    {subscriber.firstName} {subscriber.lastName}
                                                </option>
                                            ))}
                                        </Form.Select>
                                    </Col>
                                    <Col className="p-3">
                                        <Form.Select
                                            style={{ padding: '8px', fontSize: "12px" }}
                                            aria-label="Select Option"
                                            value={selectedSaathi} 
                                            onChange={(event) => setSelectedSaathi(event.target.value)} 
                                        >
                                            <option value="">Select Saathi</option>
                                            {saathi.length > 0 && saathi.map((subscriber) => (
                                                <option key={subscriber.adminUserID} value={subscriber.adminUserID}>
                                                    {subscriber.firstName} {subscriber.lastName}
                                                </option>
                                            ))}
                                        </Form.Select>
                                    </Col>
                                </Row>

                                <Button variant="primary"
                                    type="submit"
                                    style={{
                                        width: '200px',            
                                        backgroundColor: '#009efb',  
                                        borderColor: '#009efb',    
                                        color: 'white',
                                        margin: "4px",
                                        fontSize: "12px"
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
    );
}

export default AssignSaathi;
