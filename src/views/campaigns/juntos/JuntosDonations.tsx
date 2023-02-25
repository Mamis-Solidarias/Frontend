import {JuntosEdition} from "src/types/campaigns/JuntosEdition";
import Card from "@mui/material/Card";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import React from "react";
import Donation from "./Donation";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import {
  updateAssignPayment,
  updateCampaign,
  updateCampaignId,
} from "src/features/campaigns/paymentSlice";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {useAppDispatch} from "src/hooks/reduxHooks";

interface JuntosBriefInformation {
  juntosEdition: JuntosEdition
}

export default (props: JuntosBriefInformation) => {
  const {juntosEdition} = props;
  const dispatch = useAppDispatch();


  return <Card sx={{marginTop: '.5em'}}>
    <CardHeader title={'Donaciones'} action={<Button
      variant='contained'
      onClick={() => {
        !!juntosEdition.id && dispatch(updateCampaignId(parseInt(juntosEdition.id)));
        dispatch(updateCampaign("JuntosALaPar"))
        dispatch(updateAssignPayment(true));
      }}
    >
      <Typography color={'white'}>Nueva Donación</Typography>
    </Button>}/>
    <CardContent>
      <TableContainer>
        <Table sx={{minWidth: 800}} aria-label='table in dashboard'>
          <TableHead>
            <TableRow>
              <TableCell>ID Donante</TableCell>
              <TableCell>Cantidad</TableCell>
              <TableCell>Tiempo Donación</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {juntosEdition.donations.map(donation => (<Donation key={donation.id} donationId={donation.id}/>))}
          </TableBody>
        </Table>
      </TableContainer>
    </CardContent>
  </Card>
}
