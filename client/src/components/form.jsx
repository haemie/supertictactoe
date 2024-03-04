import PropTypes from 'prop-types';

export default function DimensionForm({
  inputDimension,
  setInputDimension,
  setRestarting,
}) {
  return (
    <form>
      <input
        type="submit"
        value="Restart!"
        data-test="restart-button"
        onClick={(e) => {
          e.preventDefault();
          setRestarting(true);
        }}
      />
      <input
        id="dimensionInput"
        data-test="dimension-input"
        value={inputDimension}
        onChange={(e) => {
          setInputDimension(Number(e.target.value)); // inputs are strings, MUST convert it into a number
        }}
      />
    </form>
  );
}

DimensionForm.propTypes = {
  inputDimension: PropTypes.number.isRequired,
  setInputDimension: PropTypes.func.isRequired,
  setRestarting: PropTypes.func.isRequired,
};
