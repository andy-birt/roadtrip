import { useContext, useEffect } from "react";
import { Button } from "react-bootstrap";
import { MapContainer, TileLayer, Marker, Popup, ZoomControl, Polyline } from "react-leaflet";
import { LatLng } from "leaflet";
import { PlaceSearch } from "../placeSearch/PlaceSearch";
import { PlaceSearchContext } from "../placeSearch/PlaceSearchProvider";
import { PointOfInterestContext } from "../pointOfInterest/PointOfInterestProvider";
import { POIRoutesContext } from "../poiRoutes/POIRoutesProvider";
import { SearchBox } from "../searchbox/SearchBox";
import { SearchContext } from "../searchbox/SearchProvider";
import { RoadTripMapRef } from "./RoadTripMapRef";
import { TripContext } from "../trip/TripProvider";

export const RoadTripMap = ({ homeCoords, pointOfInterests, tripId }) => {

  const { selectedLocations, setSelectedLocations } = useContext(SearchContext);

  const { savePointOfInterest, removePointOfInterest } = useContext(PointOfInterestContext);

  const { getTripById, savePointOfInterestOrder } = useContext(TripContext);

  const { routes } = useContext(POIRoutesContext);

  const { places, setPlaces } = useContext(PlaceSearchContext);

  //? Removes selected location from the map where location source is the search bar and result is added to the map
  const removeSelectedLocation = (loc) => {
    const remainingLocations = selectedLocations.filter(sl => sl.textContents !== loc.textContents);
    setSelectedLocations(remainingLocations);
  }

  //? Remove selected place from the map where place is a nearby location for amenities (ex. food, coffee, motel etc...)
  const removeSelectedPlace = (loc) => {
    const remainingPlaces = places.filter(place => JSON.stringify(place) !== JSON.stringify(loc));
    setPlaces(remainingPlaces);
  }

  //? After a point of interest is removed from the trip refactor the order of point of interest to visit 
  const refactorOrderAfterAdding = (trip, pois) => {
    const newPointOfInterestId = pois[pois.length-1].id.toString();
    const newOrder = [...trip.poiIds, newPointOfInterestId];
    savePointOfInterestOrder(trip.id, { poiIds: newOrder });
  }

  //? Add a place to the trip such as nearby coffee shop or motel 
  const addPlaceToTrip = (place) => {
    savePointOfInterest({
      tripId: +tripId,
      textContents: `${place.name} ${place.location.address} ${place.location.locality}, ${place.location.region} ${place.location.postcode}`,
      latlon: {
        lat: place.geocodes.main.latitude,
        lng: place.geocodes.main.longitude
      }
    }).then(pois => {
      removeSelectedPlace(place);
      setPlaces([]);
      getTripById(tripId)
      .then(trip => {
        refactorOrderAfterAdding(trip, pois);
      });
    });
  }

  //? Add location derived from the search bar to the map
  const addSelectedLocationToTrip = (l) => {
    savePointOfInterest({
      tripId: +tripId,
      textContents: l.textContents,
      latlon: l.latlon
    }).then((pois) => {
      removeSelectedLocation(l);
      document.querySelector('.search-container input').value = '';
      getTripById(tripId)
      .then(trip => {
        refactorOrderAfterAdding(trip, pois);
      });
    });
  }

  //? Remove point of interest from trip 
  const removePointOfInterestFromTrip = (poi) => {
    const newPoiOrder = pointOfInterests.map(poi => poi.id.toString()).filter(id => id !== poi.id.toString());
    savePointOfInterestOrder(tripId, { poiIds: newPoiOrder });
    removePointOfInterest(poi.id, tripId);
  }

  //? Only when component is cleaning up remove the nearby places 
  useEffect(() => {
    return () => setPlaces([]);
  }, [])

  return (
    <div>
      <MapContainer style={{height: '100vh', width: '75vw'}}  center={homeCoords} zoom={13} zoomControl={false} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <RoadTripMapRef />
        <div className="leaflet-top leaflet-left">
          <SearchBox homeCoords={homeCoords} />
          <PlaceSearch homeCoords={homeCoords} />
        </div>
        <ZoomControl position="bottomleft"/>
        <Marker position={homeCoords}>
          <Popup>
            This is set as your starting location <br /> If you wish to have a different starting location, make a new trip.
          </Popup>
        </Marker>
        {
          //* Iterates over the trip locations
          pointOfInterests.map(poi => (
            <Marker key={poi.id}  position={poi.latlon}>
              <Popup>
                {poi.textContents}
                <div></div>
                <Button
                  onClick={() => removePointOfInterestFromTrip(poi)}
                >Remove from Trip</Button>
              </Popup>
            </Marker>
          ))
        }
        {
          //* Iterates over selected locations from the search bar 
          selectedLocations.map((l, i) => l.isRoutable ? (
            <Marker key={i}  position={l.latlon}>
              <Popup>
                {l.textContents}
                <div></div>
                <Button 
                  onClick={() => addSelectedLocationToTrip(l)}
                >Add to Trip</Button>
                {' '}
                <Button onClick={() => removeSelectedLocation(l)}>Remove from Map</Button>
              </Popup>
            </Marker>
          ) : 
            <Marker key={i}  position={l.latlon}>
              <Popup>
                <p>You cannot make this location part of your current road trip.</p>
                <p>You can start a new trip within this location.</p>
                <p>Or maybe you're just a rebel with a hoverboard!</p>
                <div></div>
                <Button onClick={() => removeSelectedLocation(l)}>Remove from Map</Button>
              </Popup>
            </Marker>
          )
        }
        {
          //* Iterate over the routes in the trip
          routes.map((route, i) => {
            const coords = route.map(c => c.reverse());
            return <Polyline key={i}  pathOptions={{ color: '#0d74d4' }} positions={coords} />
          })
        }
        {
          //* If a user looks for nearby places they will iterate here
          places.map((place, i) => {
            const loc = new LatLng(place.geocodes.main.latitude, place.geocodes.main.longitude);
            return (
              <Marker key={i}  position={loc}>
                <Popup>
                  <p><strong>{place.name}</strong></p>
                  <p>{place.location.address} {place.location.locality} {place.location.region}</p>
                  <ul>
                    {
                      place.categories.map((cat, i) => <li key={i}>{cat.name}</li>)
                    }
                  </ul>
                  <Button 
                  onClick={() => addPlaceToTrip(place)}
                >Add to Trip</Button>
                </Popup>
              </Marker>
            );
          })
        }
      </MapContainer>
    </div>
  );
}