import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Trip.css"

export const Trip = ({ trip }) => {
  return (
    <Card className='trip'>
        <Card.Body>
          <Card.Title>
            <Link to={`/trips/${trip.id}`}>
              {trip.name}
            </Link>
          </Card.Title>
          <Card.Text>
            {trip.description}
          </Card.Text>
          <Button variant='outline-success'>
            <i className='bi bi-pencil-square' ></i>
            Edit
          </Button>
          {' '}
          <Button variant='outline-danger'>
            <i className='bi bi-trash'></i>
            Delete
          </Button>
        </Card.Body>
      </Card>
  );
}