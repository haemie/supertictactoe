import { useContext, useEffect, useState } from 'react';
import { WebSocketContext } from '../App';

let displayName;

export default function ChatRoom({ dimension }) {
  const { socket, setSocket, io } = useContext(WebSocketContext);
  const [userList, setUserList] = useState([]);
  const [chatMessages, setChatMessages] = useState([]);

  function handleConnect(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    displayName = formData.get('displayName');
    if (!socket) {
      setSocket(io('http://localhost:8080/'));
    } else {
      socket.disconnect();
      setSocket(null);
    }
  }

  // useEffect(() => {
  //   (async () => {
  //     console.log('getting players in room');
  //     if (socket) {
  //       const response = await fetch('http://localhost:8080/players');
  //       const players = response.json();
  //       console.log('getting players');
  //       console.log(players);
  //     }
  //   })();
  // }, [socket]);

  useEffect(() => {
    if (socket) {
      socket.on('message', (data) => {
        console.log(data);
      });

      socket.on('current players', (data) => {
        console.log('current player data', data);
        setUserList(data);
      });

      socket.on('chat message', (data) => {
        console.log('received message', data);
        setChatMessages((oldChat) => oldChat.concat([data]));
      });

      socket.on('connect', () => {
        const roomName = `${dimension}x${dimension}`;
        socket.emit('join room', { room: roomName, displayName: displayName });
      });

      return () => {
        socket.off('connect');
        socket.off('message');
      };
    }
  }, [socket, dimension]);

  return (
    <div>
      chat room
      <form onSubmit={handleConnect}>
        <input type="text" name="displayName" placeholder="displayname" />
        <input type="submit" value="connect" />
      </form>
      <div className="chatContainer">
        <div className="usersContainer">
          {userList.map((e, i) => (
            <div key={i}>{e}</div>
          ))}
        </div>
        <div className="chatSection">
          <div className="chatMessages">
            {chatMessages.map((e, i) => (
              <div key={i}>{`${e.displayName}: ${e.chat}`}</div>
            ))}
          </div>
          <form className="chatInputs">
            <input type="text" name="message" />
            <input type="submit" value="send" />
          </form>
        </div>
      </div>
    </div>
  );
}
