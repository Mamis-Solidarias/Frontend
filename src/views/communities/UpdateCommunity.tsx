import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';

import { FC, useState } from 'react';
import { updateCommunity } from 'src/API/Beneficiaries/communities_data';
import { Action } from 'src/types/Action';

interface UpdateCommunityProps {
  id: any;
  openDialog: boolean;
  handleClose: () => void;
  setAction: (action: Action) => void;
}

export const UpdateCommunity: FC<UpdateCommunityProps> = props => {
  const { openDialog, handleClose, id, setAction } = props;
  const [address, setAddress] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  const resetFields = () => {
    setAddress('');
    setDescription('');
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const addressToSend = !!address ? address : null;
      const descriptionToSend = !!description ? description : null;
      await updateCommunity(id, { address: addressToSend, description: descriptionToSend });
      resetFields();
      setAction({
        complete: true,
        success: true,
        message: 'Comunidad modificada exitosamente',
        status: 201
      });
      handleClose();
    } catch (e) {
      setAction({
        complete: true,
        success: false,
        message: 'Ocurrió un error modificando la comunidad. Intente nuevamente más tarde',
        status: 400
      });
    }
  };

  return (
    <Dialog
      open={openDialog}
      onClose={() => {
        resetFields();
        handleClose();
      }}
    >
      <DialogTitle sx={{ display: 'flex', justifyContent: 'center' }}>Editar Comunidad</DialogTitle>
      <DialogContent>
        <Box component='form' onSubmit={handleSubmit}>
          <TextField
            id='address'
            type='text'
            sx={{ py: '.3em' }}
            inputProps={{ pattern: '^.+$' }}
            label='Dirección'
            placeholder='Paso de los Libres 428'
            value={address}
            onChange={e => {
              setAddress(e.target.value);
            }}
            fullWidth={true}
            variant='standard'
          />
          <TextField
            sx={{ py: '.3em' }}
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
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }}>
            <Button
              sx={{ display: 'flex', justifyContent: 'center', margin: '1%', width: '100%' }}
              variant='outlined'
              onClick={() => {
                handleClose();
                resetFields();
              }}
            >
              Cancelar
            </Button>
            <Button
              type='submit'
              sx={{ display: 'flex', justifyContent: 'center', margin: '1%', width: '100%' }}
              variant='contained'
              onClick={handleSubmit}
              disabled={!description && !address}
            >
              Editar
            </Button>
          </div>
        </Box>
      </DialogContent>
    </Dialog>
  );
};
