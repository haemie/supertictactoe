import React, { useState, useEffect, useRef } from 'react';
import Miniboard from './miniboard';
import { oSVG, xSVG } from '../assets/SVG';
import {
  createInitialState,
  createInitialCompleteState,
  createFilledMini,
} from '../utility/gameConfig';
import { checkWin } from '../utility/gameLogic';

const jsConfetti = new JSConfetti();

function Largeboard() {
  const [dimension, setDimension] = useState(3);
  const [inputDimension, setInputDimension] = useState(3);

  let initialState = createInitialState(dimension);

  let initialCompleteState = createInitialCompleteState(dimension);

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

  let mbLayout = Array(dimension);
  // console.log(lbState);
  for (let i = 0; i < dimension; i++) {
    mbLayout[i] = [];
    for (let j = 0; j < dimension; j++) {
      if (lbState[i][j]) {
        // truthy value means the mini board has been filled
        mbLayout[i].push(createFilledMini(i, j, lbState[i][j]));
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
              setCurrentBoard={setCurrentBoard}
              focused={true}
              handleWin={() => handleMiniWin(i, j)}
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
              focused={false}
              miniState={completeState[i][j]}
            />
          );
        }
      }
    }
  }

  useEffect(() => {
    if (currentBoard) {
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
      jsConfetti.addConfetti();
    }
  }, [lbState]);

  /**
   * update cursor shape and position
   */
  // const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [floaterPosition, setFloaterPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (restarting) {
      setDimension(inputDimension);
      setLbState(createInitialState(inputDimension));
      setCompleteState(createInitialCompleteState(inputDimension));
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
          setInputDimension(Number(e.target.value)); // inputs are strings, MUST convert it into a number
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
