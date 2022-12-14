//Conditionally render Main page if not logged in or Game+Messager if logged in
import React, { useState, useContext } from 'react';
import Auth from '../utils/auth.js';
import {useNavigate, Link } from 'react-router-dom'
import { SocketContext } from '../utils/socket'
import Box from '@mui/material/Box';
import '../assets/styles/home.css'


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

  const joinGame = (e) => {
    e.preventDefault();
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
          <Link to='/login' style={{ textDecoration: 'none', color: 'white', fontWeight: '100', display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
              <button>
                LOG IN
              </button>
          </Link>
        </div>
      ) : (
        <div className="gameStartUp">
          {isFull && <h1 style={{ backgroundColor: 'red', color: 'white' }}>The room you are trying to join is full</h1>}
          <form onSubmit={joinGame}>
            <input 
              placeholder='Room ID'
              name='roomId'
              type='text'
              id='roomId'
              onChange={changeHandler}
            />
            <input
              type='submit'
              value='Join Game'
              id="joinGameInput"
            >
            </input>
          </form>
          <button onClick={createGame}>
            Create Game
          </button>
        </div>
      )}
    </>
    </Box>
  )

};
  