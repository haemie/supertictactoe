import React, { useState, useEffect } from 'react';

function Box({ marker, handleClick }) {
  return (
    <button
      className="box"
      onClick={handleClick}
      style={marker === 'X' ? { color: 'red' } : { color: 'blue' }}
    >
      {marker}{' '}
    </button>
  );
}

export default Box;
