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
  const [winner, setWinner] = useState(null);
  const [restarting, setRestarting] = useState(false);

  // function used by the miniboard to change the large board state when a mini board is won
  function handleMiniWin(row, col) {
    lbState[row][col] = currentPlayer === 'X' ? 'O' : 'X';
    setLbState([...lbState]);
  }

  // check for winstate in board
  function checkWin(board) {
    let winner;
    for (let i = 0; i < board.length; i++) {
      // check rows
      if (new Set(board[i]).size === 1 && board[i][0] !== null) {
        return board[i][0];
      }
      if (
        new Set(board.map((row) => row[i])).size === 1 &&
        board[0][i] !== null
      ) {
        return board[0][i];
      }
    }
    if (
      new Set(board.map((row, index) => row[index])).size === 1 &&
      board[0][0] !== null
    ) {
      return board[0][0];
    }
    if (
      new Set(board.map((row, index) => row[board.length - 1 - index])).size ===
        1 &&
      board[0][board.length - 1] !== null
    ) {
      return board[0][board.length - 1];
    }
  }

  let mbLayout = Array(largeDimension);
  for (let i = 0; i < largeDimension; i++) {
    mbLayout[i] = [];
    for (let j = 0; j < largeDimension; j++) {
      if (lbState[i][j]) {
        mbLayout[i].push(
          <div
            className="filledMini"
            key={`filled${i}${j}`}
            style={lbState[i][j] === 'X' ? { color: 'red' } : { color: 'blue' }}
          >
            {lbState[i][j]}
          </div>
        );
      } else {
        if (
          !winner &&
          (!focusBoard ||
            (focusBoard && focusBoard[0] === i && focusBoard[1] === j))
        ) {
          mbLayout[i].push(
            <Miniboard
              style={{ backgroundColor: '#0268e6' }}
              key={`mb${i}${j}`}
              currentPlayer={currentPlayer}
              setCurrentPlayer={setCurrentPlayer}
              currentBoard={currentBoard}
              setCurrentBoard={setCurrentBoard}
              focused={true}
              className="focusedBoard"
              miniboardID={[i, j]}
              marker={lbState[i][j]}
              handleWin={() => handleMiniWin(i, j)}
              checkWin={(b) => checkWin(b)}
            />
          );
        } else {
          mbLayout[i].push(
            <Miniboard
              style={{ backgroundColor: '#7f7f7f' }}
              key={`mb${i}${j}`}
              className="miniBoard"
              miniboardID={[i, j]}
              marker={lbState[i][j]}
              focused={false}
              checkWin={(b) => checkWin(b)}
            />
          );
        }
      }
    }
  }

  let currentTurnDiv = winner ? (
    <h2>{winner} WINS!</h2>
  ) : (
    <h2>It is {currentPlayer}'s turn</h2>
  );

  let largeBoardDiv = restarting ? (
    <div className="largeBoard"></div>
  ) : (
    <div className="largeBoard">{mbLayout}</div>
  );

  useEffect(() => {
    if (currentBoard) {
      // console.log('current board', currentBoard);
      // console.log(
      //   'state of current board',
      //   lbState[currentBoard[0]][currentBoard[1]]
      // );
      // console.log('focused board', focusBoard);
      if (lbState[currentBoard[0]][currentBoard[1]]) {
        setFocusBoard(null);
      } else {
        setFocusBoard([currentBoard[0], currentBoard[1]]);
      }
    }
  }, [currentBoard]);

  useEffect(() => {
    // check for any win states
    const result = checkWin(lbState);
    if (result) {
      setWinner(result);
    }
  }, [lbState]);

  return (
    <>
      {currentTurnDiv}
      {largeBoardDiv}
      <button
        onClick={() => {
          setLbState(initialState);
          setCurrentBoard(null);
          setWinner(null);
          setCurrentPlayer('X');
          setFocusBoard(null);
          setRestarting(true);
          setTimeout(() => setRestarting(false), 1);
        }}
      >
        Restart!
      </button>
    </>
  );
}

export default Largeboard;
