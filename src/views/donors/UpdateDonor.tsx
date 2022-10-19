import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';

import { FC } from 'react';

interface UpdateDonorProps {
  id: any;
  openDialog: boolean;
  handleClose: () => void;
}

export const UpdateDonor: FC<UpdateDonorProps> = props => {
  const { openDialog, handleClose, id } = props;

  const resetFields = () => {
    console.log(id);
  };

  const handleSubmit = async () => {
    console.log(id);
  };

  return (
    <Dialog
      open={openDialog}
      onClose={() => {
        resetFields();
        handleClose();
      }}
    >
      <DialogTitle sx={{ display: 'flex', justifyContent: 'center' }}>Editar Usuario</DialogTitle>
      <DialogContent>
        <Box component='form' onSubmit={handleSubmit}>
          <TextField
            id='address'
            type='text'
            inputProps={{ pattern: '^.+$' }}
            label='Nuevo Nombre'
            placeholder='Paso de los Libres 428'
            onChange={() => {
              console.log(id);
            }}
            fullWidth={true}
            variant='standard'
          />
          <Button
            type='submit'
            sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}
            variant='contained'
            onClick={handleSubmit}
          >
            Editar
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};
