import React from 'react';
import { useRouter } from 'next/router';

import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';

const drawerWidth = 240;

const NavigationDrawer = () => {
  const router = useRouter();

  return (
    <>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        open
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            <ListItem key="Beneficiarios" disablePadding>
              <ListItemButton onClick={() => router.push('/beneficiarios')}>
                <ListItemText primary="Beneficiarios" />
              </ListItemButton>
            </ListItem>
            <ListItem key="Familias" disablePadding>
              <ListItemButton onClick={() => router.push('/familias')}>
                <ListItemText primary="Familias" />
              </ListItemButton>
            </ListItem>
            <ListItem key="Comunidades" disablePadding>
              <ListItemButton onClick={() => router.push('/comunidades')}>
                <ListItemText primary="Comunidades" />
              </ListItemButton>
            </ListItem>
          </List>

          <Divider />
          <List>
            <ListItem key="Campañas" disablePadding>
              <ListItemButton>
                <ListItemText primary="Campañas" />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default NavigationDrawer;
