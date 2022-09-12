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

interface CreateBeneficiariesProps {
  familyId: string;
  openDialog: boolean;
  handleClose: () => void;
}

interface Education {
  school: string;
  transportationMethod: string;
  year: string;
}

interface Beneficiary {
  firstName: string;
  lastName: string;
  type: string;
  gender: string;
  birthday: string;
  dni: string;
  comments?: string;
  likes?: string;
  education?: Education;
}

export const CreateBeneficiaries: FC<CreateBeneficiariesProps> = props => {
  const { openDialog, handleClose, familyId } = props;
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [type, setType] = useState<string>('');
  const [gender, setGender] = useState<string>('');
  const [birthday, setBirthday] = useState<string>('');
  const [dni, setDni] = useState<string>('');
  const [comments, setComments] = useState<string>('');
  const [likes, setLikes] = useState<string>('');
  const [beneficiaries, setBeneficiaries] = useState<Beneficiary[]>([]);
  const [school, setSchool] = useState<string>('');
  const [transportationMethod, setTransportationMethod] = useState<string>('');
  const [year, setYear] = useState<string>('');
  const [addEducation, setAddEducation] = useState<boolean>(false);
  const [addClothes, setAddClothes] = useState<boolean>(false);
  const [pantsSize, setPantsSize] = useState<string>('');
  const [shirtSize, setShirtSize] = useState<string>('');
  const [shoeSize, setShoeSize] = useState<string>('');
  const [addHealth, setAddHealth] = useState<boolean>(false);
  const [hasMandatoryVaccines, setHasMandatoryVaccines] = useState<boolean>(false);
  const [hasCovidVaccine, setHasCovidVaccine] = useState<boolean>(false);
  const [observations, setObservations] = useState<string>('');

  const resetFields = () => {
    setFirstName('');
    setLastName('');
    setType('');
    setGender('');
    setBirthday('');
    setDni('');
    setComments('');
    setLikes('');
    setYear('');
    setTransportationMethod('');
    setSchool('');
    setAddEducation(false);
    setHasCovidVaccine(false);
    setHasMandatoryVaccines(false);
    setObservations('');
    setAddHealth(false);
    setAddClothes(false);
  };

  const resetAllFields = () => {
    resetFields();
    beneficiaries.length = 0;
  };

  const deleteBeneficiary = (beneficiary: Beneficiary) => {
    const newBeneficiaries = beneficiaries.filter(newBeneficiary => newBeneficiary !== beneficiary);
    setBeneficiaries(newBeneficiaries);
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
      <DialogTitle sx={{ display: 'flex', justifyContent: 'center' }}>Crear Nuevo Beneficiario</DialogTitle>
      <DialogContent>
        <Box>
          <GeneralForm
            dni={dni}
            setDni={setDni}
            gender={gender}
            setGender={setGender}
            birthday={birthday}
            setBirthday={setBirthday}
            likes={likes}
            setLikes={setLikes}
            comments={comments}
            setComments={setComments}
            firstName={firstName}
            setFirstName={setFirstName}
            lastName={lastName}
            setLastName={setLastName}
            type={type}
            setType={setType}
          />

          {addEducation && (
            <EducationForm
              year={year}
              school={school}
              setYear={setYear}
              setSchool={setSchool}
              transportationMethod={transportationMethod}
              setTransportationMethod={setTransportationMethod}
              setAddEducation={setAddEducation}
            />
          )}
          {!addEducation && (
            <Button
              sx={{ display: 'flex', justifyContent: 'center', width: '100%', my: '1em' }}
              variant='contained'
              onClick={() => {
                setTransportationMethod('');
                setSchool('');
                setYear('');
                setAddEducation(true);
              }}
            >
              Añadir información de Educación
            </Button>
          )}

          {addClothes && (
            <ClothesForm
              pantsSize={pantsSize}
              setPantsSize={setPantsSize}
              shirtSize={shirtSize}
              setShirtSize={setShirtSize}
              shoeSize={shoeSize}
              setShoeSize={setShoeSize}
              setAddClothes={setAddClothes}
            />
          )}
          {!addClothes && (
            <Button
              sx={{ display: 'flex', justifyContent: 'center', width: '100%', my: '1em' }}
              variant='contained'
              onClick={() => {
                setShoeSize('');
                setPantsSize('');
                setShirtSize('');
                setAddClothes(true);
              }}
            >
              Añadir información de Ropa
            </Button>
          )}

          {addHealth && (
            <HealthForm
              hasMandatoryVaccines={hasMandatoryVaccines}
              setHasMandatoryVaccines={setHasMandatoryVaccines}
              hasCovidVaccine={hasCovidVaccine}
              setHasCovidVaccine={setHasCovidVaccine}
              observations={observations}
              setObservations={setObservations}
              setAddHealth={setAddHealth}
            />
          )}
          {!addHealth && (
            <Button
              sx={{ display: 'flex', justifyContent: 'center', width: '100%', my: '1em' }}
              variant='contained'
              onClick={() => {
                setShoeSize('');
                setPantsSize('');
                setShirtSize('');
                setAddHealth(true);
              }}
            >
              Añadir información de Salud
            </Button>
          )}

          <Button
            sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}
            variant='contained'
            onClick={() => {
              const education: Education | undefined =
                !!school && !!year && !!transportationMethod ? { school, year, transportationMethod } : undefined;
              beneficiaries.push({
                firstName,
                lastName,
                type,
                gender,
                birthday,
                dni,
                comments,
                likes,
                education
              });
              resetFields();
            }}
          >
            Añadir
          </Button>
        </Box>
        <TableContainer>
          <Table sx={{ minWidth: 800 }} aria-label='table in dashboard'>
            <TableHead>
              <TableRow>
                <TableCell>Nombre Completo</TableCell>
                <TableCell>Género</TableCell>
                <TableCell>Cumpleaños</TableCell>
                <TableCell>DNI</TableCell>
                <TableCell>Tipo</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {!!beneficiaries &&
                beneficiaries.map((beneficiary: Beneficiary) => (
                  <TableRow
                    hover
                    key={beneficiary.firstName}
                    sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}
                  >
                    <TableCell>{beneficiary.firstName + ' ' + beneficiary.lastName}</TableCell>
                    <TableCell>{beneficiary.gender}</TableCell>
                    <TableCell>{beneficiary.birthday}</TableCell>
                    <TableCell>{beneficiary.dni}</TableCell>
                    <TableCell>{beneficiary.type}</TableCell>
                    <TableCell>
                      <IconButton aria-label='delete' size='small' onClick={() => deleteBeneficiary(beneficiary)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Button
          sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}
          variant='contained'
          onClick={() => {
            createBeneficiaries(localStorage.getItem('user'), familyId, beneficiaries);
            resetAllFields();
            handleClose();
          }}
          disabled={beneficiaries.length === 0}
        >
          Crear Beneficiarios
        </Button>
      </DialogContent>
    </Dialog>
  );
};
