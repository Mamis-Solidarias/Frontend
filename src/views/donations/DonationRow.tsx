import  {Fragment} from 'react';

// ** MUI Imports
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

// ** Types Imports
import Donation from "src/types/donations/Donation";
import Campaigns from "src/types/campaigns/Campaigns";

interface DisplayDonationRowProps {
  donation: Donation;
  key: number;
  index: number;
}

export default (props: DisplayDonationRowProps) => {
  const { donation, index } = props;
  const campaignIndex = donation.motive.split(' ').indexOf('for') + 1;
  const campaing = Campaigns[donation.motive.split(' ')[campaignIndex] as keyof typeof Campaigns];

  return (
    <Fragment key={index}>
      <TableRow hover sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
        <TableCell>{donation.donorId}</TableCell>
        <TableCell>{campaing}</TableCell>
        <TableCell>{donation.amount}</TableCell>
        <TableCell>{donation.currency}</TableCell>
        <TableCell>{new Date(donation.donatedAt).toLocaleDateString('es-AR')}</TableCell>
      </TableRow>
    </Fragment>
  );
};
