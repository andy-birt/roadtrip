import { createContext, useState } from "react";

export const TripContext = createContext();

export const TripProvider = (props) => {

  const [trips, setTrips] = useState([]);

  const getTrips = () => {
    return fetch(`http://localhost:8088/trips?userId=${props.userId}`)
    .then(res => res.json())
    .then(trips => setTrips(trips));
  }

  const getTripById = (tripId) => {
    return fetch(`http://localhost:8088/trips/${tripId}`)
    .then(res => res.json());
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

  const updateTrip = (trip) => {
    return fetch(`http://localhost:8088/trips/${trip.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(trip)
    });
  }

  const savePointOfInterestOrder = (tripId, order) => {
    return fetch(`http://localhost:8088/trips/${tripId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(order)
    })
    .then(res => res.json())
    .then(() => getTripById(tripId));
  }

  const deleteTrip = (tripId) => {
    return fetch(`http://localhost:8088/trips/${tripId}`, {
      method: "DELETE"
    }).then(getTrips);
  }

  return (
    <TripContext.Provider
      value={{
        trips, getTrips, getTripById, saveTrip, deleteTrip, savePointOfInterestOrder, updateTrip
      }}
    >
      {props.children}
    </TripContext.Provider>
  );
}