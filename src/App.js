import logo from './logo.svg';
import './App.css';
import React from 'react';
import Map from './map/Map';
import GeoData from './data/GeoData'

function App() {
  return (
    <React.Fragment>
      <Map />
      <GeoData/>
    </React.Fragment>
  )

}

export default App;
