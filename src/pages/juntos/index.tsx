// import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import {useEffect, useState} from 'react';

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts';

// ** Demo Components Imports
import ActionToast from 'src/views/pages/misc/ActionToast';
import {useAction} from 'src/hooks/actionHook';
import Portal from '@mui/material/Portal';
import Box from '@mui/material/Box';
import {useQuery} from '@apollo/client';
import {GET_JUNTOS_EDITIONS, GET_JUNTOS} from 'src/API/Campaigns/campaigns_graphql';
import {hasWriteAccess, userIsLoggedIn} from 'src/utils/sessionManagement';
import SelectEdition from 'src/views/campaigns/juntos/SelectEdition';
import {useAppSelector} from 'src/hooks/reduxHooks';
import JuntosBriefInformation from 'src/views/campaigns/juntos/JuntosBriefInformation';
import CampaignActions from "src/views/campaigns/juntos/CampaignActions";
import CreateJuntos from 'src/views/campaigns/juntos/CreateJuntos';
import JuntosFilters from "src/views/campaigns/juntos/JuntosFilters";
import JuntosBeneficiaries from "src/views/campaigns/juntos/JuntosBeneficiaries";
import EditJuntos from "src/views/campaigns/juntos/EditJuntos";
import JuntosDonations from "src/views/campaigns/juntos/JuntosDonations";
import AssignPayment from "src/views/campaigns/juntos/AssignPayment";

export default () => {
  const {action, setCompletion, setAction} = useAction();
  const [hasWriteCampaigns, setHasWriteCampaigns] = useState<boolean>(false);
  const juntosSelector = useAppSelector(state => state.juntos);

  const {
    loading: loadingEditions,
    error: errorEditions,
    data: dataEditions,
    refetch: refetchEditions
  } = useQuery(GET_JUNTOS_EDITIONS, {variables: {communityId: 'valor nulo'}});
  const {data: dataEdition} = useQuery(GET_JUNTOS, {
    variables: {edition: juntosSelector.filtersApplied.edition, community: juntosSelector.filtersApplied.community}
  });


  useEffect(() => {
    if (userIsLoggedIn()) {
      setHasWriteCampaigns(hasWriteAccess('Campaigns'));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loadingEditions) return <Box>Cargando ediciones de Juntos...</Box>;
  if (errorEditions) return <Box>Error :(</Box>;

  const editions = dataEditions.juntosCampaigns;

  return (
    <ApexChartWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Box display='flex' flexDirection='row' justifyContent={"space-between"}>
            <Box display={"flex"} flexDirection={"row"}>
              <SelectEdition setAction={setAction} refetchEditions={refetchEditions} editions={editions}/>
              {(!!dataEdition?.juntosCampaign?.provider || !!dataEdition?.juntosCampaign?.edition) &&
                <JuntosBriefInformation juntosEdition={dataEdition?.juntosCampaign}/>
              }
            </Box>
            <Box display='flex' justifyContent='flex-end' alignItems="center">
              {hasWriteCampaigns && <CampaignActions dataEdition={dataEdition}/>}
            </Box>
          </Box>
          <JuntosFilters setAction={setAction}/>
          {!!dataEdition?.juntosCampaign?.participants && <>
            <JuntosBeneficiaries dataEdition={dataEdition?.juntosCampaign}/>
            <JuntosDonations juntosEdition={dataEdition?.juntosCampaign}/>
          </>
          }
        </Grid>
      </Grid>
      <Portal>
        <AssignPayment setAction={setAction} refetchEditions={refetchEditions}/>
        <CreateJuntos setAction={setAction} refetchJuntos={refetchEditions}/>
        {!!dataEdition?.juntosCampaign && <EditJuntos setAction={setAction} refetchJuntos={refetchEditions} dataEdition={dataEdition.juntosCampaign}/>}
        <ActionToast action={action} setActionCompletion={setCompletion}/>
      </Portal>
    </ApexChartWrapper>
  );
};
