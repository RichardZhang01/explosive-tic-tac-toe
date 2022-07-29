import React from 'react'
import { AppBar, Toolbar, Typography } from '@mui/material'
import MenuDrawer from '../MenuDrawer'

export default function Header() {

    return (
        <React.Fragment>
         
            <AppBar sx={{background: "#171717"}}>
                <Toolbar>   
                

                <Typography sx={{ fontSize: 50 }}> Explosive Tic-Tac-Toe </Typography>
                <MenuDrawer/>
              
              
              
                </Toolbar>
             
            </AppBar>
  
        </React.Fragment>
    )
}
