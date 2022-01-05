import { Routes, Route } from "react-router-dom";
import { TripList } from "./trip/TripList";
import { TripProvider } from "./trip/TripProvider";
import { TripPlan } from "./trip/TripPlan";
import { SearchProvider } from "./searchbox/SearchProvider";
import { PointOfInterestProvider } from "./pointOfInterest/PointOfInterestProvider";
import { POIRoutesProvider } from "./poiRoutes/POIRoutesProvider";

export const ApplicationViews = ({ user }) => {
  return (
    <TripProvider userId={user.id} >
      <PointOfInterestProvider>
        <POIRoutesProvider>
          <SearchProvider>
            <Routes>
              <Route path='/' element={<TripList userId={user.id} />} />
              <Route path='/trips/:tripId' element={<TripPlan homeCoords={user.homecoords} />} />
            </Routes>
          </SearchProvider>
        </POIRoutesProvider>
      </PointOfInterestProvider>
    </TripProvider>
  );
}