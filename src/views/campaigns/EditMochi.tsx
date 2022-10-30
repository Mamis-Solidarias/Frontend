import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';

import { FC, useEffect, useState } from 'react';
import { Action } from 'src/types/Action';
import { defaultEdition, MochiEditionLoaded, MochiEditionModify } from 'src/types/MochiEdition';
import { useModifyMochi } from 'src/hooks/campaigns/useModifyMochi';
import { modifyMochiEdition } from 'src/API/Campaigns/campaigns_data';
import MenuItem from '@mui/material/MenuItem';
import { GET_BENEFICIARIES_LIST } from 'src/API/Beneficiaries/beneficiaries_grapql';
import { useQuery } from '@apollo/client';

interface EditMochiProps {
  openDialog: boolean;
  handleClose: () => void;
  mochiEdition: MochiEditionLoaded;
  setAction: (action: Action) => void;
}

export const EditMochi: FC<EditMochiProps> = props => {
  const { openDialog, handleClose, setAction, mochiEdition } = props;
  const [beneficiaries, setBeneficiaries] = useState<number[]>(
    mochiEdition.participants.map(participant => participant.id)
  );
  const { mochiEdition: mochiEditionFinal, setMochiEdition, setMochiEditionField } = useModifyMochi(mochiEdition);
  const { data, error, loading } = useQuery(GET_BENEFICIARIES_LIST, {
    variables: {
      communityId: mochiEdition.communityId
    }
  });

  useEffect(() => {
    console.log(mochiEdition);
  }, []);

  const resetFields = () => {
    setMochiEdition(defaultEdition);
  };

  const resetAllFields = () => {
    resetFields();
  };

  if (error) {
    return (
      <Dialog
        open={openDialog}
        onClose={() => {
          resetAllFields();
          handleClose();
        }}
        maxWidth='lg'
      >
        <DialogTitle sx={{ display: 'flex', justifyContent: 'center' }}>
          Error cargando los datos de beneficiarios
        </DialogTitle>
      </Dialog>
    );
  }

  if (loading) {
    return (
      <Dialog
        open={openDialog}
        onClose={() => {
          resetAllFields();
          handleClose();
        }}
        maxWidth='lg'
      >
        <DialogTitle sx={{ display: 'flex', justifyContent: 'center' }}>Cargando beneficiarios...</DialogTitle>
      </Dialog>
    );
  }

  return (
    <Dialog
      open={openDialog}
      onClose={() => {
        resetAllFields();
        handleClose();
      }}
      maxWidth='lg'
    >
      <DialogTitle sx={{ display: 'flex', justifyContent: 'center' }}>
        Editar Edición de "Una Mochi como la tuya"
      </DialogTitle>
      <DialogContent>
        <Box>
          <TextField
            id='description'
            type='text'
            inputProps={{ pattern: '^.+$' }}
            label='Descripción'
            placeholder='Edición de Mochi 2022'
            value={mochiEdition.description}
            onChange={(e: any) => {
              setMochiEditionField('description', e.target.value);
            }}
            fullWidth={true}
            variant='standard'
          />
          <TextField
            id='provider'
            type='text'
            inputProps={{ pattern: '^.+$' }}
            label='Proveedor'
            placeholder='Catalan'
            value={mochiEdition.provider}
            onChange={(e: any) => {
              setMochiEditionField('provider', e.target.value);
            }}
            fullWidth={true}
            variant='standard'
          />
          <TextField
            select
            fullWidth={true}
            variant='standard'
            label='Beneficiarios'
            placeholder='Juan Ortega'
            value={beneficiaries}
            onChange={e => {
              setBeneficiaries(e.target.value as any);
            }}
            SelectProps={{ multiple: true }}
          >
            {!!data &&
              data.filteredBeneficiaries.nodes.map(
                (beneficiary: { id: string; firstName: string; lastName: string }) => (
                  <MenuItem value={beneficiary.id} key={beneficiary.id}>
                    {beneficiary.firstName + ' ' + beneficiary.lastName + ' - ' + beneficiary.id}
                  </MenuItem>
                )
              )}
          </TextField>
        </Box>
        <Button
          sx={{ display: 'flex', justifyContent: 'center', width: '100%', marginTop: '1em' }}
          variant='contained'
          onClick={async () => {
            try {
              const mochiEditionParticipantIds = mochiEdition.participants.map(participant => participant.id);
              const benefsAdded = beneficiaries.filter(
                newParticipant => !mochiEditionParticipantIds.includes(newParticipant)
              );
              console.log(benefsAdded, 'a');
              const benefsRemoved = mochiEditionParticipantIds.filter(
                oldParticipant => !beneficiaries.includes(oldParticipant)
              );
              console.log(benefsRemoved, 'r');
              const mochiEditionFinalRevision: MochiEditionModify = {
                addedBeneficiaries: benefsAdded.map(benef => benef),
                removedBeneficiaries: benefsRemoved.map(benef => benef.id),
                description: mochiEditionFinal.description,
                provider: mochiEditionFinal.provider
              };

              await modifyMochiEdition(mochiEditionFinalRevision, mochiEdition.id);
              setAction({
                complete: true,
                success: true,
                message: 'Edición de "Una Mochi como la tuya" modificada exitosamente',
                status: 201
              });
              resetAllFields();
              handleClose();
            } catch (error) {
              setAction({
                complete: true,
                success: false,
                message: 'Ocurrió un error modificando la nueva edición. Intente nuevamente más tarde',
                status: 201
              });
            }
          }}
          disabled={!mochiEdition.edition || !mochiEdition.provider}
        >
          Editar
        </Button>
      </DialogContent>
    </Dialog>
  );
};
