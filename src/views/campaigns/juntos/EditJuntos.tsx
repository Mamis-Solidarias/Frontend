import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';

import { Action } from 'src/types/Action';
import { modifyJuntosEdition } from 'src/API/Campaigns/campaigns_data';
import { GET_BENEFICIARIES } from 'src/API/Beneficiaries/beneficiaries_grapql';
import { useQuery } from '@apollo/client';
import Beneficiary from 'src/types/beneficiaries/Beneficiary';
import BeneficiariesTable from 'src/views/beneficiaries/BeneficiariesTableJustView';
import { useAppDispatch, useAppSelector } from 'src/hooks/reduxHooks';
import {
  defaultEditionModify,
  JuntosEdition,
  JuntosEditionModify,
  Participant
} from 'src/types/campaigns/JuntosEdition';
import { updateEditJuntos, updateOpenEditJuntos } from 'src/features/campaigns/juntosSlice';
import BeneficiariesFiltersView from 'src/views/beneficiaries/BeneficiariesFiltersViewSimple';
import { BeneficiariesFilters } from 'src/types/beneficiaries/BeneficiariesFilters';
import { updateFiltersApplied } from 'src/features/beneficiaries/beneficiariesSlice';
import { useEffect } from 'react';

interface EditJuntosProps {
  setAction: (action: Action) => void;
  refetchJuntos: () => void;
  dataEdition: JuntosEdition;
}

export default (props: EditJuntosProps) => {
  const { setAction, refetchJuntos, dataEdition } = props;
  const dispatch = useAppDispatch();
  const beneficiariesSelector = useAppSelector(state => state.beneficiaries);
  const juntosSelector = useAppSelector(state => state.juntos);
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
      communityId: juntosSelector.createJuntos.communityId,
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
      updateEditJuntos({
        ...juntosSelector.editJuntos,
        ...{
          description: dataEdition.description,
          provider: dataEdition.provider,
          fundraiserGoal: dataEdition.fundraiserGoal
        }
      })
    );
  }, [dataEdition.description, dataEdition.fundraiserGoal, dataEdition.provider, dispatch, juntosSelector.editJuntos,
    juntosSelector.openEditJuntos]);

  const editJuntos = async () => {
    try {
      const previousBeneficiaries = dataEdition?.participants?.map(
        (participant: Participant) => participant.beneficiaryId
      );
      const newBeneficiaries = juntosSelector.editJuntos.newBeneficiaries;
      let removedBeneficiaries: number[] = [];
      if (!!previousBeneficiaries) {
        removedBeneficiaries = previousBeneficiaries.filter(
          (participant: number) => !newBeneficiaries.includes(participant)
        );
      }
      const addedBeneficiaries = newBeneficiaries.filter(
        (participant: number) => !previousBeneficiaries?.includes(participant)
      );
      const juntosEditionFinalReview: JuntosEditionModify = {
        ...juntosSelector.editJuntos,
        ...{ addedBeneficiaries, removedBeneficiaries }
      };
      await modifyJuntosEdition(juntosEditionFinalReview, dataEdition.id as string);
      updateEditJuntos(defaultEditionModify);
      setAction({
        complete: true,
        success: true,
        message: 'Edición de "Juntos a la Par" modificada exitosamente',
        status: 201
      });
      if (!!juntosSelector.refetchEditions) {
        juntosSelector.refetchEditions(juntosSelector.campaign);
      }
    } catch (error) {
      setAction({
        complete: true,
        success: false,
        message: 'Ocurrió un error creando la nueva edición. Intente nuevamente más tarde',
        status: 201
      });
    }
    dispatch(updateEditJuntos(defaultEditionModify));
    dispatch(updateOpenEditJuntos(false));
  };

  return (
    <Dialog
      open={juntosSelector.openEditJuntos}
      onClose={() => {
        refetchJuntos();
        dispatch(updateEditJuntos(defaultEditionModify));
        dispatch(updateOpenEditJuntos(false));
      }}
      maxWidth='lg'
    >
      <DialogTitle sx={{ display: 'flex', justifyContent: 'center' }}>Editar Edición de "Juntos a la Par"</DialogTitle>
      <DialogContent>
        <Box>
          <TextField
            id='description'
            type='text'
            sx={{ py: '.3em' }}
            inputProps={{ pattern: '^.+$' }}
            label='Descripción (opcional)'
            placeholder='Edición de Juntos 2022'
            value={juntosSelector.editJuntos.description}
            onChange={(e: any) =>
              dispatch(updateEditJuntos({ ...juntosSelector.editJuntos, ...{ description: e.target.value } }))
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
            value={juntosSelector.editJuntos.provider}
            onChange={(e: any) =>
              dispatch(updateEditJuntos({ ...juntosSelector.editJuntos, ...{ provider: e.target.value } }))
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
            value={juntosSelector.editJuntos.fundraiserGoal}
            onChange={(e: any) =>
              dispatch(updateEditJuntos({ ...juntosSelector.editJuntos, ...{ fundraiserGoal: e.target.value } }))
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
          <Button sx={{ mx: '.25em' }} onClick={() => dispatch(updateOpenEditJuntos(false))}>
            Cancelar
          </Button>
          <Button
            sx={{ width: '60%', mx: '.25em' }}
            variant='contained'
            onClick={async () => await editJuntos()}
            disabled={
              juntosSelector.editJuntos.fundraiserGoal <= 0 ||
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
