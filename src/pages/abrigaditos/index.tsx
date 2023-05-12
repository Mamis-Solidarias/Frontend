// import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { useEffect, useState } from 'react';

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts';

// ** Demo Components Imports
import ActionToast from 'src/views/pages/misc/ActionToast';
import { useAction } from 'src/hooks/actionHook';
import Portal from '@mui/material/Portal';
import Box from '@mui/material/Box';
import { useQuery } from '@apollo/client';
import { GET_ABRIGADITOS_EDITIONS, GET_ABRIGADITOS } from 'src/API/Campaigns/campaigns_graphql';
import { hasWriteAccess, userIsLoggedIn } from 'src/utils/sessionManagement';
import { useAppSelector } from 'src/hooks/reduxHooks';
import AbrigaditosBriefInformation from 'src/views/campaigns/abrigaditos/AbrigaditosBriefInformation';
import AbrigaditosFilters from 'src/views/campaigns/abrigaditos/AbrigaditosFilters';
import AbrigaditosBeneficiaries from 'src/views/campaigns/abrigaditos/AbrigaditosBeneficiaries';
import EditAbrigaditos from 'src/views/campaigns/abrigaditos/EditAbrigaditos';
import CreateAbrigaditos from 'src/views/campaigns/abrigaditos/CreateAbrigaditos';
import CampaignActions from 'src/views/campaigns/abrigaditos/CampaignActions';
import SelectEdition from 'src/views/campaigns/abrigaditos/SelectEdition';
import { useRouter } from 'next/router';
import AbrigaditosDonations from 'src/views/campaigns/abrigaditos/AbrigaditosDonations';
import AssignPayment from "src/views/campaigns/juntos/AssignPayment";

export default () => {
  const { action, setCompletion, setAction } = useAction();
  const [hasWriteCampaigns, setHasWriteCampaigns] = useState<boolean>(false);
  const abrigaditosSelector = useAppSelector(state => state.abrigaditos);
  const router = useRouter();

  const {
    loading: loadingEditions,
    error: errorEditions,
    data: dataEditions,
    refetch: refetchEditions
  } = useQuery(GET_ABRIGADITOS_EDITIONS, { variables: { communityId: 'valor nulo' } });

  if (errorEditions) {
    router.push('/login');
  }

  const { data: dataEdition, refetch: refetchEdition } = useQuery(GET_ABRIGADITOS, {
    variables: {
      edition: abrigaditosSelector.filtersApplied.edition,
      community: abrigaditosSelector.filtersApplied.community
    }
  });

  useEffect(() => {
    if (userIsLoggedIn()) {
      setHasWriteCampaigns(hasWriteAccess('Campaigns'));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loadingEditions) return <Box>Cargando ediciones de Abrigaditos...</Box>;

  if (errorEditions) {
    return <Box>Error :(</Box>;
  }
  const editions = dataEditions.abrigaditosCampaigns;

  return (
    <ApexChartWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Box display='flex' flexDirection='row' justifyContent={'space-between'}>
            <Box display={'flex'} flexDirection={'row'}>
              <SelectEdition setAction={setAction} refetchEditions={refetchEditions} editions={editions} />
              {(!!dataEdition?.abrigaditosCampaign?.provider || !!dataEdition?.abrigaditosCampaign?.edition) && (
                <AbrigaditosBriefInformation abrigaditosEdition={dataEdition?.abrigaditosCampaign} />
              )}
            </Box>
            <Box display='flex' justifyContent='flex-end' alignItems='center'>
              {hasWriteCampaigns && <CampaignActions dataEdition={dataEdition} />}
            </Box>
          </Box>
          <AbrigaditosFilters setAction={setAction} />
          {!!dataEdition?.abrigaditosCampaign?.participants && (
            <>
              <AbrigaditosBeneficiaries dataEdition={dataEdition?.abrigaditosCampaign} />
              <AbrigaditosDonations abrigaditosEdition={dataEdition?.abrigaditosCampaign} />
            </>
          )}
        </Grid>
      </Grid>
      <Portal>
        <AssignPayment setAction={setAction} refetchEdition={refetchEdition} />
        <CreateAbrigaditos setAction={setAction} refetchAbrigaditos={refetchEditions} />
        {!!dataEdition?.abrigaditosCampaign && (
          <EditAbrigaditos
            setAction={setAction}
            refetchAbrigaditos={refetchEditions}
            dataEdition={dataEdition.abrigaditosCampaign}
          />
        )}
        <ActionToast action={action} setActionCompletion={setCompletion} />
      </Portal>
    </ApexChartWrapper>
  );
};
