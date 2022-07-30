import React, { useState } from "react";
import Box from '@mui/material/Box';
import { Link, Navigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../utils/mutations';
import Auth from '../utils/auth';
import "../assets/styles/SignIn.css";

function LoginForm (props) {
    const [formState, setFormState] = useState({ email: '', password: '' });
    const [errMsg, setErrMsg] = useState('')
    const [login, { error, data }] = useMutation(LOGIN);
  
    const handleChange = (event) => {
        const { name, value } = event.target;
        setErrMsg('');
    
        setFormState({
          ...formState,
          [name]: value,
        });
    };

    // submit form
    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
        const { data } = await login({
            variables: { ...formState },
        });

        Auth.login(data.login.token);
        } catch (e) {
          console.error(e);
          setErrMsg(e.message);
        }

        // clear form values
        setFormState({
        email: '',
        password: '',
        });
    };
    
    return (
        <Box component="main" sx={{  flexGrow: 1, py: 15,  }}>
          {Auth.loggedIn() && (<Navigate to='/' replace={true} />)}
          {data ? (
            <p>
              Success! Redirecting to homepage...
              {/* <Link to="/">back to the homepage.</Link> */}
            </p>
          ) : (
            <div>
              <form onSubmit={handleFormSubmit}>
                <input
                  className="form-input"
                  placeholder="Your email"
                  name="email"
                  type="email"
                  value={formState.email}
                  onChange={handleChange}
                  />
                <input
                  className="form-input"
                  placeholder="******"
                  name="password"
                  type="password"
                  value={formState.password}
                  onChange={handleChange}
                  />
                <button
                  className="btn btn-block btn-primary"
                  style={{ cursor: 'pointer' }}
                  type="submit"
                  >
                  Submit
                </button>
              </form>
              {errMsg && <h4 style={{ color: 'red' }}>{errMsg}</h4>}
            </div>
          )}
      </Box>
    )
  }
  
export default LoginForm