import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';

import { Action } from 'src/types/Action';
import { createJuntosEdition } from 'src/API/Campaigns/campaigns_data';
import Community from 'src/types/beneficiaries/Community';
import MenuItem from '@mui/material/MenuItem';
import { GET_BENEFICIARIES, GET_COMMUNITIES } from 'src/API/Beneficiaries/beneficiaries_grapql';
import { useQuery } from '@apollo/client';
import Beneficiary from 'src/types/beneficiaries/Beneficiary';
import BeneficiariesTable from 'src/views/beneficiaries/BeneficiariesTableJustView';
import { useAppDispatch, useAppSelector } from 'src/hooks/reduxHooks';
import { defaultEdition, JuntosEdition } from 'src/types/campaigns/JuntosEdition';
import { updateCreateJuntos, updateOpenCreateJuntos } from 'src/features/campaigns/juntosSlice';
import BeneficiariesFiltersView from 'src/views/beneficiaries/BeneficiariesFiltersViewSimple';
import { BeneficiariesFilters } from 'src/types/beneficiaries/BeneficiariesFilters';
import { updateFiltersApplied } from 'src/features/beneficiaries/beneficiariesSlice';

interface CreateJuntosProps {
  setAction: (action: Action) => void;
  refetchJuntos: () => void;
}

export default (props: CreateJuntosProps) => {
  const { setAction, refetchJuntos } = props;
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
  const { error: errorCommunities, loading: loadingCommunities, data: dataCommunities } = useQuery(GET_COMMUNITIES);
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

  const createJuntos = async () => {
    try {
      const juntosEditionFinalReview: JuntosEdition = {
        ...juntosSelector.createJuntos,
        ...{
          beneficiaries: dataBeneficiaries.filteredBeneficiaries.nodes.map((beneficiary: Beneficiary) => beneficiary.id)
        }
      };
      await createJuntosEdition(juntosEditionFinalReview);
      updateCreateJuntos(defaultEdition);
      setAction({
        complete: true,
        success: true,
        message: 'Edición de "Juntos a la Par" creada exitosamente',
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
    dispatch(updateCreateJuntos(defaultEdition));
    dispatch(updateOpenCreateJuntos(false));
  };

  return (
    <Dialog
      open={juntosSelector.openCreateJuntos}
      onClose={() => {
        refetchJuntos();
        dispatch(updateCreateJuntos(defaultEdition));
        dispatch(updateOpenCreateJuntos(false));
      }}
      maxWidth='lg'
    >
      <DialogTitle sx={{ display: 'flex', justifyContent: 'center' }}>Añadir Edición de "Juntos a la Par"</DialogTitle>
      <DialogContent>
        <Box>
          <TextField
            id='edition'
            type='text'
            sx={{ py: '.3em' }}
            label='Edición'
            placeholder='2022'
            value={juntosSelector.createJuntos.edition}
            onChange={(e: any) =>
              dispatch(updateCreateJuntos({ ...juntosSelector.createJuntos, ...{ edition: e.target.value } }))
            }
            fullWidth={true}
            variant='standard'
          />
          <TextField
            id='description'
            type='text'
            sx={{ py: '.3em' }}
            inputProps={{ pattern: '^.+$' }}
            label='Descripción (opcional)'
            placeholder='Edición de Juntos 2022'
            value={juntosSelector.createJuntos.description}
            onChange={(e: any) =>
              dispatch(updateCreateJuntos({ ...juntosSelector.createJuntos, ...{ description: e.target.value } }))
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
            value={juntosSelector.createJuntos.provider}
            onChange={(e: any) =>
              dispatch(updateCreateJuntos({ ...juntosSelector.createJuntos, ...{ provider: e.target.value } }))
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
            value={juntosSelector.createJuntos.fundraiserGoal}
            onChange={(e: any) =>
              dispatch(updateCreateJuntos({ ...juntosSelector.createJuntos, ...{ fundraiserGoal: e.target.value } }))
            }
            fullWidth={true}
            variant='standard'
          />
          <TextField
            select
            defaultValue=''
            sx={{ py: '.3em' }}
            fullWidth={true}
            variant='standard'
            label='Comunidad'
            placeholder='Misiones'
            value={juntosSelector.createJuntos.communityId}
            onChange={e => {
              dispatch(updateCreateJuntos({ ...juntosSelector.createJuntos, ...{ communityId: e.target.value } }));
            }}
          >
            <MenuItem value=''>Ninguna</MenuItem>
            {!!dataCommunities?.communities?.nodes &&
              dataCommunities.communities.nodes.map((community: Community) => (
                <MenuItem value={community.id} key={community.id}>
                  {community.name}
                </MenuItem>
              ))}
          </TextField>
        </Box>
        <BeneficiariesFiltersView
          communityId={juntosSelector.createJuntos.communityId}
          onSetFiltersAction={onSetFiltersAction}
        />
        {(loadingBeneficiaries || loadingCommunities) && <Box>Cargando beneficiarios...</Box>}
        {!(errorBeneficiaries || errorCommunities) && !(loadingBeneficiaries || loadingCommunities) && (
          <BeneficiariesTable beneficiaries={dataBeneficiaries?.filteredBeneficiaries.nodes as Beneficiary[]} />
        )}
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: '1em' }}>
          <Button sx={{ mx: '.25em' }} onClick={() => dispatch(updateOpenCreateJuntos(false))}>
            Cancelar
          </Button>
          <Button
            sx={{ width: '60%', mx: '.25em' }}
            variant='contained'
            onClick={async () => await createJuntos()}
            disabled={
              !juntosSelector.createJuntos.edition ||
              juntosSelector.createJuntos.fundraiserGoal < 0 ||
              !dataBeneficiaries ||
              dataBeneficiaries.filteredBeneficiaries.nodes.length === 0
            }
          >
            Añadir
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};
