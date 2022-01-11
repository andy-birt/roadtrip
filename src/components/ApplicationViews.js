import { Routes, Route } from "react-router-dom";
import { TripList } from "./trip/TripList";
import { TripProvider } from "./trip/TripProvider";
import { TripPlan } from "./trip/TripPlan";
import { SearchProvider } from "./searchbox/SearchProvider";
import { PointOfInterestProvider } from "./pointOfInterest/PointOfInterestProvider";
import { POIRoutesProvider } from "./poiRoutes/POIRoutesProvider";
import { RoadTripMapProvider } from "./map/RoadTripMapProvider";
import { PlaceSearchProvider } from "./placeSearch/PlaceSearchProvider";

export const ApplicationViews = ({ user }) => {
  return (
    <RoadTripMapProvider>
      <TripProvider userId={user.id} >
        <PointOfInterestProvider>
          <POIRoutesProvider>
            <SearchProvider>
              <PlaceSearchProvider>
                <Routes>
                  <Route path='/' element={<TripList userId={user.id} />} />
                  <Route path='/trips/:tripId' element={<TripPlan />} />
                </Routes>
              </PlaceSearchProvider>
            </SearchProvider>
          </POIRoutesProvider>
        </PointOfInterestProvider>
      </TripProvider>
    </RoadTripMapProvider>
  );
}