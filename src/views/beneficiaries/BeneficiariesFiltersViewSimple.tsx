import React, { FC, useEffect, useState } from 'react';

// ** MUI Imports
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';

import {GENDERS_REDUCED} from "src/types/beneficiaries/Genders";
import {BENEFICIARY_TYPES_REDUCED} from "src/types/beneficiaries/BeneficiaryTypes";
import { Button, Card, CardContent, Collapse, IconButton } from '@mui/material';
import { ChevronDown, ChevronUp } from 'mdi-material-ui';
import CardHeader from '@mui/material/CardHeader';
import { useBeneficiariesFilters } from 'src/hooks/beneficiaries/useBeneficiariesFilters';
import { BeneficiariesFilters } from 'src/types/beneficiaries/BeneficiariesFilters';
import Box from '@mui/material/Box';
import { useQuery } from '@apollo/client';
import { GET_FAMILIES } from '../../API/Beneficiaries/beneficiaries_grapql';
import Family from '../../types/beneficiaries/Family';

interface BeneficiariesFiltersViewSimpleProps {
  onSetFiltersAction: (filters: BeneficiariesFilters) => void;
  communityId: string;
}

const BeneficiariesFiltersView: FC<BeneficiariesFiltersViewSimpleProps> = props => {
  const { onSetFiltersAction, communityId } = props;
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
    if (!!communityId) {
      setFilter('communityCode', communityId);
      setFilter('communityId', communityId);
      refetchFamilies({ communityCode: filters.communityId, familyName: filters.familyName });
    }
  }, [communityId, filters.communityId, filters.familyName, refetchFamilies, setFilter]);

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
          <Box display={'flex'} flexDirection={'row'} margin={'.25em'}>
            <p>
              <TextField
                select
                sx={{ margin: '.25em' }}
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
              <TextField
                sx={{ margin: '.25em' }}
                variant='standard'
                label='Edad Mínima'
                value={filters.ageStart}
                onChange={e => setFilter('ageStart', e.target.value)}
              />
              <TextField
                sx={{ margin: '.25em' }}
                variant='standard'
                label='Edad Máxima'
                value={filters.ageEnd}
                onChange={e => setFilter('ageEnd', e.target.value)}
              />
            </p>
            <p>
              <TextField
                sx={{ margin: '.25em' }}
                variant='standard'
                label='DNI'
                value={filters.dniStarts}
                onChange={e => setFilter('dniStarts', e.target.value)}
              />
              <TextField
                sx={{ margin: '.25em' }}
                variant='standard'
                label='Nombre'
                value={filters.firstName}
                onChange={e => setFilter('firstName', e.target.value)}
              />
              <TextField
                select
                sx={{ margin: '.25em' }}
                variant='standard'
                label='Tipo'
                value={filters.type}
                onChange={e => setFilter('type', e.target.value)}
              >
                <MenuItem value=''>Todas</MenuItem>
                {Object.entries(BENEFICIARY_TYPES_REDUCED).map(entry => {
                  const [typeEnglish, typeSpanish] = entry;

                  return (
                    <MenuItem value={typeEnglish} key={typeEnglish}>
                      {typeSpanish}
                    </MenuItem>
                  );
                })}
              </TextField>
            </p>
            <p>
              <TextField
                sx={{ margin: '.25em' }}
                variant='standard'
                label='Apellido'
                value={filters.lastName}
                onChange={e => setFilter('lastName', e.target.value)}
              />
              <TextField
                sx={{ margin: '.25em' }}
                variant='standard'
                label='Escuela'
                value={filters.school}
                onChange={e => setFilter('school', e.target.value)}
              />
              <TextField
                select
                sx={{ margin: '.25em' }}
                variant='standard'
                label='Género'
                value={filters.gender}
                onChange={e => setFilter('gender', e.target.value)}
              >
                <MenuItem value=''>Sin Preferencia</MenuItem>
                {Object.entries(GENDERS_REDUCED)
                  .filter(entry => /^[A-Z]+$/.test(entry[0]))
                  .map(entry => {
                    const [genderEnglish, genderSpanish] = entry;

                    return (
                      <MenuItem value={genderEnglish} key={genderEnglish}>
                        {genderSpanish}
                      </MenuItem>
                    );
                  })}
                `
              </TextField>
            </p>
          </Box>
          <Button sx={{ width: '100%' }} variant='contained' onClick={() => onSetFiltersAction(filters)}>
            Importar
          </Button>
        </Collapse>
      </CardContent>
    </Card>
  );
};

export default BeneficiariesFiltersView;
