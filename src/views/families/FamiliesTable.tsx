import { ChangeEvent, FC } from 'react';

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
import { getFamiliesByCommunity } from 'src/API/Beneficiaries/communities_data';
import TablePagination from '@mui/material/TablePagination';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Collapse from '@mui/material/Collapse';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { UpdateFamily } from './UpdateFamily';
import { UpdateFamilyContacts } from './UpdateFamilyContacts';
import Contact from 'src/types/Contact';
import Family from 'src/types/Family';

interface FamiliesTableProps {
  communityCode?: string;
  openCreateFamilies: boolean;
}

const FamiliesTable: FC<FamiliesTableProps> = props => {
  const INITIAL_SIZE = 5,
    MEDIUM_SIZE = 10,
    LARGE_SIZE = 15;
  const { communityCode, openCreateFamilies } = props;
  const [rows, setRows] = useState<any>();
  const [totalPages, setTotalPages] = useState<number>(0);
  const [actualPage, setActualPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(INITIAL_SIZE);
  const [open, setOpen] = useState<boolean[]>([]);
  const [id, setId] = useState<number>(-1);
  const [openUpdateFamily, setOpenUpdateFamily] = useState<boolean>(false);
  const [openUpdateContacts, setOpenUpdateContacts] = useState<boolean>(false);
  const [contacts, setContacts] = useState<Contact[]>([]);

  useEffect(() => {
    if (!!localStorage.getItem('user')) {
      if (!!localStorage.getItem('pageFamilies')) {
        setRowsPerPage(parseInt(localStorage.getItem('pageSize') as string));
        changePage(
          parseInt(localStorage.getItem('pageFamilies') as string),
          parseInt(localStorage.getItem('pageSize') as string)
        );
      } else {
        localStorage.setItem('pageFamilies', '0');
        localStorage.setItem('pageSize', INITIAL_SIZE.toString());
        changePage(0, INITIAL_SIZE);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChangePage = (event: unknown, newPage: number) => {
    changePage(newPage, rowsPerPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    localStorage.setItem('pageSize', (+event.target.value).toString());
    changePage(0, +event.target.value);
  };

  const changePage = async (newPage: number, size: number) => {
    if (!!communityCode) {
      getFamiliesByCommunity(localStorage.getItem('user'), communityCode, newPage, size).then(result => {
        localStorage.setItem('pageFamilies', newPage.toString());
        setTotalPages(result.data.totalPages);
        setActualPage(result.data.page);
        setRows(result.data.families);
      });
    }
  };

  const getFamilies = () => {
    if (!!localStorage.getItem('user') && !!communityCode) {
      getFamiliesByCommunity(localStorage.getItem('user'), communityCode, 0, rowsPerPage).then(result => {
        localStorage.setItem('pageFamilies', '0');
        setTotalPages(result.data.totalPages);
        setActualPage(result.data.page);
        setRows(result.data.families);
      });
    }
  };

  useEffect(() => {
    if (!!localStorage.getItem('user') && !!communityCode) {
      getFamilies();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [communityCode]);

  useEffect(() => {
    if (!!localStorage.getItem('user') && !openUpdateFamily && !openUpdateContacts && !openCreateFamilies) {
      getFamilies();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openUpdateContacts, openUpdateFamily, openCreateFamilies]);

  return (
    <>
      <Card>
        <TableContainer>
          <Table sx={{ minWidth: 800 }} aria-label='table in dashboard'>
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell>ID</TableCell>
                <TableCell>Nombre</TableCell>
                <TableCell>Dirección</TableCell>
                <TableCell>Detalles</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {!!rows &&
                rows.length > 0 &&
                rows.map((row: Family, index: number) => (
                  <>
                    <TableRow hover key={index} sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
                      <TableCell>
                        <IconButton
                          aria-label='expand row'
                          size='small'
                          onClick={() => {
                            if (open.length === 0) {
                              setOpen(
                                Array.from({ length: rows.length }, (l, openIndex) => {
                                  if (openIndex === index) return true;

                                  return false;
                                })
                              );
                            } else {
                              setOpen(
                                Array.from({ length: rows.length }, (l, openIndex) => {
                                  if (openIndex === index) {
                                    return !open[index];
                                  }

                                  return open[openIndex];
                                })
                              );
                            }
                          }}
                        >
                          {open[index] ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        </IconButton>
                      </TableCell>
                      <TableCell sx={{ py: theme => `${theme.spacing(0.5)} !important` }}>{row.id}</TableCell>
                      <TableCell>{row.name}</TableCell>
                      <TableCell>{row.address}</TableCell>
                      <TableCell>{row.details}</TableCell>
                    </TableRow>
                    <TableRow key={'expanded' + index} sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
                      <TableCell colSpan={12}>
                        <Collapse in={open[index]} timeout='auto' unmountOnExit>
                          <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'start' }}>
                            <TableCell>
                              <Button
                                variant='contained'
                                onClick={() => {
                                  setId(row.id as number);
                                  setOpenUpdateFamily(true);
                                }}
                              >
                                Editar Datos
                              </Button>
                            </TableCell>
                            <TableCell>
                              <Button
                                variant='contained'
                                onClick={() => {
                                  setId(row.id as number);
                                  setContacts(row.contacts);
                                  setOpenUpdateContacts(true);
                                }}
                              >
                                Editar Contactos
                              </Button>
                            </TableCell>
                          </Box>
                        </Collapse>
                      </TableCell>
                    </TableRow>
                  </>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[INITIAL_SIZE, MEDIUM_SIZE, LARGE_SIZE]}
          component='div'
          count={
            rows ? (rows.length < 5 ? (rows.length !== 0 ? (totalPages - 1) * rowsPerPage + rows.length : 0) : -1) : 1
          }
          rowsPerPage={rowsPerPage}
          page={actualPage}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        {openUpdateFamily && (
          <UpdateFamily
            openDialog={openUpdateFamily}
            id={id}
            handleClose={() => {
              setOpenUpdateFamily(false);
            }}
          />
        )}
        {openUpdateContacts && (
          <UpdateFamilyContacts
            openDialog={openUpdateContacts}
            id={id}
            contacts={contacts}
            handleClose={() => {
              setOpenUpdateContacts(false);
            }}
          />
        )}
      </Card>
    </>
  );
};

export default FamiliesTable;
