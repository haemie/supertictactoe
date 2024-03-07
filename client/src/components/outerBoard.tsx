import { useState, useEffect, useMemo, useRef } from 'react';
import InnerBoard from './innerBoard';
import {
  createInitialState,
  createInitialCompleteState,
  createFilledInner,
  createTiedInner,
} from '../utility/gameConfig';
import { checkWin } from '../utility/gameLogic';
import JSConfetti from 'js-confetti';
import LoadingAnimation from '../assets/loadingAnimation';

const jsConfetti = new JSConfetti();

type outerBoardPropTypes = {
  restarting: boolean;
  setRestarting: React.Dispatch<React.SetStateAction<boolean>>;
  inputDimension: number;
  winner: string | null;
  setWinner: React.Dispatch<React.SetStateAction<string | null>>;
  currentPlayer: string;
  setCurrentPlayer: React.Dispatch<React.SetStateAction<string>>;
  dimension: number;
  setDimension: React.Dispatch<React.SetStateAction<number>>;
};

/**
 * Renders Outer board, and holds data for the state of the game, including the inner boards and boxes within
 * @param param0
 * @returns
 */
function OuterBoard({
  restarting,
  setRestarting,
  inputDimension,
  winner,
  setWinner,
  currentPlayer,
  setCurrentPlayer,
  dimension,
  setDimension,
}: outerBoardPropTypes) {
  let initialState = createInitialState(dimension);
  let initialCompleteState = createInitialCompleteState(dimension);
  const [completeState, setCompleteState] = useState(initialCompleteState);
  const [lbState, setLbState] = useState(initialState);

  const [nextBoard, setNextBoard] = useState<[number, number] | null>(null);
  const [currentBoard, setCurrentBoard] = useState<[number, number] | null>(
    null
  );

  const [turnCount, setTurnCount] = useState(0);

  /**
   * memoized layout to prevent unnecessary rerenders and O(n^2) computation
   */
  const mbLayoutMemo = useMemo(() => {
    /**
     * function used by the inner board to change the outer board state when an inner board is won
     * @param {*} row
     * @param {*} col
     */
    function handleInnerWin(row: number, col: number, status: string) {
      // status could be 'X', 'O', or 'draw'
      lbState[row][col] = status;
      setLbState([...lbState]);
    }

    return lbState.map((row, i) =>
      row.map((marker, j) => {
        // if the outer board has a non null element, that means that space has been won by the marker or is tied
        if (marker) {
          if (marker === 'draw') {
            return createTiedInner(completeState[i][j]);
          } else {
            return createFilledInner(i, j, marker);
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
              <InnerBoard
                style={{ backgroundColor: '#0268e6' }}
                key={`mb${i}${j}`}
                currentPlayer={currentPlayer}
                setCurrentPlayer={setCurrentPlayer}
                setNextBoard={setNextBoard}
                turnCount={turnCount}
                setTurnCount={setTurnCount}
                focused={true}
                handleWin={(status: string) => {
                  handleInnerWin(i, j, status);
                }}
                innerState={completeState[i][j]}
                setInnerState={(newInnerState) => {
                  let newCompleteState = [...completeState];
                  newCompleteState[i][j] = newInnerState;
                  setCompleteState(newCompleteState);
                }}
                innerKey={`mb${i}${j}`}
              />
            );
          } else {
            // this board is inactive, because either
            // 1) someone has won
            // 2) another board is the designated currentBoard
            return (
              <InnerBoard
                style={{ backgroundColor: '#7f7f7f' }}
                key={`mb${i}${j}`}
                focused={false}
                innerState={completeState[i][j]}
                innerKey={`mb${i}${j}`}
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
    turnCount,
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
   * check for winners whenever outer board state updates
   */
  useEffect(() => {
    const result = checkWin(lbState);
    if (result) {
      setWinner(result);
      if (result === 'draw') {
        jsConfetti.addConfetti({
          emojis: ['💀', '😅'],
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
      setTurnCount(0);
      // }, 1000);
    }
    // return () => clearTimeout(showLoadingScreen);
  }, [
    restarting,
    setRestarting,
    setCurrentPlayer,
    inputDimension,
    setDimension,
    setWinner,
  ]);

  /**
   * log time to reload, look to improve performance with caching
   */
  const startRef = useRef<number | null>(null);
  const endRef = useRef<number | null>(null);
  useEffect(() => {
    if (restarting) {
      startRef.current = performance.now();
    } else {
      endRef.current = performance.now();
      if (startRef.current) {
        console.log(
          `rerender took ${(endRef.current - startRef.current) / 1000} seconds`
        );
      }
    }
  }, [restarting]);

  return (
    <>
      <div
        id="outerBoard"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseMove={(e) => {
          setFloaterPosition({ x: e.clientX, y: e.clientY });
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
            fontSize: '3em',
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

export default OuterBoard;
