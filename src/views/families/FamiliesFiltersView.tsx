import React, { FC } from 'react';

// ** MUI Imports
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Community from 'src/types/Community';
import TextField from '@mui/material/TextField';

import { BeneficiariesFilters } from 'src/types/BeneficiariesFilters';

interface FamiliesFiltersViewProps {
  communities: Community[];
  filters: BeneficiariesFilters;
  setFilter: (field: keyof BeneficiariesFilters, value: any) => void;
}

const FamiliesFiltersView: FC<FamiliesFiltersViewProps> = props => {
  const { communities, filters, setFilter } = props;

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
          fullWidth={true}
          variant='standard'
          label='Nombre de Familia'
          value={filters.familyName}
          onChange={e => setFilter('familyName', e.target.value)}
        />
      </Box>
    </Box>
  );
};

export default FamiliesFiltersView;
