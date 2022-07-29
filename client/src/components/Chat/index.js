import React, { useState, useEffect, useContext } from 'react';
import { SocketContext } from '../../utils/socket'

export default function Messager() {
    const [input, setInput] = useState('');
    const [room, setRoom] = useState('');
    const [messages, setMessages] = useState([]);

    const socket = useContext(SocketContext);
    console.log(socket)

    const sendMessage = () => {
        if (input) {
            setMessages((prevMessages) => [...prevMessages, input]);
            socket.emit('sendMessage', { message: input, room: room })
        }
    };

    const handleMessage = (e) => {
        const message = e.target.value;
        setInput(message);
    };

    const handleRoom = (e) => {
        const roomNum = e.target.value;
        setRoom(roomNum);
    };

    const joinRoom = (e) => {
        if (room) {
            socket.emit('joinRoom', room);
        }
    }

    useEffect(() => {
        socket.on('recieveMessage', (message) =>{
            setMessages((prevMessages) => [...prevMessages, message]);
        });
    }, [socket]);

    return (
        <section>
            <input 
                placeholder='message'
                name='message'
                type='text'
                id='message'
                onChange={handleMessage}
            />
            <button
                onClick={sendMessage}
            >
                Send
            </button>
            <input 
                placeholder='Room'
                name='room'
                type='text'
                id='room'
                onChange={handleRoom}
            />
            <button
                onClick={joinRoom}
            >
                Join Room
            </button>
            <div className='chat'>
                {messages.map(message => {
                    return (
                        <div>
                            {message}
                        </div>
                    )
                })}
            </div>
        </section>
    )
}