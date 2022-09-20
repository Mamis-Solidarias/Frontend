import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { useEffect, useState } from 'react';

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts';

// ** Demo Components Imports
import FamiliesTable from 'src/views/families/FamiliesTable';
import MenuItem from '@mui/material/MenuItem';
import { getCommunities } from 'src/API/Beneficiaries/communities_data';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import Box from '@mui/material/Box';
import { CreateFamilies } from 'src/views/families/CreateFamilies';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';

interface Community {
  id: string;
  name: string;
  description: string;
  address: string;
}

const Dashboard = () => {
  const [openCreateFamilies, setOpenCreateFamilies] = useState<boolean>(false);
  const [openWindow, setOpenWindow] = useState<boolean>(false);
  const [communityCode, setCommunityCode] = useState<string | undefined>();
  const [communities, setCommunities] = useState<Community[]>([]);

  useEffect(() => {
    if (!!localStorage.getItem('user')) {
      getCommunities(localStorage.getItem('user')).then(result => {
        setCommunities(result.data.communities);
      });
    }
  }, []);

  useEffect(() => {
    if (openWindow && openCreateFamilies === false) {
      setOpenWindow(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openCreateFamilies]);

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
                <Select defaultValue='#' onChange={e => setCommunityCode(e.target.value)} labelId='communityLabel'>
                  <MenuItem value='#' hidden={true}></MenuItem>
                  {communities.map(community => (
                    <MenuItem value={community.id} key={community.id}>
                      {community.id + ' - ' + community.name}
                    </MenuItem>
                  ))}
                </Select>
              </Box>
            </Box>
          </Card>
          <FamiliesTable communityCode={communityCode} />
          <Button
            variant='contained'
            sx={{ my: 3, display: 'block', marginLeft: 'auto', marginRight: 'auto' }}
            onClick={() => {
              setOpenWindow(true);
              setOpenCreateFamilies(true);
            }}
            disabled={!communityCode}
          >
            Añadir Nuevas Familias
          </Button>
          {!!communityCode && (
            <CreateFamilies
              openDialog={openCreateFamilies}
              handleClose={() => setOpenCreateFamilies(false)}
              communityCode={communityCode}
            />
          )}
        </Grid>
      </Grid>
    </ApexChartWrapper>
  );
};

export default Dashboard;
