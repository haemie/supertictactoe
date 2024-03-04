import { useState } from 'react';
import Largeboard from './components/largeboard';
import DimensionForm from './components/form';
import Status from './components/status';

function App() {
  const [inputDimension, setInputDimension] = useState(3);
  const [restarting, setRestarting] = useState(false);
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [winner, setWinner] = useState(null);

  return (
    <div className="app">
      <h1>super tic tac toe!</h1>
      <Status winner={winner} currentPlayer={currentPlayer} />
      <Largeboard
        inputDimension={inputDimension}
        restarting={restarting}
        setRestarting={setRestarting}
        winner={winner}
        setWinner={setWinner}
        currentPlayer={currentPlayer}
        setCurrentPlayer={setCurrentPlayer}
      />
      <DimensionForm
        inputDimension={inputDimension}
        setInputDimension={setInputDimension}
        setRestarting={setRestarting}
      />
    </div>
  );
}

export default App;
