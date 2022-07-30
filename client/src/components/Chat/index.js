import React, { useState, useEffect, useContext } from 'react';
import { SocketContext } from '../../utils/socket'

export default function Chat(props) {
    const user = props.user.user;
    const [input, setInput] = useState({
        user: user.username,
        message: ''
    });
    const [messages, setMessages] = useState([]);
    const room = props.room;

    const socket = useContext(SocketContext);

    const sendMessage = () => {
        if (input) {
            setMessages((prevMessages) => [input, ...prevMessages]);
            socket.emit('sendMessage', { message: input, room: room })
        }
    };

    const handleMessage = (e) => {
        const message = e.target.value;
        setInput(prevMessage => {
            return { ...prevMessage, message: message}
        });
    };

    useEffect(() => {
        socket.on('recieveMessage', (message) =>{
            setMessages((prevMessages) => [message, ...prevMessages]);
        });
    }, [socket]);

    return (
        <section style={{ display: 'flex-column'}}>
            <div className='chat' style={{ height: '400px', width: '300px', overflow: 'auto', border: 'gray solid 1px'}}>
                <div style={{ display: 'flex-column', alignItems: 'start', justifyContent: 'end' }}>
                    {messages.map((message, i) => {
                        return (
                            <div key={i}>
                                <p style={{ marginBottom: '0', paddingBottom: '0' }}>{message.message}</p>
                                <p style={{ marginBottom: '0', paddingBottom: '0' }}>
                                    <small>{message.user == user.username ? 'You' : message.user}</small>
                                </p>
                            </div>
                        )
                    })}
                </div>
            </div>
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
        </section>
    )
}