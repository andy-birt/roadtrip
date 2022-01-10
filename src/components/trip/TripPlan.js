import L from 'leaflet';
import { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Row, Container } from "react-bootstrap";
import { RoadTripMap } from "../map/RoadTripMap";
import { PointOfInterestContext } from "../pointOfInterest/PointOfInterestProvider";
import { PointOfInterest } from "../pointOfInterest/PointOfInterest";
import { POIRoutesContext } from '../poiRoutes/POIRoutesProvider';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { TripContext } from './TripProvider';


//! For some reason we have to manually delete the default icon
//! and pull it locally... manually...
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});




export const TripPlan = ({ homeCoords }) => {

  const { pointOfInterests, getPointOfInterests } = useContext(PointOfInterestContext);

  const { getRoutes, setRoutes } = useContext(POIRoutesContext);

  const { getTripById, savePointOfInterestOrder } = useContext(TripContext);

  const { tripId } = useParams();

  const [ poiIdOrder, setPoiIdOrder ] = useState([]);

  const isArrayEqual = (a, b) => {
    return JSON.stringify(a) === JSON.stringify(b);
  }

  const createRoute = (poiIds, tripId) => {
    getPointOfInterests(tripId, poiIds)
    .then((pois) => {
      if (pois.length !== 0) {
        const POICoords = [ [homeCoords[0], homeCoords[1]], ...pois.map(poi => [poi.latlon.lat, poi.latlon.lng]) ];
        getRoutes(POICoords)
        .then((res) => setRoutes(res));
      } else {
        setRoutes([]);
      }
    });
  }

  const onDragEnd = (res) => {

    const { destination, source, draggableId } = res;

    if (!destination) return;

    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    const newPoiOrder = Array.from(poiIdOrder);
    newPoiOrder.splice(source.index, 1);
    newPoiOrder.splice(destination.index, 0, draggableId);
    setPoiIdOrder(newPoiOrder);
    savePointOfInterestOrder(tripId, { poiIds: newPoiOrder })
    .then(() => createRoute(newPoiOrder, tripId));
  }

  useEffect(() => {

    getTripById(tripId)
    .then((trip) => {
      if (!isArrayEqual(trip.poiIds, poiIdOrder)) {
        setPoiIdOrder(trip.poiIds);
      }
      createRoute(trip.poiIds, trip.id);
    });

  }, [tripId, pointOfInterests.length, poiIdOrder]);

  return (
    <div className="d-flex">
      <div>
        <Container className="mt-2" >
          <Link to="/" >&larr; Trips</Link>
        </Container>
        <Container className="point-of-interest-list">
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId={tripId}>
              {provided => (
                <Row 
                  xs={1} 
                  className="g-4 pt-3"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {
                    poiIdOrder.map((poiId, index) => {
                      const pointOfInterest = pointOfInterests.find(poi => poi.id === +poiId);
                      if (pointOfInterest) {
                        return <PointOfInterest key={poiId} poi={pointOfInterest} index={index}/>;
                      }
                      return <div key={poiId}/>
                    })
                  }
                  {provided.placeholder}
                </Row>
              )}
            </Droppable>
          </DragDropContext>
        </Container>
      </div>
      <RoadTripMap homeCoords={homeCoords} pointOfInterests={pointOfInterests} tripId={tripId}/>
    </div>
  );
}