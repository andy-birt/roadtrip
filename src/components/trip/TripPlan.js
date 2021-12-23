import { useParams } from "react-router-dom";


export const TripPlan = () => {
  const { tripId } = useParams();
  return (
    <>
      {tripId}
    </>
  );
}