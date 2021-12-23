import { Routes, Route } from "react-router-dom";
import { TripList } from "./trip/TripList";
import { TripProvider } from "./trip/TripProvider";
import { TripPlan } from "./trip/TripPlan";

export const ApplicationViews = ({ user }) => {
  return (
    <TripProvider userId={user.id} >
      <Routes>
        <Route path='/' element={<TripList />} />
        <Route path='/trips/:tripId' element={<TripPlan />} />
      </Routes>
    </TripProvider>
  );
}