import {
  Box,
  List,
  ListItemIcon,
  ListItemText,
  Drawer,
  Divider,
  ListItemButton
} from '@mui/material';
import {
  Home,
  People,
  AssignmentInd,
  Assessment,
  HelpOutline
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

const Sidebar = ({ drawerWidth, mobileOpen, handleDrawerToggle }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { text: 'Inicio', icon: <Home />, path: '/dashboard' },
    { text: 'Postulantes', icon: <People />, path: '/dashboard/postulantes' },
    { text: 'Usuarios', icon: <AssignmentInd />, path: '/dashboard/usuarios' },
    { text: 'Roles', icon: <AssignmentInd />, path: '/dashboard/roles' },
    { text: 'Reportes', icon: <Assessment />, path: '/dashboard/reportes' },
    { text: 'Ayuda', icon: <HelpOutline />, path: '/dashboard/faq' }
  ];

  const drawerContent = (
    <Box sx={{
      height: '100%',
      backgroundColor: '#0f0f0f',
      color: '#FAFBFC',
      overflowX: 'hidden'
    }}>
      <Box sx={{ p: 2, fontWeight: 'bold', fontSize: 18, color: 'orange' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <img src="/favicon.ico" width={20} alt="logo" />
          TESIS
        </Box>
      </Box>

      <List>
        {menuItems.map(({ text, icon, path }) => {
          const isActive = location.pathname === path;
          return (
            <ListItemButton
              key={text}
              onClick={() => navigate(path)}
              selected={isActive}
              sx={{
                borderRadius: 2,
                my: 0.5,
                mx: 1,
                color: '#FAFBFC',
                '&.Mui-selected': {
                  backgroundColor: '#6f1d1b',
                  color: '#fff'
                },
                '&:hover': {
                  backgroundColor: '#6f1d1b',
                  color: '#fff'
                }
              }}
            >
              <ListItemIcon sx={{ color: '#FAFBFC' }}>{icon}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          );
        })}
      </List>

      <Divider sx={{ backgroundColor: '#333', mt: 2 }} />

      <Box
        sx={{
          position: 'absolute',
          bottom: 10,
          width: '100%',
          textAlign: 'center',
          fontSize: 12,
          color: '#666'
        }}
      >
        Powered by <span style={{ color: 'orange' }}>hotmart</span>
      </Box>
    </Box>
  );

  return (
    <>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            backgroundColor: '#111'
          }
        }}
      >
        {drawerContent}
      </Drawer>

      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', md: 'block' },
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            backgroundColor: '#111'
          }
        }}
        open
      >
        {drawerContent}
      </Drawer>
    </>
  );
};

export default Sidebar;
