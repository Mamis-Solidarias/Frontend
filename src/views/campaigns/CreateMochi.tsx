import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';

import { FC, useEffect, useState } from 'react';
import { Action } from 'src/types/Action';
import { defaultEdition, MochiEdition } from 'src/types/MochiEdition';
import { useModifyMochi } from 'src/hooks/campaigns/useModifyMochi';
import { createMochiEdition } from 'src/API/Campaigns/campaigns_data';
import Community from 'src/types/Community';
import { getCommunities, getFamiliesByCommunity } from 'src/API/Beneficiaries/communities_data';
import MenuItem from '@mui/material/MenuItem';
import { GET_BENEFICIARIES } from 'src/API/Beneficiaries/beneficiaries_grapql';
import { useQuery } from '@apollo/client';
import { useBeneficiariesFilters } from 'src/hooks/beneficiaries/useBeneficiariesFilters';
import { BeneficiariesFilters, beneficiariesFiltersNull } from 'src/types/BeneficiariesFilters';
import BeneficiariesFiltersView from '../beneficiaries/BeneficiariesFiltersViewSimple';
import Family from 'src/types/Family';
import BeneficiariesTable from 'src/views/beneficiaries/BeneficiariesTableJustView';
import Beneficiary from 'src/types/Beneficiary';

interface CreateMochiProps {
  openDialog: boolean;
  handleClose: () => void;
  setAction: (action: Action) => void;
  onNetworkError: (err: any) => void;
}

export const CreateMochi: FC<CreateMochiProps> = props => {
  const { openDialog, handleClose, setAction, onNetworkError } = props;
  const [filtersApplied, setFiltersApplied] = useState<BeneficiariesFilters>(beneficiariesFiltersNull);
  const [communities, setCommunities] = useState<Community[]>([]);
  const { mochiEdition, setMochiEdition, setMochiEditionField } = useModifyMochi();
  const { error, loading, data, refetch } = useQuery(GET_BENEFICIARIES, {
    variables: {
      ageStart: isNaN(parseInt(filtersApplied.ageStart as string))
        ? filtersApplied.ageStart
        : parseInt(filtersApplied.ageStart as string),
      ageEnd: isNaN(parseInt(filtersApplied.ageEnd as string))
        ? filtersApplied.ageEnd
        : parseInt(filtersApplied.ageEnd as string),
      lastName: filtersApplied.lastName,
      firstName: filtersApplied.firstName,
      type: filtersApplied.type,
      dniStarts: filtersApplied.dniStarts,
      familyId: filtersApplied.familyId,
      communityId: mochiEdition.communityId,
      school: filtersApplied.school,
      gender: filtersApplied.gender,
      isActive: !!filtersApplied.isActive ? (filtersApplied.isActive === 'true' ? true : false) : null
    }
  });

  const refetchWithSameParameters = () => {
    refetch({
      ageStart: isNaN(parseInt(filtersApplied.ageStart as string))
        ? filtersApplied.ageStart
        : parseInt(filtersApplied.ageStart as string),
      ageEnd: isNaN(parseInt(filtersApplied.ageEnd as string))
        ? filtersApplied.ageEnd
        : parseInt(filtersApplied.ageEnd as string),
      lastName: filtersApplied.lastName,
      firstName: filtersApplied.firstName,
      type: filtersApplied.type,
      dniStarts: filtersApplied.dniStarts,
      familyId: filtersApplied.familyId,
      communityId: mochiEdition.communityId,
      school: filtersApplied.school,
      gender: filtersApplied.gender,
      isActive: !!filtersApplied.isActive ? (filtersApplied.isActive === 'true' ? true : false) : null
    });
  };

  useEffect(() => {
    getCommunities().then(result => {
      if (!!result.data.communities && result.data.communities.length > 0) {
        setCommunities(result.data.communities);
      }
    });
  }, []);

  useEffect(() => {
    refetchWithSameParameters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filtersApplied]);

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
        </Box>
        <BeneficiariesFiltersView
            communityId={mochiEdition.communityId}
            onNetworkError={onNetworkError}
            onSetFiltersAction={(filters: BeneficiariesFilters) => {
              const filtersToApply = filters;
              for (const fk in filtersToApply) {
                if (!filtersToApply[fk as keyof BeneficiariesFilters]) {
                  filtersToApply[fk as keyof BeneficiariesFilters] = null;
                }
              }
              setFiltersApplied(filtersToApply);
              setAction({
                complete: true,
                success: true,
                message: 'Filtros aplicados exitosamente',
                status: 200
              });
            }}
          />
          {error && <Box>Error cargando los datos de beneficiarios</Box>}
          {loading && <Box>Cargando beneficiarios...</Box>}
          {!error && !loading && (
            <BeneficiariesTable beneficiaries={data?.filteredBeneficiaries.nodes as Beneficiary[]} />
          )}
        <Button
          sx={{ display: 'flex', justifyContent: 'center', width: '100%', marginTop: '1em' }}
          variant='contained'
          onClick={async () => {
            try {
              const mochiEditionFinalReview = mochiEdition as MochiEdition;
              mochiEditionFinalReview.beneficiaries = data.filteredBeneficiaries.nodes.map(
                (beneficiary: Beneficiary) => beneficiary.id
              );
              await createMochiEdition(mochiEditionFinalReview);
              setAction({
                complete: true,
                success: true,
                message: 'Edición de "Una Mochi como la tuya" creado exitosamente',
                status: 201
              });
              resetAllFields();
              handleClose();
            } catch (error) {
              console.log(error);
              setAction({
                complete: true,
                success: false,
                message: 'Ocurrió un error creando la nueva edición. Intente nuevamente más tarde',
                status: 201
              });
            }
          }}
          disabled={
            !mochiEdition.edition || !mochiEdition.provider || !data || data.filteredBeneficiaries.nodes.length === 0
          }
        >
          Crear
        </Button>
      </DialogContent>
    </Dialog>
  );
};
