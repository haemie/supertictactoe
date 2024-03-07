import { useState, createContext } from 'react';
import OuterBoard from './components/outerBoard';
import DimensionForm from './components/dimensionForm';
import Status from './components/status';
import ChatRoom from './components/chatRoom';
import { io, Socket } from 'socket.io-client';

export const WebSocketContext = createContext<{
  socket: null | Socket;
  setSocket: React.Dispatch<React.SetStateAction<null | Socket>>;
  io: typeof io;
}>({
  socket: null,
  setSocket: () => {},
  io: io,
});

function App() {
  const [inputDimension, setInputDimension] = useState(3);
  const [dimension, setDimension] = useState(3);
  const [restarting, setRestarting] = useState(false);
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [winner, setWinner] = useState<string | null>(null);
  const [socket, setSocket] = useState<Socket | null>(null);

  return (
    <WebSocketContext.Provider value={{ socket, setSocket, io }}>
      <div className="app">
        <h1>super tic tac toe!</h1>
        <Status winner={winner} currentPlayer={currentPlayer} />
        <OuterBoard
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
