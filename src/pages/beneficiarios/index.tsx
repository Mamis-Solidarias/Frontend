import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { useEffect, useState } from 'react';

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts';

// ** Demo Components Imports
import { getCommunities } from 'src/API/Beneficiaries/communities_data';
import BeneficiariesTable from 'src/views/beneficiaries/BeneficiariesTable';
import { CreateBeneficiaries } from 'src/views/beneficiaries/CreateBeneficiaries';
import Community from 'src/types/Community';
import { useRouter } from 'next/router';
import ActionToast from 'src/views/pages/misc/ActionToast';
import { useAction } from 'src/hooks/actionHook';
import Portal from '@mui/material/Portal';
import { hasWriteAccess, userIsLoggedIn } from 'src/utils/sessionManagement';
import { BeneficiariesFilters, beneficiariesFiltersNull } from '../../types/BeneficiariesFilters';
import BeneficiariesFiltersViewPlus from 'src/views/beneficiaries/BeneficiariesFiltersViewPlus';

const Dashboard = () => {
  const [openCreateBeneficiaries, setOpenCreateBeneficiaries] = useState<boolean>(false);
  const [openWindow, setOpenWindow] = useState<boolean>(false);
  const [filtersApplied, setFiltersApplied] = useState<BeneficiariesFilters>(beneficiariesFiltersNull);
  const [hasWriteBenefs, setHasWriteBenefs] = useState<boolean>(false);
  const { action, setAction, setCompletion } = useAction();
  const [communities, setCommunities] = useState<Community[]>([]);

  const router = useRouter();

  const onNetworkError: (err: any) => void = err => {
    setAction({
      complete: true,
      success: false,
      message: err.message,
      status: err.status
    });
    if (err.status === 401) {
      router.push('/login');
    }
  };

  useEffect(() => {
    if (!userIsLoggedIn()) {
      router.push('/login');
    } else {
      setHasWriteBenefs(hasWriteAccess('Beneficiaries'));
      getCommunities()
        .then(result => {
          if (!!result.data.communities && result.data.communities.length > 0) {
            setCommunities(result.data.communities);
          }
        })
        .catch(onNetworkError);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (openWindow && !openCreateBeneficiaries) {
      setOpenWindow(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openCreateBeneficiaries]);

  return (
    <ApexChartWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <BeneficiariesFiltersViewPlus
            onNetworkError={onNetworkError}
            communities={communities}
            onSetFiltersAction={filters => {
              for (const fk in filters) {
                if (!filters[fk as keyof BeneficiariesFilters]) {
                  filters[fk as keyof BeneficiariesFilters] = null;
                }
              }
              setFiltersApplied(filters);
              setAction({
                complete: true,
                success: true,
                message: 'Filtros aplicados exitosamente',
                status: 200
              });
            }}
          />

          <BeneficiariesTable
            filters={filtersApplied}
            communities={communities}
            openCreateBeneficiaries={openCreateBeneficiaries}
            openWindow={openWindow}
            setAction={setAction}
          >
            {hasWriteBenefs && (
              <Button
                variant='contained'
                onClick={() => {
                  setOpenWindow(true);
                  setOpenCreateBeneficiaries(true);
                }}
              >
                Agregar Beneficiario
              </Button>
            )}
          </BeneficiariesTable>

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
