import { useCallback, useEffect, useMemo } from 'react';
import Box from './box';
import { checkWin } from '../utility/gameLogic';
import PropTypes from 'prop-types';

function Miniboard({
  currentPlayer,
  setCurrentPlayer,
  setCurrentBoard,
  style,
  focused,
  handleWin,
  miniState,
  setMiniState,
}) {
  // console.log(miniState);
  // when a box is clicked, assign the current player to the miniboard state, which updates the box marker, and update current player

  const handleClick = useCallback(
    (row, col) => {
      if (!miniState[row][col]) {
        let newMiniState = [...miniState];
        newMiniState[row][col] = currentPlayer;
        setMiniState(newMiniState);
        setCurrentBoard([row, col]);
        console.log(currentPlayer);
        setCurrentPlayer((prevPlayer) => (prevPlayer === 'X' ? 'O' : 'X'));
      }
    },
    [currentPlayer, setCurrentPlayer, miniState, setMiniState, setCurrentBoard]
  );

  const boxLayoutMemo = useMemo(
    () =>
      miniState.map((row, i) =>
        row.map((e, j) => {
          // console.log('refresh');
          return focused ? (
            <Box
              key={`box${i}${j}`}
              className="box"
              boxID={[i, j]}
              marker={miniState[i][j]}
              handleClick={() => handleClick(i, j)}
            />
          ) : (
            <Box
              key={`box${i}${j}`}
              className="box"
              boxID={[i, j]}
              marker={miniState[i][j]}
            />
          );
        })
      ),
    [miniState, focused, handleClick]
  );

  useEffect(() => {
    // check for any win states
    if (checkWin(miniState)) {
      handleWin();
    }
  }, [miniState, handleWin]);

  return (
    <div
      className={focused ? 'focusedBoard' : 'miniBoard'}
      style={{
        ...style,
        gridTemplate: `repeat(${miniState.length}, 1fr) / repeat(${miniState.length}, 1fr)`,
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
  setCurrentBoard: PropTypes.func,
  style: PropTypes.object.isRequired,
  focused: PropTypes.bool.isRequired,
  handleWin: PropTypes.func,
  miniState: PropTypes.arrayOf(PropTypes.array),
  setMiniState: PropTypes.func,
};

export default Miniboard;
