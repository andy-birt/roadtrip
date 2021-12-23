import { Routes, Route } from "react-router-dom";
import { TripList } from "./route/TripList";
import { TripProvider } from "./route/TripProvider";

export const ApplicationViews = ({ user }) => {
  return (
    <TripProvider userId={user.id} >
      <Routes>
        <Route path='/' element={<TripList />} />
      </Routes>
    </TripProvider>
  );
}