import { useContext, useEffect } from "react";
import { TripContext } from "./TripProvider";
import { Trip } from "./Trip";

export const TripList = () => {

  const { trips, getTrips } = useContext(TripContext);

  useEffect(() => {
    getTrips();
  }, []);

  return (
    <>
      {
        trips.map(trip => <Trip key={trip.id} trip={trip}/>)
      }
    </>
  );
}