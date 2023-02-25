import React, {useEffect} from 'react';

// ** MUI Imports
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';

// ** Types Imports
import {useQuery} from '@apollo/client';
import Button from '@mui/material/Button';
import {useRouter} from 'next/router';
import {hasWriteAccess, userIsLoggedIn} from 'src/utils/sessionManagement';
import {LinearProgress} from "@mui/material";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import {useAppDispatch, useAppSelector} from "src/hooks/reduxHooks";
import {
  updateCursor,
  updateDonations,
  updateHasNextPage,
  updateHasWriteDonations, updateOpenAddDonation
} from "src/features/donations/donationsSlice";
import Donation from "src/types/donations/Donation";
import DonationRow from "./DonationRow";
import DonationsTablePagination from "./DonationsTablePagination";
import {GET_DONATIONS} from "src/API/Donations/donations_graphql";

export default () => {
  const router = useRouter();
  const donationsSelector = useAppSelector(state => state.donations);
  const dispatch = useAppDispatch();

  const { data, loading, error, refetch } = useQuery(GET_DONATIONS, {
    variables: {
      filter: donationsSelector.filtersApplied,
      first: donationsSelector.paging.limit
    },
  });

  const refetchWithSameParameters = async () => {
    await refetch({filter: donationsSelector.filtersApplied, first: donationsSelector.paging.limit});

  };

  useEffect(() => {
    if (!userIsLoggedIn()) {
      router.push('/login');
    }
    updateHasWriteDonations(hasWriteAccess('Donations'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    refetchWithSameParameters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [donationsSelector.paging.pageCursor, donationsSelector.filtersApplied, donationsSelector.paging.limit]);

  if (error) {
    return (
      <TableRow>
        <TableCell>Error :(</TableCell>
      </TableRow>
    );

  }
  const nodes = data === undefined ? [] : data.donations.nodes;
  const pageInfo = data === undefined ? undefined : data.donations.pageInfo;
  const edges = data === undefined ? [] : data.donations.edges;

  useEffect(() => {
    if( !error ) {
      dispatch(updateDonations(nodes));
    }
  }, [nodes]);

  useEffect(() => {
    if(!error && !!pageInfo) {
      dispatch(updateHasNextPage(pageInfo.hasNextPage));
    }
  }, [pageInfo]);

  useEffect(() => {
    if( !error ) {
      dispatch(updateCursor(edges.cursor));
    }
  }, [edges]);

  return (
    <Card>
      <CardHeader action={<>
        <Button
          variant='contained'
          onClick={() => dispatch(updateOpenAddDonation(true))}
        >
          Agregar Donación
        </Button>
        {/*<ExportButton setAction={setAction} filters={donationsSelector.filtersApplied}/>*/}
      </>} title='Beneficiarios' titleTypographyProps={{variant: 'h6'}}/>
      <TableContainer>
        {loading && <LinearProgress/>}
        <Table sx={{minWidth: 800}} aria-label='table in dashboard'>
          <TableHead>
            <TableRow>
              <TableCell>ID donante</TableCell>
              <TableCell>Motivo</TableCell>
              <TableCell>Cantidad</TableCell>
              <TableCell>Tipo de Pago</TableCell>
              <TableCell>Fecha</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {nodes.map((row: Donation, index: number) => (
              <DonationRow key={index} index={index} donation={row}/>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {pageInfo !== undefined && (
        <DonationsTablePagination/>
      )}
    </Card>
  );
};
