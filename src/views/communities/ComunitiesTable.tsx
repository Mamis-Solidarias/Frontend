// ** MUI Imports
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';

// ** Types Imports
import React, { FC, useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { UpdateCommunity } from './UpdateCommunity';
import Community from 'src/types/beneficiaries/Community';
import { GET_COMMUNITIES } from 'src/API/Beneficiaries/beneficiaries_grapql';
import { useBeneficiariesPaging } from 'src/hooks/beneficiaries/useBeneficiariesPaging';
import { useQuery } from '@apollo/client';
import BeneficiaryTablePagination from '../beneficiaries/BeneficiaryTablePagination';
import { useRouter } from 'next/router';
import { Action } from 'src/types/Action';
import { hasWriteAccess, userIsLoggedIn } from 'src/utils/sessionManagement';
import { LinearProgress, Typography } from '@mui/material';
import CardHeader from '@mui/material/CardHeader';
import Card from '@mui/material/Card';

interface CommunitiesTableProps {
  openCreateCommunities: boolean;
  openWindow: boolean;
  setAction: (action: Action) => void;
  children: any;
}

const CommunitiesTable: FC<CommunitiesTableProps> = props => {
  const { openCreateCommunities, openWindow, setAction } = props;
  const router = useRouter();
  const [id, setId] = useState<string>('');
  const [openUpdateCommunity, setOpenUpdateCommunity] = useState<boolean>(false);
  const [hasWriteBenefs, setHasWriteBenefs] = useState<boolean>(false);
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
    if (!userIsLoggedIn()) {
      router.push('/login');
    }
    setHasWriteBenefs(hasWriteAccess('Beneficiaries'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (userIsLoggedIn() && !openWindow) {
      refetchWithSameParameters();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openCreateCommunities, openWindow]);

  if (error) {
    router.push('/login');

    return (
      <TableRow>
        <TableCell>Error :(</TableCell>
      </TableRow>
    );
  }

  const nodes = data === undefined ? [] : data.communities.nodes;
  const pageInfo = data === undefined ? undefined : data.communities.pageInfo;
  const edges = data === undefined ? [] : data.communities.edges;
  const totalCount =  data === undefined ? [] : data.communities.totalCount;

  return (
    <Card>
      <CardHeader action={props.children} title='Comunidades' titleTypographyProps={{ variant: 'h6' }} />
      <TableContainer>
        {loading && <LinearProgress />}
        <Table sx={{ minWidth: 800 }} aria-label='table in dashboard'>
          <TableHead>
            <TableRow>
              <TableCell>Código</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Dirección</TableCell>
              <TableCell>Descripción</TableCell>
              {hasWriteBenefs && <TableCell>Acciones</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {nodes.map((row: Community) => (
              <TableRow hover key={row.id} sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
                <TableCell sx={{ py: theme => `${theme.spacing(0.5)} !important` }}>{row.id}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.address}</TableCell>
                <TableCell>{!!row.description ? row.description : '-'}</TableCell>
                {hasWriteBenefs && (
                  <TableCell>
                    <Button
                      variant='contained'
                      onClick={() => {
                        setId(row.id as string);
                        setOpenUpdateCommunity(true);
                      }}
                    >
                      <Typography color={'white'}>Editar Datos</Typography>
                    </Button>
                  </TableCell>
                )}
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
      {pageInfo !== undefined && (
        <BeneficiaryTablePagination
          totalCount={totalCount}
          paging={paging}
          setBeneficiariesPaging={setBeneficiariesPaging}
          pageInfo={pageInfo}
          nodes={nodes}
          edges={edges}
        />
      )}
    </Card>
  );
};

export default CommunitiesTable;
