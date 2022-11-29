import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import {FC} from 'react';

interface ConfirmActionProps {
  action: () => void;
  openDialog: boolean;
  handleClose: () => void;
}

export const ConfirmActionDialog: FC<ConfirmActionProps> = props => {
  const {action, openDialog, handleClose} = props;

  return (
    <Dialog open={openDialog} onClose={() => handleClose()} maxWidth='lg'>
      <DialogTitle sx={{display: 'flex', justifyContent: 'center'}}>Confirmación de Acción Destructiva</DialogTitle>
      <DialogContent>
        <Box>¿Realmente deseas realizar esta operación?</Box>
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around'}}>
          <Button onClick={action} variant={"contained"}>Si</Button>
          <Button onClick={handleClose} variant={"contained"}>No</Button>
        </Box>
      </DialogContent>
    </Dialog>
  )
};
