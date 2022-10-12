import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import DeleteIcon from '@mui/icons-material/Delete';

import { FC, useState } from 'react';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import { createCommunities } from 'src/API/Beneficiaries/communities_data';
import Community from 'src/types/Community';
import IconButton from '@mui/material/IconButton';

interface CreateCommunityProps {
  openDialog: boolean;
  handleClose: () => void;
}

export const CreateCommunity: FC<CreateCommunityProps> = props => {
  const { openDialog, handleClose } = props;
  const [name, setName] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [communityCode, setCommunityCode] = useState<string>('');
  const [communities, setCommunities] = useState<Community[]>([]);

  const resetFields = () => {
    setName('');
    setAddress('');
    setDescription('');
    setCommunityCode('');
  };

  const resetAllFields = () => {
    resetFields();
    communities.length = 0;
  };

  const deleteCommunity = (community: Community) => {
    const newCommunities = communities.filter(newCommunity => newCommunity !== community);
    setCommunities(newCommunities);
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
              const finalDescription = !!description ? description : undefined;
              const finalCommunityCode = !!communityCode ? communityCode : undefined;
              communities.push({ name, address, description: finalDescription, communityCode: finalCommunityCode });
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
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {!!communities &&
                communities.map((community: Community) => (
                  <TableRow hover key={community.name} sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
                    <TableCell sx={{ py: theme => `${theme.spacing(0.5)} !important` }}>{community.name}</TableCell>
                    <TableCell>{community.address}</TableCell>
                    <TableCell>{community.description}</TableCell>
                    <TableCell>{community.id}</TableCell>
                    <TableCell>
                      <IconButton aria-label='delete' size='small' onClick={() => deleteCommunity(community)}>
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
          onClick={async e => {
            e.preventDefault();
            await createCommunities(communities);
            resetAllFields();
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
