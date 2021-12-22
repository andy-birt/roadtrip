import { Form, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export const Register = () => (
  <Row className='justify-content-center align-items-center' style={{height: window.innerHeight, width: window.innerWidth}}>
    <Card className="align-items-center" style={{ padding: '2rem', flexBasis: '420px' }}>
      <h2>Register</h2>
      <Card.Body>
        <Form className="">
          <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
          <Form.Label column sm="4">
            Email
          </Form.Label>
          <Col sm="8">
            <Form.Control type="text" />
          </Col>
        </Form.Group>
        </Form>
      </Card.Body>
      <p>Already Have an account? <Link to='/login'>Login</Link></p>
    </Card>
  </Row>
);