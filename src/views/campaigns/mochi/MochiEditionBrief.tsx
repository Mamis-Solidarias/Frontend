import React, { FC, useEffect, useState } from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { MochiEditionLoaded } from 'src/types/campaigns/MochiEdition';
import { DONOR_STATUSES } from 'src/types/donors/DonorStatuses';
import { hasWriteAccess } from 'src/utils/sessionManagement';
import { SCHOOL_CYCLES } from 'src/types/beneficiaries/SchoolYear';
import Button from '@mui/material/Button';
import { AssignDonor } from '../AssignDonor';
import { Action } from 'src/types/Action';
import Box from '@mui/material/Box';
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks';
import {
  updateAssignPayment,
  updateCampaign,
  updateCampaignId,
  updateDonorId,
  updateParticipantId
} from '../../../features/campaigns/paymentSlice';
import AssignPayment from './AssignPayment';

interface MochiEditionBriefProps {
  dataEdition: MochiEditionLoaded;
  setAction: (action: Action) => void;
}

export const MochiEditionBrief: FC<MochiEditionBriefProps> = props => {
  const dispatch = useAppDispatch();
  const campaignPaymentSelector = useAppSelector(state => state.campaignPayment);
  const { dataEdition, setAction } = props;
  const [hasWriteMochi, setHasWriteMochi] = useState<boolean>(false);
  const [openAssignDonor, setOpenAssignDonor] = useState<boolean>(false);
  const [selectedParticipant, setSelectedParticipant] = useState<string>('');

  useEffect(() => {
    setHasWriteMochi(hasWriteAccess('Campaigns'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box>
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
                <TableCell>{participant.beneficiary?.firstName + ' ' + participant.beneficiary?.lastName}</TableCell>
                <TableCell>
                  {!!participant.schoolCycle
                    ? SCHOOL_CYCLES[participant.schoolCycle as keyof typeof SCHOOL_CYCLES]
                    : '-'}
                </TableCell>
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
                        <Typography color={'white'}>Asignar Padrino</Typography>
                      </Button>
                    )}
                    {participant.state === 'MISSING_DONATION' && (
                      <Button
                        variant='contained'
                        onClick={() => {
                          dispatch(updateParticipantId(participant.id));
                          dispatch(updateDonorId(participant.donorId));
                          dispatch(updateCampaignId(participant.campaignId));
                          dispatch(updateCampaign('UnaMochiComoLaTuya'));
                          dispatch(updateAssignPayment(true));
                        }}
                      >
                        <Typography color={'white'}>Asignar Pago</Typography>
                      </Button>
                    )}
                    {participant.state === 'DONATION_RECEIVED' && <>-</>}
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
      {campaignPaymentSelector.assignPayment && <AssignPayment setAction={setAction} />}
      {/* {openEditPayment &&

        } */}
    </Box>
  );
};
