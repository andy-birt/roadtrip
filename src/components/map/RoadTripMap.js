import { useContext } from "react";
import { Button } from "react-bootstrap";
import { MapContainer, TileLayer, Marker, Popup, ZoomControl, Polyline } from "react-leaflet";
import { PointOfInterestContext } from "../pointOfInterest/PointOfInterestProvider";
import { POIRoutesContext } from "../poiRoutes/POIRoutesProvider";
import { SearchBox } from "../searchbox/SearchBox";
import { SearchContext } from "../searchbox/SearchProvider";

export const RoadTripMap = ({ homeCoords, pointOfInterests, tripId }) => {

  const { selectedLocations, setSelectedLocations } = useContext(SearchContext);

  const { savePointOfInterest } = useContext(PointOfInterestContext);

  const { routes } = useContext(POIRoutesContext);


  return (
    <MapContainer style={{height: '100vh', width: '75vw'}}  center={homeCoords} zoom={13} zoomControl={false} scrollWheelZoom={true}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <SearchBox />
      <ZoomControl position="bottomleft"/>
      <Marker position={homeCoords}>
        <Popup>
          This is set as your home address <br /> Is this not your home address? Are you lost?
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
      {
        routes.map((route, i) => {
          const coords = route.map(c => c.reverse());
          return <Polyline key={i}  pathOptions={{ color: 'lime' }} positions={coords} />
        })
      }
    </MapContainer>
  );
}