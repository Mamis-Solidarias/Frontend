import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';

import { FC, useState } from 'react';
import { Donor } from 'src/types/donors/Donor';
import { Action } from 'src/types/Action';
import Autocomplete from '@mui/material/Autocomplete';
import { useQuery } from '@apollo/client';
import { GET_DONORS } from 'src/API/Donors/donors_graphql';
import Grid from '@mui/material/Grid';
import { assignDonor } from 'src/API/Campaigns/campaigns_data';
import { CampaignDonor, defaultCampaignDonor } from 'src/types/campaigns/CampaignDonor';
import { DONATION_TYPES } from 'src/types/donors/DonationTypes';

interface AssignDonorProps {
  participant: string;
  openDialog: boolean;
  setAction: (action: Action) => void;
  handleClose: () => void;
}

export const AssignDonor: FC<AssignDonorProps> = props => {
  const { participant, openDialog, setAction, handleClose } = props;
  const [donor, setDonor] = useState<CampaignDonor>(defaultCampaignDonor);
  const { data } = useQuery(GET_DONORS, {
    variables: {
      isGodFather: true,
      limit: 50,
    }
  });

  const resetFields = () => {
    if (!!donor) {
      setDonor(defaultCampaignDonor);
    }
  };

  const resetAllFields = () => {
    resetFields();
  };

  return (
    <Dialog
      open={openDialog}
      onClose={() => {
        resetAllFields();
        handleClose();
      }}
      maxWidth='lg'
    >
      <DialogTitle sx={{ display: 'flex', justifyContent: 'center' }}>Asignar Donante</DialogTitle>
      <DialogContent>
        <Box>
          <Grid xs={12} sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <Grid xs={5}>
              <Autocomplete
                sx={{ marginTop: '0.5em' }}
                options={
                  !!data && data.donors.nodes.length > 0
                    ? data.donors.nodes.map((donor: Donor) => ({ label: donor.name, id: donor.id }))
                    : []
                }
                onChange={(e: any, newValue: { label: string; id: string }) => {
                  setDonor(oldDonor => ({ ...oldDonor, ...{ donorId: newValue?.id } }));
                }}
                value={
                  !!data
                    ? data.donors.nodes.find((donorFromData: Donor) => donorFromData.id === donor.donorId)
                    : undefined
                }
                renderInput={params => <TextField {...params} label='Donante' />}
              />
            </Grid>
            <Grid xs={6}>
              <Autocomplete
                sx={{ marginTop: '0.5em' }}
                options={Object.entries(DONATION_TYPES).map(entry => {
                  const [donationEnglish, donationSpanish] = entry;

                  return { label: donationSpanish, id: donationEnglish };
                })}
                onChange={(e: any, newValue: { label: string; id: string }) => {
                  setDonor(oldDonor => ({ ...oldDonor, ...{ donationType: newValue?.id } }));
                }}
                value={
                  !!data
                    ? data.donors.nodes.find((donorFromData: Donor) => donorFromData.id === donor.donorId)
                    : undefined
                }
                renderInput={params => <TextField {...params} label='Bono o Kit' />}
              />
            </Grid>
          </Grid>
          <TextField
            id='deliveryAddress'
            type='text'
            sx={{ py: '.3em' }}
            inputProps={{ pattern: '^.+$' }}
            label='Punto de Entrega'
            placeholder='Las Lilas 888'
            value={donor.donationDropOffLocation}
            onChange={(e: any) => {
              setDonor(oldDonor => ({ ...oldDonor, ...{ donationDropOffLocation: e.target.value } }));
            }}
            fullWidth={true}
            variant='standard'
          />
          <TextField
            id='observations'
            type='text'
            sx={{ py: '.3em' }}
            inputProps={{ pattern: '^.+$' }}
            label='Observaciones'
            placeholder='Solo puede hasta $400'
            value={donor.observations}
            onChange={(e: any) => {
              setDonor(oldDonor => ({ ...oldDonor, ...{ observations: e.target.value } }));
            }}
            fullWidth={true}
            variant='standard'
          />
        </Box>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }}>
          <Button
            sx={{ display: 'flex', justifyContent: 'center', margin: '1%', width: '100%' }}
            variant='outlined'
            onClick={() => {
              handleClose();
              resetAllFields();
            }}
          >
            Cancelar
          </Button>
          <Button
            sx={{ display: 'flex', justifyContent: 'center', margin: '1%', width: '100%' }}
            variant='contained'
            onClick={async () => {
              try {
                await assignDonor(participant, donor);
                setAction({
                  complete: true,
                  success: true,
                  status: 200,
                  message: 'Donante asignado exitosamente'
                });
                resetAllFields();
                handleClose();
              } catch (e) {
                setAction({
                  complete: true,
                  success: false,
                  status: 400,
                  message: 'Ha ocurrido un problema asignando los datos del donante. Intente nuevamente más tarde'
                });
              }
            }}
            disabled={!donor.donorId || !donor.donationDropOffLocation || !donor.donationType}
          >
            Asignar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
