//Conditionally render Main page if not logged in or Game+Messager if logged in
import React, { useState, useContext } from 'react';
import Auth from '../utils/auth.js';
import { Link, useNavigate } from 'react-router-dom'
import Game from '../components/TicTacGame';
import { SocketContext } from '../utils/socket'
import Box from '@mui/material/Box';
import home from '../assets/styles/home.css'


export default function Home() {
  const socket = useContext(SocketContext);  
  const [roomId, setRoomId] = useState('');
  const [isFull, setIsFull] = useState(false);
  const navigate = useNavigate();

  const changeHandler = (e) => {
    const room = e.target.value;
    setIsFull(false);
    setRoomId(room);
  };

  const joinGame = () => {
    setIsFull(false);
    if (roomId) {
      socket.emit('joinRoom', roomId, (response) => {
        if (response.status === "ok") {
          navigate(`/game/${roomId}`);
        } else if (response.status === 'full') {
          setIsFull(true);
        }
      });
    };
  };

  const createGame = () => {
    const randomRoom = Math.floor(Math.random() * 90000) + 10000;
    socket.emit('joinRoom', randomRoom, (response) => {
      if (response.status === "ok") {
        navigate(`/game/${randomRoom}`);
      } else if (response.status === 'full') {
        setIsFull(true);
      }
    });
  };

  return (
    <Box component="main" sx={{  flexGrow: 1, py: 15,  }}>
    <>
      {!Auth.loggedIn() ? (
        <div className='home'>
          <h1>Welcome to Explosive Tic-Tac-Toe</h1>
          <br/>
          <h3>To get started, please log in or sign up</h3>
          {/* <Link to='/login'>
            Log In
          </Link>
          <Link to='/signup'>
            Sign Up
          </Link> */}
        </div>
      ) : (
        <div className="gameStartUp">
          {isFull && <h1 style={{ backgroundColor: 'red', color: 'white' }}>The room you are trying to join is full</h1>}
          <input 
            placeholder='Room ID'
            name='roomId'
            type='text'
            id='roomId'
            onChange={changeHandler}
          />
          <button onClick={joinGame}>
            Join Game
          </button>
          <button onClick={createGame}>
            Create Game
          </button>
        </div>
      )}
    </>
    </Box>
  )

};
  