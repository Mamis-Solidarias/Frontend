import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormHelperText from '@mui/material/FormHelperText';
import TextField from '@mui/material/TextField';

import { FC, useState } from 'react';
import { createUser } from 'src/API/Users/user_data';
import { Action } from 'src/types/Action';

interface CreateUserProps {
  openDialog: boolean;
  handleClose: () => void;
  setAction: (action: Action) => void;
}

const emailPattern = /^[^@]+@[^@]+$/;
const namePattern = /.{5,100}/;
const phonePattern = /^.+$/;
const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,50}$/;

export const CreateUser: FC<CreateUserProps> = props => {
  const { openDialog, handleClose, setAction } = props;
  const [email, setEmail] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [invalidEmail, setInvalidEmail] = useState<boolean>(false);
  const [invalidName, setInvalidName] = useState<boolean>(false);
  const [invalidPhone, setInvalidPhone] = useState<boolean>(false);
  const [invalidPassword, setInvalidPassword] = useState<boolean>(false);
  const [passwordMismatch, setPasswordMismatch] = useState<boolean>(false);

  const detectInvalidEmail = (email: string) => {
    if (emailPattern.test(email)) {
      setInvalidEmail(false);
    } else {
      setInvalidEmail(true);
    }
  };

  const detectInvalidName = (name: string) => {
    if (namePattern.test(name)) {
      setInvalidName(false);
    } else {
      setInvalidName(true);
    }
  };

  const detectInvalidPhone = (phone: string) => {
    if (phonePattern.test(phone)) {
      setInvalidPhone(false);
    } else {
      setInvalidPhone(true);
    }
  };

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
    setEmail('');
    setName('');
    setPhone('');
    setPassword('');
    setConfirmPassword('');
    setInvalidEmail(false);
    setInvalidName(false);
    setInvalidPhone(false);
    setInvalidPassword(false);
    setPasswordMismatch(false);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await createUser({ email, name, phone, password });
      resetFields();
      setAction({
        complete: true,
        success: true,
        message: 'Usuario creado con éxito',
        status: 200
      });
      handleClose();
    } catch (err) {
      setAction({
        complete: true,
        success: false,
        message: 'Hubo un error creando al usuario. Intente nuevamente más tarde',
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
      <DialogTitle sx={{ display: 'flex', justifyContent: 'center' }}>Crear Nuevo Usuario</DialogTitle>
      <DialogContent>
        <Box component='form' onSubmit={handleSubmit}>
          <TextField
            error={invalidEmail}
            id='email'
            type='email'
            sx={{ py: '.3em' }}
            inputProps={{ pattern: '^[^@]+@[^@]+$' }}
            label='Email'
            placeholder='usuario@mail.com'
            value={email}
            onChange={e => {
              setEmail(e.target.value);
              detectInvalidEmail(e.target.value);
            }}
            fullWidth={true}
            variant='standard'
          />
          {invalidEmail && (
            <FormHelperText error>
              La dirección de correo electrónico es inválida. Seleccione una direccion de correo válida
            </FormHelperText>
          )}
          <TextField
            error={invalidName}
            id='name'
            type='text'
            sx={{ py: '.3em' }}
            inputProps={{ pattern: ' .{5,100}' }}
            label='Nombre'
            placeholder='nuevousuario123'
            value={name}
            onChange={e => {
              setName(e.target.value);
              detectInvalidName(e.target.value);
            }}
            fullWidth={true}
            variant='standard'
          />
          {invalidName && (
            <FormHelperText error>El nombre es inválido. Tiene que tener entre 5 y 100 caracteres</FormHelperText>
          )}
          <TextField
            error={invalidPhone}
            id='phone'
            type='tel'
            sx={{ py: '.3em' }}
            inputProps={{ pattern: ' ^.+$' }}
            label='Teléfono'
            placeholder='+5492995077824'
            value={phone}
            onChange={e => {
              setPhone(e.target.value);
              detectInvalidPhone(e.target.value);
            }}
            fullWidth={true}
            variant='standard'
          />
          {invalidPhone && <FormHelperText error>El número de teléfono es inválido</FormHelperText>}
          <TextField
            error={invalidPassword}
            id='password'
            type='password'
            sx={{ py: '.3em' }}
            label='Contraseña'
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
              La contraseña es inválida, tiene que tener al menos 8 caracteres, una letra minúscula, una letra mayúscula y un dígito
            </FormHelperText>
          )}
          <TextField
            error={passwordMismatch}
            id='confirmPassword'
            type='password'
            sx={{ py: '.3em' }}
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
              Las contraseñas son diferentes. Escribe la misma contraseña en "Contraseña" y "Confirmar Contraseña"
            </FormHelperText>
          )}
          <Button
            type='submit'
            sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}
            variant='contained'
            onClick={handleSubmit}
            disabled={
              passwordMismatch ||
              invalidPassword ||
              invalidEmail ||
              invalidName ||
              invalidPhone ||
              email === '' ||
              name === '' ||
              password === ''
            }
          >
            Crear
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};
