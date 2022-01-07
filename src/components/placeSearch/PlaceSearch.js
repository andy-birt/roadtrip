import { useState, useEffect, useContext, useCallback } from "react";
import { ToggleButtonGroup, ToggleButton } from "react-bootstrap";
import { useMap } from "react-leaflet";
import { RoadTripMapContext } from "../map/RoadTripMapProvider";
import { PlaceSearchContext } from "./PlaceSearchProvider";

export const PlaceSearch = ({ homeCoords }) => {

  const { latlng, setLatlng } = useContext(RoadTripMapContext); 

  const { getNearbyPlaces } = useContext(PlaceSearchContext);

  const [ placeType, setPlaceType ] = useState("");

  const map = useMap();

  const onMove = useCallback(() => {
    setLatlng([map.getCenter().lat, map.getCenter().lng]);
  }, [map])

  useEffect(() => {
    if (!latlng.length) setLatlng(map.getCenter());
    if (placeType) getNearbyPlaces(placeType, latlng);

    console.log(latlng)

    map.on('move', onMove);

    return () => {
      map.off('move', onMove);
    }

  }, [placeType, map, onMove, setLatlng]);

  return (
    <div className="leaflet-control leaflet-bar">
      <ToggleButtonGroup type="radio" name="options" onChange={(value) => setPlaceType(value)}>
        <ToggleButton id="tbg-radio-1" value={"coffee"} style={{ padding: '0' }}>
          <img style={{ transition: "backgroundColor 300ms" }} src="https://ss3.4sqi.net/img/categories_v2/food/coffeeshop_32.png" alt="Coffee" title="Coffee" />
        </ToggleButton>
        <ToggleButton id="tbg-radio-2" value={"food"} style={{ padding: '0' }}>
          <img style={{ transition: "backgroundColor 300ms" }} src="https://ss3.4sqi.net/img/categories_v2/food/default_32.png" alt="Food" title="Food" />
        </ToggleButton>
        <ToggleButton id="tbg-radio-3" value={"motel"} style={{ padding: '0' }}>
          <img style={{ transition: "backgroundColor 300ms" }} src="https://ss3.4sqi.net/img/categories_v2/travel/hotel_32.png" alt="Motel" title="Motel" />
        </ToggleButton>
        <ToggleButton id="tbg-radio-4" value={"bar"} style={{ padding: '0' }}>
          <img style={{ transition: "backgroundColor 300ms" }} src="https://ss3.4sqi.net/img/categories_v2/nightlife/pub_32.png" alt="Bar" title="Bar" />
        </ToggleButton>
        <ToggleButton id="tbg-radio-5" value={"gas"} style={{ padding: '0' }}>
          <img style={{ transition: "backgroundColor 300ms" }} src="https://ss3.4sqi.net/img/categories_v2/shops/gas_32.png" alt="Gas" title="Gas" />
        </ToggleButton>
      </ToggleButtonGroup>
    </div>
  );
}