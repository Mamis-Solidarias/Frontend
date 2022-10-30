import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';

import { FC, useState } from 'react';
import { updateFamily } from 'src/API/Beneficiaries/families_data';
import { Action } from 'src/types/Action';

interface UpdateFamilyProps {
  id: any;
  openDialog: boolean;
  handleClose: () => void;
  setAction: (action: Action) => void;
}

export const UpdateFamily: FC<UpdateFamilyProps> = props => {
  const { openDialog, handleClose, id, setAction } = props;
  const [address, setAddress] = useState<string>('');
  const [details, setDetails] = useState<string>('');
  const [name, setName] = useState<string>('');

  const resetFields = () => {
    setName('');
    setAddress('');
    setDetails('');
  };

  const handleSubmit = async () => {
    const addressToSend = !!address ? address : null;
    const detailsToSend = !!details ? details : null;
    const nameToSend = !!name ? name : null;
    try {
      await updateFamily(id, {
        address: addressToSend,
        details: detailsToSend,
        name: nameToSend
      });
      resetFields();
      setAction({
        complete: true,
        success: true,
        message: 'La familia ha sido modificada exitosamente',
        status: 200
      });
      handleClose();
    } catch (e) {
      setAction({
        complete: true,
        success: false,
        message: 'Ha ocurrido un error modificando la familia. Intente nuevamente más tarde',
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
      <DialogTitle sx={{ display: 'flex', justifyContent: 'center' }}>Editar Familia</DialogTitle>
      <DialogContent>
        <Box component='form' onSubmit={handleSubmit}>
          <TextField
            id='address'
            type='text'
            inputProps={{ pattern: '^.+$' }}
            label='Nuevo Nombre de Familia'
            placeholder='Paso de los Libres 428'
            value={name}
            onChange={e => {
              setName(e.target.value);
            }}
            fullWidth={true}
            variant='standard'
          />
          <TextField
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
            id='details'
            type='text'
            inputProps={{ pattern: ' .+' }}
            label='Nuevos Detalles'
            placeholder='Viven cerca del río'
            value={details}
            onChange={e => {
              setDetails(e.target.value);
            }}
            fullWidth={true}
            variant='standard'
          />
          <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly'}}>
            <Button
                sx={{display: 'flex', justifyContent: 'center', margin: '1%', width: '100%'}}
                variant='outlined'
                onClick={() => {handleClose(); resetFields();}}
            >
              Cancelar
            </Button>
          <Button
            type='submit'
            sx={{ display: 'flex', justifyContent: 'center',margin: '1%',  width: '100%' }}
            variant='contained'
            onClick={handleSubmit}
            disabled={!details && !address && !name}
          >
            Editar
          </Button>
          </div>
        </Box>
      </DialogContent>
    </Dialog>
  );
};
