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
            <div>
                {!Auth.loggedIn() && <Navigate to='/login' replace={true} />}
                <h1>loading...</h1>
            </div>
        )
    }

    return (
        <div>
            {!Auth.loggedIn() && <Navigate to='/login' replace={true} />}
            <div style={{ display: 'flex', alignItems: 'center', maxWidth: '1500px', margin: 'auto', marginTop: '100px', flexWrap: 'wrap', justifyContent: 'center'}}>
                <TicTacGame 
                    room={roomId}
                    user={user} 
                    setIsMindoro={setIsMindoro} 
                    setIsCorregidor={setIsCorregidor}
                />
                <Chat room={roomId} user={user} />
            </div>
            {isMindoro && <Mindoro size={500} delay={0} repeatDelay={0} repeat={0} />}
            {isCorregidor && <Corregidor size={500} color="blue" delay={0} repeatDelay={0} repeat={0} />}
        </div>
    )
}