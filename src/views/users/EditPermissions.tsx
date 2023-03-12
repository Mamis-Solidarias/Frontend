import { FC, useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { getRoles, getUserRoles, updateUserRole } from 'src/API/Users/user_data';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { Action } from 'src/types/Action';
import Roles from 'src/types/users/Roles';
import Role from 'src/types/users/Role';

interface EditPermissionsProps {
  openDialog: boolean;
  handleClose: () => void;
  id: number;
  setAction: (action: Action) => void;
}

export const EditPermissions: FC<EditPermissionsProps> = props => {
  const { openDialog, id, handleClose, setAction } = props;
  const [allRoles, setAllRoles] = useState<Role[]>([]);
  const [userRoles, setUserRoles] = useState<Role[]>([]);
  const [starterCall, setStarterCall] = useState<boolean>(false);
  const [permissions, setPermissions] = useState<number>(0);

  useEffect(() => {
    if (!!id && !starterCall) {
      setStarterCall(true);
      if (allRoles.length == 0) getRoles().then(result => setAllRoles(result.data.roles));
      if (userRoles.length == 0) {
        getUserRoles(id).then(result => {
          setUserRoles(result.data.roles);
          setPermissions(result.data.roles.length);
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const changeRoleInUserRoles = (role: Role, newService: string, canRead: boolean, canWrite: boolean) => {
    const newRole = { service: newService, canRead: canRead, canWrite: canWrite };
    const newUserRoles = userRoles.filter(userRole => userRole !== role);
    newUserRoles.push(newRole);
    setUserRoles(newUserRoles);
  };

  const deleteRole = (role: Role) => {
    const newUserRoles = userRoles.filter(userRole => userRole !== role);
    setUserRoles(newUserRoles);
  };

  return (
    <Dialog
      open={openDialog}
      onClose={() => {
        handleClose();
      }}
      maxWidth='lg'
    >
      <DialogTitle sx={{ display: 'flex', justifyContent: 'center' }}>Editar Permisos</DialogTitle>
      <DialogContent>
        <TableContainer>
          <Table aria-label='table in dashboard'>
            <TableHead>
              <TableRow>
                <TableCell>Servicio</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {userRoles.length == 0 && (
                <TableRow key='noroles'>
                  <TableCell>Este usuario aún no tiene permisos cargados</TableCell>
                </TableRow>
              )}
              <TableRow hover key='button'>
                <Button
                  variant='contained'
                  sx={{ my: 3, marginLeft: 'auto', marginRight: 'auto' }}
                  onClick={() => {
                    setPermissions(permissions + 1);
                    userRoles.push({
                      service: '#',
                      canRead: false,
                      canWrite: false
                    });
                  }}
                  disabled={permissions >= 4}
                >
                  Añadir
                </Button>
              </TableRow>
              {userRoles.length > 0 &&
                userRoles.map((role: Role, index: number) => (
                  <TableRow hover key={role.service} sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
                    <TableCell sx={{ py: theme => `${theme.spacing(0.5)} !important` }}>
                      <Select
                        value={role.service}
                        onChange={e => changeRoleInUserRoles(role, e.target.value, true, false)}
                      >
                        <MenuItem value='#' style={{ display: 'none' }}></MenuItem>
                        {allRoles.map(role => (
                          <MenuItem key={index + role.service} value={role.service}>
                            {Roles[role.service as keyof typeof Roles]}
                          </MenuItem>
                        ))}
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Stack direction='row' spacing={1} alignItems='center'>
                        <Typography>Lectura</Typography>
                        <Switch
                          onChange={(e: any) => changeRoleInUserRoles(role, role.service, true, e.target.checked)}
                          checked={role.canWrite}
                        />
                        <Typography>Lectura y Escritura</Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <IconButton aria-label='delete' size='small' onClick={() => deleteRole(role)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              <TableRow key='separator'></TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Button
          variant='contained'
          sx={{ my: 3, display: 'block', marginLeft: 'auto', marginRight: 'auto' }}
          onClick={async () => {
            try {
              await updateUserRole(id, userRoles);
              setAction({
                complete: true,
                success: true,
                message: 'Permisos modificados exitosamente',
                status: 200
              });
              handleClose();
            } catch (err) {
              setAction({
                complete: true,
                success: false,
                message: 'Ha ocurrido un error modificando los permisos. Intente nuevamente más tarde',
                status: 400
              });
            }
          }}
        >
          Cargar
        </Button>
      </DialogContent>
    </Dialog>
  );
};
