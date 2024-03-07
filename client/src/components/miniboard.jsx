import { useCallback, useEffect, useMemo, useState } from 'react';
import Box from './box';
import { checkWin } from '../utility/gameLogic';
import PropTypes from 'prop-types';

let mbCache = [];

function Miniboard({
  currentPlayer,
  setCurrentPlayer,
  setNextBoard,
  style,
  focused,
  handleWin,
  miniState,
  setMiniState,
  miniKey,
  turnCount,
  setTurnCount,
}) {
  // when a box is clicked, assign the current player to the miniboard state, which updates the box marker, and update current player
  const handleClick = useCallback(
    (row, col) => {
      if (!miniState[row][col]) {
        let newMiniState = [...miniState];
        newMiniState[row][col] = currentPlayer;
        setMiniState(newMiniState);
        setNextBoard([row, col]);
        setCurrentPlayer((prevPlayer) => (prevPlayer === 'X' ? 'O' : 'X'));
        setTurnCount((turnCount) => turnCount + 1);
      }
    },
    [
      currentPlayer,
      setCurrentPlayer,
      miniState,
      setMiniState,
      setNextBoard,
      setTurnCount,
    ]
  );

  const boxLayoutMemo = useMemo(() => {
    const miniLength = miniState.length;
    if (turnCount === 0 && miniLength === mbCache[0]) {
      return mbCache[1];
    }
    const cacheable = miniState.map((row, i) =>
      row.map((e, j) => {
        return focused ? (
          <Box
            key={`box${i}${j}`}
            marker={miniState[i][j]}
            handleClick={() => handleClick(i, j)}
            testProp={`${miniKey}-box${i}${j}`}
          />
        ) : (
          <Box
            key={`box${i}${j}`}
            testProp={`${miniKey}-box${i}${j}`}
            marker={miniState[i][j]}
          />
        );
      })
    );

    // if (turnCount === 0) mbCache = [miniLength, cacheable];

    return cacheable;
  }, [miniState, focused, handleClick, miniKey, turnCount]);

  /**
   * currently this runs twice on winning click
   */
  useEffect(() => {
    // check for any win states
    const status = checkWin(miniState);
    if (status) {
      handleWin(status);
    }
  }, [miniState, handleWin]);

  return (
    <div
      className={focused ? 'focusedBoard' : 'miniBoard'}
      style={{
        ...style,
        gridTemplate: `repeat(${miniState.length}, 1fr) / repeat(${miniState.length}, 1fr)`,
        gap: `${2 / miniState.length}vw`,
        padding: `${2 / miniState.length}vw`,
      }}
    >
      {boxLayoutMemo}
    </div>
  );
}

Miniboard.propTypes = {
  className: PropTypes.string,
  currentPlayer: PropTypes.string,
  setCurrentPlayer: PropTypes.func,
  setNextBoard: PropTypes.func,
  style: PropTypes.object.isRequired,
  focused: PropTypes.bool.isRequired,
  handleWin: PropTypes.func,
  miniState: PropTypes.arrayOf(PropTypes.array),
  setMiniState: PropTypes.func,
  miniKey: PropTypes.string,
  turnCount: PropTypes.number,
  setTurnCount: PropTypes.func,
};

export default Miniboard;
