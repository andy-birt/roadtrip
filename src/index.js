import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { RoadTrip } from './components/RoadTrip';
import { BrowserRouter as Router } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'leaflet/dist/leaflet.css'

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <RoadTrip />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
