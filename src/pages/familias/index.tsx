import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { useEffect, useState } from 'react';

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts';

// ** Demo Components Imports
import FamiliesTable from 'src/views/families/FamiliesTable';
import { CreateFamilies } from 'src/views/families/CreateFamilies';
import { BeneficiariesFilters, beneficiariesFiltersNull } from 'src/types/beneficiaries/BeneficiariesFilters';
import { useBeneficiariesFilters } from 'src/hooks/beneficiaries/useBeneficiariesFilters';
import FamiliesFiltersView from 'src/views/families/FamiliesFiltersView';
import Portal from '@mui/material/Portal';
import ActionToast from 'src/views/pages/misc/ActionToast';
import { useAction } from 'src/hooks/actionHook';
import { hasWriteAccess, userIsLoggedIn } from 'src/utils/sessionManagement';
import { useQuery } from '@apollo/client';
import { GET_COMMUNITIES } from '../../API/Beneficiaries/beneficiaries_grapql';

export default () => {
  const [openCreateFamilies, setOpenCreateFamilies] = useState<boolean>(false);
  const [openWindow, setOpenWindow] = useState<boolean>(false);
  const [hasWriteBenefs, setHasWriteBenefs] = useState<boolean>(false);
  const { filters, setFilter } = useBeneficiariesFilters();
  const { action, setAction, setCompletion } = useAction();
  const [filtersApplied, setFiltersApplied] = useState<BeneficiariesFilters>(beneficiariesFiltersNull);
  const { data: dataCommunities } = useQuery(GET_COMMUNITIES);

  useEffect(() => {
    if (userIsLoggedIn()) {
      setHasWriteBenefs(hasWriteAccess('Beneficiaries'));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSetFiltersAction = (filter: BeneficiariesFilters) => {
    setFiltersApplied(filter);
    setAction({
      complete: true,
      success: true,
      status: 200,
      message: 'Filtros aplicados correctamente'
    });
  };

  useEffect(() => {
    if (openWindow && !openCreateFamilies) {
      setOpenWindow(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openCreateFamilies]);

  return (
    <ApexChartWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <FamiliesFiltersView
            filters={filters}
            setFilter={setFilter}
            communities={dataCommunities?.communities?.nodes}
            onSetFiltersAction={onSetFiltersAction}
          />
          <FamiliesTable
            communities={dataCommunities?.communities?.nodes}
            filters={filtersApplied}
            openCreateFamilies={openCreateFamilies}
            setAction={setAction}
          >
            {hasWriteBenefs && (
              <Button
                variant='contained'
                onClick={() => {
                  setOpenWindow(true);
                  setOpenCreateFamilies(true);
                }}
              >
                Añadir Familias
              </Button>
            )}
          </FamiliesTable>
          <CreateFamilies
            openDialog={openCreateFamilies}
            handleClose={() => setOpenCreateFamilies(false)}
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
