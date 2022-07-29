import React, {useState} from 'react';
import Chat from '../components/Chat'
import TicTacGame from '../components/TicTacGame'
import Auth from '../utils/auth'
import { useNavigate, useParams, Navigate } from 'react-router-dom'
import Mindoro from 'react-explode/Mindoro';
import Corregidor from 'react-explode/Corregidor';


export default function Game() {
    const [isMindoro, setIsMindoro]= useState(false);
    const [isCorregidor, setIsCorregidor] = useState(false);

    const { roomId } = useParams();
    // const navigate = useNavigate();

    // if (!Auth.loggedIn()) {
    //     this.props.history.push('login')
    // }

    return (
        <div>
            {!Auth.loggedIn() && (<Navigate to='/login' replace={true} />)}
            <TicTacGame room={roomId} mindoroHandler={setIsMindoro} corregidorHandler ={setIsCorregidor}/>
            {isMindoro && <Mindoro size={500} delay={0} repeatDelay={0} repeat={0} />}
            {isCorregidor && <Corregidor size={500} color="blue" delay={0} repeatDelay={0} repeat={0} />}
            <Chat room={roomId} />
        </div>
    )
}