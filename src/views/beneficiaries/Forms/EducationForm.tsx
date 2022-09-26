import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import { FC } from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';

interface EducationFormProps {
  year: string;
  setYear: (value: string) => void;
  school: string;
  setSchool: (value: string) => void;
  transportationMethod: string;
  setTransportationMethod: (value: string) => void;
  setAddEducation: (value: boolean) => void;
}

export const EducationForm: FC<EducationFormProps> = props => {
  const { year, setYear, school, setSchool, transportationMethod, setTransportationMethod, setAddEducation } = props;

  return (
    <>
      <Typography>Datos de Educación</Typography>
      <TextField
        style={{ padding: '1em' }}
        type='text'
        label='Escuela a la que va'
        placeholder='ITBA'
        value={school}
        onChange={e => setSchool(e.target.value)}
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
        value={year}
        onChange={e => {
          setYear(e.target.value);
        }}
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
          value={transportationMethod}
          defaultValue={'BIKE'}
          label='Método de Transporte'
          onChange={e => {
            setTransportationMethod(e.target.value);
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
          setYear('');
          setSchool('');
          setTransportationMethod('');
          setAddEducation(false);
        }}
      >
        Borrar Educación
      </Button>
    </>
  );
};
