// import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { useEffect, useState } from 'react';

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts';

// ** Demo Components Imports
import Card from '@mui/material/Card';

import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import ChevronUp from 'mdi-material-ui/ChevronUp';
import ChevronDown from 'mdi-material-ui/ChevronDown';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import { useRouter } from 'next/router';
import ActionToast from 'src/views/pages/misc/ActionToast';
import { useAction } from 'src/hooks/actionHook';
import Portal from '@mui/material/Portal';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useCampaignsFilters } from 'src/hooks/campaigns/useCampaignsFilters';
import { CampaignsFilters, campaignsFiltersNull } from 'src/types/CampaignsFilters';
import CampaignsFiltersView from 'src/views/campaigns/CampaignsFiltersView';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { useQuery } from '@apollo/client';
import { GET_MOCHI_EDITIONS } from 'src/API/Campaigns/campaigns_graphql';
import { CreateMochi } from 'src/views/campaigns/CreateMochi';

const Dashboard = () => {
  // const [openWindow, setOpenWindow] = useState<boolean>(false);
  const [filtersApplied, setFiltersApplied] = useState<CampaignsFilters>(campaignsFiltersNull);
  const [openCreateMochi, setOpenCreateMochi] = useState<boolean>(false);
  const { filters, setFilter } = useCampaignsFilters();
  const [openCollapse, setOpenCollapse] = useState<boolean>(false);
  const { action, setCompletion, setAction } = useAction();
  const router = useRouter();
  const { loading, error, data } = useQuery(GET_MOCHI_EDITIONS);

  useEffect(() => {
    if (!localStorage.getItem('user')) {
      router.push('/login');
    }
    if (!!localStorage.getItem('user')) {
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) return <Box>Cargando ediciones de Mochi...</Box>;

  if (error) {
    return <Box>Error :(</Box>;
  }
  const editions = data.mochiEditions;

  return (
    <ApexChartWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Box display='flex' flexDirection='row' justifyContent='space-between'>
            <TextField
              select
              variant='standard'
              label='Edición'
              value={filters.edition}
              onChange={e =>
                setFiltersApplied(oldFiltersApplied => ({ ...oldFiltersApplied, ...{ edition: e.target.value } }))
              }
            >
              {editions.map((edition: string) => {
                return (
                  <MenuItem value={edition} key={edition}>
                    {edition}
                  </MenuItem>
                );
              })}
            </TextField>
            <Button variant='contained'>Editar</Button>
            <Box width='70%' display='flex' justifyContent='flex-end'>
              <Button variant='contained' onClick={() => setOpenCreateMochi(true)}>
                Crear
              </Button>
            </Box>
          </Box>
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
              <Collapse in={openCollapse}>
                <CampaignsFiltersView filters={filters} setFilter={setFilter} />
                <Typography align='center'>
                  <Button
                    variant='contained'
                    onClick={() => {
                      const filtersToApply = filters;
                      for (const fk in filtersToApply) {
                        if (!filtersToApply[fk as keyof CampaignsFilters]) {
                          filtersToApply[fk as keyof CampaignsFilters] = null;
                        }
                      }
                      setFiltersApplied(filtersToApply);
                      setAction({
                        complete: true,
                        success: true,
                        message: 'Filtros aplicados exitosamente',
                        status: 200
                      });
                    }}
                  >
                    Aplicar Filtros
                  </Button>
                </Typography>
              </Collapse>
            </CardContent>
          </Card>
          <CreateMochi
            openDialog={openCreateMochi}
            handleClose={() => setOpenCreateMochi(false)}
            setAction={setAction}
          />
        </Grid>
      </Grid>
      <Portal>
        <ActionToast action={action} setActionCompletion={setCompletion} />
      </Portal>
    </ApexChartWrapper>
  );
};

export default Dashboard;
