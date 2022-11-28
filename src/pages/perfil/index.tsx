import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Portal from '@mui/material/Portal';

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts';
import { useAction } from 'src/hooks/actionHook';
import ActionToast from 'src/views/pages/misc/ActionToast';
import { UserProfileDisplay } from 'src/views/users/UserProfileDisplay';

// ** Demo Components Imports

const Dashboard = () => {
  const { action, setAction, setCompletion } = useAction();

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
            <UserProfileDisplay setAction={setAction} />
          </Box>
        </Grid>
      </Grid>
      <Portal>
        <ActionToast action={action} setActionCompletion={setCompletion} />
      </Portal>
    </ApexChartWrapper>
  );
};

export default Dashboard;
