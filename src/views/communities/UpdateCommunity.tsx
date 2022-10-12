import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';

import { FC, useState } from 'react';
import { updateCommunity } from 'src/API/Beneficiaries/communities_data';

interface UpdateCommunityProps {
  id: any;
  openDialog: boolean;
  handleClose: () => void;
}

export const UpdateCommunity: FC<UpdateCommunityProps> = props => {
  const { openDialog, handleClose, id } = props;
  const [address, setAddress] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  const resetFields = () => {
    setAddress('');
    setDescription('');
  };

  const handleSubmit = async () => {
    const addressToSend = !!address ? address : null;
    const descriptionToSend = !!description ? description : null;
    await updateCommunity(id, { address: addressToSend, description: descriptionToSend });
    resetFields();
    handleClose();
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
            style={{ padding: '1em' }}
            id='address'
            type='text'
            inputProps={{ pattern: '^.+$' }}
            label='Nueva Dirección'
            placeholder='Paso de los Libres 428'
            value={address}
            onChange={e => {
              setAddress(e.target.value);
            }}
            fullWidth={true}
            variant='standard'
          />
          <TextField
            sx={{ padding: '1em' }}
            id='description'
            type='text'
            inputProps={{ pattern: ' .+' }}
            label='Descripción'
            placeholder='Es un lindo pueblo'
            value={description}
            onChange={e => {
              setDescription(e.target.value);
            }}
            fullWidth={true}
            variant='standard'
          />
          <Button
            type='submit'
            sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}
            variant='contained'
            onClick={handleSubmit}
            disabled={!description && !address}
          >
            Editar
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};
