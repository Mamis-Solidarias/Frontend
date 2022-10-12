// ** MUI Imports
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';

// ** Types Imports
import { FC, useEffect, useState } from 'react';
import { getCommunities } from 'src/API/Beneficiaries/communities_data';
import Button from '@mui/material/Button';
import { UpdateCommunity } from './UpdateCommunity';
import Community from 'src/types/Community';

interface CommunitiesTableProps {
  openCreateCommunities: boolean;
  openWindow: boolean;
}

const CommunitiesTable: FC<CommunitiesTableProps> = props => {
  const { openCreateCommunities, openWindow } = props;
  const [rows, setRows] = useState<any>();
  const [id, setId] = useState<number>(-1);
  const [openUpdateCommunity, setOpenUpdateCommunity] = useState<boolean>(false);

  const refreshCommunities = () => {
    if (!!localStorage.getItem('user')) {
      getCommunities().then(communities => {
        setRows(communities.data.communities);
      });
    }
  };

  useEffect(() => {
    refreshCommunities();
  }, []);

  useEffect(() => {
    if (!!localStorage.getItem('user') && !openWindow) {
      refreshCommunities();
    }
  }, [openCreateCommunities, openWindow]);

  return (
    <>
      <Card>
        <TableContainer>
          <Table sx={{ minWidth: 800 }} aria-label='table in dashboard'>
            <TableHead>
              <TableRow>
                <TableCell>Código</TableCell>
                <TableCell>Nombre</TableCell>
                <TableCell>Dirección</TableCell>
                <TableCell>Descripción</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {!!rows &&
                rows.map((row: Community) => (
                  <TableRow hover key={row.id} sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
                    <TableCell sx={{ py: theme => `${theme.spacing(0.5)} !important` }}>{row.id}</TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.address}</TableCell>
                    <TableCell>{!!row.description ? row.description : '-'}</TableCell>
                    <TableCell>
                      <Button
                        variant='contained'
                        onClick={() => {
                          setId(parseInt(row.id as string));
                          setOpenUpdateCommunity(true);
                        }}
                      >
                        Editar Datos
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        {openUpdateCommunity && (
          <UpdateCommunity
            openDialog={openUpdateCommunity}
            id={id}
            handleClose={() => {
              setOpenUpdateCommunity(false);
            }}
          />
        )}
      </Card>
    </>
  );
};

export default CommunitiesTable;
