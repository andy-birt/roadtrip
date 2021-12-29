import { Routes, Route } from "react-router-dom";
import { TripList } from "./trip/TripList";
import { TripProvider } from "./trip/TripProvider";
import { TripPlan } from "./trip/TripPlan";
import { SearchProvider } from "./searchbox/SearchProvider";
import { PointOfInterestProvider } from "./pointOfInterest/PointOfInterestProvider";

export const ApplicationViews = ({ user }) => {
  return (
    <TripProvider userId={user.id} >
      <PointOfInterestProvider>
        <SearchProvider>
          <Routes>
            <Route path='/' element={<TripList />} />
            <Route path='/trips/:tripId' element={<TripPlan />} />
          </Routes>
        </SearchProvider>
      </PointOfInterestProvider>
    </TripProvider>
  );
}