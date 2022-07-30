import React, {useState} from 'react';
import Chat from '../components/Chat'
import TicTacGame from '../components/TicTacGame'
import Auth from '../utils/auth'
import { useParams, Navigate } from 'react-router-dom'
import Mindoro from 'react-explode/Mindoro';
import Corregidor from 'react-explode/Corregidor';
import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../utils/queries';


export default function Game() {
    const { loading, data: user } = useQuery(QUERY_USER);
    const [isMindoro, setIsMindoro]= useState(false);
    const [isCorregidor, setIsCorregidor] = useState(false);

    const { roomId } = useParams();

    if (loading) {
        return (
            <h1>loading...</h1>
        )
    }

    return (
        
        <div>
            {!Auth.loggedIn() && <Navigate to='/login' replace={true} />}
            <h1>{`Your room ID is: ${roomId}`}</h1>
            <TicTacGame 
                room={roomId} 
                mindoroHandler={setIsMindoro} 
                corregidorHandler={setIsCorregidor}
            />
            {isMindoro && <Mindoro size={500} delay={0} repeatDelay={0} repeat={0} />}
            {isCorregidor && <Corregidor size={500} color="blue" delay={0} repeatDelay={0} repeat={0} />}
            <Chat room={roomId} user={user} />
        </div>
    )
}