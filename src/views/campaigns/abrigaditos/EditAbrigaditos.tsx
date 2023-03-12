import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';

import { Action } from 'src/types/Action';
import { modifyAbrigaditosEdition } from 'src/API/Campaigns/campaigns_data';
import { GET_BENEFICIARIES } from 'src/API/Beneficiaries/beneficiaries_grapql';
import { useQuery } from '@apollo/client';
import Beneficiary from 'src/types/beneficiaries/Beneficiary';
import BeneficiariesTable from 'src/views/beneficiaries/BeneficiariesTableJustView';
import { useAppDispatch, useAppSelector } from 'src/hooks/reduxHooks';
import BeneficiariesFiltersView from 'src/views/beneficiaries/BeneficiariesFiltersViewSimple';
import { BeneficiariesFilters } from 'src/types/beneficiaries/BeneficiariesFilters';
import { updateFiltersApplied } from 'src/features/beneficiaries/beneficiariesSlice';
import { useEffect } from 'react';
import {
  AbrigaditosEdition,
  AbrigaditosEditionModify,
  defaultEditionModify,
  Participant
} from 'src/types/campaigns/AbrigaditosEdition';
import { updateEditAbrigaditos, updateOpenEditAbrigaditos } from 'src/features/campaigns/abrigaditosSlice';

interface EditAbrigaditosProps {
  setAction: (action: Action) => void;
  refetchAbrigaditos: () => void;
  dataEdition: AbrigaditosEdition;
}

export default (props: EditAbrigaditosProps) => {
  const { setAction, refetchAbrigaditos, dataEdition } = props;
  const dispatch = useAppDispatch();
  const beneficiariesSelector = useAppSelector(state => state.beneficiaries);
  const abrigaditosSelector = useAppSelector(state => state.abrigaditos);
  const getBeneficiariesFilters = (filtersApplied: BeneficiariesFilters) => {
    return {
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
      communityId: filtersApplied.communityCode,
      school: filtersApplied.school,
      gender: filtersApplied.gender,
      isActive: !!filtersApplied.isActive ? filtersApplied.isActive === 'true' : null
    };
  };
  const {
    error: errorBeneficiaries,
    loading: loadingBeneficiaries,
    data: dataBeneficiaries,
    refetch: refetchBeneficiaries
  } = useQuery(GET_BENEFICIARIES, {
    variables: getBeneficiariesFilters(beneficiariesSelector.filtersApplied)
  });

  const onSetFiltersAction = (filters: BeneficiariesFilters) => {
    const filtersToApply = { ...filters };
    for (const key of Object.keys(filtersToApply)) {
      if (!filtersToApply[key as keyof BeneficiariesFilters]) {
        filtersToApply[key as keyof BeneficiariesFilters] = null;
      }
    }
    dispatch(updateFiltersApplied(filtersToApply));
    refetchBeneficiaries(getBeneficiariesFilters(filtersToApply));
    setAction({
      complete: true,
      success: true,
      message: 'Filtros aplicados exitosamente',
      status: 200
    });
  };

  useEffect(() => {
    dispatch(
      updateEditAbrigaditos({
        ...abrigaditosSelector.editAbrigaditos,
        ...{
          description: dataEdition.description,
          provider: dataEdition.provider,
          fundraiserGoal: dataEdition.fundraiserGoal
        }
      })
    );
  }, [abrigaditosSelector.openEditAbrigaditos]);

  const editAbrigaditos = async () => {
    try {
      const previousBeneficiaries = dataEdition?.participants?.map(
        (participant: Participant) => participant.beneficiaryId
      );
      const newBeneficiaries = abrigaditosSelector.editAbrigaditos.newBeneficiaries;
      let removedBeneficiaries: number[] = [];
      if (!!previousBeneficiaries) {
        removedBeneficiaries = previousBeneficiaries.filter(
          (participant: number) => !newBeneficiaries.includes(participant)
        );
      }
      const addedBeneficiaries = newBeneficiaries.filter(
        (participant: number) => !previousBeneficiaries?.includes(participant)
      );
      const abrigaditosEditionFinalReview: AbrigaditosEditionModify = {
        ...abrigaditosSelector.editAbrigaditos,
        ...{ addedBeneficiaries, removedBeneficiaries }
      };
      await modifyAbrigaditosEdition(abrigaditosEditionFinalReview, dataEdition.id as string);
      dispatch(updateEditAbrigaditos(defaultEditionModify));
      setAction({
        complete: true,
        success: true,
        message: 'Edición de "Abrigaditos" modificada exitosamente',
        status: 201
      });
      if (!!abrigaditosSelector.refetchEditions) {
        abrigaditosSelector.refetchEditions(abrigaditosSelector.campaign);
      }
    } catch (error) {
      setAction({
        complete: true,
        success: false,
        message: 'Ocurrió un error creando la nueva edición. Intente nuevamente más tarde',
        status: 201
      });
    }
    dispatch(updateEditAbrigaditos(defaultEditionModify));
    dispatch(updateOpenEditAbrigaditos(false));
  };

  return (
    <Dialog
      open={abrigaditosSelector.openEditAbrigaditos}
      onClose={() => {
        refetchAbrigaditos();
        dispatch(updateEditAbrigaditos(defaultEditionModify));
        dispatch(updateOpenEditAbrigaditos(false));
      }}
      maxWidth='lg'
    >
      <DialogTitle sx={{ display: 'flex', justifyContent: 'center' }}>Editar Edición de "Abrigaditos"</DialogTitle>
      <DialogContent>
        <Box>
          <TextField
            id='description'
            type='text'
            sx={{ py: '.3em' }}
            inputProps={{ pattern: '^.+$' }}
            label='Descripción (opcional)'
            placeholder='Edición de Abrigaditos 2022'
            value={abrigaditosSelector.editAbrigaditos.description}
            onChange={(e: any) =>
              dispatch(
                updateEditAbrigaditos({ ...abrigaditosSelector.editAbrigaditos, ...{ description: e.target.value } })
              )
            }
            fullWidth={true}
            variant='standard'
          />
          <TextField
            id='provider'
            type='text'
            sx={{ py: '.3em' }}
            inputProps={{ pattern: '^.+$' }}
            label='Proveedor (opcional)'
            placeholder='Catalan'
            value={abrigaditosSelector.editAbrigaditos.provider}
            onChange={(e: any) =>
              dispatch(
                updateEditAbrigaditos({ ...abrigaditosSelector.editAbrigaditos, ...{ provider: e.target.value } })
              )
            }
            fullWidth={true}
            variant='standard'
          />
          <TextField
            id='fundraiserGoal'
            type='number'
            sx={{ py: '.3em' }}
            inputProps={{ pattern: '^.+$' }}
            label='Objetivo de Donaciones'
            placeholder='12000.27'
            value={abrigaditosSelector.editAbrigaditos.fundraiserGoal}
            onChange={(e: any) =>
              dispatch(
                updateEditAbrigaditos({ ...abrigaditosSelector.editAbrigaditos, ...{ fundraiserGoal: e.target.value } })
              )
            }
            fullWidth={true}
            variant='standard'
          />
        </Box>
        <BeneficiariesFiltersView communityId={dataEdition.communityId} onSetFiltersAction={onSetFiltersAction} />
        {loadingBeneficiaries && <Box>Cargando beneficiarios...</Box>}
        {!errorBeneficiaries && !loadingBeneficiaries && (
          <BeneficiariesTable beneficiaries={dataBeneficiaries?.filteredBeneficiaries.nodes as Beneficiary[]} />
        )}
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: '1em' }}>
          <Button sx={{ mx: '.25em' }} onClick={() => dispatch(updateOpenEditAbrigaditos(false))}>
            Cancelar
          </Button>
          <Button
            sx={{ width: '60%', mx: '.25em' }}
            variant='contained'
            onClick={async () => await editAbrigaditos()}
            disabled={
              abrigaditosSelector.editAbrigaditos.fundraiserGoal <= 0 ||
              dataBeneficiaries?.filteredBeneficiaries.nodes.length === 0
            }
          >
            Editar
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};
