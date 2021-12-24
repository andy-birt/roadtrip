import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from "react-leaflet";
import { SearchBox } from "../searchbox/SearchBox";

export const RoadTripMap = () => {
  return (
    <MapContainer style={{height: '100vh', width: '75vw'}}  center={[51.505, -0.09]} zoom={13} zoomControl={false} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <SearchBox />
      <ZoomControl />
      <Marker position={[51.505, -0.09]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
}