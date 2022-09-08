import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts';
import { UserProfileDisplay } from 'src/views/users/UserProfileDisplay';

// ** Demo Components Imports

const Dashboard = () => {
  return (
    <ApexChartWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              lineHeight: '3em'
            }}
          >
            <UserProfileDisplay />
          </Box>
        </Grid>
      </Grid>
    </ApexChartWrapper>
  );
};

export default Dashboard;
