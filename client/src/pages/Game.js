import React from 'react';
import Chat from '../components/Chat'
import TicTacGame from '../components/TicTacGame'
import Auth from '../utils/auth'
import { useNavigate, useParams, Navigate } from 'react-router-dom'

export default function Game() {
    const { roomId } = useParams();
    // const navigate = useNavigate();

    // if (!Auth.loggedIn()) {
    //     this.props.history.push('login')
    // }

    return (
        <div>
            {!Auth.loggedIn() && (<Navigate to='/login' replace={true} />)}
            <TicTacGame room={roomId}/>
            <Chat room={roomId} />
        </div>
    )
}