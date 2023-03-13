import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import { FC } from 'react';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import InputLabel from '@mui/material/InputLabel';
import { CreateBeneficiaryFields } from 'src/hooks/beneficiaries/useCreateBeneficiaryFields';
import { CreateBeneficiaryExtras } from 'src/hooks/beneficiaries/useCreateBeneficiaryExtras';

interface HealthFormProps {
  beneficiaryFields: CreateBeneficiaryFields;
  setBeneficiaryField: (key: keyof CreateBeneficiaryFields, value: any) => void;
  setBeneficiaryExtra: (key: keyof CreateBeneficiaryExtras, value: any) => void;
}

export const HealthForm: FC<HealthFormProps> = props => {
  const { beneficiaryFields, setBeneficiaryField, setBeneficiaryExtra } = props;

  return (
    <>
      <Typography sx={{ textDecoration: 'underline', paddingTop: '.5em' }}>Salud</Typography>
      <InputLabel>¿Tiene Vacuna COVID?</InputLabel>
      <Stack direction='row' spacing={1} alignItems='center' sx={{ py: '.3em' }}>
        <Typography>No</Typography>
        <Switch
          onChange={e => setBeneficiaryField('hasCovidVaccine', e.target.checked)}
          checked={beneficiaryFields.hasCovidVaccine}
        />
        <Typography>Sí</Typography>
      </Stack>
      <InputLabel>¿Tiene Vacunas Mandatorias?</InputLabel>
      <Stack direction='row' spacing={1} alignItems='center' sx={{ py: '.3em' }}>
        <Typography>No</Typography>
        <Switch
          onChange={e => setBeneficiaryField('hasMandatoryVaccines', e.target.checked)}
          checked={beneficiaryFields.hasMandatoryVaccines}
        />
        <Typography>Sí</Typography>
      </Stack>
      <TextField
        type='text'
        sx={{ py: '.3em' }}
        label='Observaciones'
        placeholder='Tiene diabetes tipo 2'
        value={beneficiaryFields.observations}
        onChange={e => setBeneficiaryField('observations', e.target.value)}
        fullWidth={true}
        variant='standard'
      />
      <Button
        sx={{ display: 'flex', justifyContent: 'center', width: '100%', my: '1em' }}
        variant='contained'
        color='warning'
        onClick={() => {
          setBeneficiaryField('hasCovidVaccine', false);
          setBeneficiaryField('hasMandatoryVaccines', false);
          setBeneficiaryField('observations', '');
          setBeneficiaryExtra('addHealth', false);
        }}
      >
        Borrar Salud
      </Button>
    </>
  );
};
