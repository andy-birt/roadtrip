import { useContext, useEffect, useState } from "react";
import { Button, CardGroup, Container, Form, FormControl, FormGroup, FormLabel, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { TripContext } from "./TripProvider";
import { Trip } from "./Trip";
import { StartLocationMap } from "../map/StartLocationMap";

export const TripList = ({ userId }) => {

  const { trips, getTrips, saveTrip, updateTrip } = useContext(TripContext);

  const [ showModal, setShowModal ] = useState(false);

  const [ trip, setTrip ] = useState({ userId });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const newTripValue = { ...trip };
    newTripValue[e.target.id] = e.target.value;
    setTrip(newTripValue);
  }

  useEffect(() => {
    getTrips();
  }, []);

  return (
    <Container>
      <h2>Trips</h2>
      <Button className='mb-2'
        onClick={() => {
          setShowModal(true);
          setTrip({});
        }}
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
              <FormControl id="name" defaultValue={trip.name} placeholder="Enter a Name for Your Trip" onChange={handleInputChange} />
              <FormLabel>Description</FormLabel>
              <FormControl id="description" as="textarea" value={trip.description}  placeholder="Enter a Description About Your Trip" onChange={handleInputChange} />
              {
                //* If editing the trip don't set a different starting location 
                !trip.id &&
                <>
                  <FormLabel>Starting Location</FormLabel>
                  <StartLocationMap trip={trip} setTrip={setTrip} />
                </>
              }
            </FormGroup>
          </Modal.Body>
          <Modal.Footer>
            <Button 
              onClick={() => {
                if (trip.id) {
                  setShowModal(false);
                  updateTrip(trip).then(() => getTrips());
                } else {
                  if (trip.homeCoords) saveTrip({ ...trip, userId: userId, poiIds: [] }).then((trip) => navigate(`/trips/${trip.id}`));
                  else alert("You didn't select a location");
                }
              }} 
              variant="primary"
            >{trip.id ? 'Edit' : 'Create'} Trip</Button>
          </Modal.Footer>
        </Form>
      </Modal>
      <CardGroup bsPrefix='trips'>
        {
          trips.map(trip => <Trip key={trip.id} trip={trip} setShowModal={setShowModal} setTrip={setTrip}/>)
        }
      </CardGroup>
    </Container>
  );
}