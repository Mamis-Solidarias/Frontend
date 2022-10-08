import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import { FC } from 'react';
import Typography from '@mui/material/Typography';
import { CreateBeneficiaryFields } from 'src/hooks/beneficiaries/useCreateBeneficiaryFields';
import { CreateBeneficiaryExtras } from 'src/hooks/beneficiaries/useCreateBeneficiaryExtras';

interface JobFormProps {
  beneficiaryFields: CreateBeneficiaryFields;
  setBeneficiaryField: (key: keyof CreateBeneficiaryFields, value: any) => void;
  setBeneficiaryExtra: (key: keyof CreateBeneficiaryExtras, value: any) => void;
}

export const JobForm: FC<JobFormProps> = props => {
  const { beneficiaryFields, setBeneficiaryField, setBeneficiaryExtra } = props;

  return (
    <>
      <Typography>Trabajo</Typography>
      <TextField
        style={{ padding: '1em' }}
        type='text'
        label='Título'
        placeholder='Albañil'
        value={beneficiaryFields.title}
        onChange={e => setBeneficiaryField('title', e.target.value)}
        fullWidth={true}
        variant='standard'
      />
      <Button
        sx={{ display: 'flex', justifyContent: 'center', width: '100%', my: '1em' }}
        variant='contained'
        color='warning'
        onClick={() => {
          setBeneficiaryField('title', '');
          setBeneficiaryExtra('addJob', false);
        }}
      >
        Borrar Trabajo
      </Button>
    </>
  );
};
