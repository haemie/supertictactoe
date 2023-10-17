import React, { useState, useEffect } from 'react';
import Box from './box';

function Miniboard() {
  let miniDimension = 3;
  let initialState = Array(miniDimension)
    .fill(0)
    .map((e) => Array(miniDimension).fill('😀'));

  const [mbState, setMbState] = useState(initialState);

  function handleClick(row, col) {
    mbState[row][col] = currentPlayer;
    setMbState([...mbState]);
  }

  let boxLayout = Array(miniDimension);
  for (let i = 0; i < miniDimension; i++) {
    boxLayout[i] = [];
    for (let j = 0; j < miniDimension; j++) {
      boxLayout[i].push(
        <Box
          key={`box${i}${j}`}
          className="box"
          boxID={i + j}
          marker={boxLayout[i][j]}
          handleClick={() => handleClick(i, j)}
        />
      );
    }
  }

  return <>{boxLayout}</>;
}

export default Miniboard;
