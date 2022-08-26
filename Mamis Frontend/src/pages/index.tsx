// ** MUI Imports
import Grid from '@mui/material/Grid';
import { useEffect, useState } from 'react';

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts';

// ** Demo Components Imports
import TableUsers from 'src/views/dashboard/TableUsers';

const Dashboard = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {}, []);

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
