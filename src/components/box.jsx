import React, { useState, useEffect } from 'react';

function Box({ marker, handleClick }) {
  return (
    <button className="box" onClick={handleClick}>
      {marker}{' '}
    </button>
  );
}

export default Box;
