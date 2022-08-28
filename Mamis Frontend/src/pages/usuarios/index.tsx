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
        </Grid>
      </Grid>
    </ApexChartWrapper>
  );
};

export default Dashboard;
