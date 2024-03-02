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
