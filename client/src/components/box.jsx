import PropTypes from 'prop-types';

import { oSVG, xSVG } from '../assets/SVG';

function Box({ marker, handleClick, testProp }) {
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

Box.propTypes = {
  marker: PropTypes.string,
  handleClick: PropTypes.func,
  testProp: PropTypes.string.isRequired,
};

export default Box;
