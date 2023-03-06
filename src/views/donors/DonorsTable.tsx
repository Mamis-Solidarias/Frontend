import React, {FC} from 'react';

// ** MUI Imports
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';

// ** Types Imports
import {useEffect, useState} from 'react';
import {UpdateDonor} from './UpdateDonor';
import {useQuery} from '@apollo/client';
import {useDonorsPaging} from 'src/hooks/donors/useDonorsPaging';
import {GET_DONORS} from 'src/API/Donors/donors_graphql';
import DonorsTablePagination from './DonorsTablePagination';
import {Donor} from 'src/types/donors/Donor';
import Button from '@mui/material/Button';
import {useRouter} from 'next/router';
import {Action} from 'src/types/Action';
import {hasWriteAccess, userIsLoggedIn} from 'src/utils/sessionManagement';
import {Card, CardHeader, LinearProgress, Typography} from "@mui/material";
import {DonorsFilters} from "src/types/donors/DonorsFilters";

interface DonorsTableProps {
  openCreateDonor: boolean;
  setAction: (action: Action) => void;
  filters: DonorsFilters;
}

const DonorsTable: FC<DonorsTableProps> = props => {
  const {openCreateDonor, setAction, filters} = props;
  const router = useRouter();
  const [donor, setDonor] = useState<Donor | null>(null);
  const [openUpdateDonor, setOpenUpdateDonor] = useState<boolean>(false);
  const [hasWriteDonors, setHasWriteDonors] = useState<boolean>(false);
  const {paging, setDonorsPaging} = useDonorsPaging();
  const {loading, error, data, refetch} = useQuery(GET_DONORS, {
    variables: {
      after: paging.pageCursor,
      limit: paging.limit,
      isGodFather: filters.isGodFather,
      name: filters.name,
      ownerId: filters.ownerId,
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
    } else {
      setHasWriteDonors(hasWriteAccess('Donors'));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (userIsLoggedIn() && !openUpdateDonor && !openCreateDonor) {
      refetchWithSameParameters();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openUpdateDonor, openCreateDonor]);

  if (error && !data) {
    router.push('/login');

    return (
      <TableRow>
        <TableCell>Error :(</TableCell>
      </TableRow>
    );
  }

  const nodes = data === undefined ? [] : data.donors.nodes;
  const pageInfo = data === undefined ? undefined : data.donors.pageInfo;
  const edges = data === undefined ? [] : data.donors.edges;

  return (
    <Card>
      <CardHeader
        action={props.children}
        title='Donantes'
        titleTypographyProps={{variant: 'h6'}}
      />
      <TableContainer>
        {loading && <LinearProgress/>}
        <Table sx={{minWidth: 800}} aria-label='table in dashboard'>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>DNI</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Email de MP</TableCell>
              <TableCell>Teléfono</TableCell>
              <TableCell>Padrinazgo</TableCell>
              <TableCell>Creador</TableCell>
              {hasWriteDonors && <TableCell>Acciones</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {nodes.map((row: Donor) => (
              <TableRow sx={{'&:last-of-type td, &:last-of-type th': {border: 0}}} key={row.id}>
                <TableCell sx={{py: theme => `${theme.spacing(0.5)} !important`}}>{row.id}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.dni}</TableCell>
                <TableCell>{row.email ? row.email : '-'}</TableCell>
                <TableCell>{row.mercadoPagoEmail ? row.mercadoPagoEmail : '-'}</TableCell>
                <TableCell>{row.phone ? row.phone : '-'}</TableCell>
                <TableCell>{row.isGodFather ? 'Es padrino' : 'No es padrino'}</TableCell>
                <TableCell>{row.owner?.name}</TableCell>
                {hasWriteDonors && (
                  <TableCell sx={{display: 'flex', flexDirection: 'column'}}>
                    <Button
                      variant='contained'
                      sx={{my: '.5em'}}
                      onClick={() => {
                        if (!!row.id) {
                          setDonor(row);
                          setOpenUpdateDonor(true);
                        }
                      }}
                    >
                      <Typography color={'white'}> Editar</Typography>
                    </Button>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {pageInfo !== undefined && (
        <DonorsTablePagination
          paging={paging}
          setDonorsPaging={setDonorsPaging}
          pageInfo={pageInfo}
          nodes={nodes}
          edges={edges}
        />
      )}

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
  );
};

export default DonorsTable;
