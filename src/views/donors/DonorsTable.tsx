import { FC } from 'react';

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
import { UpdateDonor } from './UpdateDonor';
import { useQuery } from '@apollo/client';
import { useDonorsPaging } from 'src/hooks/donors/useDonorsPaging';
import { GET_DONORS } from 'src/API/Donors/donors_graphql';
import DonorsTablePagination from './DonorsTablePagination';
import { Donor } from 'src/types/Donor';
import Button from '@mui/material/Button';
import { useRouter } from 'next/router';
import { Action } from 'src/types/Action';

interface DonorsTableProps {
  openCreateDonor: boolean;
  setAction: (action: Action) => void;
}

const FamiliesTable: FC<DonorsTableProps> = props => {
  const { openCreateDonor, setAction } = props;
  const router = useRouter();
  const [donor, setDonor] = useState<Donor | null>(null);
  const [openUpdateDonor, setOpenUpdateDonor] = useState<boolean>(false);
  const { paging, setDonorsPaging } = useDonorsPaging();
  const { loading, error, data, refetch } = useQuery(GET_DONORS, {
    variables: {
      after: paging.pageCursor,
      limit: paging.limit
    }
  });

  const refetchWithSameParameters = () => {
    refetch({
      after: paging.pageCursor,
      limit: paging.limit
    });
  };

  useEffect(() => {
    if (!localStorage.getItem('user')) {
      router.push('/login');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!!localStorage.getItem('user') && !openUpdateDonor && !openCreateDonor) {
      refetchWithSameParameters();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openUpdateDonor, openCreateDonor]);

  if (loading)
    return (
      <TableRow>
        <TableCell>Cargando...</TableCell>
      </TableRow>
    );

  if (error && !data) {
    return (
      <TableRow>
        <TableCell>Error :(</TableCell>
      </TableRow>
    );
  }

  const nodes = data.donors.nodes;
  const pageInfo = data.donors.pageInfo;
  const edges = data.donors.edges;

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
                <TableCell>Padrinazgo</TableCell>
                <TableCell>Creador</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {nodes.map((row: Donor) => (
                <TableRow sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }} key={row.id}>
                  <TableCell sx={{ py: theme => `${theme.spacing(0.5)} !important` }}>{row.id}</TableCell>
                  <TableCell>{row.name}</TableCell>

                  <TableCell>{row.email ? row.email : '-'}</TableCell>
                  <TableCell>{row.phone ? row.phone : '-'}</TableCell>
                  <TableCell>{row.isGodFather ? 'Es padrino' : 'No es padrino'}</TableCell>
                  <TableCell>{row.owner?.name}</TableCell>
                  <TableCell sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Button
                      variant='contained'
                      sx={{ my: '.5em' }}
                      onClick={() => {
                        if (!!row.id) {
                          setDonor(row);
                          setOpenUpdateDonor(true);
                        }
                      }}
                    >
                      Editar
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <DonorsTablePagination
          paging={paging}
          setDonorsPaging={setDonorsPaging}
          pageInfo={pageInfo}
          nodes={nodes}
          edges={edges}
        />
        {openUpdateDonor && (
          <UpdateDonor
            openDialog={openUpdateDonor}
            donor={donor}
            handleClose={() => {
              setOpenUpdateDonor(false);
            }}
            setAction={setAction}
          />
        )}
      </Card>
    </>
  );
};

export default FamiliesTable;
