import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { MapContainer, Marker, Popup, TileLayer, ZoomControl } from 'react-leaflet';
import { SearchBox } from '../searchbox/SearchBox';

export const StartLocationMap = ({ trip, setTrip }) => {

  const [ startingLocation, setStartingLocation ] = useState({});

  const isEmpty = (obj) => {
    return JSON.stringify(obj) === '{}';
  }

  const handleClick = () => {
    const tripWithNewLocation = { ...trip };
    tripWithNewLocation['homeCoords'] = [startingLocation.position.lat, startingLocation.position.lng];
    setTrip(tripWithNewLocation);
  }

  return (
    <MapContainer 
      style={{ width: '100%', height: '300px' }} 
      zoomControl={false}
      center={[38, -80]}
      zoom={5}
      >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <div className="leaflet-top leaflet-left">
        <SearchBox setStartingLocation={setStartingLocation} />
      </div>
      <ZoomControl position="bottomleft"/>
      {
        // console.log(!isEmpty(startingLocation))
        !isEmpty(startingLocation) ? 
        <Marker position={startingLocation.position}>
          <Popup>
            {startingLocation.textContents}
            <Button
              onClick={handleClick}
            >Set Location</Button>
          </Popup>
        </Marker> : null
      }
    </MapContainer>
  );
}