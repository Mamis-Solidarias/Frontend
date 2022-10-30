import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';

import { FC, useEffect, useState } from 'react';
import { Action } from 'src/types/Action';
import { defaultEdition, MochiEditionLoaded, MochiEditionModify, Participant } from 'src/types/MochiEdition';
import { useModifyMochi } from 'src/hooks/campaigns/useModifyMochi';
import { modifyMochiEdition } from 'src/API/Campaigns/campaigns_data';
import { GET_BENEFICIARIES } from 'src/API/Beneficiaries/beneficiaries_grapql';
import { useQuery } from '@apollo/client';
import { BeneficiariesFilters, beneficiariesFiltersNull } from 'src/types/BeneficiariesFilters';
import { useBeneficiariesFilters } from 'src/hooks/beneficiaries/useBeneficiariesFilters';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';
import ChevronUp from 'mdi-material-ui/ChevronUp';
import ChevronDown from 'mdi-material-ui/ChevronDown';
import CardContent from '@mui/material/CardContent';
import Collapse from '@mui/material/Collapse';
import BeneficiariesFiltersView from '../beneficiaries/BeneficiariesFiltersView';
import Typography from '@mui/material/Typography';
import BeneficiariesTable from '../beneficiaries/BeneficiariesTableJustView';
import Beneficiary from 'src/types/Beneficiary';
import { getFamiliesByCommunity } from 'src/API/Beneficiaries/communities_data';
import Family from 'src/types/Family';

interface EditMochiProps {
  openDialog: boolean;
  handleClose: () => void;
  mochiEdition: MochiEditionLoaded;
  setAction: (action: Action) => void;
}

export const EditMochi: FC<EditMochiProps> = props => {
  const { openDialog, handleClose, setAction, mochiEdition } = props;
  const [filtersApplied, setFiltersApplied] = useState<BeneficiariesFilters>(beneficiariesFiltersNull);
  const { filters, setFilter } = useBeneficiariesFilters();
  const [openCollapse, setOpenCollapse] = useState<boolean>(false);
  const [families, setFamilies] = useState<Family[]>([]);
  const { mochiEdition: mochiEditionFinal, setMochiEdition, setMochiEditionField } = useModifyMochi(mochiEdition);
  const { data, error, loading, refetch } = useQuery(GET_BENEFICIARIES, {
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
    if (!!mochiEdition.communityId) {
      getFamiliesByCommunity(mochiEdition.communityId, 0, 100).then(result => {
        setFamilies(result.data.families);
      });
    }
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
          <Card sx={{ my: '2em', width: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardHeader
              title='Filtros'
              action={
                <IconButton size='small' onClick={() => setOpenCollapse(!openCollapse)}>
                  {openCollapse ? (
                    <ChevronUp sx={{ fontSize: '1.875rem' }} />
                  ) : (
                    <ChevronDown sx={{ fontSize: '1.875rem' }} />
                  )}
                </IconButton>
              }
            />
            <CardContent>
              <Collapse in={openCollapse}>
                <BeneficiariesFiltersView filters={filters} setFilter={setFilter} families={families} />
                <Typography display='flex' justifyContent='flex-end'>
                  <Button
                    variant='contained'
                    onClick={() => {
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
                  >
                    Importar
                  </Button>
                </Typography>
              </Collapse>
            </CardContent>
          </Card>
          <BeneficiariesTable beneficiaries={data?.filteredBeneficiaries.nodes as Beneficiary[]} />
        </Box>
        <Button
          sx={{ display: 'flex', justifyContent: 'center', width: '100%', marginTop: '1em' }}
          variant='contained'
          onClick={async () => {
            try {
              const incomeBeneficiaries = mochiEdition.participants.map(
                (participant: Participant) => participant.beneficiaryId
              );
              const importedBeneficiaries = data.filteredBeneficiaries.nodes.map((node: Beneficiary) => node.id);
              const addedBeneficiaries = importedBeneficiaries.filter(
                (beneficiaryId: number) => !incomeBeneficiaries.includes(beneficiaryId)
              );
              const removedBeneficiaries = incomeBeneficiaries.filter(
                (beneficiaryId: number) => !importedBeneficiaries.includes(beneficiaryId)
              );

              const mochiEditionFinalRevision: MochiEditionModify = {
                addedBeneficiaries: addedBeneficiaries,
                removedBeneficiaries: removedBeneficiaries,
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
