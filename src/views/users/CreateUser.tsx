import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormHelperText from '@mui/material/FormHelperText';
import TextField from '@mui/material/TextField';

import { FC, useState } from 'react';
import { createUser } from 'src/API/Users/user_data';

interface CreateUserProps {
  openDialog: boolean;
  handleClose: () => void;
}

const emailPattern = /^[^@]+@[^@]+$/;
const namePattern = /.{5,100}/;
const phonePattern = /^.+$/;
const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,50}$/;

export const CreateUser: FC<CreateUserProps> = props => {
  const { openDialog, handleClose } = props;
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
    await createUser(localStorage.getItem('user'), { email, name, phone, password });
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
      <DialogTitle sx={{ display: 'flex', justifyContent: 'center' }}>Crear Nuevo Usuario</DialogTitle>
      <DialogContent>
        <Box component='form' onSubmit={handleSubmit}>
          <TextField
            error={invalidEmail}
            style={{ padding: '1em' }}
            id='email'
            type='email'
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
            sx={{ padding: '1em' }}
            id='name'
            type='text'
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
            style={{ padding: '1em' }}
            id='phone'
            type='tel'
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
            style={{ padding: '1em' }}
            id='password'
            type='password'
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
              La contraseña es inválida, tiene que tener al menos una letra minúscula, una letra mayúscula y un dígito
            </FormHelperText>
          )}
          <TextField
            error={passwordMismatch}
            style={{ padding: '1em' }}
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
