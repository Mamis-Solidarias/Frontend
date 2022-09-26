import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import { FC } from 'react';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import InputLabel from '@mui/material/InputLabel';

interface HealthFormProps {
  observations: string;
  setObservations: (value: string) => void;
  hasCovidVaccine: boolean;
  setHasCovidVaccine: (value: boolean) => void;
  hasMandatoryVaccines: boolean;
  setHasMandatoryVaccines: (value: boolean) => void;
  setAddHealth: (value: boolean) => void;
}

export const HealthForm: FC<HealthFormProps> = props => {
  const {
    observations,
    setObservations,
    hasCovidVaccine,
    setHasCovidVaccine,
    hasMandatoryVaccines,
    setHasMandatoryVaccines,
    setAddHealth
  } = props;

  return (
    <>
      <Typography>Datos de Salud</Typography>
      <InputLabel>¿Tiene Vacuna COVID?</InputLabel>
      <Stack direction='row' spacing={1} alignItems='center'>
        <Typography>Sí</Typography>
        <Switch onChange={e => setHasCovidVaccine(e.target.checked)} checked={hasCovidVaccine} />
        <Typography>No</Typography>
      </Stack>
      <InputLabel>¿Tiene Vacunas Mandatorias?</InputLabel>
      <Stack direction='row' spacing={1} alignItems='center'>
        <Typography>Sí</Typography>
        <Switch onChange={e => setHasMandatoryVaccines(e.target.checked)} checked={hasMandatoryVaccines} />
        <Typography>No</Typography>
      </Stack>
      <TextField
        style={{ padding: '1em' }}
        type='text'
        label='Observaciones'
        placeholder='Tiene diabetes tipo 2'
        value={observations}
        onChange={e => {
          setObservations(e.target.value);
        }}
        fullWidth={true}
        variant='standard'
      />
      <Button
        sx={{ display: 'flex', justifyContent: 'center', width: '100%', my: '1em' }}
        variant='contained'
        color='warning'
        onClick={() => {
          setHasMandatoryVaccines(false);
          setHasCovidVaccine(false);
          setObservations('');
          setAddHealth(false);
        }}
      >
        Borrar Salud
      </Button>
    </>
  );
};
