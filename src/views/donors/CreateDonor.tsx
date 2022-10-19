import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';

import { FC, useState } from 'react';
import { createDonor } from 'src/API/Donors/donors_data';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

interface CreateDonorProps {
  openDialog: boolean;
  handleClose: () => void;
}

export const CreateDonor: FC<CreateDonorProps> = props => {
  const { openDialog, handleClose } = props;
  const [isGodFather, setIsGodFather] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');

  const resetFields = () => {
    setIsGodFather(false);
    setName('');
    setEmail('');
    setPhone('');
  };

  const resetAllFields = () => {
    resetFields();
  };

  return (
    <Dialog
      open={openDialog}
      onClose={() => {
        resetAllFields();
        handleClose();
      }}
      maxWidth='lg'
    >
      <DialogTitle sx={{ display: 'flex', justifyContent: 'center' }}>Crear Donante</DialogTitle>
      <DialogContent>
        <Box>
          <TextField
            id='name'
            type='text'
            inputProps={{ pattern: '^.+$' }}
            label='Nombre'
            placeholder='Pedro Mendoza'
            value={name}
            onChange={(e: any) => {
              setName(e.target.value);
            }}
            fullWidth={true}
            variant='standard'
          />
          <TextField
            id='email'
            type='text'
            inputProps={{ pattern: '^.+$' }}
            label='Email'
            placeholder='pmendoza@gmail.com'
            value={email}
            onChange={(e: any) => {
              setEmail(e.target.value);
            }}
            fullWidth={true}
            variant='standard'
          />
          <TextField
            id='phone'
            type='text'
            inputProps={{ pattern: '^.+$' }}
            label='Teléfono'
            placeholder='+5492995077824'
            value={phone}
            onChange={(e: any) => {
              setPhone(e.target.value);
            }}
            fullWidth={true}
            variant='standard'
          />
          <Stack direction='row' spacing={1} alignItems='center'>
            <Typography>No es padrino</Typography>
            <Switch onChange={(e: any) => setIsGodFather(e.target.checked)} checked={isGodFather} />
            <Typography>Es padrino</Typography>
          </Stack>
        </Box>
        <Button
          sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}
          variant='contained'
          onClick={async () => {
            await createDonor({ name, email, phone, isGodFather });
            resetAllFields();
            handleClose();
          }}
          disabled={!name || (!phone && !email)}
        >
          Crear
        </Button>
      </DialogContent>
    </Dialog>
  );
};
