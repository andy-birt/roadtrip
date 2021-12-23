import { Container } from "react-bootstrap";
import { Navigate, Route, Routes } from "react-router-dom";
import { ApplicationViews } from "./ApplicationViews";
import { Login } from './auth/Login';
import { Register } from './auth/Register';

export const RoadTrip = () => (
  <Routes>
    <Route path='*' element={<AuthenticationCheck />}/>
    <Route path='/login' element={<Login />}/>
    <Route path='/register' element={<Register />}/>
  </Routes>
);

const AuthenticationCheck = () => {

  const isRememberedUser = localStorage.getItem('roadtrip_user');

  if (isRememberedUser) {
    return (
      <>
        <ApplicationViews user={JSON.parse(isRememberedUser)}/>
      </>
    );
  } else {
    return <Navigate to='/login' />;
  }
}