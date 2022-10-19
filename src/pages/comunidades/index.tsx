import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts';
import CommunitiesTable from 'src/views/communities/ComunitiesTable';

// ** Demo Components Imports
import { CreateCommunity } from 'src/views/communities/CreateCommunity';

const Dashboard = () => {
  const [openCreateCommunities, setOpenCreateCommunities] = useState<boolean>(false);
  const [openWindow, setOpenWindow] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    if (!localStorage.getItem('user')) {
      router.push('/login');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (openWindow && openCreateCommunities === false) {
      setOpenWindow(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openCreateCommunities]);

  return (
    <ApexChartWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <CommunitiesTable openCreateCommunities={openCreateCommunities} openWindow={openWindow} />
          <Button
            variant='contained'
            sx={{ my: 3, display: 'block', marginLeft: 'auto', marginRight: 'auto' }}
            onClick={() => {
              setOpenWindow(true);
              setOpenCreateCommunities(true);
            }}
          >
            Añadir Comunidades
          </Button>
          <CreateCommunity openDialog={openCreateCommunities} handleClose={() => setOpenCreateCommunities(false)} />
        </Grid>
      </Grid>
    </ApexChartWrapper>
  );
};

export default Dashboard;
