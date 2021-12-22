import { useState } from 'react';
import { Form, Row, Col, Card, Container, Alert, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

export const Register = () => {
  
  const [user, setUser] = useState({});
  const [showDialog, setShowDialog] = useState(false);
  
  const navigate = useNavigate();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    return fetch(`http://localhost:8088/users?email=${user.email}`)
    .then(res => res.json()).then(users => !!users.length).then(userExists => {
      if (!userExists) {
        fetch('http://localhost:8088/users', {
          method: 'POST',
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(user)
        }).then(res => res.json()).then(createdUser => {
          if (createdUser.hasOwnProperty('id')) {
            localStorage.setItem('roadtrip_user', JSON.stringify(createdUser));
            navigate('/');
          }
        })
      } else {
        setShowDialog(userExists);
      }
    });
  }

  return (
    <Container>
      <Alert 
        variant='danger'
        className="mt-3"
        dismissible
        show={showDialog}
        onClose={() => setShowDialog(false)}
      >
        User already exist
      </Alert>
      <Row className='justify-content-center align-items-center' style={{height: window.innerHeight}}>
        <Card className="align-items-center" style={{ padding: '2rem', flexBasis: '420px' }}>
          <h2>Register</h2>
          <Card.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                <Form.Label column sm="3">
                  Email
                </Form.Label>
                <Col sm="9">
                  <Form.Control type="text" onChange={(e) => setUser({ ...user, email: e.target.value })} />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                <Form.Label column sm="3">
                  Name
                </Form.Label>
                <Col sm="9">
                  <Form.Control type="text" onChange={(e) => setUser({ ...user, name: e.target.value })} />
                </Col>
              </Form.Group>
              <Button className='form-control' type='submit'>Register</Button>
            </Form>
          </Card.Body>
          <p>Already Have an account? <Link to='/login'>Login</Link></p>
        </Card>
      </Row>
    </Container>
  );
}