import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { useEffect, useState } from 'react';

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts';

// ** Demo Components Imports
import FamiliesTable from 'src/views/families/FamiliesTable';
import { getCommunities } from 'src/API/Beneficiaries/communities_data';
import { CreateFamilies } from 'src/views/families/CreateFamilies';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import Community from 'src/types/Community';
import IconButton from '@mui/material/IconButton';
import ChevronUp from 'mdi-material-ui/ChevronUp';
import ChevronDown from 'mdi-material-ui/ChevronDown';
import Collapse from '@mui/material/Collapse';
import { BeneficiariesFilters, beneficiariesFiltersNull } from 'src/types/BeneficiariesFilters';
import { useBeneficiariesFilters } from 'src/hooks/beneficiaries/useBeneficiariesFilters';
import FamiliesFiltersView from 'src/views/families/FamiliesFiltersView';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import { useRouter } from 'next/router';
import Portal from '@mui/material/Portal';
import ActionToast from 'src/views/pages/misc/ActionToast';
import { useAction } from 'src/hooks/actionHook';
import Box from '@mui/material/Box';

const Dashboard = () => {
  const [openCreateFamilies, setOpenCreateFamilies] = useState<boolean>(false);
  const [openWindow, setOpenWindow] = useState<boolean>(false);
  const [communityCode, setCommunityCode] = useState<string>('#');
  const [communities, setCommunities] = useState<Community[]>([]);
  const [filtersApplied, setFiltersApplied] = useState<BeneficiariesFilters>(beneficiariesFiltersNull);
  const [openCollapse, setOpenCollapse] = useState<boolean>(false);
  const { filters, setFilter } = useBeneficiariesFilters();
  const { action, setAction, setCompletion } = useAction();
  const router = useRouter();

  useEffect(() => {
    if (!localStorage.getItem('user')) {
      router.push('/login');
    } else {
      getCommunities().then(result => {
        setCommunities(result.data.communities);
        if (result.data.communities.length > 0) {
          setCommunityCode(result.data.communities[0].id as string);
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (openWindow && openCreateFamilies === false) {
      setOpenWindow(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openCreateFamilies]);

  return (
    <ApexChartWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Typography gutterBottom variant='h3' component='div' align='center'>
            Familias
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
              <Collapse in={openCollapse}>
                <FamiliesFiltersView filters={filters} setFilter={setFilter} communities={communities} />
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
                        status: 200,
                        message: 'Filtros aplicados correctamente'
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
                  setOpenCreateFamilies(true);
                }}
                disabled={!communityCode}
              >
                Añadir Familias
              </Button>
            </Box>
            <FamiliesTable
              communities={communities}
              filters={filtersApplied}
              openCreateFamilies={openCreateFamilies}
              setAction={setAction}
            />
          </Card>
          {!!communityCode && (
            <CreateFamilies
              openDialog={openCreateFamilies}
              handleClose={() => setOpenCreateFamilies(false)}
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
