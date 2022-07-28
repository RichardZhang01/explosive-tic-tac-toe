import React, { useState, useEffect } from 'react';
import io from 'socket.io-client'

const localUrl = 'http://localhost:3001'
const deployedUrl = '';
const socket = io.connect(process.env.NODE_ENV ? deployedUrl : localUrl);

export default function Messager() {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);

    const sendMessage = () => {
        if (input) {
            socket.emit('sendMessage', { message: input })
        }
    };

    const handleChange = (e) => {
        const message = e.target.value;
        setInput(message);
    };

    useEffect(() => {
        socket.on('recieveMessage', (data) =>{
            setMessages((prevMessages) => [...prevMessages, data.message])
        });
    }, [socket]);

    return (
        <section>
            <input 
                placeholder='message'
                name='message'
                type='text'
                id='message'
                onChange={handleChange}
            />
            <button
                onClick={sendMessage}
            >
                Send
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