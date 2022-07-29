import React, { useState, useEffect, useContext } from 'react';
import { SocketContext } from '../../utils/socket'

export default function Messager(props) {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);
    const room = props.room

    const socket = useContext(SocketContext);

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
            <div className='chat'>
                {messages.map((message, i) => {
                    return (
                        <div key={i}>
                            {message}
                        </div>
                    )
                })}
            </div>
        </section>
    )
}