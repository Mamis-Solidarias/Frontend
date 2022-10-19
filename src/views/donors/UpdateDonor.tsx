import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';

import { FC } from 'react';
import { createDonor } from 'src/API/Donors/donors_data';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { useModifyDonor } from 'src/hooks/donors/useModifyDonor';
import { Donor } from 'src/types/Donor';

interface UpdateDonorProps {
  donor: Donor | null;
  openDialog: boolean;
  handleClose: () => void;
}

export const UpdateDonor: FC<UpdateDonorProps> = props => {
  const { openDialog, handleClose, donor } = props;
  const { donor: donorNewValues, setDonor, setDonorField } = useModifyDonor(donor);

  const resetFields = () => {
    if (!!donor) {
      setDonor(donor);
    }
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
      <DialogTitle sx={{ display: 'flex', justifyContent: 'center' }}>Editar Donante</DialogTitle>
      <DialogContent>
        <Box>
          <TextField
            id='name'
            type='text'
            inputProps={{ pattern: '^.+$' }}
            label='Nombre'
            placeholder='Pedro Mendoza'
            value={donorNewValues.name}
            onChange={(e: any) => {
              setDonorField('name', e.target.value);
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
            value={donorNewValues.email}
            onChange={(e: any) => {
              setDonorField('email', e.target.value);
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
            value={donorNewValues.phone}
            onChange={(e: any) => {
              setDonorField('phone', e.target.value);
            }}
            fullWidth={true}
            variant='standard'
          />
          <Stack direction='row' spacing={1} alignItems='center'>
            <Typography>No es padrino</Typography>
            <Switch
              onChange={(e: any) => setDonorField('isGodFather', e.target.checked)}
              checked={donorNewValues.isGodFather}
            />
            <Typography>Es padrino</Typography>
          </Stack>
        </Box>
        <Button
          sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}
          variant='contained'
          onClick={async () => {
            await createDonor({
              name: donorNewValues.name,
              email: donorNewValues.email,
              phone: donorNewValues.phone,
              isGodFather: donorNewValues.isGodFather
            });
            resetAllFields();
            handleClose();
          }}
          disabled={!donorNewValues.name || (!donorNewValues.phone && !donorNewValues.email)}
        >
          Editar
        </Button>
      </DialogContent>
    </Dialog>
  );
};
