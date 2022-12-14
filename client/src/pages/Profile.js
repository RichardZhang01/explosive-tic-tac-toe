import React from 'react';
import Auth from '../utils/auth.js';
import { Navigate } from 'react-router-dom'
import Home from './Home'
import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../utils/queries';

export default function Profile() {
    const { loading, data } = useQuery(QUERY_USER);
    const user = data?.user;

    if (loading) {
        return (
            <div>
                {!Auth.loggedIn() && <Navigate to='/login' replace={true} />}
                <h1>loading...</h1>
            </div>
        )
    }

    return (
        <>
            {!Auth.loggedIn() && <Navigate to='/login' replace={true} />}
            <h1 style={{marginTop: '100px'}}>{`Hello ${user.username}`}</h1>
            <div>
                <h3>All-time Statistics</h3>
                <ul style={{ listStyle: 'none', color: 'white', textAlign: 'center', padding: "0"}}>
                    <li>{`Wins: ${user.wins || 0}`}</li>
                    <li>{`Ties: ${user.ties || 0}`}</li>
                    <li>{`Losses: ${user.losses || 0}`}</li>
                </ul>
            </div>
            <div>
                <Home />
            </div>
        </>
    )
}