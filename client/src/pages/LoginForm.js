import React, { useState } from "react";
import Box from '@mui/material/Box';
import "../assets/styles/SignIn.css"
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../utils/mutations';
import Auth from '../utils/auth';

function LoginForm (props) {
    const [formState, setFormState] = useState({ email: '', password: '' });
    const [login, { error, data }] = useMutation(LOGIN);
  
    const handleChange = (event) => {
        const { name, value } = event.target;
    
        setFormState({
          ...formState,
          [name]: value,
        });
    };

    // submit form
    const handleFormSubmit = async (event) => {
        event.preventDefault();
        console.log(formState);
        try {
        const { data } = await login({
            variables: { ...formState },
        });

        Auth.login(data.login.token);
        } catch (e) {
        console.error(e);
        }

        // clear form values
        setFormState({
        email: '',
        password: '',
        });
    };
    
  
    return (
        <Box component="main" sx={{  flexGrow: 1, py: 15,  background:"#EDEDED" }}>
      {data ? (
              <p>
                Success! You may now head{' '}
                <Link to="/">back to the homepage.</Link>
              </p>
            ) : (
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
            )}
      </Box>
    )
  }
  
export default LoginForm