import { useEffect, useContext } from "react";
import { useMap } from "react-leaflet";
import { useParams } from "react-router-dom";
import { RoadTripMapContext } from "./RoadTripMapProvider";

export const RoadTripMapRef = () => {
  
  const { setMap } = useContext(RoadTripMapContext);

  const { tripId } = useParams();

  const map = useMap();

  useEffect(() => {
    setMap(map);
  }, [tripId])
  
  return <></>;
}