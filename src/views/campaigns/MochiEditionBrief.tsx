import React, { FC, useEffect, useState } from 'react';

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
import { hasWriteAccess } from 'src/utils/sessionManagement';
import Button from '@mui/material/Button';
import { AssignDonor } from './AssignDonor';
import { Action } from 'src/types/Action';

interface MochiEditionBriefProps {
  dataEdition: MochiEditionLoaded;
  setAction: (action: Action) => void;
}

export const MochiEditionBrief: FC<MochiEditionBriefProps> = props => {
  const { dataEdition, setAction } = props;
  const [hasWriteMochi, setHasWriteMochi] = useState<boolean>(false);
  const [openAssignDonor, setOpenAssignDonor] = useState<boolean>(false);
  const [selectedParticipant, setSelectedParticipant] = useState<string>('');

  useEffect(() => {
    setHasWriteMochi(hasWriteAccess('Campaigns'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
                {hasWriteMochi && <TableCell>Acciones</TableCell>}
              </TableRow>
            </TableHead>
            <TableBody>
              {dataEdition.participants.map(participant => (
                <TableRow key={participant.id}>
                  <TableCell></TableCell>
                  <TableCell>{participant.beneficiary?.familyId}</TableCell>
                  <TableCell>{participant.beneficiaryName}</TableCell>
                  <TableCell>{!!participant.schoolCycle ? participant.schoolCycle : '-'}</TableCell>
                  <TableCell>
                    {participant.state !== DONOR_STATUSES.MISSING_DONOR ? participant.donorName : '-'}
                  </TableCell>
                  <TableCell>{DONOR_STATUSES[participant.state as keyof typeof DONOR_STATUSES]}</TableCell>
                  {hasWriteMochi && (
                    <TableCell sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      {participant.state === 'MISSING_DONOR' && (
                        <Button
                          variant='contained'
                          onClick={() => {
                            setSelectedParticipant(participant.id.toString());
                            setOpenAssignDonor(true);
                          }}
                        >
                          Asignar Padrino
                        </Button>
                      )}
                      {participant.state === 'MISSING_DONATION' && (
                        <Button
                          variant='contained'
                          onClick={() => {
                            setSelectedParticipant(participant.id.toString());
                          }}
                        >
                          Pago
                        </Button>
                      )}
                      {participant.state === 'DONATION_RECEIVED' && (
                        <Button
                          variant='contained'
                          onClick={() => {
                            setSelectedParticipant(participant.id.toString());
                          }}
                        >
                          Editar Pago
                        </Button>
                      )}
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {openAssignDonor && (
          <AssignDonor
            openDialog={openAssignDonor}
            handleClose={() => setOpenAssignDonor(false)}
            setAction={setAction}
            participant={selectedParticipant}
          />
        )}
        {/* {openPayment &&
          <AssignPayment/>
        } */}
        {/* {openEditPayment &&

        } */}
      </CardContent>
    </Card>
  );
};
