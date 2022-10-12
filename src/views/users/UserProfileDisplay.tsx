import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import FormHelperText from '@mui/material/FormHelperText';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { FC, useEffect, useState } from 'react';
import { updateUser } from 'src/API/Users/user_data';
import User from 'src/types/User';
import { EditPassword } from './EditPassword';

const emailPattern = /^[^@]+@[^@]+$/;
const namePattern = /.{5,100}/;

export const UserProfileDisplay: FC = () => {
  const [profileUser, setProfileUserUser] = useState<User | undefined>();
  const [openEditPassword, setOpenEditPassword] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [invalidEmail, setInvalidEmail] = useState<boolean>(false);
  const [invalidName, setInvalidName] = useState<boolean>(false);
  const [disableForm, setDisableForm] = useState<boolean>(true);

  const resetFields = () => {
    setInvalidEmail(false);
    setInvalidName(false);
    setDisableForm(true);
  };

  const handleSubmit = async () => {
    if (!!profileUser) {
      const emailToSend = email === profileUser.email ? null : email;
      const nameToSend = name === profileUser.name ? null : name;
      const phoneToSend = phone === profileUser.phone ? null : phone;
      await updateUser(profileUser.id.toString(), {
        email: emailToSend,
        name: nameToSend,
        phone: phoneToSend
      });
      resetFields();
    }
  };

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

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') as string) as User;
    setProfileUserUser(user);
    setEmail(user.email);
    setPhone(user.phone);
    setName(user.name);
  }, []);

  return (
    <>
      <Typography variant='h3' sx={{ textDecoration: 'underline', marginBottom: '1em' }}>
        Perfil
      </Typography>
      <Card
        sx={{
          width: '50%',
          display: 'flex',
          flexDirection: 'column',
          padding: '2em',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <TextField
          error={invalidEmail}
          style={{ padding: '1em' }}
          id='email'
          type='email'
          inputProps={{ pattern: '^[^@]+@[^@]+$' }}
          label='Email'
          value={email}
          onChange={e => {
            setEmail(e.target.value);
            detectInvalidEmail(e.target.value);
          }}
          fullWidth={true}
          variant='standard'
          disabled={disableForm}
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
          disabled={disableForm}
        />
        {invalidName && (
          <FormHelperText error>El nombre es inválido. Tiene que tener entre 5 y 100 caracteres</FormHelperText>
        )}
        <TextField
          style={{ padding: '1em' }}
          id='phone'
          type='tel'
          label='Teléfono'
          placeholder='+5492995077824'
          value={phone}
          onChange={e => {
            setPhone(e.target.value);
          }}
          fullWidth={true}
          variant='standard'
          disabled={disableForm}
        />
        {!disableForm && (
          <Button
            type='submit'
            sx={{ display: 'flex', justifyContent: 'center', width: '100%', marginTop: '0.25em' }}
            variant='contained'
            onClick={handleSubmit}
            disabled={
              invalidEmail ||
              invalidName ||
              (!name && !phone && !email) ||
              (email === profileUser?.email && name === profileUser?.name && phone === profileUser?.phone)
            }
          >
            Editar
          </Button>
        )}
        {disableForm && (
          <Box
            sx={{
              marginTop: '0.25em',
              width: '100%'
            }}
          >
            <Button
              variant='contained'
              onClick={() => {
                setDisableForm(false);
              }}
              sx={{ width: '100%' }}
            >
              Editar Datos
            </Button>
          </Box>
        )}

        <Divider />
        <Box
          sx={{
            marginTop: '0.25em',
            width: '100%'
          }}
        >
          <Button
            variant='contained'
            onClick={() => {
              setOpenEditPassword(true);
            }}
            sx={{ width: '100%' }}
          >
            Editar Contraseña
          </Button>
        </Box>
        {openEditPassword && (
          <EditPassword
            openDialog={openEditPassword}
            id={profileUser?.id}
            handleClose={() => {
              setOpenEditPassword(false);
            }}
          />
        )}
      </Card>
    </>
  );
};
