import { useContext, useEffect } from "react";
import { Button } from "react-bootstrap";
import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from "react-leaflet";
import { useParams } from "react-router-dom";
import { PointOfInterestContext } from "../pointOfInterest/PointOfInterestProvider";
import { SearchBox } from "../searchbox/SearchBox";
import { SearchContext } from "../searchbox/SearchProvider";

export const RoadTripMap = () => {

  const { selectedLocations, setSelectedLocations } = useContext(SearchContext);

  const { pointOfInterests, getPointOfInterests, savePointOfInterest } = useContext(PointOfInterestContext);

  const { tripId } = useParams();

  useEffect(() => {
    getPointOfInterests(tripId);
  }, []);

  return (
    <MapContainer style={{height: '100vh', width: '75vw'}}  center={[38.047639685322494, -81.12339107346091]} zoom={13} zoomControl={false} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <SearchBox />
      <ZoomControl position="bottomleft"/>
      <Marker position={[38.047639685322494, -81.12339107346091]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
      {
        //* Iterates over the trip locations
        pointOfInterests.map(poi => (
          <Marker key={poi.textContents}  position={poi.latlon}>
            <Popup>
              {poi.textContents}
              <div></div>
              <Button>Remove Trip</Button>
            </Popup>
          </Marker>
        ))
      }
      {
        //* Iterates over selected locations from the search bar 
        selectedLocations.map(l => (
          <Marker key={l.textContents}  position={l.latlon}>
            <Popup>
              {l.textContents}
              <div></div>
              <Button onClick={
                () => savePointOfInterest({
                  tripId: +tripId,
                  textContents: l.textContents,
                  latlon: l.latlon
                })
              }>Add to Trip</Button>
              {' '}
              <Button onClick={() => setSelectedLocations(selectedLocations.filter(sl => sl.textContents !== l.textContents))}>Remove from Map</Button>
            </Popup>
          </Marker>
        ))
      }
    </MapContainer>
  );
}