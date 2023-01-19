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
import Button from '@mui/material/Button';
import {useCampaignsFilters} from 'src/hooks/campaigns/useCampaignsFilters';
import {CampaignsFilters, campaignsFiltersNull} from 'src/types/campaigns/CampaignsFilters';
import CampaignsFiltersView from 'src/views/campaigns/CampaignsFiltersView';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import {useQuery} from '@apollo/client';
import {GET_MOCHI_EDITIONS, GET_MOCHI} from 'src/API/Campaigns/campaigns_graphql';
import {CreateMochi} from 'src/views/campaigns/mochi/CreateMochi';
import Community from 'src/types/beneficiaries/Community';
import {getCommunities} from 'src/API/Beneficiaries/communities_data';
import {MochiEditionBrief} from 'src/views/campaigns/MochiEditionBrief';
import {EditMochi} from 'src/views/campaigns/mochi/EditMochi';
import {hasWriteAccess, userIsLoggedIn} from 'src/utils/sessionManagement';
import {DefaultCard} from "../../views/beneficiaries/BeneficiaryCard/DefaultCard";

const Dashboard = () => {
  // const [openWindow, setOpenWindow] = useState<boolean>(false);
  const [filtersApplied, setFiltersApplied] = useState<CampaignsFilters>(campaignsFiltersNull);
  const [openCreateMochi, setOpenCreateMochi] = useState<boolean>(false);
  const [createMochiFinished, setCreateMochiFinished] = useState<boolean>(false);
  const [openEditMochi, setOpenEditMochi] = useState<boolean>(false);
  const [editMochiFinished, setEditMochiFinished] = useState<boolean>(false);
  const {filters, setFilter} = useCampaignsFilters();
  const [filterToApply, setFilterToApply] = useState<CampaignsFilters>(campaignsFiltersNull);
  const [openCollapse, setOpenCollapse] = useState<boolean>(false);
  const {action, setCompletion, setAction} = useAction();
  const [hasWriteCampaigns, setHasWriteCampaigns] = useState<boolean>(false);
  const router = useRouter();
  const {
    loading: loadingEditions,
    error: errorEditions,
    data: dataEditions,
    refetch: refetchEditions
  } = useQuery(GET_MOCHI_EDITIONS,{variables: {communityId: 'valor nulo'}} );
  const [communities, setCommunities] = useState<Community[]>([]);
  const {data: dataEdition, refetch: refetchEdition} = useQuery(GET_MOCHI, {
    variables: {edition: filtersApplied.edition, community: filtersApplied.community}
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
      getCommunities().then(result => {
        setCommunities(result.data.communities);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (createMochiFinished) {
      refetchEditions();
      setCreateMochiFinished(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openCreateMochi]);

  useEffect(() => {
    if (editMochiFinished) {
      refetchEditions();
      setEditMochiFinished(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openEditMochi]);

  useEffect(() => {
    if (action.complete) {
      refetchEdition({edition: filtersApplied.edition, community: filtersApplied.community});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [action.complete]);

  useEffect(() => {
    if (!!filtersApplied.community && !!filtersApplied.edition) {
      refetchEdition({edition: filtersApplied.edition, community: filtersApplied.community});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filtersApplied.community, filtersApplied.edition]);

  if (loadingEditions) return <Box>Cargando ediciones de Mochi...</Box>;

  if (errorEditions) {
    return <Box>Error :(</Box>;
  }
  const editions = dataEditions.mochiEditions;

  return (
    <ApexChartWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Box display='flex' flexDirection='row' justifyContent={"space-between"}>
            <Box display={"flex"} flexDirection={"row"} alignItems={"center"}>
              <Box>
                <Card
                  sx={{display: 'flex', flexDirection: 'column', px: '.25em', py: '.25em'}}>
                  <CardHeader title={"Seleccionar Campaña"} action={<Button onClick={
                    () => {
                      setFiltersApplied(filterToApply);
                      setAction({
                        complete: true,
                        success: true,
                        message: 'Campaña especificada',
                        status: 200
                      });
                    }
                  }
                  >
                    Aplicar cambios
                  </Button>}/>
                  <CardContent sx={{flexDirection: 'row'}}>
                    <TextField
                      select
                      sx={{mx: '.25em'}}
                      variant='standard'
                      type='text'
                      label='Comunidad'
                      value={filterToApply.community}
                      onChange={e => {
                        setFilterToApply(oldFiltersToApply => ({...oldFiltersToApply, ...{community: e.target.value}}));
                        refetchEditions({communityId: e.target.value});
                      }}>
                      {communities.map(community => {
                        return (
                          <MenuItem value={community.id} key={community.id}>
                            {community.id + ' - ' + community.name}
                          </MenuItem>
                        );
                      })}
                    </TextField>
                    <TextField
                      select
                      sx={{mx: '.25em'}}
                      variant='standard'
                      type='text'
                      label='Edición'
                      value={filterToApply.edition}
                      onChange={e => setFilterToApply(oldFiltersToApply => ({...oldFiltersToApply, ...{edition: e.target.value}}))}
                    >
                      {editions.map((editionJson: { edition: string }) => {
                        return (
                          <MenuItem value={editionJson.edition} key={editionJson.edition}>
                            {editionJson.edition}
                          </MenuItem>
                        );
                      })}
                    </TextField>
                  </CardContent>
                </Card>
              </Box>
              {!!dataEdition && !!dataEdition.mochiEdition && (!!dataEdition.mochiEdition.provider || !!dataEdition.mochiEdition.edition) &&
                <Box alignItems={"center"}>
                  <DefaultCard sx={{display: 'flex', flexDirection: 'column', minWidth: '5em'}}
                               title={"Descripción"} fields={{
                    Proveedor: dataEdition.mochiEdition.provider,
                    Edición: dataEdition.mochiEdition.edition
                  }}/>
                </Box>
              }
            </Box>
            <Box display='flex' justifyContent='flex-end' alignItems="center">
              {hasWriteCampaigns && (
                <Button sx={{mx: '.25em'}}
                        variant='contained'
                        onClick={() => {
                          setOpenEditMochi(true);
                          setEditMochiFinished(false);
                        }}
                        disabled={!dataEdition || dataEdition.length === 0}
                >
                  Editar
                </Button>
              )}
              {hasWriteCampaigns && (
                <Button sx={{mx: '.25em'}}
                        variant='contained'
                        onClick={() => {
                          setOpenCreateMochi(true);
                          setCreateMochiFinished(false);
                        }}
                >
                  Crear
                </Button>
              )}
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
                <CampaignsFiltersView filters={filters} setFilter={setFilter}>
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
                </CampaignsFiltersView>
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
          {openCreateMochi && (
            <CreateMochi openDialog={openCreateMochi} handleClose={() => {
              setCreateMochiFinished(true);
              setOpenCreateMochi(false);
            }} setAction={setAction} onNetworkError={onNetworkError}/>
          )}

          {openEditMochi && !!dataEdition.mochiEdition && (
            <EditMochi
              openDialog={openEditMochi}
              mochiEdition={dataEdition.mochiEdition}
              handleClose={() => {
                setEditMochiFinished(true);
                setOpenEditMochi(false);
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

export default Dashboard;
