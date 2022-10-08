import TextField from '@mui/material/TextField';

import { FC } from 'react';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { CreateBeneficiaryFields } from 'src/hooks/beneficiaries/useCreateBeneficiaryFields';

interface GeneralFormProps {
  beneficiaryFields: CreateBeneficiaryFields;
  setBeneficiaryField: (key: keyof CreateBeneficiaryFields, value: any) => void;
}

export const GeneralForm: FC<GeneralFormProps> = props => {
  const { beneficiaryFields, setBeneficiaryField } = props;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
      <Grid xs={5}>
        <TextField
          style={{ padding: '1em' }}
          id='firstName'
          type='text'
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
          style={{ padding: '1em', marginTop: '1em' }}
          id='birthday'
          type='date'
          label='Fecha de Nacimiento'
          InputLabelProps={{ shrink: true }}
          placeholder='23/04/1998'
          value={beneficiaryFields.birthday}
          onChange={e => {
            setBeneficiaryField('birthday', e.target.value);
          }}
          fullWidth={true}
          variant='standard'
        />
        <TextField
          sx={{ padding: '1em' }}
          id='comments'
          type='text'
          label='Comentarios'
          placeholder='Es buena gente'
          value={beneficiaryFields.comments}
          onChange={e => {
            setBeneficiaryField('comments', e.target.value);
          }}
          fullWidth={true}
          variant='standard'
        />
      </Grid>
      <Grid xs={5}>
        <TextField
          style={{ padding: '1em' }}
          id='lastName'
          type='text'
          inputProps={{ pattern: '[0-9]*$' }}
          label='Apellido'
          placeholder='Montoya'
          value={beneficiaryFields.lastName}
          onChange={e => {
            setBeneficiaryField('lastName', e.target.value);
          }}
          fullWidth={true}
          variant='standard'
        />
        <TextField
          select
          fullWidth={true}
          style={{ padding: '1em' }}
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
          style={{ padding: '1em' }}
          id='dni'
          type='text'
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
          style={{ padding: '1em' }}
          id='likes'
          type='text'
          label='Cosas que le gustan'
          placeholder='La familia de José'
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
