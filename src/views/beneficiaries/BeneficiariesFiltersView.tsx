import React, { FC } from 'react';

// ** MUI Imports
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Family from 'src/types/Family';
import Community from 'src/types/Community';
import TextField from '@mui/material/TextField';

import { BeneficiariesFilters } from 'src/types/BeneficiariesFilters';
import GENDERS from 'src/types/Genders';
import BENEFICIARY_TYPES from 'src/types/BeneficiaryTypes';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

interface BeneficiariesFiltersViewProps {
  communities: Community[];
  families: Family[];
  filters: BeneficiariesFilters;
  setFilter: (field: keyof BeneficiariesFilters, value: any) => void;
}

const BeneficiariesFiltersView: FC<BeneficiariesFiltersViewProps> = props => {
  const { communities, filters, setFilter, families } = props;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
      <Box sx={{ padding: '1em' }}>
        <TextField
          select
          fullWidth={true}
          variant='standard'
          label='Comunidad'
          value={filters.communityCode}
          onChange={e => setFilter('communityCode', e.target.value)}
        >
          <MenuItem value=''>Todas</MenuItem>
          {communities.map(community => (
            <MenuItem value={community.id} key={community.id}>
              {community.id + ' - ' + community.name}
            </MenuItem>
          ))}
        </TextField>
      </Box>
      <Box sx={{ padding: '1em' }}>
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
      </Box>
      <Box sx={{ padding: '1em' }}>
        <TextField
          fullWidth={true}
          variant='standard'
          label='Edad Mínima'
          value={filters.ageStart}
          onChange={e => setFilter('ageStart', e.target.value)}
        />
      </Box>
      <Box sx={{ padding: '1em' }}>
        <TextField
          fullWidth={true}
          variant='standard'
          label='Edad Máxima'
          value={filters.ageEnd}
          onChange={e => setFilter('ageEnd', e.target.value)}
        />
      </Box>
      <Box sx={{ padding: '1em' }}>
        <TextField
          fullWidth={true}
          variant='standard'
          label='DNI'
          value={filters.dniStarts}
          onChange={e => setFilter('dniStarts', e.target.value)}
        />
      </Box>
      <Box sx={{ padding: '1em' }}>
        <TextField
          fullWidth={true}
          variant='standard'
          label='Nombre'
          value={filters.firstName}
          onChange={e => setFilter('firstName', e.target.value)}
        />
      </Box>
      <Box sx={{ padding: '1em' }}>
        <TextField
          fullWidth={true}
          variant='standard'
          label='Apellido'
          value={filters.lastName}
          onChange={e => setFilter('lastName', e.target.value)}
        />
      </Box>
      <Box sx={{ padding: '1em' }}>
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
      </Box>
      <Box sx={{ padding: '1em' }}>
        <TextField
          fullWidth={true}
          variant='standard'
          label='Escuela'
          value={filters.school}
          onChange={e => setFilter('school', e.target.value)}
        />
      </Box>
      <Box sx={{ padding: '1em' }}>
        <TextField
          select
          fullWidth={true}
          variant='standard'
          label='Género'
          value={filters.gender}
          onChange={e => setFilter('gender', e.target.value)}
        >
          {Object.entries(GENDERS).map(entry => {
            const [genderEnglish, genderSpanish] = entry;

            return (
              <MenuItem value={genderEnglish} key={genderEnglish}>
                {genderSpanish}
              </MenuItem>
            );
          })}
        </TextField>
      </Box>
      <Box sx={{ padding: '1em' }}>
        <FormControlLabel
          label='Está activo'
          labelPlacement='bottom'
          control={
            <Checkbox
              checked={filters.isActive === 'true'}
              onChange={e => {
                setFilter('isActive', e.target.checked ? 'true' : 'false');
              }}
            />
          }
        />
      </Box>
    </Box>
  );
};

export default BeneficiariesFiltersView;
