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

const Dashboard = () => {
  const [openCreateBeneficiaries, setOpenCreateBeneficiaries] = useState<boolean>(false);
  const [openWindow, setOpenWindow] = useState<boolean>(false);
  const [filtersApplied, setFiltersApplied] = useState<BeneficiariesFilters>(beneficiariesFiltersNull);
  const { filters, setFilter } = useBeneficiariesFilters();
  const [communities, setCommunities] = useState<Community[]>([]);
  const [families, setFamilies] = useState<Family[]>([]);
  const [openCollapse, setOpenCollapse] = useState<boolean>(false);

  useEffect(() => {
    if (!!localStorage.getItem('user')) {
      getCommunities(localStorage.getItem('user')).then(result => {
        if (!!result.data.communities && result.data.communities.length > 0) {
          setCommunities(result.data.communities);
        }
      });
    }
  }, []);

  useEffect(() => {
    if (openWindow && !openCreateBeneficiaries) {
      setOpenWindow(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openCreateBeneficiaries]);

  useEffect(() => {
    if (!!filters.communityCode && filters.communityCode !== '#') {
      getFamiliesByCommunity(localStorage.getItem('user'), filters.communityCode, 0, 100).then(result => {
        setFamilies(result.data.families);
      });
    }
  }, [filters.communityCode]);

  return (
    <ApexChartWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card sx={{ my: '2em', py: '2em', width: '100%', display: 'flex', flexDirection: 'column' }}>
            <Typography align='center' variant='h6' sx={{ textDecoration: 'underline' }}>
              Filtros
            </Typography>
            <IconButton size='small' onClick={() => setOpenCollapse(!openCollapse)}>
              {openCollapse ? (
                <ChevronUp sx={{ fontSize: '1.875rem' }} />
              ) : (
                <ChevronDown sx={{ fontSize: '1.875rem' }} />
              )}
            </IconButton>
            <Collapse in={openCollapse}>
              <BeneficiariesFiltersView
                filters={filters}
                setFilter={setFilter}
                communities={communities}
                families={families}
              />
              <Typography align='center' variant='h6' sx={{ textDecoration: 'underline' }}>
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
                  }}
                >
                  Aplicar Filtros
                </Button>
              </Typography>
            </Collapse>
          </Card>

          <Button
            variant='contained'
            sx={{ my: 3, display: 'block', marginLeft: 'auto', marginRight: 'auto' }}
            onClick={() => {
              setOpenWindow(true);
              setOpenCreateBeneficiaries(true);
            }}
          >
            Añadir Beneficiarios
          </Button>

          <BeneficiariesTable filters={filtersApplied} communities={communities} />

          <CreateBeneficiaries
            openDialog={openCreateBeneficiaries}
            handleClose={() => setOpenCreateBeneficiaries(false)}
            communities={communities}
          />
        </Grid>
      </Grid>
    </ApexChartWrapper>
  );
};

export default Dashboard;
