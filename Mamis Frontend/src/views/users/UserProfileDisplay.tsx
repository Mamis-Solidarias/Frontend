import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { FC, useEffect, useState } from 'react';
import { verifyJwt } from 'src/API/initialization';
import { getUser } from 'src/API/Users/user_data';
import { EditPassword } from './EditPassword';
import { UpdateUser } from './UpdateUser';

interface UserProfileDisplayProps {}

export const UserProfileDisplay: FC<UserProfileDisplayProps> = props => {
  const [profileUser, setProfileUserUser] = useState();
  const [openEditPassword, setOpenEditPassword] = useState<boolean>(false);
  const [openUpdateUser, setOpenUpdateUser] = useState<boolean>(false);

  useEffect(() => {
    getUser(localStorage.getItem('user'), verifyJwt(localStorage.getItem('user') as any).Id).then(response => {
      setProfileUserUser(response.data.user);
    });
  }, []);

  return (
    <>
      <Typography variant='h4'>Perfil de Usuario</Typography>
      <Box sx={{ width: '50%', display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
        <Box>Nombre de usuario: {profileUser?.name}</Box>
        <Box>Email: {profileUser?.email}</Box>
        <Box>Email: {profileUser?.phone}</Box>
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            my: '5em',
            justifyContent: 'space-between'
          }}
        >
          <Button
            variant='contained'
            onClick={() => {
              setOpenUpdateUser(true);
            }}
            sx={{ justifyContent: 'start' }}
          >
            Editar Datos de Usuario
          </Button>
          <UpdateUser
            openDialog={openUpdateUser}
            id={profileUser?.id}
            handleClose={() => {
              setOpenUpdateUser(false);
            }}
          />
          <Button
            variant='contained'
            onClick={() => {
              setOpenEditPassword(true);
            }}
            sx={{ justifyContent: 'end' }}
          >
            Editar Contraseña
          </Button>
          {openEditPassword && (
            <EditPassword
              openDialog={openEditPassword}
              id={profileUser?.id}
              handleClose={() => {
                setOpenEditPassword(false);
              }}
            />
          )}
        </Box>
      </Box>
    </>
  );
};
