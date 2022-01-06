import { useState, createContext } from "react";

export const PointOfInterestContext = createContext();

export const PointOfInterestProvider = (props) => {

  const [ pointOfInterests, setPointOfInterests ] = useState([]);

  const getPointOfInterests = (tripId) => {
    return fetch(`http://localhost:8088/pointOfInterests?tripId=${tripId}`)
    .then(res => res.json())
    .then(pois => {
      setPointOfInterests(pois);
      return pois;
    });
  }

  const savePointOfInterest = (poi) => {
    return fetch('http://localhost:8088/pointOfInterests', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(poi)
    })
    .then(() => getPointOfInterests(poi.tripId));
  }

  const removePointOfInterest = (poiId, tripId) => {
    return fetch(`http://localhost:8088/pointOfInterests/${poiId}`, {
      method: "DELETE"
    }).then(() => getPointOfInterests(tripId));
  }

  return (
    <PointOfInterestContext.Provider value={{
      pointOfInterests, getPointOfInterests, savePointOfInterest, removePointOfInterest, setPointOfInterests
    }}>
      {props.children}
    </PointOfInterestContext.Provider>
  );
}