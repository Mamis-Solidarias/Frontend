// ** MUI Imports
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';

// ** Types Imports
import { ChangeEvent, FC, useEffect, useState } from 'react';
import { getUsers, deleteUser, reactivateUser } from 'src/API/Users/user_data';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';

import { EditPermissions } from './EditPermissions';
import TablePagination from '@mui/material/TablePagination';
import { EditPassword } from './EditPassword';
import { UpdateUser } from './UpdateUser';
import User from 'src/types/User';
import { useRouter } from 'next/router';
import { hasNoPermission, isNotLoggedIn, redirectToLogin, userIsLoggedIn } from 'src/utils/sessionManagement';
import { Action } from 'src/types/Action';

interface TableUsersProps {
  openWindow: boolean;
  userAdded: boolean;
  setUserAdded: (userAdded: boolean) => void;
  setAction: (action: Action) => void;
}

const TableUsers: FC<TableUsersProps> = props => {
  const { openWindow, userAdded, setUserAdded, setAction } = props;
  const INITIAL_SIZE = 5,
    MEDIUM_SIZE = 10,
    LARGE_SIZE = 15;
  const router = useRouter();
  const [rows, setRows] = useState<any>();
  const [id, setId] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [actualPage, setActualPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(INITIAL_SIZE);
  const [openEditPermissions, setOpenEditPermissions] = useState<boolean>(false);
  const [openEditPassword, setOpenEditPassword] = useState<boolean>(false);
  const [openUpdateUser, setOpenUpdateUser] = useState<boolean>(false);
  const [actualUserId, setActualUserId] = useState<string>('-1');

  const reloadUsers = () => {
    if (userIsLoggedIn()) {
      if (!!localStorage.getItem('pageUsers')) {
        setRowsPerPage(parseInt(localStorage.getItem('pageSize') as string));
        changePage(
          parseInt(localStorage.getItem('pageUsers') as string),
          parseInt(localStorage.getItem('pageSize') as string)
        );
      } else {
        localStorage.setItem('pageUsers', '0');
        localStorage.setItem('pageSize', INITIAL_SIZE.toString());
        changePage(0, INITIAL_SIZE);
      }
      setActualUserId(JSON.parse(localStorage.getItem('user') as string).id);
    }
  };

  useEffect(() => {
    if (!userIsLoggedIn()) {
      router.push('/login');
    } else {
      reloadUsers();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (userAdded) {
      reloadUsers();
      setUserAdded(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userAdded]);

  useEffect(() => {
    if (!openWindow) {
      changePage(actualPage, rowsPerPage);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openWindow]);

  const handleChangePage = (event: unknown, newPage: number) => {
    changePage(newPage, rowsPerPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    localStorage.setItem('pageSize', (+event.target.value).toString());
    changePage(0, +event.target.value);
  };

  const changePage = async (newPage: number, size: number) => {
    getUsers(newPage, size)
      .then(users => {
        localStorage.setItem('pageUsers', newPage.toString());
        setTotalPages(users.data.totalPages);
        setActualPage(users.data.page);
        setRows(users.data.entries);
      })
      .catch(err => {
        if (hasNoPermission(err)) {
          redirectToLogin(router);
        } else if (isNotLoggedIn(err)) {
          redirectToLogin(router);
        }
      });
  };

  return (
    <>
      <TableContainer>
        <Table sx={{ minWidth: 800 }} aria-label='table in dashboard'>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Teléfono</TableCell>
              <TableCell>Activo</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!!rows &&
              rows.map((row: User) => (
                <TableRow hover key={row.id} sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
                  <TableCell sx={{ py: theme => `${theme.spacing(0.5)} !important` }}>{row.id}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{row.phone}</TableCell>
                  <TableCell>
                    <Checkbox
                      checked={row.isActive}
                      onClick={async () => {
                        if (row.isActive) {
                          // eslint-disable-next-line @typescript-eslint/no-unused-vars
                          await deleteUser(row.id).then(_ => (row.isActive = false));
                        } else {
                          // eslint-disable-next-line @typescript-eslint/no-unused-vars
                          await reactivateUser(row.id).then(_ => (row.isActive = true));
                        }
                        reloadUsers();
                      }}
                      disabled={row.id === parseInt(actualUserId)}
                    />
                  </TableCell>
                  <TableCell sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Button
                      variant='contained'
                      sx={{ fontSize: 12, width: '30%' }}
                      onClick={() => {
                        setId(row.id);
                        setOpenUpdateUser(true);
                      }}
                    >
                      Editar Datos
                    </Button>
                    <Button
                      variant='contained'
                      sx={{ fontSize: 12, width: '30%' }}
                      onClick={() => {
                        setId(row.id);
                        setOpenEditPassword(true);
                      }}
                    >
                      Editar Contraseña
                    </Button>
                    <Button
                      variant='contained'
                      sx={{ fontSize: 12, width: '30%' }}
                      onClick={() => {
                        setId(row.id);
                        setOpenEditPermissions(true);
                      }}
                      disabled={row.id === parseInt(actualUserId)}
                    >
                      Editar Permisos
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
        count={rows ? (rows.length < rowsPerPage ? (totalPages - 1) * rowsPerPage + rows.length : -1) : 1}
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
            reloadUsers();
          }}
          setAction={setAction}
        />
      )}
      {openEditPassword && (
        <EditPassword
          openDialog={openEditPassword}
          id={id}
          handleClose={() => {
            setOpenEditPassword(false);
            reloadUsers();
          }}
          setAction={setAction}
        />
      )}
      {openUpdateUser && (
        <UpdateUser
          openDialog={openUpdateUser}
          id={id}
          handleClose={() => {
            setOpenUpdateUser(false);
            reloadUsers();
          }}
          setAction={setAction}
        />
      )}
    </>
  );
};

export default TableUsers;
