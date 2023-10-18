import React, { useState, useEffect } from 'react';
import Box from './box';

function Miniboard({
  className,
  currentPlayer,
  setCurrentPlayer,
  setCurrentBoard,
  style,
  focused,
  marker,
  handleWin,
  checkWin,
  miniboardID,
}) {
  let miniDimension = 3;
  let initialState = Array(miniDimension)
    .fill(0)
    .map((e) => Array(miniDimension).fill(null));
  // initial miniboard state with null values

  const [mbState, setMbState] = useState(initialState);

  // when a box is clicked, assign the current player to the miniboard state, which updates the box marker, and update current player

  function handleClick(row, col) {
    mbState[row][col] = currentPlayer;
    setMbState([...mbState]);
    setCurrentBoard([row, col]);
    setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
  }

  let boxLayout = Array(miniDimension);
  for (let i = 0; i < miniDimension; i++) {
    boxLayout[i] = [];
    for (let j = 0; j < miniDimension; j++) {
      if (focused) {
        boxLayout[i].push(
          <Box
            key={`box${i}${j}`}
            className="box"
            boxID={[i, j]}
            marker={mbState[i][j]}
            handleClick={() => handleClick(i, j)}
          />
        );
      } else {
        boxLayout[i].push(
          <Box
            key={`box${i}${j}`}
            className="box"
            boxID={[i, j]}
            marker={mbState[i][j]}
          />
        );
      }
    }
  }

  useEffect(() => {
    // check for any win states
    if (checkWin(mbState)) {
      handleWin(miniboardID[0], miniboardID[1]);
    }
  }, [mbState]);

  return (
    <div className={className} style={style}>
      {boxLayout}
    </div>
  );
}

export default Miniboard;
