import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { NavLink, Link } from 'react-router-dom';
import Auth from '../../utils/auth'
import '../../assets/styles/header.css';


const drawerWidth = 240;
const navItems = ['Login', 'Signup'];

function Header(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }} fontFamily="Bangers" >
      Explosive Tic-Tac-Toe
      </Typography>
      <Divider />
      <List>
        {!Auth.loggedIn() ? (
          navItems.map((item) => (
            <ListItem key={item} disablePadding>
              <ListItemButton sx={{ textAlign: 'center', display: 'flex', justifyContent: 'center' }}>
                <NavLink to={item} style={{ textDecoration: 'none', color: 'black', fontWeight: '100' }}>  
                  {item}
                </NavLink>
              </ListItemButton>
            </ListItem>
          ))
        ): (
          <>
            <ListItem key={'Profile'} disablePadding>
              <ListItemButton sx={{ textAlign: 'center', display: 'flex', justifyContent: 'center' }}>
                <NavLink to={'/profile'} style={{ textDecoration: 'none', color: 'black', fontWeight: '100' }}>  
                  Profile
                </NavLink>
              </ListItemButton>
            </ListItem>
            <ListItem key={'Logout'} disablePadding>
              <ListItemButton onClick={()=>Auth.logout()} sx={{ textAlign: 'center', fontWeight: '100' }}> 
                <ListItemText primary={'Logout'} /> 
              </ListItemButton>
            </ListItem>
          </>
        )}
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar component="nav" sx={{background: "#171717"}}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'block', sm: 'block' } }}
            fontFamily="Bangers" fontSize="50px"
            id="header--text"
          >
            <Link to='/' style={{ textDecoration: 'none', color: 'white', fontWeight: '100' }}>
              EXPLOSIVE TIC TAC TOE
            </Link>
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
          {!Auth.loggedIn() ? (
            navItems.map((item) => (
              <NavLink key={item} to={item}>  
                <Button sx={{ color: '#fff' }}>
                  {item}
                </Button> 
              </NavLink>
            ))
          ): (
            <>
              <NavLink key={'Profile'} to={'/profile'} style={{ textDecoration: 'none' }}>  
                <Button sx={{ color: '#fff' }} >
                  {'Profile'}
                </Button> 
              </NavLink>
              &nbsp;
              <Button key={'Logout'} sx={{ color: '#fff' }} onClick={()=>Auth.logout()}>
                    Logout
              </Button>
            </>
          )}
          </Box>
        </Toolbar>
       
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
         
        </Drawer>
      </Box>
      
      </Box>
      );
};

export default Header;