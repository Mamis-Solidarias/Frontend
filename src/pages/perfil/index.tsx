import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Portal from '@mui/material/Portal';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts';
import { useAction } from 'src/hooks/actionHook';
import { userIsLoggedIn } from 'src/utils/sessionManagement';
import ActionToast from 'src/views/pages/misc/ActionToast';
import { UserProfileDisplay } from 'src/views/users/UserProfileDisplay';

// ** Demo Components Imports

const Dashboard = () => {
  const router = useRouter();
  const { action, setAction, setCompletion } = useAction();

  useEffect(() => {
    if (!userIsLoggedIn()) {
      router.push('/login');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
