import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import React from "react";
import {useQuery} from "@apollo/client";
import {GET_DONATION} from "src/API/Campaigns/campaigns_graphql";
import Box from "@mui/material/Box";
import Donation from "src/types/donations/Donation";
import Button from "@mui/material/Button";
import {useRouter} from "next/router";
import Typography from "@mui/material/Typography";

interface DonationProps {
  donationId: string;
}

export default (props: DonationProps) => {
  const {donationId} = props;
  const router = useRouter();
  const {loading, error, data} = useQuery(GET_DONATION, {variables: {id: donationId}});

  if (loading) return <Box>Cargando donación...</Box>;
  if (error) return <Box>Error :(</Box>;
  const donationData: Donation = data.monetaryDonation;

  return <TableRow key={donationData.id}>
    <TableCell>{donationData.donor.name}</TableCell>
    <TableCell>{donationData.amount + ' ' + donationData.currency}</TableCell>
    <TableCell>{new Date(donationData.donatedAt).toLocaleDateString('es-AR')}</TableCell>
    <TableCell>
      <Button variant='contained'
              onClick={() => {
                router.push('/donantes?nombre_donante=' + donationData.donor.name);
              }}>
        <Typography color={"white"}>Información Donante</Typography>
      </Button>
    </TableCell>
  </TableRow>
}
