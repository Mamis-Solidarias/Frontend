// ** MUI Imports
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';

// ** Types Imports
import { FC, useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { UpdateCommunity } from './UpdateCommunity';
import Community from 'src/types/Community';
import { GET_COMMUNITIES } from 'src/API/Beneficiaries/beneficiaries_grapql';
import { useBeneficiariesPaging } from 'src/hooks/beneficiaries/useBeneficiariesPaging';
import { useQuery } from '@apollo/client';
import BeneficiaryTablePagination from '../beneficiaries/BeneficiaryTablePagination';
import { useRouter } from 'next/router';
import { Action } from 'src/types/Action';

interface CommunitiesTableProps {
  openCreateCommunities: boolean;
  openWindow: boolean;
  setAction: (action: Action) => void;
}

const CommunitiesTable: FC<CommunitiesTableProps> = props => {
  const { openCreateCommunities, openWindow, setAction } = props;
  const router = useRouter();
  const [id, setId] = useState<string>('');
  const [openUpdateCommunity, setOpenUpdateCommunity] = useState<boolean>(false);
  const { paging, setBeneficiariesPaging } = useBeneficiariesPaging();
  const { loading, error, data, refetch } = useQuery(GET_COMMUNITIES, {
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
    if (!!localStorage.getItem('user') && !openWindow) {
      refetchWithSameParameters();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openCreateCommunities, openWindow]);

  if (loading)
    return (
      <TableRow>
        <TableCell>Cargando...</TableCell>
      </TableRow>
    );

  if (error) {
    return (
      <TableRow>
        <TableCell>Error :(</TableCell>
      </TableRow>
    );
  }

  const nodes = data.communities.nodes;
  const pageInfo = data.communities.pageInfo;
  const edges = data.communities.edges;

  return (
    <>
      <TableContainer>
        <Table sx={{ minWidth: 800 }} aria-label='table in dashboard'>
          <TableHead>
            <TableRow>
              <TableCell>Código</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Dirección</TableCell>
              <TableCell>Descripción</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {nodes.map((row: Community) => (
              <TableRow hover key={row.id} sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
                <TableCell sx={{ py: theme => `${theme.spacing(0.5)} !important` }}>{row.id}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.address}</TableCell>
                <TableCell>{!!row.description ? row.description : '-'}</TableCell>
                <TableCell>
                  <Button
                    variant='contained'
                    onClick={() => {
                      setId(row.id as string);
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
            refetchWithSameParameters();
          }}
          setAction={setAction}
        />
      )}
      <BeneficiaryTablePagination
        paging={paging}
        setBeneficiariesPaging={setBeneficiariesPaging}
        pageInfo={pageInfo}
        nodes={nodes}
        edges={edges}
      />
    </>
  );
};

export default CommunitiesTable;
