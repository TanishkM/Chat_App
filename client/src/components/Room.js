import { React, useEffect, useState } from 'react'
import io from 'socket.io-client';
import Chat from './Chat';
import {useHistory} from 'react-router-dom'


const socket = io.connect('http://localhost:3001');
const Room = () => {
  let history=useHistory();
  const [messageList, setMessageList] = useState([]);
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);
  useEffect(()=>{
    if(localStorage.getItem('token')==null)
    {history.push("/login")}
    
  },[history])
  const getChats = async () => {
    // API Call 
    const response = await fetch(`http://localhost:3001/api/chats/fetchallchats`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token'),
        "room": room
      },
    });

    const json = await response.json()
    setMessageList(json)
  }


  const joinRoom = async () => {
    if (room !== "") {
      const response = await fetch(`http://localhost:3001/api/auth/getuser`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "auth-token": localStorage.getItem('token'),
        },
      });
      const json = await response.json()
      setUsername(json.name)

      socket.emit("join_room", { username, room });
      setShowChat(true)
      getChats();
    }
  };



  return (
    <div className='App'>
      {!showChat ? (
        <div className='joinChatContainer'>
          <h3>Join A Chat</h3>
          <input type="text" placeholder='Room ID..' onChange={(event) => {
            setRoom(event.target.value);
          }} />
          <button onClick={joinRoom}>Join a Room</button>
        </div>
      )
        : (
          <Chat socket={socket} username={username} room={room} messageList={messageList} setMessageList={setMessageList} />)}
    </div>
  )
}

export default Room
