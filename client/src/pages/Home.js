//Conditionally render Main page if not logged in or Game+Messager if logged in
import React, { useState, useContext } from 'react';
import Auth from '../utils/auth';
import { Link } from 'react-router-dom'
import Game from '../components/Game';
import { SocketContext } from '../utils/socket'


export default function Home() {
  const socket = useContext(SocketContext);  
  const [roomId, setRoomId] = useState('');

  const changeHandler = (e) => {
    const room = e.target.value;
    setRoomId(room);
  }

  return (
    <>
      {/* {Auth.loggedIn() ? (
        <div>
          <h1>Welcome to Explosive Tic-Tac-Toe</h1>
          <h3>To get started, please log in or sign up</h3>
          <Link to='/login'>
            Log In
          </Link>
          <Link to='signup'>
            Sign Up
          </Link>
        </div>
      ) : ( */}
        <div>
          <input 
            placeholder='Room ID'
            name='roomId'
            type='text'
            id='roomId'
            onChange={changeHandler}
          />
          <button>
            Join Room
          </button>
          <button>
            Create Room
          </button>
        </div>
      {/* )} */}
    </>
  )

};
  