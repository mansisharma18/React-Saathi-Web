import React from 'react'
import Header from './Header'
import Footer from './Footer'
import Container from 'react-bootstrap/esm/Container'
import Card from 'react-bootstrap/Card';



const HomePage = () => {
  return (
    <div >
        <Header/>
        <div className="d-flex justify-content-center align-items-center">
            <Container>
               <div style={{height:"380px",marginTop:"200px"}}>
                <div className="d-flex justify-content-center align-items-center">
                    <div className="m-3 p-2">
                    <Card style={{ width: '22rem' }}>
      <Card.Body>
        <Card.Title>Gold</Card.Title>
      
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Card.Link href="#">Card Link</Card.Link>
        <Card.Link href="#">Another Link</Card.Link>
      </Card.Body>
    </Card>
                    </div>
                    <div className="m-3 p-2">
                    <Card style={{ width: '22rem' }}>
      <Card.Body>
        <Card.Title>Silver</Card.Title>
       
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Card.Link href="#">Card Link</Card.Link>
        <Card.Link href="#">Another Link</Card.Link>
      </Card.Body>
    </Card>
                    </div>
                    <div className="m-3 p-2"> 
                    <Card style={{ width: '22rem' }}>
      <Card.Body>
        <Card.Title>Bronze</Card.Title>
        
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Card.Link href="#">Card Link</Card.Link>
        <Card.Link href="#">Another Link</Card.Link>
      </Card.Body>
    </Card>
                    </div>
                </div>

               </div>
            </Container>
        </div>
        <Footer/>
    </div>
  )
}

export default HomePage