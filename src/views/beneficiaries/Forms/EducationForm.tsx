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
import { SCHOOL_YEARS } from 'src/types/SchoolYear';

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
        type='text'
        label='Escuela a la que va'
        placeholder='ITBA'
        value={beneficiaryFields.school}
        onChange={e => setBeneficiaryField('school', e.target.value)}
        sx={{ py: '1em' }}
        fullWidth={true}
        variant='standard'
      />
      <FormControl fullWidth sx={{ py: '1em' }}>
        <InputLabel id='schoolYear'>Año académico</InputLabel>
        <Select
          labelId='schoolYear'
          fullWidth={true}
          variant='standard'
          placeholder='Escuela Primaria, 1er Año'
          value={beneficiaryFields.year}
          defaultValue={'PRIMARY_SCHOOL1'}
          label='Año académico'
          onChange={e => {
            setBeneficiaryField('year', e.target.value === '' ? null : e.target.value);
          }}
        >
          {Object.entries(SCHOOL_YEARS).map(entry => {
            const [schoolYearEnglish, schoolYearSpanish] = entry;

            return (
              <MenuItem value={schoolYearEnglish} key={schoolYearEnglish}>
                {schoolYearSpanish}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
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
            setBeneficiaryField('transportationMethod', e.target.value === '' ? null : e.target.value);
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
          setBeneficiaryField('year', null);
          setBeneficiaryField('school', '');
          setBeneficiaryField('transportationMethod', null);
          setBeneficiaryExtra('addEducation', false);
        }}
      >
        Borrar Educación
      </Button>
    </>
  );
};
