// import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { useEffect, useState } from 'react';

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts';

// ** Demo Components Imports
// import { getCommunities, getFamiliesByCommunity } from 'src/API/Beneficiaries/communities_data';
import Card from '@mui/material/Card';

// import Typography from '@mui/material/Typography';
// import { BeneficiariesFilters, beneficiariesFiltersNull } from 'src/types/BeneficiariesFilters';
// import { useBeneficiariesFilters } from 'src/hooks/beneficiaries/useBeneficiariesFilters';
// import BeneficiariesFiltersView from 'src/views/beneficiaries/BeneficiariesFiltersView';
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

const Dashboard = () => {
  // const [openWindow, setOpenWindow] = useState<boolean>(false);
  // const [filtersApplied, setFiltersApplied] = useState<BeneficiariesFilters>(beneficiariesFiltersNull);
  // const { filters, setFilter } = useBeneficiariesFilters();
  const [openCollapse, setOpenCollapse] = useState<boolean>(false);
  const { action, setCompletion } = useAction();
  const router = useRouter();

  useEffect(() => {
    if (!localStorage.getItem('user')) {
      router.push('/login');
    }
    if (!!localStorage.getItem('user')) {
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ApexChartWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12}>
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
                {/* <BeneficiariesFiltersView
                  filters={filters}
                  setFilter={setFilter}
                  communities={communities}
                  families={families}
                /> */}
                {/* <Typography align='center'>
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
                </Typography> */}
              </Collapse>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Portal>
        <ActionToast action={action} setActionCompletion={setCompletion} />
      </Portal>
    </ApexChartWrapper>
  );
};

export default Dashboard;
