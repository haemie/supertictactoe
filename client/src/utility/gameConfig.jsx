import { xSVG, oSVG } from '../assets/SVG';

export const createInitialState = (dimension) =>
  Array(dimension)
    .fill(0)
    .map(() => Array(dimension).fill(null));

export const createInitialCompleteState = (dimension) =>
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

export const createFilledMini = (i, j, marker) => {
  return (
    <div
      className="filledMini"
      key={`filled${i}${j}`}
      style={marker === 'X' ? { color: 'red' } : { color: 'blue' }}
    >
      {marker === 'X' ? xSVG : oSVG}
    </div>
  );
};

export const createTiedMini = (board) => {
  return (
    <div
      className="miniBoard"
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
