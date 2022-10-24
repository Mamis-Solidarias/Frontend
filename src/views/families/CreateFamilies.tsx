import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';

import { FC, useEffect, useState } from 'react';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import { createFamilies, getCommunities } from 'src/API/Beneficiaries/communities_data';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import MenuItem from '@mui/material/MenuItem';
import Community from 'src/types/Community';
import Grid from '@mui/material/Grid';

// import { ContactForm } from './ContactForm';

interface CreateFamiliesProps {
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
  const { openDialog, handleClose } = props;
  const [number, setNumber] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [families, setFamilies] = useState<Family[]>([]);
  const [communities, setCommunities] = useState<Community[]>([]);
  const [selectedCommunity, setSelectedCommunity] = useState<string>('');

  const resetFields = () => {
    setNumber('');
    setName('');
    setAddress('');
    setDescription('');
    setSelectedCommunity('');
  };

  const resetAllFields = () => {
    resetFields();
    setFamilies([]);
  };

  const deleteFamily = (family: Family) => {
    const newFamilies = families.filter(newFamily => newFamily !== family);
    setFamilies(newFamilies);
  };

  useEffect(() => {
    getCommunities().then(result => {
      setCommunities(result.data.communities);
    });
  }, []);

  return (
    <Dialog
      open={openDialog}
      onClose={() => {
        resetAllFields();
        handleClose();
      }}
      maxWidth='lg'
    >
      <DialogTitle sx={{ display: 'flex', justifyContent: 'center' }}>Crear Familias</DialogTitle>
      <DialogContent>
        <Box>
          <Grid xs={12} sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
            <Grid xs={5}>
              <TextField
                select
                fullWidth={true}
                variant='standard'
                label='Comunidad'
                placeholder='Misiones'
                value={selectedCommunity}
                onChange={e => setSelectedCommunity(e.target.value)}
              >
                <MenuItem value=''>Ninguna</MenuItem>
                {communities.map((community: Community) => (
                  <MenuItem value={community.id} key={community.id}>
                    {community.name}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                id='familyId'
                type='text'
                inputProps={{ pattern: '[0-9]*$' }}
                label='Código (opcional)'
                placeholder='23'
                value={number}
                onChange={e => {
                  setNumber(e.target.value);
                }}
                fullWidth={true}
                variant='standard'
              />
              <TextField
                id='familyName'
                type='text'
                inputProps={{ pattern: '^.+$' }}
                label='Nombre'
                placeholder='García'
                value={name}
                onChange={e => {
                  setName(e.target.value);
                }}
                fullWidth={true}
                variant='standard'
              />
            </Grid>
            <Grid xs={5}>
              <TextField
                id='address'
                type='text'
                inputProps={{ pattern: '^.+$' }}
                label='Dirección'
                placeholder='Cataratas 123'
                value={address}
                onChange={e => {
                  setAddress(e.target.value);
                }}
                fullWidth={true}
                variant='standard'
              />
              <TextField
                id='details'
                type='text'
                label='Detalle (opcional)'
                placeholder='La familia de José'
                value={description}
                onChange={e => {
                  setDescription(e.target.value);
                }}
                fullWidth={true}
                variant='standard'
              />
            </Grid>
          </Grid>
          <Button
            sx={{ display: 'flex', justifyContent: 'center', width: '100%', marginTop: '1em' }}
            variant='contained'
            onClick={() => {
              const finalDescription = !!description ? description : null;
              const finalFamilyNumber: number | null = !!number ? parseInt(number) : null;
              families.push({
                familyNumber: finalFamilyNumber,
                name,
                address,
                details: finalDescription,
                contacts: []
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
            await createFamilies(selectedCommunity, families);
            resetAllFields();
            handleClose();
          }}
          disabled={families.length === 0}
        >
          Crear
        </Button>
      </DialogContent>
    </Dialog>
  );
};
