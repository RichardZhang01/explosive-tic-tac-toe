import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Drawer, IconButton, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Auth from '../../utils/auth'

const MenuDrawer = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  return (
    <React.Fragment>
      <Drawer open={openDrawer} onClose={() => setOpenDrawer(false)} sx={{width:"45%"}}
      variant="persistent"
      anchor="right">
        <List sx={{ padding: '30px' }}>
          
          <ListItemButton sx={{ textAlign: 'Center' }} onClick={() => setOpenDrawer(false)}>
            <ListItemIcon>
              <ListItemText>
              {!Auth.loggedIn() ? (
                <div>
                  <Link
                    to='/login'
                  > 
                  Log In 
                  </Link>
                  <br/>
                  <br/>
                  <Link
                    to='/signup'
                  >
                  Sign Up 
                  </Link>
                </div>
              ) : (
                <div>
                  <br/>
                  <br/>
                  <button onClick={()=>Auth.logout()}>Log Out</button>
                </div>
              )}
              </ListItemText>
            </ListItemIcon>
          </ListItemButton>
          
   
        </List>
      </Drawer>
      <IconButton  sx={{ color: 'white', marginRight: 'auto' }} onClick={() => setOpenDrawer(!openDrawer)}>
        <MenuIcon />
      </IconButton>
    </React.Fragment>
  )
}

export default MenuDrawer