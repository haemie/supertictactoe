import { xSVG, oSVG } from '../assets/SVG';

/**
 * Creates an array of arrays, representing the n x n state of the outer board
 * @param dimension
 * @returns
 */
export const createInitialState = (dimension: number): (string | null)[][] =>
  Array(dimension)
    .fill(0)
    .map(() => Array(dimension).fill(null));

/**
 * Creates an array of arrays, representing the (n x n) * (n x n) state of all inner boards
 * @param dimension
 * @returns
 */
export const createInitialCompleteState = (
  dimension: number
): (string | null)[][][][] =>
  Array(dimension)
    .fill(0)
    .map(() =>
      Array(dimension)
        .fill(0)
        .map(() =>
          Array(dimension)
            .fill(0)
            .map(() => Array(dimension).fill(null))
        )
    );

/**
 * Creates a noninteractive board that takes the place of a claimed inner board
 * @param i
 * @param j
 * @param marker
 * @returns
 */
export const createFilledInner = (
  i: number,
  j: number,
  marker: string | null
) => {
  return (
    <div
      className="filledInner"
      key={`filled${i}${j}`}
      style={marker === 'X' ? { color: 'red' } : { color: 'blue' }}
    >
      {marker === 'X' ? xSVG : oSVG}
    </div>
  );
};

/**
 * Creates a noninteractive board that takes the place of a tied inner board
 * @param board
 * @returns
 */
export const createTiedInner = (board: Array<Array<string | null>>) => {
  return (
    <div
      className="innerBoard"
      style={{
        gridTemplate: `repeat(${board.length}, 1fr) / repeat(${board.length}, 1fr)`,
      }}
    >
      {board.map((row, i) =>
        row.map((e, j) => (
          <div key={`tiedbox${i}${j}`} className="box">
            {e === 'X' ? xSVG : oSVG}
          </div>
        ))
      )}
    </div>
  );
};
