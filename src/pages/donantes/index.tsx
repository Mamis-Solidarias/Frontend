import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { useEffect, useState } from 'react';

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts';

// ** Demo Components Imports
import Card from '@mui/material/Card';
import IconButton from '@mui/material/IconButton';
import ChevronUp from 'mdi-material-ui/ChevronUp';
import ChevronDown from 'mdi-material-ui/ChevronDown';
import Collapse from '@mui/material/Collapse';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';

// import { DonorsFilters, donorsFiltersNull } from 'src/types/DonorsFilters';
// import { useDonorsFilters } from 'src/hooks/donors/useDonorsFilters';
import DonorsTable from 'src/views/donors/DonorsTable';
import { CreateDonor } from 'src/views/donors/CreateDonor';
import { useRouter } from 'next/router';
import { useAction } from 'src/hooks/actionHook';
import Portal from '@mui/material/Portal';
import ActionToast from 'src/views/pages/misc/ActionToast';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { userIsLoggedIn } from 'src/utils/sessionManagement';

const Dashboard = () => {
  const [openCreateDonor, setOpenCreateDonor] = useState<boolean>(false);
  const [openWindow, setOpenWindow] = useState<boolean>(false);

  // const [filtersApplied, setFiltersApplied] = useState<DonorsFilters>(donorsFiltersNull);
  // const { filters, setFilter } = useDonorsFilters();
  const [openCollapse, setOpenCollapse] = useState<boolean>(false);
  const router = useRouter();
  const { action, setAction, setCompletion } = useAction();

  useEffect(() => {
    if (!userIsLoggedIn()) {
      router.push('/login');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (openWindow && openCreateDonor === false) {
      setOpenWindow(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openCreateDonor]);

  return (
    <ApexChartWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Typography gutterBottom variant='h3' component='div' align='center'>
            Donantes
          </Typography>
          <Card sx={{ my: '2em', width: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardHeader
              title='Filtros'
              action={
                <IconButton size='small' onClick={() => setOpenCollapse(!openCollapse)}>
                  {openCollapse ? (
                    <ChevronUp sx={{ fontSize: '1.875rem' }} />
                  ) : (
                    <ChevronDown sx={{ fontSize: '1.875rem' }} />
                  )}
                </IconButton>
              }
            />
            <CardContent>
              <Collapse in={openCollapse}></Collapse>
            </CardContent>
          </Card>
          <Card>
            <Box width='100%' display='flex' justifyContent='flex-end'>
              <Button
                variant='contained'
                onClick={() => {
                  setOpenWindow(true);
                  setOpenCreateDonor(true);
                }}
              >
                Añadir Donante
              </Button>
            </Box>
            <DonorsTable openCreateDonor={openCreateDonor} setAction={setAction} />
          </Card>
          {openCreateDonor && (
            <CreateDonor
              openDialog={openCreateDonor}
              handleClose={() => setOpenCreateDonor(false)}
              setAction={setAction}
            />
          )}
        </Grid>
      </Grid>
      <Portal>
        <ActionToast action={action} setActionCompletion={setCompletion} />
      </Portal>
    </ApexChartWrapper>
  );
};

export default Dashboard;
