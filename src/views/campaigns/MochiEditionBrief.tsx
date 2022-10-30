import React, { FC } from 'react';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { MochiEditionLoaded } from 'src/types/MochiEdition';
import { DONOR_STATUSES } from 'src/types/DonorStatuses';

interface MochiEditionBriefProps {
  dataEdition: MochiEditionLoaded;
}

export const MochiEditionBrief: FC<MochiEditionBriefProps> = props => {
  const { dataEdition } = props;

  return (
    <Card>
      <CardContent>
        <Typography gutterBottom variant='h5' component='div' align='center'>
          {'Edición ' + dataEdition.edition + ' - ' + dataEdition.description}
        </Typography>
        <Typography gutterBottom variant='h5' component='div' align='center'>
          {'Proveedor:  ' + dataEdition.provider}
        </Typography>
        <TableContainer>
          <Table sx={{ minWidth: 800 }} aria-label='table in dashboard'>
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell>Familia</TableCell>
                <TableCell>Nombre</TableCell>
                <TableCell>Ciclo</TableCell>
                <TableCell>Nombre Padrino</TableCell>
                <TableCell>Estado</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dataEdition.participants.map(participant => (
                <TableRow key={participant.id}>
                  <TableCell></TableCell>
                  <TableCell>{participant.beneficiary?.familyId}</TableCell>
                  <TableCell>{participant.beneficiaryName}</TableCell>
                  <TableCell>{!!participant.schoolCycle ? participant.schoolCycle : '-'}</TableCell>
                  <TableCell>{!!participant.donorName ? participant.donorName : '-'}</TableCell>
                  <TableCell>{DONOR_STATUSES[participant.state as keyof typeof DONOR_STATUSES]}</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};
