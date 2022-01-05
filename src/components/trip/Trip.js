import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Trip.css"

export const Trip = ({ trip }) => {
  return (
    <Link to={`/trips/${trip.id}`}>
      <Card className='trip'>
        <Card.Body>
          <Card.Title>
            {trip.name}
          </Card.Title>
          <Card.Text>
            {trip.description}
          </Card.Text>
        </Card.Body>
      </Card>
    </Link>
  );
}