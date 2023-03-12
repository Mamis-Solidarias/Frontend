import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { useEffect, useState } from 'react';

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts';

// ** Demo Components Imports
import BeneficiariesTable from 'src/views/beneficiaries/BeneficiariesTable';
import { CreateBeneficiaries } from 'src/views/beneficiaries/CreateBeneficiaries';
import ActionToast from 'src/views/pages/misc/ActionToast';
import { useAction } from 'src/hooks/actionHook';
import Portal from '@mui/material/Portal';
import { hasWriteAccess, userIsLoggedIn } from 'src/utils/sessionManagement';
import { BeneficiariesFilters, beneficiariesFiltersNull } from '../../types/beneficiaries/BeneficiariesFilters';
import BeneficiariesFiltersViewPlus from 'src/views/beneficiaries/BeneficiariesFiltersViewPlus';
import { useQuery } from '@apollo/client';
import { GET_COMMUNITIES } from 'src/API/Beneficiaries/beneficiaries_grapql';

export default () => {
  const [openCreateBeneficiaries, setOpenCreateBeneficiaries] = useState<boolean>(false);
  const [openWindow, setOpenWindow] = useState<boolean>(false);
  const [filtersApplied, setFiltersApplied] = useState<BeneficiariesFilters>(beneficiariesFiltersNull);
  const [hasWriteBenefs, setHasWriteBenefs] = useState<boolean>(false);
  const { action, setAction, setCompletion } = useAction();
  const { data: dataCommunities } = useQuery(GET_COMMUNITIES);

  useEffect(() => {
    if (userIsLoggedIn()) {
      setHasWriteBenefs(hasWriteAccess('Beneficiaries'));
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
            communities={dataCommunities?.communities?.nodes}
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
            communities={dataCommunities?.communities?.nodes}
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
                Agregar Beneficiarios
              </Button>
            )}
          </BeneficiariesTable>
          <CreateBeneficiaries
            openDialog={openCreateBeneficiaries}
            setAction={setAction}
            handleClose={() => setOpenCreateBeneficiaries(false)}
            communities={dataCommunities?.communities?.nodes}
          />
        </Grid>
      </Grid>
      <Portal>
        <ActionToast action={action} setActionCompletion={setCompletion} />
      </Portal>
    </ApexChartWrapper>
  );
};
