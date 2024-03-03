import { useState, useEffect, useMemo } from 'react';
import Miniboard from './miniboard';
// import { oSVG, xSVG } from '../assets/SVG';
import {
  createInitialState,
  createInitialCompleteState,
  createFilledMini,
} from '../utility/gameConfig';
import { checkWin } from '../utility/gameLogic';
import JSConfetti from 'js-confetti';

const jsConfetti = new JSConfetti();

function Largeboard() {
  const [dimension, setDimension] = useState(3);
  const [inputDimension, setInputDimension] = useState(3);

  let initialState = createInitialState(dimension);
  let initialCompleteState = createInitialCompleteState(dimension);
  const [completeState, setCompleteState] = useState(initialCompleteState);
  const [lbState, setLbState] = useState(initialState);

  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [nextBoard, setNextBoard] = useState(null);
  const [currentBoard, setCurrentBoard] = useState(null);

  const [winner, setWinner] = useState(null);
  const [restarting, setRestarting] = useState(false);

  /**
   * memoized layout to prevent unnecessary rerenders and O(n^2) computation
   */
  const mbLayoutMemo = useMemo(() => {
    /**
     * function used by the miniboard to change the large board state when a mini board is won
     * @param {*} row
     * @param {*} col
     */
    function handleMiniWin(row, col) {
      lbState[row][col] = currentPlayer === 'X' ? 'O' : 'X';
      setLbState([...lbState]);
    }
    console.log('render');
    return lbState.map((row, i) =>
      row.map((marker, j) => {
        // if the largeboard has a non null element, that means that space has been won by the marker
        if (marker) {
          return createFilledMini(i, j, marker);
        } else {
          // if no one has won yet, and either:
          // 1) there is no current board meaning this is a new game, or the targeted board is already filled
          // 2) there is a current board, and it is the board currently getting rendered
          // then make the board focused
          if (
            !winner &&
            (!currentBoard ||
              (currentBoard && currentBoard[0] === i && currentBoard[1] === j))
          ) {
            return (
              <Miniboard
                style={{ backgroundColor: '#0268e6' }}
                key={`mb${i}${j}`}
                currentPlayer={currentPlayer}
                setCurrentPlayer={setCurrentPlayer}
                setNextBoard={setNextBoard}
                focused={true}
                handleWin={() => handleMiniWin(i, j)}
                miniState={completeState[i][j]}
                setMiniState={(newMiniState) => {
                  let newCompleteState = [...completeState];
                  newCompleteState[i][j] = newMiniState;
                  setCompleteState(newCompleteState);
                }}
                miniKey={`mb${i}${j}`}
              />
            );
          } else {
            // this board is inactive, because either
            // 1) someone has won
            // 2) another board is the designated currentBoard
            return (
              <Miniboard
                style={{ backgroundColor: '#7f7f7f' }}
                key={`mb${i}${j}`}
                focused={false}
                miniState={completeState[i][j]}
                miniKey={`mb${i}${j}`}
              />
            );
          }
        }
      })
    );
  }, [lbState, winner, currentBoard, currentPlayer, completeState]);

  /**
   * checks if the target nextBoard is already occupied
   * if occupied, set no particular currentBoard
   * otherwise, set currentBoard to the unoccupied board
   */
  useEffect(() => {
    console.log('asdf');
    if (nextBoard) {
      if (lbState[nextBoard[0]][nextBoard[1]]) {
        setCurrentBoard(null);
      } else {
        setCurrentBoard([nextBoard[0], nextBoard[1]]);
      }
    }
  }, [nextBoard, lbState]);

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
      setNextBoard(null);
      setWinner(null);
      setCurrentPlayer('X');
      setCurrentBoard(null);
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
        {restarting ? null : mbLayoutMemo}
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
