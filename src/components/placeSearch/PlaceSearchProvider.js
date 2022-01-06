import { createContext, useState } from "react";

export const PlaceSearchContext = createContext();

export const PlaceSearchProvider = (props) => {

  const [ places, setPlaces ] = useState([]);

  const getNearbyPlaces = (q, ll, r, sortBy) => {

    const RT_KEY = require("../../../config/config.json")["rt-key"];

    const options = {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: RT_KEY
      }
    };
    // Coffee
    // Restaurant
    // Bar
    // Lodging
    // Gas
    return fetch(`https://api.foursquare.com/v3/places/search?query=${q}&ll=${ll[0]}%2C${ll[1]}&radius=${r}&sort=${sortBy}`, options)
    .then(res => res.json())
    .then(places => setPlaces(places))
    .catch(e => console.error(e));
  }

  return (
    <PlaceSearchContext.Provider value={{
      places, getNearbyPlaces
    }}>
      {props.children}
    </PlaceSearchContext.Provider>
  );
}