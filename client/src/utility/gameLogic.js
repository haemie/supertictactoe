/**
 * function to check whether there is a winner on the board matrix
 * checks for winner by checking if the Set has size of 1, meaning the same marker is in every space
 * @param {*} board
 * @returns winner marker, or undefined
 */
export function checkWin(board) {
  for (let i = 0; i < board.length; i++) {
    // check rows
    if (new Set(board[i]).size === 1 && board[i][0] !== null) {
      return board[i][0];
    }
    if (
      new Set(board.map((row) => row[i])).size === 1 &&
      board[0][i] !== null
    ) {
      return board[0][i];
    }
  }
  if (
    new Set(board.map((row, index) => row[index])).size === 1 &&
    board[0][0] !== null
  ) {
    return board[0][0];
  }
  if (
    new Set(board.map((row, index) => row[board.length - 1 - index])).size ===
      1 &&
    board[0][board.length - 1] !== null
  ) {
    return board[0][board.length - 1];
  }
}
