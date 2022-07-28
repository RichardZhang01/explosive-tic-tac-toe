import React, { useState } from 'react';

import { Drawer, Link, IconButton, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SignUpForm from '../../pages/SignUpForm'






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
                <Link> Log In </Link>
                <br/>
                <br/>
                <Link>{SignUpForm} Sign Up </Link>
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