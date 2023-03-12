// import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { useEffect, useState } from 'react';

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
import ActionToast from 'src/views/pages/misc/ActionToast';
import { useAction } from 'src/hooks/actionHook';
import Portal from '@mui/material/Portal';
import Button from '@mui/material/Button';
import { useCampaignsFilters } from 'src/hooks/campaigns/useCampaignsFilters';
import { CampaignsFilters, campaignsFiltersNull } from 'src/types/campaigns/CampaignsFilters';
import CampaignsFiltersView from 'src/views/campaigns/CampaignsFiltersView';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { useQuery } from '@apollo/client';
import { GET_MOCHI_EDITIONS, GET_MOCHI } from 'src/API/Campaigns/campaigns_graphql';
import { CreateMochi } from 'src/views/campaigns/mochi/CreateMochi';
import { MochiEditionBrief } from 'src/views/campaigns/mochi/MochiEditionBrief';
import { EditMochi } from 'src/views/campaigns/mochi/EditMochi';
import { hasWriteAccess, userIsLoggedIn } from 'src/utils/sessionManagement';
import { DefaultCard } from 'src/views/beneficiaries/BeneficiaryCard/DefaultCard';
import InfoIcon from '@mui/icons-material/Info';
import { Participant } from 'src/types/campaigns/MochiEdition';
import { GET_COMMUNITIES } from 'src/API/Beneficiaries/beneficiaries_grapql';
import Community from 'src/types/beneficiaries/Community';
import { useRouter } from 'next/router';

export default () => {
  const [filtersApplied, setFiltersApplied] = useState<CampaignsFilters>(campaignsFiltersNull);
  const [openCreateMochi, setOpenCreateMochi] = useState<boolean>(false);
  const [createMochiFinished, setCreateMochiFinished] = useState<boolean>(false);
  const [openEditMochi, setOpenEditMochi] = useState<boolean>(false);
  const [editMochiFinished, setEditMochiFinished] = useState<boolean>(false);
  const { filters, setFilter } = useCampaignsFilters();
  const [filterToApply, setFilterToApply] = useState<CampaignsFilters>(campaignsFiltersNull);
  const [openCollapse, setOpenCollapse] = useState<boolean>(false);
  const { action, setCompletion, setAction } = useAction();
  const [hasWriteCampaigns, setHasWriteCampaigns] = useState<boolean>(false);
  const {
    loading: loadingEditions,
    error: errorEditions,
    data: dataEditions,
    refetch: refetchEditions
  } = useQuery(GET_MOCHI_EDITIONS, { variables: { communityId: 'valor nulo' } });
  const { data: dataEdition, refetch: refetchEdition } = useQuery(GET_MOCHI, {
    variables: { edition: filtersApplied.edition, community: filtersApplied.community }
  });
  const { data: dataCommunities } = useQuery(GET_COMMUNITIES);
  const router = useRouter();

  useEffect(() => {
    if (userIsLoggedIn()) {
      setHasWriteCampaigns(hasWriteAccess('Campaigns'));
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
      refetchEdition({ edition: filtersApplied.edition, community: filtersApplied.community });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [action.complete]);

  useEffect(() => {
    if (!!filtersApplied.community && !!filtersApplied.edition) {
      refetchEdition({ edition: filtersApplied.edition, community: filtersApplied.community });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filtersApplied.community, filtersApplied.edition]);

  if (loadingEditions) return <Box>Cargando ediciones de Mochi...</Box>;

  if (errorEditions) {
    router.push('/login');

    return <Box>Error :(</Box>;
  }
  const editions = dataEditions.mochiEditions;

  const selectCampaign = (filtersToApply: CampaignsFilters) => {
    setFiltersApplied(filtersToApply);
    setAction({
      complete: true,
      success: true,
      message: 'Campaña especificada',
      status: 200
    });
  };

  const getParticipantsWithDonation = () => {
    return (dataEdition.mochiEdition.participants as Participant[]).reduce(
      (accum, participant) => accum + (!!participant.donationId ? 1 : 0),
      0
    );
  };

  const getAllParticipants = () => {
    return (dataEdition.mochiEdition.participants as Participant[]).reduce(accum => accum + 1, 0);
  };

  return (
    <ApexChartWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Box display='flex' flexDirection='row' justifyContent={'space-between'}>
            <Box display={'flex'} flexDirection={'row'}>
              <Card sx={{ height: '100%' }}>
                <CardHeader title={'Seleccionar Campaña'} />
                <CardContent sx={{ flexDirection: 'row' }}>
                  <TextField
                    select
                    sx={{ mx: '.25em' }}
                    variant='standard'
                    type='text'
                    label='Comunidad'
                    value={filterToApply.community}
                    onChange={async e => {
                      setFilterToApply(oldFiltersToApply => ({
                        ...oldFiltersToApply,
                        ...{ community: e.target.value }
                      }));
                      await refetchEditions({ communityId: e.target.value });
                    }}
                  >
                    {dataCommunities?.communities?.nodes.map((community: Community) => {
                      return (
                        <MenuItem value={community.id} key={community.id}>
                          {community.id + ' - ' + community.name}
                        </MenuItem>
                      );
                    })}
                  </TextField>
                  <TextField
                    select
                    sx={{ mx: '.25em' }}
                    variant='standard'
                    type='text'
                    label='Edición'
                    value={filterToApply.edition}
                    onChange={e => {
                      setFilterToApply(oldFiltersToApply => ({ ...oldFiltersToApply, ...{ edition: e.target.value } }));
                      selectCampaign({ ...filterToApply, ...{ edition: e.target.value } });
                    }}
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
              {!!dataEdition?.mochiEdition && (
                <>
                  <Box sx={{ px: '0.25em', height: '100%' }}>
                    <DefaultCard
                      sx={{ display: 'flex', flexDirection: 'column', minWidth: '5em', height: '100%' }}
                      title={<InfoIcon sx={{ color: '#00a5ff' }} />}
                      fields={{
                        Proveedor: !!dataEdition.mochiEdition.provider ? dataEdition.mochiEdition.provider : '-',
                        Objetivo: getAllParticipants() + ' mochis'
                      }}
                    />
                  </Box>
                  <Box sx={{ px: '0.25em', height: '100%' }}>
                    <DefaultCard
                      sx={{ display: 'flex', flexDirection: 'column', minWidth: '5em', height: '100%' }}
                      title={<InfoIcon sx={{ color: '#00a5ff' }} />}
                      fields={{
                        Completitud: (getParticipantsWithDonation() * 100) / getAllParticipants() + '%'
                      }}
                    />
                  </Box>
                </>
              )}
            </Box>
            <Box display='flex' justifyContent='flex-end' alignItems='center'>
              {hasWriteCampaigns && (
                <Button
                  sx={{ mx: '.25em' }}
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
                <Button
                  sx={{ mx: '.25em' }}
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
                <CampaignsFiltersView filters={filters} setFilter={setFilter}>
                  <Button
                    variant='contained'
                    onClick={() => {
                      const filtersToApply = { ...filters };
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
            <CardHeader title={'Una Mochi Como la Tuya'} />
            <CardContent>
              {!!dataEdition && !!dataEdition.mochiEdition && (
                <MochiEditionBrief dataEdition={dataEdition.mochiEdition} setAction={setAction} />
              )}
            </CardContent>
          </Card>
          {openCreateMochi && (
            <CreateMochi
              openDialog={openCreateMochi}
              handleClose={() => {
                setCreateMochiFinished(true);
                setOpenCreateMochi(false);
              }}
              setAction={setAction}
            />
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
