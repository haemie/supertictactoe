import { oSVG, xSVG } from '../assets/SVG';

type boxPropTypes = {
  marker: string | null;
  handleClick?: () => void;
  testProp: string;
};

/**
 * Button element that displays the marker it's passed, and performs actions on click if appropriate
 * @param param0
 * @returns
 */
function Box({ marker, handleClick, testProp }: boxPropTypes) {
  return (
    <button
      className="box"
      onClick={handleClick}
      style={marker === 'X' ? { color: 'red' } : { color: 'blue' }}
      data-test={testProp}
    >
      {marker && (marker === 'X' ? xSVG : oSVG)}
    </button>
  );
}

export default Box;
