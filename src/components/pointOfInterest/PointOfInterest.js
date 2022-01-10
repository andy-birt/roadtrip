
import { useContext } from "react";
import { Col, Card } from "react-bootstrap";
import { Draggable } from "react-beautiful-dnd";
import { RoadTripMapContext } from "../map/RoadTripMapProvider";
import './PointOfInterest.css';

export const PointOfInterest = ({ poi, index }) => {

  const { map, setLatlng } = useContext(RoadTripMapContext);

  const handleClick = () => {
    map.panTo(poi.latlon);
    setLatlng([poi.latlon.lat, poi.latlon.lng]);
  }
  
  return (
    <Draggable draggableId={`${poi.id}`} index={index}>
      {(provided) => (
        <Col
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <Card 
            className="point-of-interest"
            onClick={handleClick}  
          >
            <Card.Body>
              {
                poi.name ? <Card.Title>{ poi.name }</Card.Title> : null
              }
              <Card.Text>
                { poi.textContents }
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      )}
    </Draggable>
  );
}