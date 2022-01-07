import { createContext, useState } from "react";

export const RoadTripMapContext = createContext();

export const RoadTripMapProvider = (props) => {

  const [ map, setMap ] = useState({});

  const [ latlng, setLatlng ] = useState([]);

  return (
    <RoadTripMapContext.Provider value={{
      map, setMap, latlng, setLatlng
    }}>
      {props.children}
    </RoadTripMapContext.Provider>
  );
}