import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { useState } from 'react';

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts';

// ** Demo Components Imports
import TableUsers from 'src/views/dashboard/TableUsers';
import { CreateUser } from 'src/views/users/CreateUser';

const Dashboard = () => {
  const [openCreateUser, setOpenCreateUser] = useState<boolean>(false);

  return (
    <ApexChartWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <TableUsers />
          <Button variant='contained' sx={{ my: 3, display: 'block', marginLeft: 'auto', marginRight: 'auto' }} onClick={() => setOpenCreateUser(true)}>
            Añadir Nuevo Usuario
          </Button>
          <CreateUser openDialog={openCreateUser} handleClose={() => setOpenCreateUser(false)} />
        </Grid>
      </Grid>
    </ApexChartWrapper>
  );
};

export default Dashboard;
