import React, { useState, useEffect, useRef } from 'react';
import Largeboard from './components/largeboard';

function App() {
  return (
    <div className="app">
      <h1>super tic tac toe!</h1>
      <Largeboard></Largeboard>
    </div>
  );
}

export default App;
