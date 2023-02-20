import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import React from "react";
import {useQuery} from "@apollo/client";
import {GET_JUNTOS_DONATION} from "src/API/Campaigns/campaigns_graphql";
import Box from "@mui/material/Box";
import Donation from "src/types/donations/Donation";

interface DonationProps {
  donationId: string;
}

export default (props: DonationProps) => {
  const {donationId} = props;

  const {loading, error,data} = useQuery(GET_JUNTOS_DONATION, {variables: {id: donationId}});

  if (loading) return <Box>Cargando donación...</Box>;
  if (error) return <Box>Error :(</Box>;
  const donationData: Donation = data.monetaryDonation;

  return <TableRow key={donationData.id}>
    <TableCell>{donationData.donorId}</TableCell>
    <TableCell>{donationData.currency}</TableCell>
    <TableCell>{donationData.amount}</TableCell>
    <TableCell>{new Date(donationData.donatedAt).toLocaleDateString('es-AR')}</TableCell>
  </TableRow>
}
