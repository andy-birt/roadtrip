import { createContext, useState } from "react";

export const TripContext = createContext();

export const TripProvider = (props) => {

  const [trips, setTrips] = useState([]);

  const getTrips = () => {
    return fetch(`http://localhost:8088/trips?userId=${props.userId}`)
    .then(res => res.json()).then(trips => setTrips(trips));
  }

  return (
    <TripContext.Provider
      value={{
        trips, getTrips
      }}
    >
      {props.children}
    </TripContext.Provider>
  );
}