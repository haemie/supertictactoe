/**
 * function to check whether there is a winner on the board matrix
 * checks for winner by checking if the Set has size of 1, meaning the same marker is in every space
 * @param {*} board
 * @returns winner marker, or undefined
 */
export function checkWin(board: Array<Array<string | null>>) {
  const testSet = new Set();
  let nullCount = 0;
  for (let i = 0; i < board.length; i++) {
    // check rows
    board[i].forEach((e: string | null) => {
      if (e === null) nullCount += 1;
      testSet.add(e);
    });
    if (testSet.size === 1 && board[i][0] !== null && board[i][0] !== 'draw') {
      return board[i][0];
    }
    testSet.clear();
    // check columns
    board
      .map((row: Array<string | null>) => row[i])
      .forEach((e: string | null) => testSet.add(e));
    if (testSet.size === 1 && board[0][i] !== null && board[0][i] !== 'draw') {
      return board[0][i];
    }
    testSet.clear();
  }
  // check top left to bottom right diagonal
  board
    .map((row: Array<string | null>, index: number) => row[index])
    .forEach((e: string | null) => testSet.add(e));
  if (testSet.size === 1 && board[0][0] !== null && board[0][0] !== 'draw') {
    return board[0][0];
  }
  testSet.clear();
  // check top right to bottom left diagonal
  board
    .map(
      (row: Array<string | null>, index: number) =>
        row[board.length - 1 - index]
    )
    .forEach((e) => testSet.add(e));
  if (
    testSet.size === 1 &&
    board[0][board.length - 1] !== null &&
    board[0][board.length - 1] !== 'draw'
  ) {
    return board[0][board.length - 1];
  }
  testSet.clear();
  // // check for draw
  if (nullCount === 0) {
    return 'draw';
  }
}
