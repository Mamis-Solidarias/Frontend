// ** React Imports
import { useState, SyntheticEvent, Fragment, useEffect } from 'react';

// ** Next Import
import { useRouter } from 'next/router';

// ** MUI Imports
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';

// ** Icons Imports
import LogoutVariant from 'mdi-material-ui/LogoutVariant';
import AccountOutline from 'mdi-material-ui/AccountOutline';

import Button from '@mui/material/Button';
import User from 'src/types/users/User';
import { logoutUser } from 'src/API/Users/auth';
import { userIsLoggedIn } from 'src/utils/sessionManagement';

const UserDropdown = () => {
  // ** States
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);

  // ** Hooks
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [mounted, setMounted] = useState<boolean>(false);

  const handleDropdownOpen = (event: SyntheticEvent) => {
    setAnchorEl(event.currentTarget);
  };

  const handleDropdownClose = (url?: string) => {
    if (url) {
      router.push(url);
    }
    setAnchorEl(null);
  };

  const styles = {
    py: 2,
    px: 4,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    color: 'text.primary',
    textDecoration: 'none',
    '& svg': {
      fontSize: '1.375rem',
      color: 'text.secondary'
    }
  };

  useEffect(() => {
    setMounted(true);
    if (userIsLoggedIn()) {
      setUser(JSON.parse(localStorage.getItem('user') as string));
    }
  }, []);

  return (
    <Fragment>
      {mounted && userIsLoggedIn() && (
        <>
          <Button onClick={handleDropdownOpen} sx={{ ml: 2, cursor: 'pointer' }}>
            {user?.name}
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => handleDropdownClose()}
            sx={{ '& .MuiMenu-paper': { width: 230, marginTop: 4 } }}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            <Box sx={{ pt: 2, pb: 3, px: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ display: 'flex', marginLeft: 3, alignItems: 'flex-start', flexDirection: 'column' }}>
                  <Typography sx={{ fontWeight: 600 }}>{user?.name}</Typography>
                  <Typography variant='body2' sx={{ fontSize: '0.8rem', color: 'text.disabled' }}>
                    {user?.email}
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Divider sx={{ mt: 0, mb: 1 }} />
            <MenuItem sx={{ p: 0 }} onClick={() => router.push('/perfil')}>
              <Box sx={styles}>
                <AccountOutline sx={{ marginRight: 2 }} />
                Perfil
              </Box>
            </MenuItem>
            <Divider />
            <MenuItem
              sx={{ py: 2 }}
              onClick={async () => {
                localStorage.clear();
                logoutUser();
                router.push('/login');
              }}
            >
              <LogoutVariant sx={{ marginRight: 2, fontSize: '1.375rem', color: 'text.secondary' }} />
              Cerrar Sesión
            </MenuItem>
          </Menu>
        </>
      )}
      {typeof window !== 'undefined' && !userIsLoggedIn() && (
        <>
          <Button onClick={() => router.push('/login')} variant='contained'>
            Iniciar Sesión
          </Button>
        </>
      )}
    </Fragment>
  );
};

export default UserDropdown;
