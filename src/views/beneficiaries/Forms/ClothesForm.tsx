import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import { FC } from 'react';
import Typography from '@mui/material/Typography';

interface ClothesFormProps {
  shoeSize: string;
  setShoeSize: (value: string) => void;
  pantsSize: string;
  setPantsSize: (value: string) => void;
  shirtSize: string;
  setShirtSize: (value: string) => void;
  setAddClothes: (value: boolean) => void;
}

export const ClothesForm: FC<ClothesFormProps> = props => {
  const { shoeSize, setShoeSize, pantsSize, setPantsSize, shirtSize, setShirtSize, setAddClothes } = props;

  return (
    <>
      <Typography>Datos de Ropa</Typography>
      <TextField
        style={{ padding: '1em' }}
        type='text'
        label='Talle de Calzado'
        placeholder='42'
        value={shoeSize}
        onChange={e => setShoeSize(e.target.value)}
        fullWidth={true}
        variant='standard'
      />
      <TextField
        style={{ padding: '1em' }}
        type='text'
        label='Talle de Remera'
        placeholder='L'
        value={shirtSize}
        onChange={e => {
          setShirtSize(e.target.value);
        }}
        fullWidth={true}
        variant='standard'
      />
      <TextField
        style={{ padding: '1em' }}
        type='text'
        label='Talle de Pantalones'
        placeholder='42'
        value={pantsSize}
        onChange={e => {
          setPantsSize(e.target.value);
        }}
        fullWidth={true}
        variant='standard'
      />
      <Button
        sx={{ display: 'flex', justifyContent: 'center', width: '100%', my: '1em' }}
        variant='contained'
        onClick={() => {
          setShoeSize('');
          setPantsSize('');
          setShirtSize('');
          setAddClothes(false);
        }}
      >
        Borrar Información de Ropa
      </Button>
    </>
  );
};
