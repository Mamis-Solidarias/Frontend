import Grid from '@mui/material/Grid';
import { useEffect } from 'react';

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts';

// ** Demo Components Imports

import { useAction } from 'src/hooks/actionHook';
import Portal from '@mui/material/Portal';
import ActionToast from 'src/views/pages/misc/ActionToast';
import { hasWriteAccess, userIsLoggedIn } from 'src/utils/sessionManagement';
import { useAppDispatch } from 'src/hooks/reduxHooks';
import { updateHasWriteDonations } from 'src/features/donations/donationsSlice';
import Donations from 'src/views/donations/Donations';

// import DonorsFilterView from 'src/views/donors/DonorsFilterView';

export default () => {
  const { action, setCompletion } = useAction();
  
  // const donationsSelector = useAppSelector(state => state.donations);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (userIsLoggedIn()) {
      dispatch(updateHasWriteDonations(hasWriteAccess('Donors')));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ApexChartWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          {/*
          <Card sx={{ my: '2em', width: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardHeader
              title='Filtros'
              action={
                <IconButton
                  size='small'
                  onClick={() => dispatch(updateOpenFiltersCollapse(!donationsSelector.openFiltersCollapse))}
                >
                  {donationsSelector.openFiltersCollapse ? (
                    <ChevronUp sx={{ fontSize: '1.875rem' }} />
                  ) : (
                    <ChevronDown sx={{ fontSize: '1.875rem' }} />
                  )}
                </IconButton>
              }
            />
            <CardContent>
              <Collapse in={donationsSelector.openFiltersCollapse}>
                                 <DonorsFilterView filters={donationsSelector.filtersApplied}
                             setFilter={setFilter}
                               onSetFiltersAction={(filters) => {
                setFiltersApplied(filters);
                setAction({
                complete: true,
                success: true,
                  message: 'Filtros aplicados exitosamente',
                status: 200
                });
                }}/> 
              </Collapse>
            </CardContent>
          </Card>*/}
          <Donations />
        </Grid>
      </Grid>
      <Portal>
        <ActionToast action={action} setActionCompletion={setCompletion} />
      </Portal>
    </ApexChartWrapper>
  );
};
