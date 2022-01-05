import { useContext, useEffect, useState } from "react";
import { Button, CardGroup, Container, Form, FormControl, FormGroup, FormLabel, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { TripContext } from "./TripProvider";
import { Trip } from "./Trip";

export const TripList = ({ userId }) => {

  const { trips, getTrips, saveTrip } = useContext(TripContext);

  const [ showModal, setShowModal ] = useState(false);

  const [ newTrip, setNewTrip ] = useState({ userId });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const newTripValue = { ...newTrip };
    newTripValue[e.target.id] = e.target.value
    setNewTrip(newTripValue);
  }

  useEffect(() => {
    getTrips();
  }, []);

  return (
    <Container>
      <h2>Trips</h2>
      <Button className='mb-2'
        onClick={() => setShowModal(true)}
      >New Trip</Button>
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Create a Trip</Modal.Title>
        </Modal.Header>
        <Form>
          <Modal.Body>
            <FormGroup>
              <FormLabel>Trip Name</FormLabel>
              <FormControl id="name" placeholder="Enter a Name for Your Trip" onChange={handleInputChange} />
              <FormLabel>Description</FormLabel>
              <FormControl id="description" as="textarea" placeholder="Enter a Description About Your Trip" onChange={handleInputChange} />
            </FormGroup>
          </Modal.Body>
          <Modal.Footer>
            <Button 
              onClick={() => saveTrip(newTrip).then((trip) => navigate(`/trips/${trip.id}`))} 
              variant="primary"
            >Create Trip</Button>
          </Modal.Footer>
        </Form>
      </Modal>
      <CardGroup bsPrefix='trips'>
        {
          trips.map(trip => <Trip key={trip.id} trip={trip}/>)
        }
      </CardGroup>
    </Container>
  );
}