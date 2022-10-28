import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { useEffect, useState } from 'react';

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts';

// ** Demo Components Imports
import { getCommunities, getFamiliesByCommunity } from 'src/API/Beneficiaries/communities_data';
import BeneficiariesTable from 'src/views/beneficiaries/BeneficiariesTable';
import { CreateBeneficiaries } from 'src/views/beneficiaries/CreateBeneficiaries';
import Community from 'src/types/Community';
import Family from 'src/types/Family';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { BeneficiariesFilters, beneficiariesFiltersNull } from 'src/types/BeneficiariesFilters';
import { useBeneficiariesFilters } from 'src/hooks/beneficiaries/useBeneficiariesFilters';
import BeneficiariesFiltersView from 'src/views/beneficiaries/BeneficiariesFiltersView';
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
import Box from '@mui/material/Box';
import { userIsLoggedIn } from 'src/utils/sessionManagement';

const Dashboard = () => {
  const [openCreateBeneficiaries, setOpenCreateBeneficiaries] = useState<boolean>(false);
  const [openWindow, setOpenWindow] = useState<boolean>(false);
  const [filtersApplied, setFiltersApplied] = useState<BeneficiariesFilters>(beneficiariesFiltersNull);
  const { filters, setFilter } = useBeneficiariesFilters();
  const [communities, setCommunities] = useState<Community[]>([]);
  const [families, setFamilies] = useState<Family[]>([]);
  const [openCollapse, setOpenCollapse] = useState<boolean>(false);
  const { action, setAction, setCompletion } = useAction();
  const router = useRouter();

  useEffect(() => {
    if (!userIsLoggedIn()) {
      router.push('/login');
    }
    if (!!userIsLoggedIn()) {
      getCommunities()
        .then(result => {
          if (!!result.data.communities && result.data.communities.length > 0) {
            setCommunities(result.data.communities);
          }
        })
        .catch(err => {
          setAction({
            complete: true,
            success: false,
            message: err.message,
            status: err.status
          });
          if (err.status === 401) {
            router.push('/login');
          }
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (openWindow && !openCreateBeneficiaries) {
      setOpenWindow(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openCreateBeneficiaries]);

  useEffect(() => {
    if (!!filters.communityCode && filters.communityCode !== '#') {
      getFamiliesByCommunity(filters.communityCode, 0, 100).then(result => {
        setFamilies(result.data.families);
      });
    }
  }, [filters.communityCode]);

  return (
    <ApexChartWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Typography gutterBottom variant='h3' component='div' align='center'>
            Beneficiarios
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
              <Collapse in={openCollapse}>
                <BeneficiariesFiltersView
                  filters={filters}
                  setFilter={setFilter}
                  communities={communities}
                  families={families}
                />
                <Typography display='flex' justifyContent='flex-end'>
                  <Button
                    variant='contained'
                    onClick={() => {
                      const filtersToApply = filters;
                      for (const fk in filtersToApply) {
                        if (!filtersToApply[fk as keyof BeneficiariesFilters]) {
                          filtersToApply[fk as keyof BeneficiariesFilters] = null;
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
          <Card>
            <Box width='100%' display='flex' justifyContent='flex-end'>
              <Button
                variant='contained'
                onClick={() => {
                  setOpenWindow(true);
                  setOpenCreateBeneficiaries(true);
                }}
              >
                Añadir Beneficiarios
              </Button>
            </Box>

            <BeneficiariesTable
              filters={filtersApplied}
              communities={communities}
              openCreateBeneficiaries={openCreateBeneficiaries}
              openWindow={openWindow}
              setAction={setAction}
            />
          </Card>
          <CreateBeneficiaries
            openDialog={openCreateBeneficiaries}
            setAction={setAction}
            handleClose={() => setOpenCreateBeneficiaries(false)}
            communities={communities}
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
