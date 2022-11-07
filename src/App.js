import logo from './logo.svg';
import './App.css';
import React from 'react';
import GeoData from './data/GeoData'
import TaxiData from './data/Taxi'

function App() {
  return (
    <React.Fragment>
      <GeoData/>
      <TaxiData/>
    </React.Fragment>
  )

}

export default App;
