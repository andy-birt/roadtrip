import { createContext, useState } from "react";

export const POIRoutesContext = createContext();

export const POIRoutesProvider = (props) => {
  
  const [ routes, setRoutes ] = useState([]);

  const getRoutes = (coords) => {

    const URLCoords = coords.map(c => c.reverse()).join(';');
    return fetch(`https://router.project-osrm.org/route/v1/driving/${URLCoords}?overview=full&geometries=geojson`)
    .then(res => res.json())
    .then(data => {
      if(data.code === 'Ok') return data.routes.map(r => r.geometry.coordinates.map(c => c.reverse()));
      else return false;
    });
  }
  
  return (
    <POIRoutesContext.Provider value={{
      routes, getRoutes, setRoutes
    }}>
      {props.children}
    </POIRoutesContext.Provider>
  );
}