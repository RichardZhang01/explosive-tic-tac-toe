import React, { useState, useEffect, useContext } from 'react';
import { SocketContext } from '../../utils/socket'
import './Chat.css'

export default function Chat(props) {
    const user = props.user.user;
    const room = props.room;
    const date = new Date();
    function time() {
        return date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
        });
    }
    const [input, setInput] = useState({
        user: user.username,
        time: time(),
        message: ''
    });
    const [messages, setMessages] = useState([]);
    const socket = useContext(SocketContext);

    const sendMessage = (e) => {
        e.preventDefault();
        if (input.message) {
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
            return { ...prevMessage, message: message, time: time()}
        });
    };

    useEffect(() => {
        socket.on('recieveMessage', (message) =>{
            setMessages((prevMessages) => [{...message, time: time()}, ...prevMessages]);
        });
    }, [socket]);

    const backgroundColor = (isUser, user) => {
        if (isUser) {
            return 'rgb(129, 0, 50)'
        } else if (user === 'server') {
            return 'rgb(39, 39, 187)'
        } else {
            return 'rgb(3, 112, 3)'
        }
    }

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
                                    backgroundColor: backgroundColor(isUser, message.user),
                                }} 
                                key={i}
                            >
                                <p 
                                    className='chat--message' 
                                    style={{
                                        alignSelf: `${isUser ? 'start' : 'end'}`,
                                        textAlign: `${isUser ? 'left' : 'right'}`, 
                                    }}
                                >
                                    {message.message}
                                </p>
                                <p 
                                    className='chat--message--user' 
                                    style={{
                                        alignSelf: `${isUser ? 'start' : 'end'}`,
                                        textAlign: `${isUser ? 'left' : 'right'}`, 
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