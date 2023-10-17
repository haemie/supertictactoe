import React, { useState, useEffect } from 'react';
import Box from './box';

function Miniboard({ currentPlayer, setCurrentPlayer, marker, handleWin }) {
  let miniDimension = 3;
  let initialState = Array(miniDimension)
    .fill(0)
    .map((e) => Array(miniDimension).fill(''));

  const [mbState, setMbState] = useState(initialState);

  function handleClick(row, col) {
    mbState[row][col] = currentPlayer;
    setMbState([...mbState]);
    console.log(currentPlayer);
    setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
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
          marker={mbState[i][j]}
          handleClick={() => handleClick(i, j)}
        />
      );
    }
  }

  return <div className="miniBoard">{boxLayout}</div>;
}

export default Miniboard;
