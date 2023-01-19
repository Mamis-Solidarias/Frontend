import React, { FC, useEffect, useState } from 'react';

// ** MUI Imports
import MenuItem from '@mui/material/MenuItem';
import Family from 'src/types/beneficiaries/Family';
import TextField from '@mui/material/TextField';

import GENDERS from 'src/types/beneficiaries/Genders';
import BENEFICIARY_TYPES from 'src/types/beneficiaries/BeneficiaryTypes';
import { Button, Card, CardContent, Collapse, Grid, IconButton } from '@mui/material';
import { ChevronDown, ChevronUp } from 'mdi-material-ui';
import CardHeader from '@mui/material/CardHeader';
import { useBeneficiariesFilters } from 'src/hooks/beneficiaries/useBeneficiariesFilters';
import { getFamiliesByCommunity } from 'src/API/Beneficiaries/communities_data';
import { BeneficiariesFilters } from 'src/types/beneficiaries/BeneficiariesFilters';

interface BeneficiariesFiltersViewSimpleProps {
  onSetFiltersAction: (filters: BeneficiariesFilters) => void;
  communityId: string;
  onNetworkError: (error: any) => void;
}

const BeneficiariesFiltersView: FC<BeneficiariesFiltersViewSimpleProps> = props => {
  const { onSetFiltersAction, onNetworkError, communityId } = props;
  const [openCollapse, setOpenCollapse] = useState<boolean>(false);
  const [families, setFamilies] = useState<Family[]>([]);

  const { filters, setFilter } = useBeneficiariesFilters();

  useEffect(() => {
    if (!!communityId) {
      getFamiliesByCommunity(communityId, 0, 100)
        .then(result => {
          setFamilies(result.data.families);
        })
        .catch(onNetworkError);
    }
  }, []);

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
                label='Familia'
                value={filters.familyId}
                onChange={e => setFilter('familyId', e.target.value)}
              >
                <MenuItem value=''>Todas</MenuItem>
                {families.map(family => (
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
            <Grid item xs={2} sm={3} md={4}>
              <Button sx={{ width: '100%' }} variant='contained' onClick={() => onSetFiltersAction(filters)}>
                Importar
              </Button>
            </Grid>
          </Grid>
        </Collapse>
      </CardContent>
    </Card>
  );
};

export default BeneficiariesFiltersView;
