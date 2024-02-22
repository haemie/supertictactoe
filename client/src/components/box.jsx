import React, { useState, useEffect } from 'react';

import { oSVG, xSVG } from '../assets/SVG';

function Box({ marker, handleClick }) {
  return (
    <button
      className="box"
      onClick={handleClick}
      style={marker === 'X' ? { color: 'red' } : { color: 'blue' }}
    >
      {marker && (marker === 'X' ? xSVG : oSVG)}
    </button>
  );
}

export default Box;
