import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';

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

interface CreateBeneficiariesProps {
  familyId: string;
  openDialog: boolean;
  handleClose: () => void;
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

  const resetFields = () => {
    setFirstName('');
    setLastName('');
    setType('');
    setGender('');
    setBirthday('');
    setDni('');
    setComments('');
    setLikes('');
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
      <DialogTitle sx={{ display: 'flex', justifyContent: 'center' }}>Crear Nueva Familia</DialogTitle>
      <DialogContent>
        <Box>
          <TextField
            style={{ padding: '1em' }}
            id='firstName'
            type='text'
            inputProps={{ pattern: '[0-9]*$' }}
            label='Nombres de Beneficiario'
            placeholder='Juan García'
            value={firstName}
            onChange={e => {
              setFirstName(e.target.value);
            }}
            fullWidth={true}
            variant='standard'
          />
          <TextField
            style={{ padding: '1em' }}
            id='lastName'
            type='text'
            inputProps={{ pattern: '[0-9]*$' }}
            label='Apellidos de Beneficiario'
            placeholder='Pedro Montoya'
            value={lastName}
            onChange={e => {
              setLastName(e.target.value);
            }}
            fullWidth={true}
            variant='standard'
          />
          <TextField
            style={{ padding: '1em' }}
            id='type'
            type='text'
            inputProps={{ pattern: '[0-9]*$' }}
            label='Tipo de Beneficiario'
            placeholder='Niño'
            value={type}
            onChange={e => {
              setType(e.target.value);
            }}
            fullWidth={true}
            variant='standard'
          />
          <TextField
            style={{ padding: '1em' }}
            id='gender'
            type='text'
            label='Género del Beneficiario'
            placeholder='M'
            value={gender}
            onChange={e => {
              setGender(e.target.value);
            }}
            fullWidth={true}
            variant='standard'
          />
          <TextField
            style={{ padding: '1em' }}
            id='birthday'
            type='text'
            inputProps={{ pattern: '[0-9]*$' }}
            label='Fecha de Nacimiento del Beneficiario'
            placeholder='23'
            value={birthday}
            onChange={e => {
              setBirthday(e.target.value);
            }}
            fullWidth={true}
            variant='standard'
          />
          <TextField
            style={{ padding: '1em' }}
            id='dni'
            type='text'
            label='DNI del Beneficiario'
            placeholder='23456654'
            value={dni}
            onChange={e => {
              setDni(e.target.value);
            }}
            fullWidth={true}
            variant='standard'
          />
          <TextField
            sx={{ padding: '1em' }}
            id='comments'
            type='text'
            label='Comentarios sobre Beneficiario'
            placeholder='Es buena gente'
            value={comments}
            onChange={e => {
              setComments(e.target.value);
            }}
            fullWidth={true}
            variant='standard'
          />
          <TextField
            style={{ padding: '1em' }}
            id='likes'
            type='text'
            label='Cosas que le gustan al Beneficiario'
            placeholder='La familia de José'
            value={likes}
            onChange={e => {
              setLikes(e.target.value);
            }}
            fullWidth={true}
            variant='standard'
          />
          <Button
            sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}
            variant='contained'
            onClick={() => {
              beneficiaries.push({
                firstName,
                lastName,
                type,
                gender,
                birthday,
                dni,
                comments,
                likes
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
                <TableCell>Qué le gusta</TableCell>
                <TableCell>Ropa</TableCell>
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
                    <TableCell>{beneficiary.likes}</TableCell>
                    <TableCell></TableCell>
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
