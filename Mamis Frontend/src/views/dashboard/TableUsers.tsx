// ** MUI Imports
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';

// ** Types Imports
import { useEffect, useState } from 'react';
import { getUsers, deleteUser, reactivateUser } from 'src/API/Users/user_data';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';

import { verifyJwt } from 'src/API/initialization';

interface RowType {
  id: number;
  name: string;
  email: string;
  phone: string;
  salary: string;
  isActive: string;
}

const DashboardTable = () => {
  const [rows, setRows] = useState<any>();

  useEffect(() => {
    if (!!localStorage.getItem('user')) {
      getUsers(localStorage.getItem('user'), 0, 7).then(users => {
        const adminUserId = parseInt(verifyJwt(localStorage.getItem('user')).Id);

        setRows(
          users.data.entries.filter((user: RowType) => {
            return user.id !== adminUserId;
          })
        );
      });
    }
  }, []);

  return (
    <Card>
      <TableContainer>
        <Table sx={{ minWidth: 800 }} aria-label='table in dashboard'>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Teléfono</TableCell>
              <TableCell>Activo</TableCell>
              <TableCell>Permisos</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!!rows &&
              rows.map((row: RowType) => (
                <TableRow hover key={row.id} sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
                  <TableCell sx={{ py: theme => `${theme.spacing(0.5)} !important` }}>{row.id}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{row.phone}</TableCell>
                  <TableCell>
                    <Checkbox
                      checked={row.isActive as unknown as boolean}
                      onClick={() => {
                        if (row.isActive) {
                          deleteUser(localStorage.getItem('user'), row.id).then(_ => window.location.reload());
                        } else {
                          reactivateUser(localStorage.getItem('user'), row.id).then(_ => window.location.reload());
                        }
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Button variant='contained'>Editar Permisos</Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
};

export default DashboardTable;
