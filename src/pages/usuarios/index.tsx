import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { useEffect, useState } from 'react';

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts';

// ** Demo Components Imports
import TableUsers from 'src/views/users/TableUsers';
import { CreateUser } from 'src/views/users/CreateUser';
import { useRouter } from 'next/router';

const Dashboard = () => {
  const [openCreateUser, setOpenCreateUser] = useState<boolean>(false);
  const [openWindow, setOpenWindow] = useState<boolean>(false);
  const [userAdded, setUserAdded] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    if (!localStorage.getItem('user')) {
      router.push('/');
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
          <TableUsers openWindow={openWindow} userAdded={userAdded} setUserAdded={setUserAdded} />
          <Button
            variant='contained'
            sx={{ my: 3, display: 'block', marginLeft: 'auto', marginRight: 'auto' }}
            onClick={() => {
              setOpenWindow(true);
              setOpenCreateUser(true);
            }}
          >
            Añadir Usuario
          </Button>
          <CreateUser
            openDialog={openCreateUser}
            handleClose={() => {
              setOpenCreateUser(false);
              setUserAdded(true);
            }}
          />
        </Grid>
      </Grid>
    </ApexChartWrapper>
  );
};

export default Dashboard;
