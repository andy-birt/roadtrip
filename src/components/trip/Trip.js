import { useState, useContext } from "react";
import { Button, Card, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import { TripContext } from "./TripProvider";
import "./Trip.css"

export const Trip = ({ trip, setShowModal, setTrip }) => {
  
  const { deleteTrip } = useContext(TripContext);

  const [ showDeleteModal, setShowDeleteModal ] = useState(false);

  return (
    <>
    
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
          <Button 
            onClick={() => {
              setShowModal(true);
              setTrip({
                ...trip,
                id: trip.id
              })
            }} 
            variant='outline-success'
          >
            <i className='bi bi-pencil-square' ></i>
            Edit
          </Button>
          {' '}
          <Button 
            onClick={() => {
              setShowDeleteModal(true);
            }}
            variant='outline-danger'
          >
            <i className='bi bi-trash'></i>
            Delete
          </Button>
        </Card.Body>
      </Card>
      <Modal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete This Trip?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete "{trip.name}"?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() => setShowDeleteModal(false)}
            variant="success"
            className="form-control"
          >Ugh, are we there yet?</Button>
          <Button 
            onClick={() => deleteTrip(trip.id)} 
            variant="danger"
            className="form-control"
          >That's it! I'm turning this car around!</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}