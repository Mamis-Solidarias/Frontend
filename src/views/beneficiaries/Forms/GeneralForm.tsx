import TextField from '@mui/material/TextField';

import { FC, useEffect, useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { CreateBeneficiaryFields } from 'src/hooks/beneficiaries/useCreateBeneficiaryFields';
import Community from 'src/types/beneficiaries/Community';
import { getFamiliesByCommunity } from 'src/API/Beneficiaries/communities_data';
import Family from 'src/types/beneficiaries/Family';

interface GeneralFormProps {
  beneficiaryFields: CreateBeneficiaryFields;
  setBeneficiaryField: (key: keyof CreateBeneficiaryFields, value: any) => void;
  communities: Community[];
  setFamilyId?: (familyId: string) => void;
  startingCommunityInput?: string;
}

export const GeneralForm: FC<GeneralFormProps> = props => {
  const { beneficiaryFields, setBeneficiaryField, communities, setFamilyId, startingCommunityInput } = props;
  const [families, setFamilies] = useState<Family[]>([]);
  const [selectedCommunity, setSelectedCommunity] = useState<string>('');

  useEffect(() => {
    if (!!selectedCommunity) {
      setBeneficiaryField('familyId', '');
      getFamiliesByCommunity(selectedCommunity, 0, 100).then(result => {
        setFamilies(result.data.families);
      });
    } else {
      setFamilies([]);
      setBeneficiaryField('familyId', '');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCommunity]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
      <Grid xs={5}>
        {!startingCommunityInput && (
          <TextField
            select
            sx={{py: '.3em'}}
            fullWidth={true}
            variant='standard'
            label='Comunidad'
            placeholder='Misiones'
            value={selectedCommunity}
            onChange={e => setSelectedCommunity(e.target.value)}
          >
            <MenuItem value=''>Ninguna</MenuItem>
            {communities.map((community: Community) => (
              <MenuItem value={community.id} key={community.id}>
                {community.name}
              </MenuItem>
            ))}
          </TextField>
        )}
        <TextField
          id='firstName'
          type='text'
          sx={{py: '.3em'}}
          inputProps={{ pattern: '[0-9]*$' }}
          label='Nombre'
          placeholder='Juan García'
          value={beneficiaryFields.firstName}
          onChange={e => setBeneficiaryField('firstName', e.target.value)}
          fullWidth={true}
          variant='standard'
        />
        <TextField
          select
          fullWidth={true}
          sx={{py: '.3em'}}
          variant='standard'
          placeholder='Niño'
          id='typeSelector'
          value={beneficiaryFields.type}
          label='Tipo'
          onChange={e => setBeneficiaryField('type', e.target.value)}
        >
          <MenuItem value='Adult'>Adulto</MenuItem>
          <MenuItem value='Child'>Niño</MenuItem>
        </TextField>
        <TextField
          id='birthday'
          sx={{py: '.3em'}}
          type='date'
          label='Fecha de Nacimiento'
          InputLabelProps={{ shrink: true }}
          value={beneficiaryFields.birthday}
          onChange={e => {
            setBeneficiaryField('birthday', e.target.value);
          }}
          fullWidth={true}
          variant='standard'
        />
        <TextField
          id='comments'
          type='text'
          sx={{py: '.3em'}}
          label='Comentarios (opcional)'
          placeholder='Es buena gente'
          value={beneficiaryFields.comments}
          onChange={e => setBeneficiaryField('comments', e.target.value)}
          fullWidth={true}
          variant='standard'
        />
      </Grid>
      <Grid xs={5}>
        {!startingCommunityInput && (
          <TextField
            sx={{py: '.3em'}}
            select
            fullWidth={true}
            variant='standard'
            label='Familia'
            placeholder='Gómez'
            value={beneficiaryFields.familyId}
            onChange={e => {
              setBeneficiaryField('familyId', e.target.value);
              if (!!setFamilyId) {
                const family: Family|undefined = families.find((family) => family.id === e.target.value);
                setFamilyId(family?.id || e.target.value);
                setBeneficiaryField('lastName',family?.name || '');
              }
            }}
          >
            <MenuItem value=''>Ninguna</MenuItem>
            {families.map((family: Family) => (
              <MenuItem value={family.id} key={family.id}>
                {family.id + ' : ' +family.name}
              </MenuItem>
            ))}
          </TextField>
        )}
        <TextField
          id='lastName'
          type='text'
          sx={{py: '.3em'}}
          inputProps={{ pattern: '[0-9]*$' }}
          label='Apellido'
          placeholder='Montoya'
          value={beneficiaryFields.lastName}
          onChange={e => setBeneficiaryField('lastName', e.target.value)}
          fullWidth={true}
          variant='standard'
        />
        <TextField
          select
          sx={{py: '.3em'}}
          fullWidth={true}
          variant='standard'
          label='Género'
          placeholder='Masculino'
          value={beneficiaryFields.gender}
          onChange={e => setBeneficiaryField('gender', e.target.value)}
        >
          <MenuItem value='Male'>Masculino</MenuItem>
          <MenuItem value='Female'>Femenino</MenuItem>
          <MenuItem value='Other'>Otro</MenuItem>
        </TextField>
        <TextField
          id='dni'
          type='text'
          sx={{py: '.3em'}}
          label='DNI'
          placeholder='23456654'
          value={beneficiaryFields.dni}
          onChange={e => {
            setBeneficiaryField('dni', e.target.value);
          }}
          fullWidth={true}
          variant='standard'
        />
        <TextField
          id='likes'
          type='text'
          sx={{py: '.3em'}}
          label='Cosas que le gustan (opcional)'
          placeholder='El color azul'
          value={beneficiaryFields.likes}
          onChange={e => {
            setBeneficiaryField('likes', e.target.value);
          }}
          fullWidth={true}
          variant='standard'
        />
      </Grid>
    </Box>
  );
};
