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

import { DonorsFilters, donorsFiltersNull } from 'src/types/donors/DonorsFilters';
import { useDonorsFilters } from 'src/hooks/donors/useDonorsFilters';
import DonorsTable from 'src/views/donors/DonorsTable';
import { CreateDonor } from 'src/views/donors/CreateDonor';
import { useAction } from 'src/hooks/actionHook';
import Portal from '@mui/material/Portal';
import ActionToast from 'src/views/pages/misc/ActionToast';
import { hasWriteAccess, userIsLoggedIn } from 'src/utils/sessionManagement';
import DonorsFilterView from 'src/views/donors/DonorsFilterView';
import { useRouter } from 'next/router';

export default () => {
  const [openCreateDonor, setOpenCreateDonor] = useState<boolean>(false);
  const [openWindow, setOpenWindow] = useState<boolean>(false);
  const router = useRouter();
  const [filtersApplied, setFiltersApplied] = useState<DonorsFilters>(donorsFiltersNull);
  const { filters, setFilter } = useDonorsFilters();
  const [openCollapse, setOpenCollapse] = useState<boolean>(false);
  const [hasWriteDonors, setHasWriteDonors] = useState<boolean>(false);
  const { action, setAction, setCompletion } = useAction();

  useEffect(() => {
    if (userIsLoggedIn()) {
      setHasWriteDonors(hasWriteAccess('Donors'));
      if (!!router.query.nombre_donante) {
        setFiltersApplied({ ...filtersApplied, ...{ name: router.query.nombre_donante as string } });
        setFilter('name', router.query.nombre_donante as string);
        setOpenCollapse(true);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (openWindow && !openCreateDonor) {
      setOpenWindow(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openCreateDonor]);

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
                <DonorsFilterView
                  filters={filters}
                  setFilter={setFilter}
                  onSetFiltersAction={filters => {
                    setFiltersApplied(filters);
                    setAction({
                      complete: true,
                      success: true,
                      message: 'Filtros aplicados exitosamente',
                      status: 200
                    });
                  }}
                />
              </Collapse>
            </CardContent>
          </Card>
          <DonorsTable openCreateDonor={openCreateDonor} filters={filtersApplied} setAction={setAction}>
            {hasWriteDonors && (
              <Button
                variant='contained'
                onClick={() => {
                  setOpenWindow(true);
                  setOpenCreateDonor(true);
                }}
              >
                Añadir Donante
              </Button>
            )}
          </DonorsTable>
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
