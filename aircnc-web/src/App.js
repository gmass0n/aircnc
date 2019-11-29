// IMPORTS 
import React from 'react';
import './App.css';

import Routes from './routes';

import logo from './assets/logo.svg';


// APP
function App() {
  

  return (
    <div className="container">

      <img src={logo} alt="AirCnc" />

      <div className="content">
        
        <Routes />
      
      </div>
    </div>
  );
}

// EXPORT
export default App;
