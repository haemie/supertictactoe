import React, { useState, useEffect } from 'react';
import Miniboard from './miniboard';

function Largeboard() {
  let largeDimension = 3;
  let initialState = Array(largeDimension)
    .fill(0)
    .map((e) => Array(largeDimension).fill('💀'));

  const [lbState, setLbState] = useState(initialState);
  const [currentPlayer, setCurrentPlayer] = useState('X');

  function handleMiniWin(row, col) {
    lbState[row][col] = currentPlayer;
    setLbState([...lbState]);
  }

  let mbLayout = Array(largeDimension);
  for (let i = 0; i < largeDimension; i++) {
    mbLayout[i] = [];
    for (let j = 0; j < largeDimension; j++) {
      mbLayout[i].push(
        <Miniboard
          key={`mb${i}${j}`}
          currentPlayer
          className="miniboard"
          miniboardID={i + j}
          marker={lbState[i][j]}
          handleWin={() => handleMiniWin(row, col)}
        />
      );
    }
  }

  return <div className="largeBoardHolder">{mbLayout}</div>;
}

export default Largeboard;
