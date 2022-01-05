import { createContext, useState } from "react";

export const TripContext = createContext();

export const TripProvider = (props) => {

  const [trips, setTrips] = useState([]);

  const getTrips = () => {
    return fetch(`http://localhost:8088/trips?userId=${props.userId}`)
    .then(res => res.json()).then(trips => setTrips(trips));
  }

  const saveTrip = (trip) => {
    return fetch('http://localhost:8088/trips', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(trip)
    }).then(res => res.json());
  }

  const deleteTrip = (tripId) => {
    return fetch(`http://localhost:8088/${tripId}`, {
      method: "DELETE"
    })
  }

  return (
    <TripContext.Provider
      value={{
        trips, getTrips, saveTrip, deleteTrip
      }}
    >
      {props.children}
    </TripContext.Provider>
  );
}