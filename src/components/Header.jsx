// src/components/Header.jsx
import React, { useState } from 'react';
import {
  AppBar, Toolbar, Typography, IconButton, Avatar, Menu, MenuItem, Divider, ListItemIcon, Box, Tooltip, Button
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Logout from '@mui/icons-material/Logout';
import AccountCircle from '@mui/icons-material/AccountCircle';
import ShoppingCart from '@mui/icons-material/ShoppingCart';
import HelpOutline from '@mui/icons-material/HelpOutline';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const Header = ({ drawerWidth, handleDrawerToggle }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    Cookies.remove('token');
    Cookies.remove('user');
    navigate('/login');
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: 1201,
        backgroundColor: '#191c1f',
        width: { md: `calc(100% - ${drawerWidth}px)` },
        ml: { md: `${drawerWidth}px` }
      }}
    >
      <Toolbar>
        <IconButton
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, color: '#FAFBFC', display: { md: 'none' } }}
        >
          <MenuIcon />
        </IconButton>

        <Typography variant="h6" sx={{ flexGrow: 1, color: '#FAFBFC' }}>
          Bienvenido al Sistema
        </Typography>

        <Box>
          <Tooltip title="Opciones de usuario">
            <IconButton onClick={handleMenuOpen}>
              <Avatar alt="User" src="https://i.pravatar.cc/300" />
            </IconButton>
          </Tooltip>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleMenuClose}
            onClick={handleMenuClose}
            PaperProps={{
              elevation: 3,
              sx: {
                backgroundColor: '#191c1f',
                color: '#FAFBFC',
                mt: 1.5,
                minWidth: 220
              }
            }}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right'
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
          >
            <MenuItem onClick={() => navigate('/dashboard/perfil')}>
              <ListItemIcon><AccountCircle sx={{ color: '#FAFBFC' }} /></ListItemIcon>
              Mi cuenta
            </MenuItem>

            <MenuItem onClick={() => navigate('/dashboard/mis-compras')}>
              <ListItemIcon><ShoppingCart sx={{ color: '#FAFBFC' }} /></ListItemIcon>
              Mis compras
            </MenuItem>

            <MenuItem onClick={() => navigate('/dashboard/faq')}>
              <ListItemIcon><HelpOutline sx={{ color: '#FAFBFC' }} /></ListItemIcon>
              Ayuda
            </MenuItem>

            <Divider sx={{ backgroundColor: '#333' }} />

            <MenuItem onClick={handleLogout}>
              <ListItemIcon><Logout sx={{ color: '#FAFBFC' }} /></ListItemIcon>
              Salir
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
