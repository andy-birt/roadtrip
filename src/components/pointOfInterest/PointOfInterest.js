import { Col, Card } from "react-bootstrap";

export const PointOfInterest = ({ poi }) => (
  <Col>
    <Card>
      <Card.Body>
        {
          poi.name ? <Card.Title>{ poi.name }</Card.Title> : null
        }
        <Card.Text>
          { poi.textContents }
        </Card.Text>
      </Card.Body>
    </Card>
  </Col>
);