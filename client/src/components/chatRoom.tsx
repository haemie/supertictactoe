import { useContext, useEffect, useState, FormEvent } from 'react';
import { WebSocketContext } from '../App';

let displayName: string | undefined;

type usersListType = { [socketId: string]: string };
type chatMessageType = { sender: string; message: string };

/**
 * Holds logic for connecting to websocket server, seeing connected users, and sending/receiving messages
 * @param param0
 * @returns jsx div of chat box
 */
export default function ChatRoom({ dimension }: { dimension: number }) {
  const { socket, setSocket, io } = useContext(WebSocketContext);
  const [connected, setConnected] = useState(false);
  const [userList, setUserList] = useState<usersListType>({});
  const [chatMessages, setChatMessages] = useState<chatMessageType[]>([]);

  // try to connect user to websocket server when they press connect
  function handleConnect(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    displayName = formData.get('displayName') as string;

    if (!connected) {
      const newSocket = io('http://localhost:8080/', { reconnection: false });
      newSocket.on('connect_error', (error) => {
        console.log('failed to connect to websocket server');
        console.error(error);
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
      socket?.disconnect();
      setConnected(false);
      setSocket(null);
    }
  }

  // emit event when message is submitted
  function handleChat(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const message = formData.get('message');
    socket?.emit('chat message', message);
    e.currentTarget.reset();
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

      socket.on(
        'user has joined',
        ([socketid, displayName]: [string, string]) => {
          setUserList((oldUserList) => ({
            ...oldUserList,
            [socketid]: displayName,
          }));
        }
      );

      socket.on('current players', (users: usersListType) => {
        console.log('current player data', users);
        setUserList(users);
      });

      socket.on('chat message', (data: chatMessageType) => {
        console.log('received message', data);
        setChatMessages((oldChat) => oldChat.concat([data]));
      });

      return () => {
        socket.off('connect');
        socket.off('message');
        socket.off('user has left');
        socket.off('user has joined');
        socket.off('current players');
        socket.off('chat message');
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
          <input type="button" value="start" />
        </div>
      )}
    </div>
  );
}
