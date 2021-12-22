import { useState } from "react";
import { Form, Row, Col, Card, Alert, Container, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

export const Login = () => {

  const [email, setEmail] = useState('');
  const [showDialog, setShowDialog] = useState(false);

  const navigate = useNavigate();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    return fetch(`http://localhost:8088/users?email=${email}`)
    .then(res => res.json()).then(users => users[0]).then(user => {
      if (user) {
        localStorage.setItem('roadtrip_user', JSON.stringify(user));
        navigate('/');
      } else {
        setShowDialog(!user);      
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
        User doesnt exist
      </Alert>
      <Row className='justify-content-center align-items-center' style={{height: window.innerHeight}}>
        <Card className="align-items-center" style={{ padding: '2rem', flexBasis: '420px' }}>
          <h2>Login</h2>
          <Card.Body>
            <Form className="" onSubmit={handleSubmit}>
              <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                <Form.Label column sm="3">
                  Email
                </Form.Label>
                <Col sm="9">
                  <Form.Control onChange={(e) => setEmail(e.target.value)}  type="text" />
                </Col>
              </Form.Group>
              <Button className='form-control' type='submit'>Login</Button>
            </Form>
          </Card.Body>
          <p>Don't Have an account? <Link to='/register'>Register</Link></p>
        </Card>
      </Row>
    </Container>
  );
}