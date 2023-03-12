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
import Community from 'src/types/beneficiaries/Community';
import IconButton from '@mui/material/IconButton';
import { Action } from 'src/types/Action';

interface CreateCommunityProps {
  openDialog: boolean;
  handleClose: () => void;
  setAction: (action: Action) => void;
}

export const CreateCommunity: FC<CreateCommunityProps> = props => {
  const { openDialog, handleClose, setAction } = props;
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
      <DialogTitle sx={{ display: 'flex', justifyContent: 'center' }}>Crear Comunidades</DialogTitle>
      <DialogContent>
        <Box>
          <TextField
            id='communityName'
            type='text'
            sx={{ py: '.3em' }}
            inputProps={{ pattern: '^.+$' }}
            label='Nombre'
            placeholder='Misiones'
            value={name}
            onChange={e => {
              setName(e.target.value);
            }}
            fullWidth={true}
            variant='standard'
          />
          <TextField
            id='address'
            type='text'
            sx={{ py: '.3em' }}
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
            id='description'
            type='text'
            sx={{ py: '.3em' }}
            label='Descripción (opcional)'
            placeholder='Es un lindo pueblo'
            value={description}
            onChange={e => {
              setDescription(e.target.value);
            }}
            fullWidth={true}
            variant='standard'
          />
          <TextField
            id='communityCode'
            type='text'
            sx={{ py: '.3em' }}
            label='Código (opcional)'
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
              communities.push({
                name,
                address,
                description: finalDescription,
                communityCode: finalCommunityCode
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
                <TableCell>Código</TableCell>
                <TableCell>Nombre</TableCell>
                <TableCell>Dirección</TableCell>
                <TableCell>Descripción</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {communities?.map((community: Community) => (
                <TableRow hover key={community.name} sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
                  <TableCell>{community.communityCode}</TableCell>
                  <TableCell sx={{ py: theme => `${theme.spacing(0.5)} !important` }}>{community.name}</TableCell>
                  <TableCell>{community.address}</TableCell>
                  <TableCell>{community.description}</TableCell>
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
            onClick={async e => {
              e.preventDefault();
              try {
                await createCommunities(communities);
                resetAllFields();
                setAction({
                  complete: true,
                  success: true,
                  message: 'Comunidad creada exitosamente',
                  status: 201
                });
                handleClose();
              } catch (e) {
                setAction({
                  complete: true,
                  success: false,
                  message: 'Hubo un problema creando la comunidad. Intente nuevamente más tarde',
                  status: 400
                });
              }
            }}
            disabled={communities.length === 0}
          >
            Crear
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
