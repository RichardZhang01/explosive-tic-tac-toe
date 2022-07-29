import React from "react";
import Box from '@mui/material/Box';
import "../assets/styles/SignIn.css"

function LoginForm () {
    const [username, setUsername] = React.useState('')
    const [password, setPassword] = React.useState('')
  
    function handleUsernameChange (e) {
      setUsername(e.target.value)
    }
  
    function handlePasswordChange (e) {
      setPassword(e.target.value)
    }
  
    return (
        <Box component="main" sx={{  flexGrow: 1, py: 15,  background:"#EDEDED" }}>
      <form className='loginForm'>
        <label htmlFor='username'>Username</label>
        <input
          id='username'
          placeholder='username'
          value={username}
          onChange={handleUsernameChange}
        />
        <label htmlFor='password'>Password</label>
        <input
          id='password'
          type='password'
          placeholder='password'
          value={password}
          onChange={handlePasswordChange}
        />
        {/* <button type="button" onClick={handleFormSubmit}>Submit</button> */}
      </form>
      </Box>
    )
  }
  
export default LoginForm