import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts';

// ** Demo Components Imports
import TableUsers from 'src/views/dashboard/TableUsers';

const Dashboard = () => {
  return (
    <ApexChartWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <TableUsers />
          <Button variant='contained' sx={{ my: 3, display: 'block', marginLeft: 'auto', marginRight: 'auto' }}>
            Añadir Nuevo Usuario
          </Button>
        </Grid>
      </Grid>
    </ApexChartWrapper>
  );
};

export default Dashboard;
