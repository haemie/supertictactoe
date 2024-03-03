import { useEffect } from 'react';
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

  function handleClick(row, col) {
    if (!miniState[row][col]) {
      let newMiniState = [...miniState];
      newMiniState[row][col] = currentPlayer;
      setMiniState(newMiniState);
      setCurrentBoard([row, col]);
      setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
    }
  }

  const dimension = miniState.length;

  let boxLayout = Array(dimension);
  for (let i = 0; i < dimension; i++) {
    boxLayout[i] = [];
    for (let j = 0; j < dimension; j++) {
      if (focused) {
        boxLayout[i].push(
          <Box
            key={`box${i}${j}`}
            className="box"
            boxID={[i, j]}
            marker={miniState[i][j]}
            handleClick={() => handleClick(i, j)}
          />
        );
      } else {
        boxLayout[i].push(
          <Box
            key={`box${i}${j}`}
            className="box"
            boxID={[i, j]}
            marker={miniState[i][j]}
          />
        );
      }
    }
  }

  useEffect(() => {
    // check for any win states
    if (checkWin(miniState)) {
      handleWin();
    }
  }, [miniState]);

  return (
    <div
      className={focused ? 'focusedBoard' : 'miniBoard'}
      style={{
        ...style,
        gridTemplate: `repeat(${dimension}, 1fr) / repeat(${dimension}, 1fr)`,
      }}
    >
      {boxLayout}
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
