import { createContext, useState } from "react";

export const PlaceSearchContext = createContext();

const convertToMeters = m => 1609 * m;

export const PlaceSearchProvider = (props) => {

  const [ places, setPlaces ] = useState([]);

  const getNearbyPlaces = (q, ll, r = 15) => {

    const RT_KEY = require("../../config/config.json")["rt-key"];

    const options = {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: RT_KEY
      }
    };

    return fetch(`https://api.foursquare.com/v3/places/search?query=${q}&ll=${ll[0]}%2C${ll[1]}&radius=${convertToMeters(r)}`, options)
    .then(res => res.json())
    .then(places => setPlaces(places.results))
    .catch(e => console.error(e));
  }

  return (
    <PlaceSearchContext.Provider value={{
      places, getNearbyPlaces, setPlaces
    }}>
      {props.children}
    </PlaceSearchContext.Provider>
  );
}