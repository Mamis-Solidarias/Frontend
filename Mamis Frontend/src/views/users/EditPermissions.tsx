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
import Checkbox from '@mui/material/Checkbox';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

interface EditPermissionsProps {
  openDialog: boolean;
  handleClose: () => void;
  id: number;
}

interface Role {
  service: string;
  canRead: boolean;
  canWrite: boolean;
}

export const EditPermissions: FC<EditPermissionsProps> = props => {
  const { openDialog, id, handleClose } = props;
  const [allRoles, setAllRoles] = useState<any[]>([]);
  const [userRoles, setUserRoles] = useState<any[]>([]);
  const [notSentRoles] = useState<any[]>([]);
  const [newRoleFilled, setNewRoleFilled] = useState<boolean>(true);
  const [starterCall, setStarterCall] = useState<boolean>(false);

  useEffect(() => {
    if (!!id && !starterCall) {
      setStarterCall(true);
      if (allRoles.length == 0) getRoles(localStorage.getItem('user')).then(result => setAllRoles(result.data.roles));
      if (userRoles.length == 0)
        getUserRoles(localStorage.getItem('user'), id).then(result => setUserRoles(result.data.roles));
    }
  }, [id]);

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
                <TableCell>Puede Leer</TableCell>
                <TableCell>Puede Escribir</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {userRoles.length == 0 && (
                <TableRow key='noroles'>
                  <TableCell>Este usuario aún no tiene roles cargados</TableCell>
                </TableRow>
              )}
              {userRoles.length > 0 &&
                userRoles.map((role: Role) => (
                  <TableRow hover key={role.service} sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
                    <TableCell sx={{ py: theme => `${theme.spacing(0.5)} !important` }}>
                      <strong>{role.service}</strong>
                    </TableCell>
                    <TableCell>{role.canRead ? 'Sí' : 'No'}</TableCell>
                    <TableCell>{role.canWrite ? 'Sí' : 'No'}</TableCell>
                  </TableRow>
                ))}
              <TableRow key='separator'></TableRow>
              {notSentRoles.length > 0 &&
                notSentRoles.map((role: Role) => (
                  <TableRow
                    hover
                    key={notSentRoles.length}
                    sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}
                  >
                    <TableCell sx={{ py: theme => `${theme.spacing(0.5)} !important` }}>
                      <Select
                        label='Servicio'
                        value={role.service ? role.service : ''}
                        onChange={e => {
                          role.service = e.target.value;
                          console.log(role.service);
                        }}
                      >
                        <MenuItem value='' hidden>
                          None
                        </MenuItem>
                        <MenuItem value='Users'>Usuarios</MenuItem>
                        <MenuItem value='Beneficiaries'>Beneficiarios</MenuItem>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Checkbox value={role.canRead}></Checkbox>
                    </TableCell>
                    <TableCell>
                      <Checkbox value={role.canWrite}></Checkbox>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        {newRoleFilled && (
          <Button
            variant='contained'
            sx={{ my: 3, display: 'block', marginLeft: 'auto', marginRight: 'auto' }}
            onClick={() => {
              setNewRoleFilled(false);
              notSentRoles.push({
                service: '',
                canRead: false,
                canWrite: false
              });
            }}
          >
            Añadir Nuevo Permiso
          </Button>
        )}
        {newRoleFilled && (
          <Button
            variant='contained'
            sx={{ my: 3, display: 'block', marginLeft: 'auto', marginRight: 'auto' }}
            onClick={() => {
              updateUserRole(localStorage.getItem('user'), id, notSentRoles);
            }}
          >
            Cargar Nuevos Permisos
          </Button>
        )}
      </DialogContent>
    </Dialog>
  );
};
