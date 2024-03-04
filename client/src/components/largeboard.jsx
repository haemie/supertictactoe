import { useState, useEffect, useMemo, useRef } from 'react';
import Miniboard from './miniboard';
// import { oSVG, xSVG } from '../assets/SVG';
import {
  createInitialState,
  createInitialCompleteState,
  createFilledMini,
  createTiedMini,
} from '../utility/gameConfig';
import { checkWin } from '../utility/gameLogic';
import JSConfetti from 'js-confetti';
import PropTypes from 'prop-types';
import LoadingAnimation from '../assets/loadingAni';

const jsConfetti = new JSConfetti();

function Largeboard({
  restarting,
  setRestarting,
  inputDimension,
  winner,
  setWinner,
  currentPlayer,
  setCurrentPlayer,
}) {
  const [dimension, setDimension] = useState(3);

  let initialState = createInitialState(dimension);
  let initialCompleteState = createInitialCompleteState(dimension);
  const [completeState, setCompleteState] = useState(initialCompleteState);
  const [lbState, setLbState] = useState(initialState);

  const [nextBoard, setNextBoard] = useState(null);
  const [currentBoard, setCurrentBoard] = useState(null);

  /**
   * memoized layout to prevent unnecessary rerenders and O(n^2) computation
   */
  const mbLayoutMemo = useMemo(() => {
    /**
     * function used by the miniboard to change the large board state when a mini board is won
     * @param {*} row
     * @param {*} col
     */
    function handleMiniWin(row, col, status) {
      // status could be 'X', 'O', or 'draw'
      lbState[row][col] = status;
      setLbState([...lbState]);
    }
    return lbState.map((row, i) =>
      row.map((marker, j) => {
        // if the largeboard has a non null element, that means that space has been won by the marker or is tied
        if (marker) {
          if (marker === 'draw') {
            return createTiedMini(completeState[i][j]);
          } else {
            return createFilledMini(i, j, marker);
          }
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
                handleWin={(status) => {
                  handleMiniWin(i, j, status);
                }}
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
  }, [
    lbState,
    winner,
    currentBoard,
    currentPlayer,
    setCurrentPlayer,
    completeState,
  ]);

  /**
   * checks if the target nextBoard is already occupied
   * if occupied, set no particular currentBoard
   * otherwise, set currentBoard to the unoccupied board
   */
  useEffect(() => {
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
      if (result === 'draw') {
        jsConfetti.addConfetti({
          emojis: ['💀', '😭', '😞'],
        });
      } else
        jsConfetti.addConfetti({
          emojis: ['🎉', '🎈', '🎊', '🥳'],
        });
    }
  }, [lbState, setWinner]);

  /**
   * update cursor shape and position
   */
  // const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [floaterPosition, setFloaterPosition] = useState({ x: 0, y: 0 });

  /**
   * reset the board and all states when game restarts
   */
  useEffect(() => {
    // let showLoadingScreen;
    if (restarting) {
      setDimension(inputDimension);
      setLbState(createInitialState(inputDimension));
      setCompleteState(createInitialCompleteState(inputDimension));
      setNextBoard(null);
      setWinner(null);
      setCurrentPlayer('X');
      setCurrentBoard(null);
      // showLoadingScreen = setTimeout(() => {
      setRestarting(false);
      // }, 1000);
    }
    // return () => clearTimeout(showLoadingScreen);
  }, [restarting, setRestarting, setCurrentPlayer, inputDimension, setWinner]);

  /**
   * log time to reload, look to improve performance with caching
   */
  const startRef = useRef(null);
  const endRef = useRef(null);
  useEffect(() => {
    if (restarting) {
      startRef.current = performance.now();
    } else {
      endRef.current = performance.now();
      console.log(
        `rerender took ${(endRef.current - startRef.current) / 1000} seconds`
      );
    }
  }, [restarting]);

  return (
    <>
      <div
        id="largeBoard"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseMove={(e) => {
          setFloaterPosition({ x: e.clientX - 15, y: e.clientY - 20 });
        }}
        style={{
          gridTemplate: `repeat(${dimension}, 1fr) / repeat(${dimension}, 1fr)`,
          gap: `${5 / dimension}vw`,
        }}
      >
        {restarting ? <LoadingAnimation /> : mbLayoutMemo}
      </div>

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
          {winner === 'draw' ? '💀' : winner || currentPlayer}
        </div>
      )}
    </>
  );
}

Largeboard.propTypes = {
  restarting: PropTypes.bool.isRequired,
  setRestarting: PropTypes.func.isRequired,
  inputDimension: PropTypes.number.isRequired,
  winner: PropTypes.string,
  setWinner: PropTypes.func.isRequired,
  currentPlayer: PropTypes.string.isRequired,
  setCurrentPlayer: PropTypes.func.isRequired,
};

export default Largeboard;
