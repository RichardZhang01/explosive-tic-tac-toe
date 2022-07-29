import React from 'react';
import { Link } from 'react-router-dom'

export default function OOB() {
    return (
        <div>
            <h1>The page you are looking for does not exist</h1>
            <Link to='/'>Return to Homepage</Link>
        </div>
    )
}