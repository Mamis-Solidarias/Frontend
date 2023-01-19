// import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import {useEffect, useState} from 'react';

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
import {useRouter} from 'next/router';
import ActionToast from 'src/views/pages/misc/ActionToast';
import {useAction} from 'src/hooks/actionHook';
import Portal from '@mui/material/Portal';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {CampaignsFilters} from 'src/types/campaigns/CampaignsFilters';
import CampaignsFiltersView from 'src/views/campaigns/CampaignsFiltersView';
import Box from '@mui/material/Box';
import {useQuery} from '@apollo/client';
import {GET_JUNTOS_EDITIONS, GET_JUNTOS} from 'src/API/Campaigns/campaigns_graphql';
import {CreateMochi} from 'src/views/campaigns/mochi/CreateMochi';
import {MochiEditionBrief} from 'src/views/campaigns/MochiEditionBrief';
import {EditMochi} from 'src/views/campaigns/mochi/EditMochi';
import {hasWriteAccess, userIsLoggedIn} from 'src/utils/sessionManagement';
import SelectEdition from 'src/views/campaigns/juntos/SelectEdition';
import {useAppDispatch, useAppSelector} from 'src/hooks/reduxHooks';
import JuntosBriefInformation from 'src/views/campaigns/juntos/JuntosBriefInformation';
import {updateOpenCreateJuntos, updateOpenEditJuntos} from "../../features/juntosSlice";

export default () => {
  const {action, setCompletion, setAction} = useAction();
  const [hasWriteCampaigns, setHasWriteCampaigns] = useState<boolean>(false);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const juntosSelector = useAppSelector(state => state.juntos);

  const {
    loading: loadingEditions,
    error: errorEditions,
    data: dataEditions,
    refetch: refetchEditions
  } = useQuery(GET_JUNTOS_EDITIONS, {variables: {communityId: 'valor nulo'}});
  const {data: dataEdition, refetch: refetchEdition} = useQuery(GET_JUNTOS, {
    variables: {edition: juntosSelector.filtersApplied.edition, community: juntosSelector.filtersApplied.community}
  });

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
    if (userIsLoggedIn()) {
      setHasWriteCampaigns(hasWriteAccess('Campaigns'));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loadingEditions) return <Box>Cargando ediciones de Juntos...</Box>;

  if (errorEditions) {
    return <Box>Error :(</Box>;
  }
  const editions = dataEditions.juntosCampaigns;

  return (
    <ApexChartWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Box display='flex' flexDirection='row' justifyContent={"space-between"}>
            <Box display={"flex"} flexDirection={"row"} alignItems={"center"}>
              <SelectEdition setAction={setAction} refetchEditions={refetchEditions} editions={editions}/>
              {!!dataEdition && !!dataEdition.juntosEdition && (!!dataEdition.juntosEdition.provider || !!dataEdition.juntosEdition.edition) &&
                <JuntosBriefInformation juntosEdition={dataEdition.juntosEdition}/>
              }
            </Box>
            <Box display='flex' justifyContent='flex-end' alignItems="center">
              {hasWriteCampaigns && (<>
                <Button sx={{mx: '.25em'}}
                        variant='contained'
                        onClick={() => dispatch(updateOpenEditJuntos(true))}
                        disabled={!dataEdition || dataEdition.length === 0}
                >
                  Editar
                </Button>
                <Button sx={{mx: '.25em'}}
                        variant='contained'
                        onClick={() => dispatch(updateOpenCreateJuntos(true))}
                >
                  Crear
                </Button>
              </>)}
            </Box>
          </Box>

          <Card sx={{my: '2em', width: '100%', display: 'flex', flexDirection: 'column'}}>
            <CardHeader
              title='Filtros'
              action={
                <IconButton size='small' onClick={() => setOpenCollapse(!openCollapse)}>
                  {openCollapse ? (
                    <ChevronUp sx={{fontSize: '1.875rem'}}/>
                  ) : (
                    <ChevronDown sx={{fontSize: '1.875rem'}}/>
                  )}
                </IconButton>
              }
            />
            <CardContent>
              <Collapse in={openCollapse}>
                <CampaignsFiltersView filters={filters} setFilter={setFilter}/>
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
          <Card>
            <CardHeader title={"Una Mochi Como la Tuya"}/>
            <CardContent>
              {!!dataEdition && !!dataEdition.mochiEdition && (
                <MochiEditionBrief dataEdition={dataEdition.mochiEdition} setAction={setAction}/>
              )}
            </CardContent>
          </Card>
          {openCreateJuntos && (
            <CreateMochi openDialog={openCreateJuntos} handleClose={() => {
              setCreateJuntosFinished(true);
              setOpenCreateJuntos(false);
            }} setAction={setAction} onNetworkError={onNetworkError}/>
          )}

          {openEditJuntos && !!dataEdition.mochiEdition && (
            <EditMochi
              openDialog={openEditJuntos}
              mochiEdition={dataEdition.mochiEdition}
              handleClose={() => {
                setEditJuntosFinished(true);
                setOpenEditJuntos(false);
              }}
              setAction={setAction}
              onNetworkError={onNetworkError}
            />
          )}
        </Grid>
      </Grid>
      <Portal>
        <ActionToast action={action} setActionCompletion={setCompletion}/>
      </Portal>
    </ApexChartWrapper>
  );
};
