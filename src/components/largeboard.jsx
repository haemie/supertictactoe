import React, { useState, useEffect, useRef } from 'react';
import Miniboard from './miniboard';

function Largeboard() {
  const [dimension, setDimension] = useState(3);
  const [inputDimension, setInputDimension] = useState(3);

  let initialState = Array(dimension)
    .fill(0)
    .map((e) => Array(dimension).fill(null));

  let initialCompleteState = Array(dimension)
    .fill(0)
    .map((e) =>
      Array(dimension)
        .fill(0)
        .map((e) =>
          Array(dimension)
            .fill(0)
            .map((e) => Array(dimension).fill(null))
        )
    );

  const [completeState, setCompleteState] = useState(initialCompleteState);
  const [lbState, setLbState] = useState(initialState);
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [currentBoard, setCurrentBoard] = useState(null);
  const [focusBoard, setFocusBoard] = useState(null);
  const [winner, setWinner] = useState(null);
  const [restarting, setRestarting] = useState(false);

  /**
   * function used by the miniboard to change the large board state when a mini board is won
   * @param {*} row
   * @param {*} col
   */
  function handleMiniWin(row, col) {
    lbState[row][col] = currentPlayer === 'X' ? 'O' : 'X';
    setLbState([...lbState]);
  }

  /**
   * function to check whether there is a winner on the board matrix
   * @param {*} board
   * @returns winner marker, or undefined
   */
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

  let mbLayout = Array(dimension);
  // console.log(lbState);
  for (let i = 0; i < dimension; i++) {
    mbLayout[i] = [];
    for (let j = 0; j < dimension; j++) {
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
              dimension={dimension}
              miniState={completeState[i][j]}
              setMiniState={(newMiniState) => {
                let newCompleteState = [...completeState];
                newCompleteState[i][j] = newMiniState;
                setCompleteState(newCompleteState);
              }}
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
              dimension={dimension}
              miniState={completeState[i][j]}
              setMiniState={(newMiniState) => {
                let newCompleteState = [...completeState];
                newCompleteState[i][j] = newMiniState;
                setCompleteState(newCompleteState);
              }}
            />
          );
        }
      }
    }
  }

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

  /**
   * check for winners whenever large board state updates
   */
  useEffect(() => {
    const result = checkWin(lbState);
    if (result) {
      setWinner(result);
    }
  }, [lbState]);

  /**
   * update cursor shape and position
   */
  // const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [floaterPosition, setFloaterPosition] = useState({ x: 0, y: 0 });
  // useEffect(() => {
  //   const moveFloater = (e) => {
  //     // console.log(e);

  //     const floater = floaterRef.current;
  //     floater.style.left = e.clientX - 20 + 'px';
  //     floater.style.top = e.clientY - 30 + 'px';
  //   };
  //   document.addEventListener('mousemove', moveFloater);

  //   return () => {
  //     document.removeEventListener('mousemove', moveFloater);
  //   };
  // }, []);

  useEffect(() => {
    if (restarting) {
      setDimension(inputDimension);
      initialState = Array(inputDimension)
        .fill(0)
        .map((e) => Array(inputDimension).fill(null));
      setLbState(initialState);
      initialCompleteState = Array(inputDimension)
        .fill(0)
        .map((e) =>
          Array(inputDimension)
            .fill(0)
            .map((e) =>
              Array(inputDimension)
                .fill(0)
                .map((e) => Array(inputDimension).fill(null))
            )
        );
      setCompleteState(initialCompleteState);
      setCurrentBoard(null);
      setWinner(null);
      setCurrentPlayer('X');
      setFocusBoard(null);
      setRestarting(false);
    }
  }, [restarting, inputDimension]);

  return (
    <>
      <h2>{winner ? `${winner} WINS` : `It is ${currentPlayer}'s turn`}</h2>
      <div
        id="largeBoard"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseMove={(e) => {
          setFloaterPosition({ x: e.clientX - 15, y: e.clientY - 20 });
        }}
        style={{
          gridTemplate: `repeat(${dimension}, 1fr) / repeat(${dimension}, 1fr)`,
        }}
      >
        {restarting ? null : mbLayout}
      </div>
      <button onClick={() => setRestarting(true)}>Restart!</button>
      <input
        id="dimensionInput"
        value={inputDimension}
        onChange={(e) => {
          console.log(e.target.value);
          setInputDimension(Number(e.target.value));
        }}
      />
      {isHovered && (
        <div
          className="floater"
          style={{
            color: (winner || currentPlayer) === 'X' ? 'red' : 'blue',
            fontSize: '6vw',
            left: floaterPosition.x + 'px',
            top: floaterPosition.y + 'px',
          }}
        >
          {winner || currentPlayer}
        </div>
      )}
    </>
  );
}

export default Largeboard;
