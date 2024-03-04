import PropTypes from 'prop-types';

export default function Status({ winner, currentPlayer }) {
  return (
    <h2 data-test="game-status">
      {winner
        ? winner === 'draw'
          ? 'DRAW'
          : `${winner} WINS`
        : `It is ${currentPlayer}'s turn`}
    </h2>
  );
}

Status.propTypes = {
  winner: PropTypes.string,
  currentPlayer: PropTypes.string.isRequired,
};
