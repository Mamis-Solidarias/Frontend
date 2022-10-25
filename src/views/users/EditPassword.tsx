import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormHelperText from '@mui/material/FormHelperText';
import TextField from '@mui/material/TextField';

import { FC, useState } from 'react';
import { updateUserPassword } from 'src/API/Users/user_data';
import { Action } from 'src/types/Action';

interface EditPasswordProps {
  id: any;
  openDialog: boolean;
  handleClose: () => void;
  setAction: (action: Action) => void;
}

const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,50}$/;

export const EditPassword: FC<EditPasswordProps> = props => {
  const { openDialog, handleClose, id, setAction } = props;
  const [oldPassword, setOldPassword] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [invalidPassword, setInvalidPassword] = useState<boolean>(false);
  const [passwordMismatch, setPasswordMismatch] = useState<boolean>(false);

  const detectInvalidPassword = (password: string) => {
    if (passwordPattern.test(password)) {
      setInvalidPassword(false);
    } else {
      setInvalidPassword(true);
    }
  };

  const detectPasswordMismatch = (confirmPassword: string) => {
    if (password === confirmPassword) {
      setPasswordMismatch(false);
    } else {
      setPasswordMismatch(true);
    }
  };

  const detectConfirmPasswordMismatch = (password: string) => {
    if (password === confirmPassword) {
      setPasswordMismatch(false);
    } else {
      setPasswordMismatch(true);
    }
  };

  const resetFields = () => {
    setPassword('');
    setConfirmPassword('');
    setInvalidPassword(false);
    setPasswordMismatch(false);
  };

  const handleSubmit = async () => {
    try {
      await updateUserPassword(id, { oldPassword, newPassword: password });
      setAction({
        complete: true,
        success: true,
        message: 'Contraseña modificada exitosamente',
        status: 200
      });
      resetFields();
      handleClose();
    } catch (err) {
      setAction({
        complete: true,
        success: false,
        message: 'Ha ocurrido un error actualizando la contraseña',
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
      <DialogTitle sx={{ display: 'flex', justifyContent: 'center' }}>Reemplazar Contraseña</DialogTitle>
      <DialogContent>
        <Box component='form' onSubmit={handleSubmit}>
          <TextField
            id='oldPassword'
            type='password'
            label='Contraseña Anterior'
            placeholder='*********'
            value={oldPassword}
            onChange={e => {
              setOldPassword(e.target.value);
            }}
            fullWidth={true}
            variant='standard'
          />
          <TextField
            error={invalidPassword}
            id='password'
            type='password'
            label='Nueva Contraseña'
            placeholder='*********'
            value={password}
            onChange={e => {
              setPassword(e.target.value);
              detectInvalidPassword(e.target.value);
              detectConfirmPasswordMismatch(e.target.value);
            }}
            fullWidth={true}
            variant='standard'
          />
          {invalidPassword && (
            <FormHelperText error>
              La contraseña es inválida, tiene que tener al menos una letra minúscula, una letra mayúscula y un dígito
            </FormHelperText>
          )}
          <TextField
            error={passwordMismatch}
            id='confirmPassword'
            type='password'
            label='Confirmar Contraseña'
            placeholder='*********'
            value={confirmPassword}
            onChange={e => {
              setConfirmPassword(e.target.value);
              detectPasswordMismatch(e.target.value);
            }}
            fullWidth={true}
            variant='standard'
          />
          {passwordMismatch && (
            <FormHelperText error>
              Las contraseñas son diferentes. Escribe la misma contraseña en "Nueva Contraseña" y "Confirmar Contraseña"
            </FormHelperText>
          )}
          <Button
            type='submit'
            sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}
            variant='contained'
            onClick={handleSubmit}
            disabled={passwordMismatch || invalidPassword || password === '' || oldPassword === ''}
          >
            Crear
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};
