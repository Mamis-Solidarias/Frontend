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

import { verifyJwt } from 'src/API/initialization';
import { EditPermissions } from './EditPermissions';
import TablePagination from '@mui/material/TablePagination';

interface RowType {
  id: string;
  name: string;
  email: string;
  phone: string;
  salary: string;
  isActive: string;
}

const DashboardTable = () => {
  const INITIAL_SIZE = 5,
    MEDIUM_SIZE = 10,
    LARGE_SIZE = 15;
  const [rows, setRows] = useState<any>();
  const [id, setId] = useState<string>('0');
  const [totalPages, setTotalPages] = useState<number>(0);
  const [actualPage, setActualPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(INITIAL_SIZE);
  const [openEditPermissions, setOpenEditPermissions] = useState<boolean>(false);

  useEffect(() => {
    if (!!localStorage.getItem('user')) {
      changePage(0, INITIAL_SIZE);
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
      const adminUserId = verifyJwt(localStorage.getItem('user') as string).Id;
      setTotalPages(users.data.totalPages);
      setActualPage(users.data.page);
      setRows(
        users.data.entries.filter((user: RowType) => {
          return user.id !== adminUserId;
        })
      );
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
                            // eslint-disable-next-line @typescript-eslint/no-unused-vars
                            deleteUser(localStorage.getItem('user'), row.id).catch;
                          } else {
                            // eslint-disable-next-line @typescript-eslint/no-unused-vars
                            reactivateUser(localStorage.getItem('user'), row.id).then(_ => window.location.reload());
                          }
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Button
                        variant='contained'
                        onClick={() => {
                          setId(row.id);
                          setOpenEditPermissions(true);
                        }}
                      >
                        Editar Permisos
                      </Button>
                      {openEditPermissions && (
                        <EditPermissions
                          openDialog={openEditPermissions}
                          id={id}
                          handleClose={() => {
                            setOpenEditPermissions(false);
                          }}
                        />
                      )}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[INITIAL_SIZE, MEDIUM_SIZE, LARGE_SIZE]}
          component='div'
          count={totalPages * (rows ? rows.length : 1)}
          rowsPerPage={rowsPerPage}
          page={actualPage}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </>
  );
};

export default DashboardTable;
