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

interface FamiliesTableProps {
  communityCode?: string;
}

interface RowType {
  id: number | null;
  name: string;
  address: string;
  details: string | null;
  contacts: { type: string; content: string; title: string; isPreferred: boolean }[];
}

const FamiliesTable: FC<FamiliesTableProps> = props => {
  const INITIAL_SIZE = 5,
    MEDIUM_SIZE = 10,
    LARGE_SIZE = 15;
  const { communityCode } = props;
  const [rows, setRows] = useState<any>();
  const [totalPages, setTotalPages] = useState<number>(0);
  const [actualPage, setActualPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(INITIAL_SIZE);

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

  useEffect(() => {
    if (!!localStorage.getItem('user') && !!communityCode) {
      getFamiliesByCommunity(localStorage.getItem('user'), communityCode, 0, rowsPerPage).then(result => {
        localStorage.setItem('pageFamilies', '0');
        setTotalPages(result.data.totalPages);
        setActualPage(result.data.page);
        setRows(result.data.families);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [communityCode]);

  return (
    <>
      <Card>
        <TableContainer>
          <Table sx={{ minWidth: 800 }} aria-label='table in dashboard'>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Nombre</TableCell>
                <TableCell>Dirección</TableCell>
                <TableCell>Detalles</TableCell>
                <TableCell>Formas de Contacto</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {!!rows &&
                rows.map((row: RowType) => (
                  <TableRow hover key={row.id} sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
                    <TableCell sx={{ py: theme => `${theme.spacing(0.5)} !important` }}>{row.id}</TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.address}</TableCell>
                    <TableCell>{row.details}</TableCell>
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
      </Card>
    </>
  );
};

export default FamiliesTable;
