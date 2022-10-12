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
import { createFamilies } from 'src/API/Beneficiaries/communities_data';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { ContactForm } from './ContactForm';

interface CreateFamiliesProps {
  communityCode: string;
  openDialog: boolean;
  handleClose: () => void;
}

interface Contact {
  content: string;
  isPreferred: boolean;
  title: string;
  type: string;
}

interface Family {
  familyNumber: number | null;
  name: string;
  address: string;
  details: string | null;
  contacts: Contact[];
}

export const CreateFamilies: FC<CreateFamiliesProps> = props => {
  const { openDialog, handleClose, communityCode } = props;
  const [number, setNumber] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [families, setFamilies] = useState<Family[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [addContact, setAddContact] = useState<number>(0);
  const [types, setTypes] = useState<string[]>([]);
  const [contents, setContents] = useState<string[]>([]);
  const [titles, setTitles] = useState<string[]>([]);
  const [arrayIsPreferred, setArrayIsPreferred] = useState<boolean[]>([]);

  const resetFields = () => {
    setNumber('');
    setName('');
    setAddress('');
    setDescription('');
  };

  const resetAllFields = () => {
    resetFields();
    setAddContact(0);
    setContacts([]);
    setTypes([]);
    setContents([]);
    setTitles([]);
    setFamilies([]);
    setArrayIsPreferred([]);
  };

  const deleteFamily = (family: Family) => {
    const newFamilies = families.filter(newFamily => newFamily !== family);
    setFamilies(newFamilies);
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
            id='familyId'
            type='text'
            inputProps={{ pattern: '[0-9]*$' }}
            label='Número de Nueva Familia (opcional)'
            placeholder='23'
            value={number}
            onChange={e => {
              setNumber(e.target.value);
            }}
            fullWidth={true}
            variant='standard'
          />
          <TextField
            style={{ padding: '1em' }}
            id='familyName'
            type='text'
            inputProps={{ pattern: '^.+$' }}
            label='Nombre de Nueva Familia'
            placeholder='García'
            value={name}
            onChange={e => {
              setName(e.target.value);
            }}
            fullWidth={true}
            variant='standard'
          />
          <TextField
            sx={{ padding: '1em' }}
            id='address'
            type='text'
            inputProps={{ pattern: '^.+$' }}
            label='Dirección de Nueva Familia'
            placeholder='Cataratas 123'
            value={address}
            onChange={e => {
              setAddress(e.target.value);
            }}
            fullWidth={true}
            variant='standard'
          />
          <TextField
            style={{ padding: '1em' }}
            id='details'
            type='text'
            label='Detalle de Nueva Familia (opcional)'
            placeholder='La familia de José'
            value={description}
            onChange={e => {
              setDescription(e.target.value);
            }}
            fullWidth={true}
            variant='standard'
          />

          <Button
            sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}
            variant='contained'
            onClick={() => {
              const familyContacts = [];
              for (let index = 0; index < addContact; index++) {
                familyContacts.push({
                  content: contents[index],
                  isPreferred: arrayIsPreferred[index],
                  type: types[index],
                  title: titles[index]
                });
              }
              const finalDescription = !!description ? description : null;
              const finalFamilyNumber: number | null = !!number ? parseInt(number) : null;
              families.push({
                familyNumber: finalFamilyNumber,
                name,
                address,
                details: finalDescription,
                contacts: familyContacts
              });
              resetFields();
            }}
            disabled={address === '' || name === ''}
          >
            Añadir
          </Button>
        </Box>
        <TableContainer>
          <Table sx={{ minWidth: 800 }} aria-label='table in dashboard'>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Nombre</TableCell>
                <TableCell>Dirección</TableCell>
                <TableCell>Detalles</TableCell>
                <TableCell>Forma de contacto</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {!!families &&
                families.map((family: Family) => (
                  <TableRow
                    hover
                    key={family.familyNumber}
                    sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}
                  >
                    <TableCell>{family.familyNumber}</TableCell>
                    <TableCell sx={{ py: theme => `${theme.spacing(0.5)} !important` }}>{family.name}</TableCell>
                    <TableCell>{family.address}</TableCell>
                    <TableCell>{family.details}</TableCell>
                    <TableCell></TableCell>
                    <TableCell>
                      <IconButton aria-label='delete' size='small' onClick={() => deleteFamily(family)}>
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
          onClick={async () => {
            await createFamilies(communityCode, families);
            resetAllFields();
            handleClose();
          }}
          disabled={families.length === 0}
        >
          Crear Familias
        </Button>
      </DialogContent>
    </Dialog>
  );
};
