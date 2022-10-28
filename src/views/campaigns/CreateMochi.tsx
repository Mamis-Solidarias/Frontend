import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';

import { FC, useEffect, useState } from 'react';
import { Action } from 'src/types/Action';
import { defaultEdition } from 'src/types/MochiEdition';
import { useModifyMochi } from 'src/hooks/campaigns/useModifyMochi';
import { createMochiEdition } from 'src/API/Campaigns/campaigns_data';
import Community from 'src/types/Community';
import { getCommunities } from 'src/API/Beneficiaries/communities_data';
import MenuItem from '@mui/material/MenuItem';
import { GET_BENEFICIARIES_LIST } from 'src/API/Beneficiaries/beneficiaries_grapql';
import { useQuery } from '@apollo/client';

interface CreateMochiProps {
  openDialog: boolean;
  handleClose: () => void;
  setAction: (action: Action) => void;
}

export const CreateMochi: FC<CreateMochiProps> = props => {
  const { openDialog, handleClose, setAction } = props;
  const [communities, setCommunities] = useState<Community[]>([]);
  const { mochiEdition, setMochiEdition, setMochiEditionField } = useModifyMochi();
  const { data, refetch } = useQuery(GET_BENEFICIARIES_LIST, {
    variables: {
      communityId: mochiEdition.communityId
    }
  });

  useEffect(() => {
    getCommunities().then(result => {
      if (!!result.data.communities && result.data.communities.length > 0) {
        setCommunities(result.data.communities);
      }
    });
  }, []);

  const resetFields = () => {
    setMochiEdition(defaultEdition);
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
      <DialogTitle sx={{ display: 'flex', justifyContent: 'center' }}>
        Crear Edición de "Una Mochi como la tuya"
      </DialogTitle>
      <DialogContent>
        <Box>
          <TextField
            id='edition'
            type='text'
            inputProps={{ pattern: '^[1-9][0-9]*$' }}
            label='Edición'
            placeholder='2022'
            value={mochiEdition.edition}
            onChange={(e: any) => {
              setMochiEditionField('edition', e.target.value);
            }}
            fullWidth={true}
            variant='standard'
          />
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
            label='Comunidad'
            placeholder='Misiones'
            value={mochiEdition.communityId}
            onChange={e => {
              setMochiEditionField('communityId', e.target.value);
              refetch({ communityId: e.target.value });
            }}
          >
            <MenuItem value=''>Ninguna</MenuItem>
            {communities.map((community: Community) => (
              <MenuItem value={community.id} key={community.id}>
                {community.name}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            fullWidth={true}
            variant='standard'
            label='Beneficiarios'
            placeholder='Juan Ortega'
            value={mochiEdition.beneficiaries}
            onChange={e => setMochiEditionField('beneficiaries', e.target.value)}
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
              await createMochiEdition(mochiEdition);
              setAction({
                complete: true,
                success: true,
                message: 'Edición de "Una Mochi como la tuya" creado exitosamente',
                status: 201
              });
              resetAllFields();
              handleClose();
            } catch (error) {
              setAction({
                complete: true,
                success: false,
                message: 'Ocurrió un error creando la nueva edición. Intente nuevamente más tarde',
                status: 201
              });
            }
          }}
          disabled={!mochiEdition.edition || !mochiEdition.provider}
        >
          Crear
        </Button>
      </DialogContent>
    </Dialog>
  );
};
