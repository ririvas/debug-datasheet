import React from 'react';
import logo from './logo.svg';
import './App.css';

import { Datasheet, startingData } from './Datasheet';

function App() {
  return (
    <div className="App">
      <Datasheet 
        data={startingData}
      />
    </div>
  );
}

export default App;
