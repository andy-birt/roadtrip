import { Row, Col, Card, Container } from "react-bootstrap";
import L from 'leaflet';
import { RoadTripMap } from "../map/RoadTripMap";


//! For some reason we have to manually delete the default icon
//! and pull it locally... manually...
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});




export const TripPlan = () => {
  return (
    <div className="d-flex">
      <div className="point-of-interest-list">
        <Container>
          <Row xs={1} className="g-4 pt-3">
            {Array.from({ length: 4 }).map((_, idx) => (
              <Col key={idx}>
                <Card>
                  <Card.Body>
                    <Card.Title>Card title</Card.Title>
                    <Card.Text>
                      This is a longer card with supporting text below as a natural
                      lead-in to additional content. This content is a little bit longer.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </div>
      <RoadTripMap />
    </div>
  );
}