import React, { FC } from 'react';

// ** MUI Imports
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';

import { SCHOOL_CYCLES } from 'src/types/beneficiaries/SchoolYear';
import { CampaignsFilters } from 'src/types/campaigns/CampaignsFilters';

interface CampaignsFiltersViewProps {
  filters: CampaignsFilters;
  setFilter: (field: keyof CampaignsFilters, value: any) => void;
  children: any
}

const CampaignsFiltersView: FC<CampaignsFiltersViewProps> = props => {
  const { filters, setFilter, children } = props;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
      <Box sx={{ padding: '0.25em' }}>
        <TextField
          fullWidth={true}
          variant='standard'
          label='Nombre de Beneficiario'
          value={filters.beneficiaryName}
          onChange={e => setFilter('beneficiaryName', e.target.value)}
        />
      </Box>
      <Box sx={{ padding: '0.25em' }}>
        <TextField
          select
          fullWidth={true}
          variant='standard'
          label='Ciclo'
          value={filters.cycle}
          onChange={e => setFilter('cycle', e.target.value)}
        >
          {Object.entries(SCHOOL_CYCLES).map(entry => {
            const [cycleEnglish, cycleSpanish] = entry;

            return (
              <MenuItem value={cycleEnglish} key={cycleEnglish}>
                {cycleSpanish}
              </MenuItem>
            );
          })}
        </TextField>
      </Box>
      <Box sx={{ padding: '0.25em' }}>
        <TextField
          select
          fullWidth={true}
          variant='standard'
          label='Género'
          value={filters.gender}
          onChange={e => setFilter('gender', e.target.value)}
        >
          <MenuItem value='Male'>Masculino</MenuItem>
          <MenuItem value='Female'>Femenino</MenuItem>
          <MenuItem value='Other'>Otro</MenuItem>
        </TextField>
      </Box>
      <Box sx={{ padding: '0.25em' }}>
        <TextField
          fullWidth={true}
          variant='standard'
          label='Nombre de Padrino'
          value={filters.donorName}
          onChange={e => setFilter('donorName', e.target.value)}
        />
      </Box>
      {children}
    </Box>
  );
};

export default CampaignsFiltersView;
