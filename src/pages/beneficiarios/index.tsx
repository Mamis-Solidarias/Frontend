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
import BeneficiariesTable from 'src/views/beneficiaries/BeneficiariesTable';
import { CreateBeneficiaries } from 'src/views/beneficiaries/CreateBeneficiaries';
import Community from 'src/types/Community';
import Family from 'src/types/Family';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';

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
        if (!!result.data.communities && result.data.communities.length > 0) {
          setCommunities(result.data.communities);
        }
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

  return (
    <ApexChartWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card sx={{ my: '2em', width: '100%', flexDirection: 'column' }}>
            <Typography align='center' variant='h6' sx={{ textDecoration: 'underline' }}>
              Filtros
            </Typography>
            <Box sx={{ flexDirection: 'row' }}>
              <Box sx={{ padding: '1em' }}>
                <InputLabel id='communityLabel'>
                  <strong>Comunidades</strong>
                </InputLabel>
                <Select
                  defaultValue={!!communities[0] && !!communities[0].id ? communities[0].id : '#'}
                  onChange={e => setCommunityCode(e.target.value)}
                  labelId='communityLabel'
                >
                  <MenuItem value='#' hidden={true}></MenuItem>
                  {communities.map(community => (
                    <MenuItem value={community.id} key={community.id}>
                      {community.id + ' - ' + community.name}
                    </MenuItem>
                  ))}
                </Select>
              </Box>
              <Box sx={{ padding: '1em' }}>
                <InputLabel id='familyLabel'>
                  <strong>Familias</strong>
                </InputLabel>
                <Select
                  defaultValue={!!families[0] && !!families[0].id ? families[0].id : '#'}
                  onChange={e => setFamilyId(e.target.value as string | undefined)}
                  labelId='communityLabel'
                >
                  <MenuItem value='#' hidden={true}></MenuItem>
                  {families.map(family => (
                    <MenuItem value={family.id} key={family.id}>
                      {family.id + ' - ' + family.name}
                    </MenuItem>
                  ))}
                </Select>
              </Box>
            </Box>
          </Card>
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
          <BeneficiariesTable />

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
