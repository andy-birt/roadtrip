import { createContext, useState } from "react";

export const RoadTripMapContext = createContext();

export const RoadTripMapProvider = (props) => {

  const [ map, setMap ] = useState({});

  return (
    <RoadTripMapContext.Provider value={{
      map, setMap
    }}>
      {props.children}
    </RoadTripMapContext.Provider>
  );
}