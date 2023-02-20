import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';

import { FC, useEffect, useState } from 'react';
import { Action } from 'src/types/Action';
import { defaultEdition, MochiEdition } from 'src/types/campaigns/MochiEdition';
import { useModifyMochi } from 'src/hooks/campaigns/useModifyMochi';
import { createMochiEdition } from 'src/API/Campaigns/campaigns_data';
import Community from 'src/types/beneficiaries/Community';
import MenuItem from '@mui/material/MenuItem';
import {GET_BENEFICIARIES, GET_COMMUNITIES} from 'src/API/Beneficiaries/beneficiaries_grapql';
import { useQuery } from '@apollo/client';
import BeneficiariesFiltersView from '../../beneficiaries/BeneficiariesFiltersViewSimple';
import Beneficiary from 'src/types/beneficiaries/Beneficiary';
import { BeneficiariesFilters, beneficiariesFiltersNull } from 'src/types/beneficiaries/BeneficiariesFilters';
import BeneficiariesTable from 'src/views/beneficiaries/BeneficiariesTableJustView';

interface CreateMochiProps {
  openDialog: boolean;
  handleClose: () => void;
  setAction: (action: Action) => void;
}

export const CreateMochi: FC<CreateMochiProps> = props => {
  const { openDialog, handleClose, setAction } = props;
  const [filtersApplied, setFiltersApplied] = useState<BeneficiariesFilters>(beneficiariesFiltersNull);
  const {data: dataCommunities} = useQuery(GET_COMMUNITIES);
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
      isActive: !!filtersApplied.isActive ? (filtersApplied.isActive === 'true') : null
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
      isActive: !!filtersApplied.isActive ? (filtersApplied.isActive === 'true') : null
    });
  };

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
            sx={{py: '.3em'}}
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
            sx={{py: '.3em'}}
            inputProps={{ pattern: '^.+$' }}
            label='Descripción (opcional)'
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
            sx={{py: '.3em'}}
            inputProps={{ pattern: '^.+$' }}
            label='Proveedor (opcional)'
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
            sx={{py: '.3em'}}
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
            {!!dataCommunities?.communities?.nodes && dataCommunities.communities.nodes.map((community: Community) => (
              <MenuItem value={community.id} key={community.id}>
                {community.id + ' - ' + community.name}
              </MenuItem>
            ))}
          </TextField>
        </Box>
        <BeneficiariesFiltersView
          communityId={mochiEdition.communityId}
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
          disabled={!mochiEdition.edition || !data || data.filteredBeneficiaries.nodes.length === 0}
        >
          Crear
        </Button>
      </DialogContent>
    </Dialog>
  );
};
