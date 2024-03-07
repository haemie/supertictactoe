import { useCallback, useEffect, useMemo } from 'react';
import Box from './box';
import { checkWin } from '../utility/gameLogic';

let mbCache: [number | undefined, React.JSX.Element[][] | undefined] = [
  undefined,
  undefined,
];

type innerBoardPropTypes = {
  currentPlayer?: string;
  setCurrentPlayer?: React.Dispatch<React.SetStateAction<string>>;
  setNextBoard?: React.Dispatch<React.SetStateAction<[number, number] | null>>;
  style: { backgroundColor: string };
  focused: boolean;
  handleWin?: (status: string) => void;
  innerState: (string | null)[][];
  setInnerState?: (newInnerState: (string | null)[][]) => void;
  innerKey: string;
  turnCount?: number;
  setTurnCount?: React.Dispatch<React.SetStateAction<number>>;
};

/**
 * Renders inner board, and holds data for the state of the game, including the boxes within
 * @param param0
 * @returns
 */
function InnerBoard({
  currentPlayer,
  setCurrentPlayer,
  setNextBoard,
  style,
  focused,
  handleWin,
  innerState,
  setInnerState,
  innerKey,
  turnCount,
  setTurnCount,
}: innerBoardPropTypes) {
  // when a box is clicked, assign the current player to the inner board state, which updates the box marker, and update current player
  const handleClick = useCallback(
    (row: number, col: number) => {
      if (!innerState[row][col]) {
        if (
          currentPlayer &&
          setInnerState &&
          setNextBoard &&
          setCurrentPlayer &&
          setTurnCount
        ) {
          innerState[row][col] = currentPlayer;
          setInnerState(innerState);
          setNextBoard([row, col]);
          setCurrentPlayer((prevPlayer) => (prevPlayer === 'X' ? 'O' : 'X'));
          setTurnCount((turnCount) => turnCount + 1);
        }
      }
    },
    [
      currentPlayer,
      setCurrentPlayer,
      innerState,
      setInnerState,
      setNextBoard,
      setTurnCount,
    ]
  );

  const boxLayoutMemo = useMemo(() => {
    const innerLength = innerState.length;
    if (turnCount === 0 && innerLength === mbCache[0]) {
      return mbCache[1];
    }
    const cacheable = innerState.map((row, i) =>
      row.map((marker, j) => {
        return focused ? (
          <Box
            key={`box${i}${j}`}
            marker={marker}
            handleClick={() => handleClick(i, j)}
            testProp={`${innerKey}-box${i}${j}`}
          />
        ) : (
          <Box
            key={`box${i}${j}`}
            testProp={`${innerKey}-box${i}${j}`}
            marker={marker}
          />
        );
      })
    );

    // if (turnCount === 0) mbCache = [innerLength, cacheable];

    return cacheable;
  }, [innerState, focused, handleClick, innerKey, turnCount]);

  /**
   * currently this runs twice on winning click
   */
  useEffect(() => {
    // check for any win states
    const status = checkWin(innerState);
    if (status && handleWin) {
      handleWin(status);
    }
  }, [innerState, handleWin]);

  return (
    <div
      className={focused ? 'focusedBoard' : 'innerBoard'}
      style={{
        ...style,
        gridTemplate: `repeat(${innerState.length}, 1fr) / repeat(${innerState.length}, 1fr)`,
        gap: `${2 / innerState.length}vw`,
        padding: `${2 / innerState.length}vw`,
      }}
    >
      {boxLayoutMemo}
    </div>
  );
}

export default InnerBoard;
