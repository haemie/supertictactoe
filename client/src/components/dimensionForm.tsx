import { SetStateAction } from 'react';

type dimensionFormPropTypes = {
  inputDimension: number;
  setInputDimension: React.Dispatch<SetStateAction<number>>;
  setRestarting: React.Dispatch<SetStateAction<boolean>>;
};

/**
 * Form for setting the dimension of the game and restarting
 * @param param0
 * @returns
 */
export default function DimensionForm({
  inputDimension,
  setInputDimension,
  setRestarting,
}: dimensionFormPropTypes) {
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
