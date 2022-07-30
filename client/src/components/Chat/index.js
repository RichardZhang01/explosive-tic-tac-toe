import React, { useState, useEffect, useContext } from 'react';
import { SocketContext } from '../../utils/socket'
import './Chat.css'

export default function Chat(props) {
    const user = props.user.user;
    const room = props.room;
    const date = new Date();
    const time = date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
      });
    const [input, setInput] = useState({
        user: user.username,
        time: time,
        message: ''
    });
    const [messages, setMessages] = useState([]);
    const socket = useContext(SocketContext);

    const sendMessage = (e) => {
        e.preventDefault();
        if (input) {
            setMessages((prevMessages) => [input, ...prevMessages]);
            socket.emit('sendMessage', { message: input, room: room })
        }
        setInput(prevInput => {
            return {
                ...prevInput,
                message: ''
            }
        })
    };

    const handleMessage = (e) => {
        const message = e.target.value;
        setInput(prevMessage => {
            return { ...prevMessage, message: message, time: time}
        });
    };

    useEffect(() => {
        socket.on('recieveMessage', (message) =>{
            setMessages((prevMessages) => [message, ...prevMessages]);
        });
    }, [socket]);

    return (
        <section className='chat'>
            <div className='chat--window'>
                <div className='chat--messages--box'>
                    {messages.map((message, i) => {
                        const isUser = message.user === user.username
                        return (
                            <div 
                                className='chat--message--container'
                                style={{ 
                                    alignSelf: `${isUser ? 'start' : 'end'}`,
                                    color: `${isUser ? 'black' : 'white'}`,
                                    backgroundColor: `${isUser ? 'skyblue' : 'rgb(5, 139, 5)'}`
                                }} 
                                key={i}
                            >
                                <p 
                                    className='chat--message' 
                                    style={{
                                        alignSelf: `${isUser ? 'start' : 'end'}`, 
                                    }}
                                >
                                    {message.message}
                                </p>
                                <p 
                                    className='chat--message--user' 
                                    style={{
                                        alignSelf: `${isUser ? 'start' : 'end'}`, 
                                    }}
                                >
                                    {isUser ? 'You' : message.user}, {message.time}
                                </p>
                            </div>
                        )
                    })}
                </div>
            </div>
            <form className='chat--form' onSubmit={sendMessage}>
                <input
                    className='chat--input' 
                    placeholder='message'
                    name='message'
                    type='text'
                    id='message'
                    value={input.message}
                    onChange={handleMessage}
                />
                <input
                    className='chat--submit'
                    type='submit'
                    value='Send'
                />
            </form>
        </section>
    )
}