import L from 'leaflet';
import { useContext } from 'react';
import { Row, Container } from "react-bootstrap";
import { RoadTripMap } from "../map/RoadTripMap";
import { PointOfInterestContext } from "../pointOfInterest/PointOfInterestProvider";
import { PointOfInterest } from "../pointOfInterest/PointOfInterest";


//! For some reason we have to manually delete the default icon
//! and pull it locally... manually...
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});




export const TripPlan = () => {

  const { pointOfInterests } = useContext(PointOfInterestContext);

  return (
    <div className="d-flex">
      <div className="point-of-interest-list">
        <Container>
          <Row xs={1} className="g-4 pt-3">
            {pointOfInterests.map((poi) => (
              <PointOfInterest key={poi.id} poi={poi} />
            ))}
          </Row>
        </Container>
      </div>
      <RoadTripMap />
    </div>
  );
}