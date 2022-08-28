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
import { getUsers } from 'src/API/Users/user_data';
import Button from '@mui/material/Button';

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
        setRows(users.data.entries);
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
              <TableCell>Estado</TableCell>
              <TableCell>Permisos</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!!rows &&
              rows.map((row: RowType) => (
                <TableRow hover key={row.name} sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
                  <TableCell sx={{ py: theme => `${theme.spacing(0.5)} !important` }}>{row.id}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{row.phone}</TableCell>
                  <TableCell>{row.isActive ? 'Activo' : 'Inactivo'}</TableCell>
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
