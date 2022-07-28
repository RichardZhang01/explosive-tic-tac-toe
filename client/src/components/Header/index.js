import React from 'react'
import { AppBar, Toolbar, Typography } from '@mui/material'
// import SignInDrawer from ''




const Header = () => {

    return (
        <React.Fragment>
         
            <AppBar sx={{background: "Red"}}>
                <Toolbar>   
                
                <Typography sx={{ fontSize: 50 }}> Explosive Tic-Tac-Toe </Typography>

                {/* <SignInDrawer/> */}
              
              
                </Toolbar>
             
            </AppBar>
  
        </React.Fragment>
    )
}
export default Header
