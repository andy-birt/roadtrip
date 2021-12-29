import { useState, createContext } from "react";

export const PointOfInterestContext = createContext();

export const PointOfInterestProvider = (props) => {

  const [ pointOfInterests, setPointOfInterests ] = useState([]);

  const getPointOfInterests = (tripId) => {
    return fetch(`http://localhost:8088/pointOfInterests?tripId=${tripId}`)
    .then(res => res.json())
    .then(pois => setPointOfInterests(pois));
  }

  const savePointOfInterest = (poi) => {
    return fetch('http://localhost:8088/pointOfInterests', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(poi)
    })
    .then(getPointOfInterests);
  }

  const removePointOfInterest = (poiId) => {
    return fetch(`http://localhost:8088/pointOfInterests/${poiId}`, {
      method: "DELETE"
    });
  }

  return (
    <PointOfInterestContext.Provider value={{
      pointOfInterests, getPointOfInterests, savePointOfInterest, removePointOfInterest
    }}>
      {props.children}
    </PointOfInterestContext.Provider>
  );
}