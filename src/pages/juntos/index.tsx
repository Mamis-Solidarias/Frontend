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
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import {useQuery} from '@apollo/client';
import {GET_JUNTOS_EDITIONS, GET_JUNTOS} from 'src/API/Campaigns/campaigns_graphql';
import {CreateMochi} from 'src/views/campaigns/CreateMochi';
import Community from 'src/types/Community';
import {getCommunities} from 'src/API/Beneficiaries/communities_data';
import {MochiEditionBrief} from 'src/views/campaigns/MochiEditionBrief';
import {EditMochi} from 'src/views/campaigns/EditMochi';
import {hasWriteAccess, userIsLoggedIn} from 'src/utils/sessionManagement';
import SelectEdition from 'src/views/campaigns/juntos/SelectEdition';
import {useAppSelector} from 'src/hooks/reduxHooks';
import JuntosBriefInformation from 'src/views/campaigns/juntos/JuntosBriefInformation';
import CampaignActions from "src/views/campaigns/juntos/CampaignActions";
import CreateJuntos from 'src/views/campaigns/juntos/CreateJuntos';

const Dashboard = () => {
  // const [openWindow, setOpenWindow] = useState<boolean>(false);
  const [filtersApplied, setFiltersApplied] = useState<CampaignsFilters>(campaignsFiltersNull);
  const [openCreateJuntos, setOpenCreateJuntos] = useState<boolean>(false);
  const [createJuntosFinished, setCreateJuntosFinished] = useState<boolean>(false);
  const [openEditJuntos, setOpenEditJuntos] = useState<boolean>(false);
  const [editJuntosFinished, setEditJuntosFinished] = useState<boolean>(false);
  const {filters, setFilter} = useCampaignsFilters();
  const [filterToApply, setFilterToApply] = useState<CampaignsFilters>(campaignsFiltersNull);
  const [openCollapse, setOpenCollapse] = useState<boolean>(false);
  const {action, setCompletion, setAction} = useAction();
  const [hasWriteCampaigns, setHasWriteCampaigns] = useState<boolean>(false);
  const juntosSelector = useAppSelector(state => state.juntos);

  const {
    loading: loadingEditions,
    error: errorEditions,
    data: dataEditions,
    refetch: refetchEditions
  } = useQuery(GET_JUNTOS_EDITIONS,{variables: {communityId: 'valor nulo'}} );
  const [communities, setCommunities] = useState<Community[]>([]);
  const {data: dataEdition, refetch: refetchEdition} = useQuery(GET_JUNTOS, {
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
    if (createJuntosFinished) {
      refetchEditions();
      setCreateJuntosFinished(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openCreateJuntos]);

  useEffect(() => {
    if (editJuntosFinished) {
      refetchEditions();
      setEditJuntosFinished(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openEditJuntos]);

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
              {!!dataEdition && !!dataEdition.mochiEdition && (!!dataEdition.mochiEdition.provider || !!dataEdition.mochiEdition.edition) &&
                <Box alignItems={"center"}>
                  <DefaultCard sx={{display: 'flex', flexDirection: 'column'}}
                               title={"Descripción"} fields={{
                    Proveedor: dataEdition.mochiEdition.provider,
                    Edición: dataEdition.mochiEdition.edition
                  }}/>
                </Box>
              }
              <Box alignItems={'center'}>
                <Card
                  sx={{display: 'flex', flexDirection: 'column', px: '.25em', py: '.25em'}}>
                  <CardHeader title={"Filtros"} action={<Button onClick={
                    () => {
                      setFiltersApplied(filterToApply);
                      setAction({
                        complete: true,
                        success: true,
                        message: 'Filtros aplicados',
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
                      {!!editions && editions.map((editionJson: { edition: string }) => {
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
            </Box>
            <Box display='flex' justifyContent='flex-end' alignItems="center">
              {hasWriteCampaigns && <CampaignActions dataEdition={dataEdition}/>}
            </Box>

          </Box>
        </Grid>
      </Grid>
      <Portal>
        <CreateJuntos setAction={setAction} refetchJuntos={refetchEditions}/>
        <ActionToast action={action} setActionCompletion={setCompletion}/>
      </Portal>
    </ApexChartWrapper>
  );
};

export default Dashboard;
