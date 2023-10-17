import React, { useState, useEffect } from 'react';
import miniboard from './miniboard';

function largeboard() {
  let largeDimension = 3;
  let initialState = Array(largeDimension)
    .fill(0)
    .map((e) => Array(largeDimension).fill(''));

  // for (let i = 0; i < largeDimension; i++) {
  //   initialState.set(i, new Set());
  // }

  const [lbState, setLbState] = useState(initialState);
  const [currentPlayer, setCurrentPlayer] = useState('X');

  function handleMiniWin(row, col) {
    lbState[row][col] = currentPlayer;
  }

  let mbLayout = Array(largeDimension);
  for (let i = 0; i < largeDimension; i++) {
    mbLayout[i] = [];
    for (let j = 0; j < largeDimension; j++) {
      mbLayout[i].push(
        <miniboard
          className="miniboard"
          miniboardID={i + j}
          handleWin={() => handleMiniWin(row, col)}
        />
      );
    }
  }

  return <>{mbLayout}</>;
}

export default largeboard;
