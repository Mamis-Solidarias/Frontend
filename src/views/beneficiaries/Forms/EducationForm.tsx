import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import { FC } from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import { CreateBeneficiaryFields } from 'src/hooks/beneficiaries/useCreateBeneficiaryFields';
import { CreateBeneficiaryExtras } from 'src/hooks/beneficiaries/useCreateBeneficiaryExtras';

interface EducationFormProps {
  beneficiaryFields: CreateBeneficiaryFields;
  setBeneficiaryField: (key: keyof CreateBeneficiaryFields, value: any) => void;
  setBeneficiaryExtra: (key: keyof CreateBeneficiaryExtras, value: any) => void;
}

export const EducationForm: FC<EducationFormProps> = props => {
  const { beneficiaryFields, setBeneficiaryField, setBeneficiaryExtra } = props;

  return (
    <>
      <Typography>Educación</Typography>
      <TextField
        style={{ padding: '1em' }}
        type='text'
        label='Escuela a la que va'
        placeholder='ITBA'
        value={beneficiaryFields.school}
        onChange={e => setBeneficiaryField('school', e.target.value)}
        fullWidth={true}
        variant='standard'
      />
      <TextField
        style={{ padding: '1em' }}
        type='text'
        label='Año lectivo'
        placeholder='2do Año'
        inputProps={{
          pattern: '^(3[0-1]|2[[0-9]|1[0-9]|0{0,1}[1-9])/([1-9]|1[0-2])/(19[2-9][0-9]|20[0-9][0-9])$'
        }}
        value={beneficiaryFields.year}
        onChange={e => setBeneficiaryField('year', e.target.value)}
        fullWidth={true}
        variant='standard'
      />
      <FormControl fullWidth sx={{ py: '1em' }}>
        <InputLabel id='transportation'>Método de Transporte</InputLabel>
        <Select
          labelId='transportation'
          fullWidth={true}
          variant='standard'
          placeholder='Caminando'
          value={beneficiaryFields.transportationMethod}
          defaultValue={'BIKE'}
          label='Método de Transporte'
          onChange={e => {
            setBeneficiaryField('transportationMethod', e.target.value);
          }}
        >
          <MenuItem value='' hidden={true}></MenuItem>
          <MenuItem value='Bike'>Bicicleta</MenuItem>
          <MenuItem value='Car'>Auto</MenuItem>
          <MenuItem value='Horse'>Caballo</MenuItem>
          <MenuItem value='PublicTransport'>Transporte Público</MenuItem>
          <MenuItem value='Walking'>Caminando</MenuItem>
          <MenuItem value='Other'>Otro</MenuItem>
        </Select>
      </FormControl>
      <Button
        sx={{ display: 'flex', justifyContent: 'center', width: '100%', my: '1em' }}
        variant='contained'
        color='warning'
        onClick={() => {
          setBeneficiaryField('year', '');
          setBeneficiaryField('school', '');
          setBeneficiaryField('transportationMethod', '');
          setBeneficiaryExtra('addEducation', false);
        }}
      >
        Borrar Educación
      </Button>
    </>
  );
};
