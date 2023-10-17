import React, { useState, useEffect } from 'react';
import Miniboard from './miniboard';

function Largeboard() {
  let largeDimension = 3;
  let initialState = Array(largeDimension)
    .fill(0)
    .map((e) => Array(largeDimension).fill(null));

  const [lbState, setLbState] = useState(initialState);
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [currentBoard, setCurrentBoard] = useState(null);
  const [focusBoard, setFocusBoard] = useState(null);

  function handleMiniWin(row, col) {
    lbState[row][col] = currentPlayer;
    setLbState([...lbState]);
  }

  let mbLayout = Array(largeDimension);
  for (let i = 0; i < largeDimension; i++) {
    mbLayout[i] = [];
    for (let j = 0; j < largeDimension; j++) {
      if (
        !focusBoard ||
        (focusBoard && focusBoard[0] === i && focusBoard[1] === j)
      ) {
        mbLayout[i].push(
          <Miniboard
            style={{ backgroundColor: 'red' }}
            key={`mb${i}${j}`}
            currentPlayer={currentPlayer}
            setCurrentPlayer={setCurrentPlayer}
            currentBoard={currentBoard}
            setCurrentBoard={setCurrentBoard}
            focused={true}
            className="miniboard"
            miniboardID={[i, j]}
            marker={lbState[i][j]}
            handleWin={() => handleMiniWin(row, col)}
          />
        );
      } else {
        mbLayout[i].push(
          <Miniboard
            style={{ backgroundColor: 'blue' }}
            key={`mb${i}${j}`}
            className="miniboard"
            miniboardID={[i, j]}
            marker={lbState[i][j]}
            focused={false}
          />
        );
      }
    }
  }

  useEffect(() => {
    if (currentBoard) {
      console.log('current board', currentBoard);
      console.log(
        'state of current board',
        lbState[currentBoard[0]][currentBoard[1]]
      );
      console.log('focused board', focusBoard);
      if (lbState[currentBoard[0]][currentBoard[1]]) {
        setFocusBoard(null);
      } else {
        setFocusBoard([currentBoard[0], currentBoard[1]]);
      }
    }
  }, [currentBoard]);

  return <div className="largeBoard">{mbLayout}</div>;
}

export default Largeboard;
