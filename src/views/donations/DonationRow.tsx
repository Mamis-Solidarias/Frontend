import React, {Fragment} from 'react';

// ** MUI Imports
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

// ** Types Imports
import Donation from "src/types/donations/Donation";
import Campaigns from "src/types/campaigns/Campaigns";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {useRouter} from "next/router";

interface DisplayDonationRowProps {
  donation: Donation;
  key: number;
  index: number;
}

export default (props: DisplayDonationRowProps) => {
  const { donation, index } = props;
  const campaignIndex = donation.motive.split(' ').indexOf('for') + 1;
  const campaing = Campaigns[donation.motive.split(' ')[campaignIndex] as keyof typeof Campaigns];
  const router = useRouter();

  return (
    <Fragment key={index}>
      <TableRow hover sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
        <TableCell>{donation.donor.name}</TableCell>
        <TableCell>{campaing}</TableCell>
        <TableCell>{donation.amount + ' ' + donation.currency}</TableCell>
        <TableCell>{new Date(donation.donatedAt).toLocaleDateString('es-AR')}</TableCell>
        <TableCell>
          <Button variant='contained'
                  onClick={() => {
                    router.push('/donantes?nombre_donante=' + donation.donor.name);
                  }}>
            <Typography color={"white"}>Información Donante</Typography>
          </Button>
        </TableCell>
      </TableRow>
    </Fragment>
  );
};
