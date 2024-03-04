import { useState, createContext } from 'react';
import Largeboard from './components/largeboard';
import DimensionForm from './components/form';
import Status from './components/status';
import ChatRoom from './components/ChatRoom';
import { io } from 'socket.io-client';

export const WebSocketContext = createContext(null);

function App() {
  const [inputDimension, setInputDimension] = useState(3);
  const [dimension, setDimension] = useState(3);
  const [restarting, setRestarting] = useState(false);
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [winner, setWinner] = useState(null);
  const [socket, setSocket] = useState(null);

  return (
    <WebSocketContext.Provider value={{ socket, setSocket, io }}>
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
          dimension={dimension}
          setDimension={setDimension}
        />
        <DimensionForm
          inputDimension={inputDimension}
          setInputDimension={setInputDimension}
          setRestarting={setRestarting}
        />
        <ChatRoom dimension={dimension} />
      </div>
    </WebSocketContext.Provider>
  );
}

export default App;
