import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import { FC, useState } from 'react';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { createBeneficiaries } from 'src/API/Beneficiaries/families_data';
import { EducationForm } from './Forms/EducationForm';
import { GeneralForm } from './Forms/GeneralForm';
import { ClothesForm } from './Forms/ClothesForm';
import { HealthForm } from './Forms/HealthForm';
import { JobForm } from './Forms/JobForm';
import Beneficiary from 'src/types/beneficiaries/Beneficiary';
import Education from 'src/types/beneficiaries/Education';
import Grid from '@mui/material/Grid';
import Collapse from '@mui/material/Collapse';
import { EducationCard } from './BeneficiaryCard/Education';
import { HealthCard } from './BeneficiaryCard/Health';
import { ClothesCard } from './BeneficiaryCard/Clothes';
import { CommentsCard } from './BeneficiaryCard/Comments';
import { LikesCard } from './BeneficiaryCard/Likes';
import { JobCard } from './BeneficiaryCard/Job';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import {
  defaultCreateBeneficiaryFields,
  useCreateBeneficiaryFields
} from 'src/hooks/beneficiaries/useCreateBeneficiaryFields';
import {
  defaultCreateBeneficiaryExtras,
  useCreateBeneficiaryExtras
} from 'src/hooks/beneficiaries/useCreateBeneficiaryExtras';
import Clothes from 'src/types/beneficiaries/Clothes';
import Job from 'src/types/beneficiaries/Job';
import Health from 'src/types/beneficiaries/Health';
import Community from 'src/types/beneficiaries/Community';
import GENDERS from 'src/types/beneficiaries/Genders';
import BENEFICIARY_TYPES from 'src/types/beneficiaries/BeneficiaryTypes';
import { Action } from 'src/types/Action';

interface CreateBeneficiariesProps {
  openDialog: boolean;
  handleClose: () => void;
  communities: Community[];
  setAction: (action: Action) => void;
}

export const CreateBeneficiaries: FC<CreateBeneficiariesProps> = props => {
  const { openDialog, handleClose, communities, setAction } = props;
  const [beneficiaries, setBeneficiaries] = useState<Beneficiary[]>([]);
  const { beneficiaryFields, setBeneficiaryField, setBeneficiaryFields } = useCreateBeneficiaryFields();
  const { beneficiaryExtras, setBeneficiaryExtra, setBeneficiaryExtras } = useCreateBeneficiaryExtras();
  const [open, setOpen] = useState<boolean[]>([]);
  const [familyId, setFamilyId] = useState<string>('');

  const resetFields = () => {
    setBeneficiaryFields(defaultCreateBeneficiaryFields);
    setBeneficiaryExtras(defaultCreateBeneficiaryExtras);
    setOpen([]);
  };

  const resetAllFields = () => {
    resetFields();
    beneficiaries.length = 0;
    setBeneficiaryFields(defaultCreateBeneficiaryFields);
  };

  const deleteBeneficiary = (beneficiary: Beneficiary) => {
    const newBeneficiaries = beneficiaries.filter(newBeneficiary => newBeneficiary !== beneficiary);
    setBeneficiaries(newBeneficiaries);
  };

  const addBeneficiary = () => {
    const education: Education | undefined =
      !!beneficiaryFields.school || !!beneficiaryFields.year || !!beneficiaryFields.transportationMethod
        ? {
            school: beneficiaryFields.school,
            year: beneficiaryFields.year,
            transportationMethod: beneficiaryFields.transportationMethod
          }
        : undefined;
    const clothes: Clothes | undefined =
      !!beneficiaryFields.shirtSize || !!beneficiaryFields.shoeSize || !!beneficiaryFields.pantsSize
        ? {
            shoeSize: beneficiaryFields.shoeSize,
            pantsSize: beneficiaryFields.pantsSize,
            shirtSize: beneficiaryFields.shirtSize
          }
        : undefined;
    const job: Job | undefined = !!beneficiaryFields.title ? { title: beneficiaryFields.title } : undefined;
    const health: Health | undefined =
      beneficiaryFields.hasCovidVaccine || beneficiaryFields.hasMandatoryVaccines || !!beneficiaryFields.observations
        ? {
            hasCovidVaccine: beneficiaryFields.hasCovidVaccine,
            hasMandatoryVaccines: beneficiaryFields.hasMandatoryVaccines,
            observations: beneficiaryFields.observations
          }
        : undefined;
    beneficiaries.push({
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
    open.push(false);
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
      <DialogTitle sx={{ display: 'flex', justifyContent: 'center' }}>Agregar Beneficiarios</DialogTitle>
      <DialogContent>
        <Box>
          <Grid item xs={12}>
            <GeneralForm
              beneficiaryFields={beneficiaryFields}
              setFamilyId={setFamilyId}
              setBeneficiaryField={setBeneficiaryField}
              communities={communities}
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
                {beneficiaryFields.type !== 'Child' && beneficiaryFields.type !== 'CHILD' && (
                  <>
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
                  </>
                )}
              </Grid>
            </Box>
          </Grid>
          <Button
            sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}
            variant='contained'
            onClick={() => addBeneficiary()}
            disabled={
              !beneficiaryFields.familyId ||
              !beneficiaryFields.firstName ||
              !beneficiaryFields.lastName ||
              !beneficiaryFields.type ||
              !beneficiaryFields.gender ||
              !beneficiaryFields.birthday ||
              !beneficiaryFields.dni
            }
          >
            Añadir
          </Button>
        </Box>
        <TableContainer>
          <Table sx={{ minWidth: 800 }} aria-label='table in dashboard'>
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell>Nombre Completo</TableCell>
                <TableCell>Género</TableCell>
                <TableCell>Fecha de Nacimiento</TableCell>
                <TableCell>DNI</TableCell>
                <TableCell>Tipo</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {!!beneficiaries &&
                beneficiaries.map((beneficiary: Beneficiary, index) => (
                  <>
                    <TableRow
                      hover
                      key={beneficiary.firstName}
                      sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}
                    >
                      <TableCell>
                        <IconButton
                          aria-label='expand row'
                          size='small'
                          onClick={() => {
                            if (open.length === 0) {
                              setOpen(
                                Array.from({ length: beneficiaries.length }, (l, openIndex) => openIndex === index)
                              );
                            } else {
                              setOpen(
                                Array.from({ length: beneficiaries.length }, (l, openIndex) => {
                                  if (openIndex === index) {
                                    return !open[index];
                                  }

                                  return open[openIndex];
                                })
                              );
                            }
                          }}
                        >
                          {open[index] ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        </IconButton>
                      </TableCell>
                      <TableCell>{beneficiary.firstName + ' ' + beneficiary.lastName}</TableCell>
                      <TableCell>{GENDERS[beneficiary.gender as keyof typeof GENDERS]}</TableCell>
                      <TableCell>{beneficiary.birthday}</TableCell>
                      <TableCell>{beneficiary.dni}</TableCell>
                      <TableCell>{BENEFICIARY_TYPES[beneficiary.type as keyof typeof BENEFICIARY_TYPES]}</TableCell>
                      <TableCell>
                        <IconButton aria-label='delete' size='small' onClick={() => deleteBeneficiary(beneficiary)}>
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                    <TableRow sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
                      <Collapse in={open[index]} timeout='auto' unmountOnExit>
                        <TableCell colSpan={12}>
                          <Box
                            sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'start', flexWrap: 'wrap' }}
                          >
                            {!!beneficiary.education && (
                              <EducationCard education={beneficiary.education} sx={{ mx: '1em', my: '1em' }} />
                            )}
                            {!!beneficiary.health && (
                              <HealthCard health={beneficiary.health} sx={{ mx: '1em', my: '1em' }} />
                            )}
                            {!!beneficiary.clothes && (
                              <ClothesCard clothes={beneficiary.clothes} sx={{ mx: '1em', my: '1em' }} />
                            )}
                            {!!beneficiary.comments && (
                              <CommentsCard comments={beneficiary.comments} sx={{ mx: '1em', my: '1em' }} />
                            )}
                            {!!beneficiary.likes && (
                              <LikesCard likes={beneficiary.likes} sx={{ mx: '1em', my: '1em' }} />
                            )}
                            {!!beneficiary.job && <JobCard job={beneficiary.job} sx={{ mx: '1em', my: '1em' }} />}
                          </Box>
                        </TableCell>
                      </Collapse>
                    </TableRow>
                  </>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
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
                await createBeneficiaries(familyId, beneficiaries);
                resetAllFields();
                setAction({
                  complete: true,
                  success: true,
                  message: 'Beneficiarios creados exitosamente',
                  status: 201
                });
                handleClose();
              } catch (e: any) {
                const messageJson = e?.response?.data?.errors;
                const errorMessage = !!messageJson
                  ? (Object.entries(messageJson).map(entry => entry[1])[0] as any as string)
                  : 'Ha ocurrido un error cargando los beneficiarios. Intente nuevamente más tarde';
                setAction({
                  complete: true,
                  success: false,
                  message: errorMessage,
                  status: e.statusCode
                });
              }
            }}
            disabled={beneficiaries.length === 0}
          >
            Crear
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
