import { useContext, useEffect } from "react";
import { TripContext } from "./TripProvider";
import { Trip } from "./Trip";
import { CardGroup, Container } from "react-bootstrap";

export const TripList = () => {

  const { trips, getTrips } = useContext(TripContext);

  useEffect(() => {
    getTrips();
  }, []);

  return (
    <Container>
      <h2>Trips</h2>
      <CardGroup bsPrefix='trips'>
        {
          trips.map(trip => <Trip key={trip.id} trip={trip}/>)
        }
      </CardGroup>
    </Container>
  );
}