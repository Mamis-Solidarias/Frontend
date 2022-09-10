// ** MUI Imports
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';

// ** Types Imports
import { ChangeEvent, useEffect, useState } from 'react';
import { getUsers, deleteUser, reactivateUser } from 'src/API/Users/user_data';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';

import { verifyJwt } from 'src/API/Users/initialization';
import { EditPermissions } from './EditPermissions';
import TablePagination from '@mui/material/TablePagination';
import { EditPassword } from './EditPassword';
import { UpdateUser } from './UpdateUser';

interface RowType {
  id: number;
  name: string;
  email: string;
  phone: string;
  salary: string;
  isActive: boolean;
}

const DashboardTable = () => {
  const INITIAL_SIZE = 5,
    MEDIUM_SIZE = 10,
    LARGE_SIZE = 15;
  const [rows, setRows] = useState<any>();
  const [id, setId] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [actualPage, setActualPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(INITIAL_SIZE);
  const [openEditPermissions, setOpenEditPermissions] = useState<boolean>(false);
  const [openEditPassword, setOpenEditPassword] = useState<boolean>(false);
  const [openUpdateUser, setOpenUpdateUser] = useState<boolean>(false);
  const [actualUserId, setActualUserId] = useState<string>('-1');

  useEffect(() => {
    if (!!localStorage.getItem('user')) {
      changePage(0, INITIAL_SIZE);
      setActualUserId(verifyJwt(localStorage.getItem('user') as string).Id);
    }
  }, []);

  const handleChangePage = (event: unknown, newPage: number) => {
    changePage(newPage, rowsPerPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    changePage(0, +event.target.value);
  };

  const changePage = async (newPage: number, size: number) => {
    getUsers(localStorage.getItem('user'), newPage, size).then(users => {
      setTotalPages(users.data.totalPages);
      setActualPage(users.data.page);
      setRows(users.data.entries);
    });
  };

  return (
    <>
      <Card>
        <TableContainer>
          <Table sx={{ minWidth: 800 }} aria-label='table in dashboard'>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Nombre</TableCell>
                <TableCell>Email</TableCell>
                <TableCell></TableCell>
                <TableCell>Teléfono</TableCell>
                <TableCell>Activo</TableCell>
                <TableCell>Permisos</TableCell>
                <TableCell></TableCell>
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
                      <Button
                        variant='contained'
                        onClick={() => {
                          setId(row.id);
                          setOpenUpdateUser(true);
                        }}
                      >
                        Editar Datos de Usuario
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Checkbox
                        checked={row.isActive}
                        onClick={() => {
                          if (row.isActive) {
                            // eslint-disable-next-line @typescript-eslint/no-unused-vars
                            deleteUser(localStorage.getItem('user'), row.id).then(_ => (row.isActive = false));
                          } else {
                            // eslint-disable-next-line @typescript-eslint/no-unused-vars
                            reactivateUser(localStorage.getItem('user'), row.id).then(_ => (row.isActive = true));
                          }
                        }}
                        disabled={row.id === parseInt(actualUserId)}
                      />
                    </TableCell>
                    <TableCell>
                      <Button
                        variant='contained'
                        onClick={() => {
                          setId(row.id);
                          setOpenEditPermissions(true);
                        }}
                        disabled={row.id === parseInt(actualUserId)}
                      >
                        Editar Permisos
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant='contained'
                        onClick={() => {
                          setId(row.id);
                          setOpenEditPassword(true);
                        }}
                      >
                        Editar Contraseña
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[INITIAL_SIZE, MEDIUM_SIZE, LARGE_SIZE]}
          component='div'
          count={rows ? (rows.length < 5 ? (totalPages - 1) * rowsPerPage + rows.length : -1) : 1}
          rowsPerPage={rowsPerPage}
          page={actualPage}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        {openEditPermissions && (
          <EditPermissions
            openDialog={openEditPermissions}
            id={id}
            handleClose={() => {
              setOpenEditPermissions(false);
            }}
          />
        )}
        {openEditPassword && (
          <EditPassword
            openDialog={openEditPassword}
            id={id}
            handleClose={() => {
              setOpenEditPassword(false);
            }}
          />
        )}
        {openUpdateUser && (
          <UpdateUser
            openDialog={openUpdateUser}
            id={id}
            handleClose={() => {
              setOpenUpdateUser(false);
            }}
          />
        )}
      </Card>
    </>
  );
};

export default DashboardTable;
