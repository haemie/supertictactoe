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
  dimension,
  miniState,
  setMiniState,
}) {
  let initialState = Array(dimension)
    .fill(0)
    .map((e) => Array(dimension).fill(null));
  // initial miniboard state with null values

  // console.log(miniState);
  // when a box is clicked, assign the current player to the miniboard state, which updates the box marker, and update current player

  function handleClick(row, col) {
    let newMiniState = [...miniState];
    newMiniState[row][col] = currentPlayer;
    setMiniState(newMiniState);
    setCurrentBoard([row, col]);
    setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
  }

  let boxLayout = Array(dimension);
  for (let i = 0; i < dimension; i++) {
    boxLayout[i] = [];
    for (let j = 0; j < dimension; j++) {
      if (focused) {
        boxLayout[i].push(
          <Box
            key={`box${i}${j}`}
            className="box"
            boxID={[i, j]}
            marker={miniState[i][j]}
            handleClick={() => handleClick(i, j)}
          />
        );
      } else {
        boxLayout[i].push(
          <Box
            key={`box${i}${j}`}
            className="box"
            boxID={[i, j]}
            marker={miniState[i][j]}
          />
        );
      }
    }
  }

  useEffect(() => {
    // check for any win states
    if (checkWin(miniState)) {
      handleWin(miniboardID[0], miniboardID[1]);
    }
  }, [miniState]);

  return (
    <div
      className={className}
      style={{
        ...style,
        gridTemplate: `repeat(${dimension}, 1fr) / repeat(${dimension}, 1fr)`,
      }}
    >
      {boxLayout}
    </div>
  );
}

export default Miniboard;
