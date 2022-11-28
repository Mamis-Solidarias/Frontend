import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import { FC, useEffect, useState } from 'react';
import { EducationForm } from './Forms/EducationForm';
import { GeneralForm } from './Forms/GeneralForm';
import { ClothesForm } from './Forms/ClothesForm';
import { HealthForm } from './Forms/HealthForm';
import { JobForm } from './Forms/JobForm';
import Beneficiary from 'src/types/Beneficiary';
import Education from 'src/types/Education';
import Grid from '@mui/material/Grid';
import { useCreateBeneficiaryFields } from 'src/hooks/beneficiaries/useCreateBeneficiaryFields';
import { useCreateBeneficiaryExtras } from 'src/hooks/beneficiaries/useCreateBeneficiaryExtras';
import Job from 'src/types/Job';
import Health from 'src/types/Health';
import Community from 'src/types/Community';
import { updateBeneficiary } from '../../API/Beneficiaries/beneficiaries_data';
import { Action } from 'src/types/Action';

interface BeneficiaryEditFormProps {
  openDialog: boolean;
  handleClose: () => void;
  communities: Community[];
  action: string;
  beneficiary: Beneficiary;
  setAction: (action: Action) => void;
  setBeneficiaryEdited: (value: boolean) => void;
}

export const BeneficiaryEditForm: FC<BeneficiaryEditFormProps> = props => {
  const { openDialog, handleClose, communities, action, beneficiary, setAction, setBeneficiaryEdited } = props;
  const { beneficiaryFields, setBeneficiaryField, setBeneficiaryFields } = useCreateBeneficiaryFields();
  const { beneficiaryExtras, setBeneficiaryExtra, setBeneficiaryExtras } = useCreateBeneficiaryExtras();
  const [startingCommunity, setStartingCommunity] = useState<string>('');

  useEffect(() => {
    if (!!beneficiary) {
      setStartingCommunity((beneficiary.familyId as string).split('-')[0]);
      setBeneficiaryFields({
        familyId: '',
        firstName: beneficiary.firstName,
        lastName: beneficiary.lastName,
        type: beneficiary.type[0] + beneficiary.type.substring(1).toLowerCase(),
        gender: beneficiary.gender[0] + beneficiary.gender.substring(1).toLowerCase(),
        birthday: beneficiary.birthday,
        dni: beneficiary.dni,
        comments: beneficiary.comments as string,
        likes: beneficiary.likes as string,
        school: beneficiary.education?.school as string,
        transportationMethod: beneficiary.education?.transportationMethod as string,
        year: beneficiary.education?.year as string,
        pantsSize: beneficiary.clothes?.pantsSize as string,
        shirtSize: beneficiary.clothes?.shirtSize as string,
        shoeSize: beneficiary.clothes?.shoeSize as string,
        hasMandatoryVaccines: beneficiary.health?.hasMandatoryVaccines as boolean,
        hasCovidVaccine: beneficiary.health?.hasCovidVaccine as boolean,
        observations: beneficiary.health?.observations as string,
        title: beneficiary.job?.title as string
      });

      setBeneficiaryExtras({
        addEducation: !!beneficiary.education,
        addClothes: !!beneficiary.clothes,
        addHealth: !!beneficiary.health,
        addJob: !!beneficiary.job
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [beneficiary]);

  return (
    <Dialog open={openDialog} onClose={() => handleClose()} maxWidth='lg'>
      <DialogTitle sx={{ display: 'flex', justifyContent: 'center' }}>{action} Beneficiario</DialogTitle>
      <DialogContent>
        <Box>
          <Grid item xs={12}>
            <GeneralForm
              beneficiaryFields={beneficiaryFields}
              setBeneficiaryField={setBeneficiaryField}
              communities={communities}
              startingCommunityInput={startingCommunity}
            />
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
              <Grid xs={5}>
                {beneficiaryExtras.addEducation && (
                  <EducationForm
                    beneficiaryFields={beneficiaryFields}
                    setBeneficiaryField={setBeneficiaryField}
                    setBeneficiaryExtra={setBeneficiaryExtra}
                  />
                )}
                {!beneficiaryExtras.addEducation && (
                  <Button
                    sx={{ display: 'flex', justifyContent: 'center', width: '100%', my: '1em' }}
                    variant='contained'
                    color='info'
                    onClick={() => {
                      setBeneficiaryField('year', '');
                      setBeneficiaryField('school', '');
                      setBeneficiaryField('transportationMethod', '');
                      setBeneficiaryExtra('addEducation', true);
                    }}
                  >
                    Añadir Educación
                  </Button>
                )}

                {beneficiaryExtras.addClothes && (
                  <ClothesForm
                    beneficiaryFields={beneficiaryFields}
                    setBeneficiaryField={setBeneficiaryField}
                    setBeneficiaryExtra={setBeneficiaryExtra}
                  />
                )}
                {!beneficiaryExtras.addClothes && (
                  <Button
                    sx={{ display: 'flex', justifyContent: 'center', width: '100%', my: '1em' }}
                    variant='contained'
                    color='info'
                    onClick={() => {
                      setBeneficiaryField('shoeSize', '');
                      setBeneficiaryField('pantsSize', '');
                      setBeneficiaryField('shirtSize', '');
                      setBeneficiaryExtra('addClothes', true);
                    }}
                  >
                    Añadir Ropa
                  </Button>
                )}
              </Grid>
              <Grid xs={5}>
                {beneficiaryExtras.addHealth && (
                  <HealthForm
                    beneficiaryFields={beneficiaryFields}
                    setBeneficiaryField={setBeneficiaryField}
                    setBeneficiaryExtra={setBeneficiaryExtra}
                  />
                )}
                {!beneficiaryExtras.addHealth && (
                  <Button
                    sx={{ display: 'flex', justifyContent: 'center', width: '100%', my: '1em' }}
                    variant='contained'
                    color='info'
                    onClick={() => {
                      setBeneficiaryField('hasCovidVaccine', false);
                      setBeneficiaryField('hasMandatoryVaccines', false);
                      setBeneficiaryField('observations', '');
                      setBeneficiaryExtra('addHealth', true);
                    }}
                  >
                    Añadir Salud
                  </Button>
                )}

                {beneficiaryExtras.addJob && (
                  <JobForm
                    beneficiaryFields={beneficiaryFields}
                    setBeneficiaryField={setBeneficiaryField}
                    setBeneficiaryExtra={setBeneficiaryExtra}
                  />
                )}
                {!beneficiaryExtras.addJob && (
                  <Button
                    sx={{ display: 'flex', justifyContent: 'center', width: '100%', my: '1em' }}
                    variant='contained'
                    color='info'
                    onClick={() => {
                      setBeneficiaryField('title', '');
                      setBeneficiaryExtra('addJob', true);
                    }}
                  >
                    Añadir Trabajo
                  </Button>
                )}
              </Grid>
            </Box>
          </Grid>
          <div style={{display:'flex', flexDirection:'row',justifyContent: 'space-evenly'}}>
          <Button
              sx={{ display: 'flex', justifyContent: 'center',margin: '1%', width: '100%'}}
              variant='outlined'
              onClick={() => handleClose()}
          >
            Cancelar
          </Button>
          <Button
            sx={{ display: 'flex', justifyContent: 'center',margin:'1%', width: '100%' }}
            variant='contained'
            onClick={async () => {
              const education: Education | null =
                !!beneficiaryFields.school || !!beneficiaryFields.year || !!beneficiaryFields.transportationMethod
                  ? {
                      school: beneficiaryFields.school,
                      year: beneficiaryFields.year,
                      transportationMethod: beneficiaryFields.transportationMethod
                    }
                  : null;
              const clothes: { shoes?: string; pants?: string; shirt?: string } | null =
                !!beneficiaryFields.shirtSize || !!beneficiaryFields.shoeSize || !!beneficiaryFields.pantsSize
                  ? {
                      shoes: beneficiaryFields.shoeSize,
                      pants: beneficiaryFields.pantsSize,
                      shirt: beneficiaryFields.shirtSize
                    }
                  : null;
              const job: Job | null = !!beneficiaryFields.title ? { title: beneficiaryFields.title } : null;
              const health: Health | null =
                beneficiaryFields.hasCovidVaccine || beneficiaryFields.hasMandatoryVaccines ||
                !!beneficiaryFields.observations
                  ? {
                      hasCovidVaccine: beneficiaryFields.hasCovidVaccine,
                      hasMandatoryVaccines: beneficiaryFields.hasMandatoryVaccines,
                      observations: beneficiaryFields.observations
                    }
                  : null;

              try {
                await updateBeneficiary(beneficiary.id as string, {
                  firstName: beneficiaryFields.firstName,
                  lastName: beneficiaryFields.lastName,
                  type: beneficiaryFields.type,
                  gender: beneficiaryFields.gender,
                  birthday: beneficiaryFields.birthday,
                  dni: beneficiaryFields.dni,
                  comments: beneficiaryFields.comments,
                  likes: beneficiaryFields.likes,
                  education,
                  job,
                  clothes,
                  health
                });
                setBeneficiaryEdited(true);
                setAction({
                  complete: true,
                  success: true,
                  message: 'Usuario actualizado exitosamente',
                  status: 200
                });
                handleClose();
              } catch (err) {
                setAction({
                  complete: true,
                  success: false,
                  message: 'Algo ha ocurrido actualizando el usuario. Intente nuevamente más tarde',
                  status: 400
                });
              }
            }}
          >
            Modificar Datos
          </Button>
          </div>
        </Box>

      </DialogContent>
    </Dialog>
  );
};
