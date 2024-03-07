type statusPropTypes = {
  winner: string | null;
  currentPlayer: string;
};

/**
 * Displays status of the game, who's turn it is or game results
 * @param param0
 * @returns
 */
export default function Status({ winner, currentPlayer }: statusPropTypes) {
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
