import { useContext, useEffect, useState } from 'react';
import { WebSocketContext } from '../App';

let displayName;

export default function ChatRoom({ dimension }) {
  const { socket, setSocket, io } = useContext(WebSocketContext);
  const [connected, setConnected] = useState(false);
  const [userList, setUserList] = useState({});
  const [chatMessages, setChatMessages] = useState([]);

  function handleConnect(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    displayName = formData.get('displayName');

    if (!connected) {
      const newSocket = io('http://localhost:8080/', { reconnection: false });
      newSocket.on('connect_error', (error) => {
        console.log('failed to connect to websocket server');
      });
      newSocket.on('connect', () => {
        const roomName = `${dimension}x${dimension}`;
        newSocket.emit('join room', {
          room: roomName,
          displayName: displayName,
        });
        setConnected(true);
        setSocket(newSocket);
      });
    } else {
      socket.disconnect();
      setConnected(false);
      setSocket(null);
    }
  }

  function handleChat(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const message = formData.get('message');
    socket.emit('chat message', message);
  }

  useEffect(() => {
    if (socket) {
      socket.on('message', (data) => {
        console.log(data);
      });

      socket.on('user has left', (socketid) => {
        setUserList((oldUserList) => {
          const oldCopy = { ...oldUserList };
          delete oldCopy[socketid];
          return oldCopy;
        });
      });

      socket.on('user has joined', ([socketid, displayName]) => {
        setUserList((oldUserList) => ({
          ...oldUserList,
          [socketid]: displayName,
        }));
      });

      socket.on('current players', (data) => {
        console.log('current player data', data);
        setUserList(data);
      });

      socket.on('chat message', (data) => {
        console.log('received message', data);
        setChatMessages((oldChat) => oldChat.concat([data]));
        console.log(chatMessages);
      });

      return () => {
        socket.off('connect');
        socket.off('message');
      };
    }
  }, [socket]);

  return (
    <div style={{ width: '100%' }}>
      chat room
      <form onSubmit={handleConnect}>
        <input type="text" name="displayName" placeholder="displayname" />
        <input type="submit" value="connect" />
      </form>
      {connected && (
        <div className="chatContainer">
          <div className="usersContainer">
            users
            {Object.entries(userList).map(([socketid, displayName], i) => (
              <div key={i}>{displayName}</div>
            ))}
          </div>
          <div className="chatSection">
            <div className="chatMessages">
              messages
              {chatMessages.map((data, i) => (
                <div key={i}>{`${userList[data.sender]}: ${data.message}`}</div>
              ))}
            </div>
            <form className="chatInputs" onSubmit={handleChat}>
              <input type="text" name="message" />
              <input type="submit" value="send" />
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
