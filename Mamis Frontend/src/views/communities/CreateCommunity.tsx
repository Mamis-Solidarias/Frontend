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
import { createCommunities } from 'src/API/Beneficiaries/communities_data';

interface CreateCommunityProps {
  openDialog: boolean;
  handleClose: () => void;
}

interface Community {
  name: string;
  address: string;
  description: string | null;
  communityCode: string | null;
}

export const CreateCommunity: FC<CreateCommunityProps> = props => {
  const { openDialog, handleClose } = props;
  const [name, setName] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [communityCode, setCommunityCode] = useState<string>('');
  const [communities] = useState<Community[]>([]);

  const resetFields = () => {
    setName('');
    setAddress('');
    setDescription('');
    setCommunityCode('');
  };

  return (
    <Dialog
      open={openDialog}
      onClose={() => {
        resetFields();
        handleClose();
      }}
      maxWidth='lg'
    >
      <DialogTitle sx={{ display: 'flex', justifyContent: 'center' }}>Crear Nueva Comunidad</DialogTitle>
      <DialogContent>
        <Box>
          <TextField
            style={{ padding: '1em' }}
            id='communityName'
            type='text'
            inputProps={{ pattern: '^.+$' }}
            label='Nombre de Nueva Comunidad'
            placeholder='Misiones'
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
            label='Dirección de Nueva Comunidad'
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
            id='description'
            type='text'
            label='Descripción de Nueva Comunidad (opcional)'
            placeholder='Es un lindo pueblo'
            value={description}
            onChange={e => {
              setDescription(e.target.value);
            }}
            fullWidth={true}
            variant='standard'
          />
          <TextField
            style={{ padding: '1em' }}
            id='communityCode'
            type='text'
            label='Código de Comunidad de Nueva Comunidad (opcional)'
            placeholder='MI'
            value={communityCode}
            onChange={e => {
              setCommunityCode(e.target.value);
            }}
            fullWidth={true}
            variant='standard'
          />
          <Button
            sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}
            variant='contained'
            onClick={() => {
              communities.push({ name, address, description, communityCode });
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
                <TableCell>Nombre</TableCell>
                <TableCell>Dirección</TableCell>
                <TableCell>Descripción</TableCell>
                <TableCell>Código de Comunidad</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {!!communities &&
                communities.map((community: Community) => (
                  <TableRow hover key={community.name} sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
                    <TableCell sx={{ py: theme => `${theme.spacing(0.5)} !important` }}>{community.name}</TableCell>
                    <TableCell>{community.address}</TableCell>
                    <TableCell>{community.description}</TableCell>
                    <TableCell>{community.communityCode}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Button
          sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}
          variant='contained'
          onClick={() => {
            createCommunities(localStorage.getItem('user'), communities);
            resetFields();
            handleClose();
          }}
          disabled={communities.length === 0}
        >
          Crear Comunidades
        </Button>
      </DialogContent>
    </Dialog>
  );
};
