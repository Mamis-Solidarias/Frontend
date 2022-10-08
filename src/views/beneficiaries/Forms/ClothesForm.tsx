import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import { FC } from 'react';
import Typography from '@mui/material/Typography';
import { CreateBeneficiaryFields } from 'src/hooks/beneficiaries/useCreateBeneficiaryFields';
import { CreateBeneficiaryExtras } from 'src/hooks/beneficiaries/useCreateBeneficiaryExtras';

interface ClothesFormProps {
  beneficiaryFields: CreateBeneficiaryFields;
  setBeneficiaryField: (key: keyof CreateBeneficiaryFields, value: any) => void;
  setBeneficiaryExtra: (key: keyof CreateBeneficiaryExtras, value: any) => void;
}

export const ClothesForm: FC<ClothesFormProps> = props => {
  const { beneficiaryFields, setBeneficiaryField, setBeneficiaryExtra } = props;

  return (
    <>
      <Typography>Ropa</Typography>
      <TextField
        style={{ padding: '1em' }}
        type='text'
        label='Talle de Calzado'
        placeholder='42'
        value={beneficiaryFields.shoeSize}
        onChange={e => setBeneficiaryField('shoeSize', e.target.value)}
        fullWidth={true}
        variant='standard'
      />
      <TextField
        style={{ padding: '1em' }}
        type='text'
        label='Talle de Remera'
        placeholder='L'
        value={beneficiaryFields.shirtSize}
        onChange={e => {
          setBeneficiaryField('shirtSize', e.target.value);
        }}
        fullWidth={true}
        variant='standard'
      />
      <TextField
        style={{ padding: '1em' }}
        type='text'
        label='Talle de Pantalones'
        placeholder='42'
        value={beneficiaryFields.pantsSize}
        onChange={e => {
          setBeneficiaryField('pantsSize', e.target.value);
        }}
        fullWidth={true}
        variant='standard'
      />
      <Button
        sx={{ display: 'flex', justifyContent: 'center', width: '100%', my: '1em' }}
        variant='contained'
        color='warning'
        onClick={() => {
          setBeneficiaryField('shoeSize', '');
          setBeneficiaryField('pantsSize', '');
          setBeneficiaryField('shirtSize', '');
          setBeneficiaryExtra('addClothes', false);
        }}
      >
        Borrar Ropa
      </Button>
    </>
  );
};
