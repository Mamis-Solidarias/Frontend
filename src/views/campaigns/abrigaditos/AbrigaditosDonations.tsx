import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import React from 'react';
import Donation from '../Donation';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import { updateAssignPayment, updateCampaign, updateCampaignId } from 'src/features/campaigns/paymentSlice';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useAppDispatch } from 'src/hooks/reduxHooks';
import { AbrigaditosEdition } from 'src/types/campaigns/AbrigaditosEdition';

interface JuntosBriefInformation {
  abrigaditosEdition: AbrigaditosEdition;
}

export default (props: JuntosBriefInformation) => {
  const { abrigaditosEdition } = props;
  const dispatch = useAppDispatch();

  return (
    <Card sx={{ marginTop: '.5em' }}>
      <CardHeader
        title={'Donaciones'}
        action={
          <Button
            variant='contained'
            onClick={() => {
              !!abrigaditosEdition.id && dispatch(updateCampaignId(parseInt(abrigaditosEdition.id)));
              dispatch(updateCampaign('Abrigaditos'));
              dispatch(updateAssignPayment(true));
            }}
          >
            <Typography color={'white'}>Nueva Donación</Typography>
          </Button>
        }
      />
      <CardContent>
        <TableContainer>
          <Table sx={{ minWidth: 800 }} aria-label='table in dashboard'>
            <TableHead>
              <TableRow>
                <TableCell>Nombre Donante</TableCell>
                <TableCell>Cantidad</TableCell>
                <TableCell>Tiempo Donación</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {abrigaditosEdition.donations.map(donation => (
                <Donation key={donation.id} donationId={donation.id} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};
