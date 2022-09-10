import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { useEffect, useState } from 'react';

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts';

// ** Demo Components Imports
import MenuItem from '@mui/material/MenuItem';
import { getCommunities, getFamiliesByCommunity } from 'src/API/Beneficiaries/communities_data';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import Box from '@mui/material/Box';
import { getFamily } from 'src/API/Beneficiaries/families_data';
import BeneficiariesTable from 'src/views/beneficiaries/BeneficiariesTable';
import { CreateBeneficiaries } from 'src/views/beneficiaries/CreateBeneficiaries';

interface Community {
  id: string;
  name: string;
  description: string;
  address: string;
}

interface Family {
  id: number;
  name: string;
  address: string;
  details: string | null;
  contacts: { type: string; content: string; title: string; isPreferred: boolean }[];
}

const Dashboard = () => {
  const [openCreateBeneficiary, setOpenCreateBeneficiary] = useState<boolean>(false);
  const [openWindow, setOpenWindow] = useState<boolean>(false);
  const [communityCode, setCommunityCode] = useState<string | undefined>();
  const [communities, setCommunities] = useState<Community[]>([]);
  const [families, setFamilies] = useState<Family[]>([]);
  const [familyId, setFamilyId] = useState<string | undefined>();

  useEffect(() => {
    if (!!localStorage.getItem('user')) {
      getCommunities(localStorage.getItem('user')).then(result => {
        setCommunities(result.data.communities);
      });
    }
  }, []);

  useEffect(() => {
    if (openWindow && openCreateBeneficiary === false) {
      setOpenWindow(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openCreateBeneficiary]);

  useEffect(() => {
    if (!!communityCode) {
      getFamiliesByCommunity(localStorage.getItem('user'), communityCode, 0, 100).then(result => {
        setFamilies(result.data.families);
      });
    }
  }, [communityCode]);

  useEffect(() => {
    if (!!familyId) {
      getFamily(localStorage.getItem('user'), familyId).then(result => {
        setFamilies(result.data);
      });
    }
  }, [familyId]);

  return (
    <ApexChartWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', my: '2em' }}>
            <Box>
              <InputLabel id='communityLabel'>
                <strong>Comunidades</strong>
              </InputLabel>
              <Select defaultValue='#' onChange={e => setCommunityCode(e.target.value)} labelId='communityLabel'>
                <MenuItem value='#' hidden={true}></MenuItem>
                {communities.map(community => (
                  <MenuItem value={community.id} key={community.id}>
                    {community.id + ' - ' + community.name}
                  </MenuItem>
                ))}
              </Select>
            </Box>
            {families.length > 0 && (
              <Box>
                <InputLabel id='familyLabel'>
                  <strong>Familias</strong>
                </InputLabel>
                <Select defaultValue='#' onChange={e => setFamilyId(e.target.value)} labelId='communityLabel'>
                  <MenuItem value='#' hidden={true}></MenuItem>
                  {families.map(family => (
                    <MenuItem value={family.id} key={family.id}>
                      {family.id + ' - ' + family.name}
                    </MenuItem>
                  ))}
                </Select>
              </Box>
            )}
          </Box>
          <BeneficiariesTable familyId={familyId} />
          <Button
            variant='contained'
            sx={{ my: 3, display: 'block', marginLeft: 'auto', marginRight: 'auto' }}
            onClick={() => {
              setOpenWindow(true);
              setOpenCreateBeneficiary(true);
            }}
            disabled={!familyId}
          >
            Añadir Nuevos Beneficiarios
          </Button>
          {!!familyId && (
            <CreateBeneficiaries
              openDialog={openCreateBeneficiary}
              handleClose={() => setOpenCreateBeneficiary(false)}
              familyId={familyId}
            />
          )}
        </Grid>
      </Grid>
    </ApexChartWrapper>
  );
};

export default Dashboard;
