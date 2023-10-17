import React, { useState, useEffect } from 'react';

function Box({ marker, handleClick }) {
  return <button onClick={handleClick}>{marker}a</button>;
}

export default Box;
