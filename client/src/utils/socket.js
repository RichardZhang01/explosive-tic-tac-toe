import io from 'socket.io-client'
import React from 'react'

const localUrl = 'http://localhost:3001'
const deployedUrl = '';
export const socket = io.connect(process.env.NODE_ENV ? deployedUrl : localUrl);
export const SocketContext = React.createContext();