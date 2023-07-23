import React, { FC, useEffect, useState } from 'react';

// ** MUI Imports
import MenuItem from '@mui/material/MenuItem';
import Family from 'src/types/beneficiaries/Family';
import Community from 'src/types/beneficiaries/Community';
import TextField from '@mui/material/TextField';

import GENDERS from 'src/types/beneficiaries/Genders';
import BENEFICIARY_TYPES from 'src/types/beneficiaries/BeneficiaryTypes';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Button, Card, CardContent, Collapse, Grid, IconButton, Switch } from '@mui/material';
import { ChevronDown, ChevronUp } from 'mdi-material-ui';
import CardHeader from '@mui/material/CardHeader';
import { useBeneficiariesFilters } from 'src/hooks/beneficiaries/useBeneficiariesFilters';
import { BeneficiariesFilters } from 'src/types/beneficiaries/BeneficiariesFilters';
import { useQuery } from '@apollo/client';
import { GET_FAMILIES } from 'src/API/Beneficiaries/beneficiaries_grapql';

interface BeneficiariesFiltersViewPlusProps {
  communities: Community[];
  onSetFiltersAction: (filters: BeneficiariesFilters) => void;
}

const BeneficiariesFiltersViewPlus: FC<BeneficiariesFiltersViewPlusProps> = props => {
  const { communities, onSetFiltersAction } = props;
  const [openCollapse, setOpenCollapse] = useState<boolean>(false);
  const { filters, setFilter } = useBeneficiariesFilters();
  const { data: dataFamilies, refetch: refetchFamilies } = useQuery(GET_FAMILIES, {
    variables: {
      communityCode: filters.communityCode,
      familyName: filters.familyName,
      limit: 50
    }
  });

  useEffect(() => {
    refetchFamilies({ communityCode: filters.communityCode });
  }, [filters.communityCode, refetchFamilies]);

  return (
    <Card sx={{ my: '2em', width: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardHeader
        title='Filtros'
        action={
          <IconButton size='small' onClick={() => setOpenCollapse(!openCollapse)}>
            {openCollapse ? <ChevronUp sx={{ fontSize: '1.875rem' }} /> : <ChevronDown sx={{ fontSize: '1.875rem' }} />}
          </IconButton>
        }
      />
      <CardContent>
        <Collapse in={openCollapse}>
          <Grid container alignItems={'center'} justifyContent={'space-around'} columns={{ xs: 5, sm: 10, md: 17 }}>
            <Grid item xs={2} sm={3} md={4}>
              <TextField
                select
                fullWidth={true}
                variant='standard'
                label='Comunidad'
                value={filters.communityCode}
                onChange={e => setFilter('communityCode', e.target.value)}
              >
                <MenuItem value=''>Todas</MenuItem>
                {communities?.map(community => (
                  <MenuItem value={community.id} key={community.id}>
                    {community.id + ' - ' + community.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={2} sm={3} md={4}>
              <TextField
                select
                fullWidth={true}
                variant='standard'
                label='Familia'
                value={filters.familyId}
                onChange={e => setFilter('familyId', e.target.value)}
              >
                <MenuItem value=''>Todas</MenuItem>
                {dataFamilies?.filteredFamilies?.nodes?.map((family: Family) => (
                  <MenuItem value={family.id} key={family.id}>
                    {family.id + ' - ' + family.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={2} sm={3} md={4}>
              <TextField
                fullWidth={true}
                variant='standard'
                label='Edad Mínima'
                value={filters.ageStart}
                onChange={e => setFilter('ageStart', e.target.value)}
              />
            </Grid>
            <Grid xs={2} sm={3} md={4}>
              <TextField
                fullWidth={true}
                variant='standard'
                label='Edad Máxima'
                value={filters.ageEnd}
                onChange={e => setFilter('ageEnd', e.target.value)}
              />
            </Grid>
            <Grid item xs={2} sm={3} md={4}>
              <TextField
                fullWidth={true}
                variant='standard'
                label='DNI'
                value={filters.dniStarts}
                onChange={e => setFilter('dniStarts', e.target.value)}
              />
            </Grid>
            <Grid item xs={2} sm={3} md={4}>
              <TextField
                fullWidth={true}
                variant='standard'
                label='Nombre'
                value={filters.firstName}
                onChange={e => setFilter('firstName', e.target.value)}
              />
            </Grid>
            <Grid item xs={2} sm={3} md={4}>
              <TextField
                select
                fullWidth={true}
                variant='standard'
                label='Tipo'
                value={filters.type}
                onChange={e => setFilter('type', e.target.value)}
              >
                <MenuItem value=''>Todas</MenuItem>
                {Object.entries(BENEFICIARY_TYPES).map(entry => {
                  const [typeEnglish, typeSpanish] = entry;

                  return (
                    <MenuItem value={typeEnglish} key={typeEnglish}>
                      {typeSpanish}
                    </MenuItem>
                  );
                })}
              </TextField>
            </Grid>
            <Grid item xs={2} sm={3} md={4}>
              <TextField
                fullWidth={true}
                variant='standard'
                label='Apellido'
                value={filters.lastName}
                onChange={e => setFilter('lastName', e.target.value)}
              />
            </Grid>
            <Grid item xs={2} sm={3} md={4}>
              <TextField
                fullWidth={true}
                variant='standard'
                label='Escuela'
                value={filters.school}
                onChange={e => setFilter('school', e.target.value)}
              />
            </Grid>
            <Grid item xs={2} sm={3} md={4}>
              <TextField
                select
                fullWidth={true}
                variant='standard'
                label='Género'
                value={filters.gender}
                onChange={e => setFilter('gender', e.target.value)}
              >
                <MenuItem value=''>Sin Preferencia</MenuItem>
                {Object.entries(GENDERS).map(entry => {
                  const [genderEnglish, genderSpanish] = entry;

                  return (
                    <MenuItem value={genderEnglish} key={genderEnglish}>
                      {genderSpanish}
                    </MenuItem>
                  );
                })}
              </TextField>
            </Grid>

            <Grid item display='flex' xs={2} sm={3} md={4}>
              <FormControlLabel
                sx={{ margin: 'auto' }}
                control={
                  <Switch
                    defaultChecked
                    onChange={e => setFilter('isActive', e.target.checked ? 'true' : 'false')}
                    checked={filters.isActive === 'true'}
                  />
                }
                label='Está activo'
              />
            </Grid>
            <Grid item xs={2} sm={3} md={4}>
              <Button sx={{ width: '100%' }} variant='contained' onClick={() => onSetFiltersAction(filters)}>
                Aplicar Filtros
              </Button>
            </Grid>
          </Grid>
        </Collapse>
      </CardContent>
    </Card>
  );
};

export default BeneficiariesFiltersViewPlus;
