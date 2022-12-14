import io from 'socket.io-client'
import React from 'react'

const localUrl = 'http://localhost:3001'
const deployedUrl = 'https://explosive-tic-tac-toe.herokuapp.com/';
export const socket = io.connect(process.env.NODE_ENV === 'development' ? localUrl : deployedUrl);
export const SocketContext = React.createContext();