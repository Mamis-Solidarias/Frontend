import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { useEffect, useState } from 'react';

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts';

// ** Demo Components Imports
import TableUsers from 'src/views/users/TableUsers';
import { CreateUser } from 'src/views/users/CreateUser';
import { useRouter } from 'next/router';
import ActionToast from 'src/views/pages/misc/ActionToast';
import Portal from '@mui/material/Portal';
import { useAction } from 'src/hooks/actionHook';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { hasWriteAccess, userIsLoggedIn } from 'src/utils/sessionManagement';

const Dashboard = () => {
  const [openCreateUser, setOpenCreateUser] = useState<boolean>(false);
  const [openWindow, setOpenWindow] = useState<boolean>(false);
  const [userAdded, setUserAdded] = useState<boolean>(false);
  const { action, setAction, setCompletion } = useAction();
  const [hasWriteAccessConst, setHasWriteAccessConst] = useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    if (!userIsLoggedIn()) {
      router.push('/login');
    } else {
      setHasWriteAccessConst(hasWriteAccess('Users'));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (openWindow && openCreateUser === false) {
      setOpenWindow(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openCreateUser]);

  return (
    <ApexChartWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Typography gutterBottom variant='h3' component='div' align='center'>
            Administrar Usuarios
          </Typography>
          <Card>
            {hasWriteAccessConst && (
              <Box width='100%' display='flex' justifyContent='flex-end'>
                <Button
                  variant='contained'
                  onClick={() => {
                    setOpenWindow(true);
                    setOpenCreateUser(true);
                  }}
                >
                  Añadir Usuario
                </Button>
              </Box>
            )}
            <TableUsers
              openWindow={openWindow}
              userAdded={userAdded}
              setUserAdded={setUserAdded}
              setAction={setAction}
            />
          </Card>
          <CreateUser
            openDialog={openCreateUser}
            setAction={setAction}
            handleClose={() => {
              setOpenCreateUser(false);
              setUserAdded(true);
            }}
          />
        </Grid>
      </Grid>
      <Portal>
        <ActionToast action={action} setActionCompletion={setCompletion} />
      </Portal>
    </ApexChartWrapper>
  );
};

export default Dashboard;
