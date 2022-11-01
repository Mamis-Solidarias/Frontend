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
import { ContactForm } from './ContactForm';
import Contact from 'src/types/Contact';
import ContactToSend from 'src/types/Contact';
import { Action } from 'src/types/Action';
import { updateFamily } from 'src/API/Beneficiaries/families_data';

interface UpdateContactsProps {
  id: string;
  contacts: Contact[];
  openDialog: boolean;
  handleClose: () => void;
  setAction: (action: Action) => void;
}

export const UpdateFamilyContacts: FC<UpdateContactsProps> = props => {
  const { openDialog, handleClose, id, setAction } = props;
  const [contactsFinal, setContactsFinal] = useState<ContactToSend[]>([]);
  const [contact, setContact] = useState<Contact>({ type: '', title: '', isPreferred: false, content: '' });

  const resetFields = () => {
    setContact({ type: '', title: '', isPreferred: false, content: '' });
  };

  const deleteContact = (contactToDelete: ContactToSend) => {
    const index = contactsFinal.indexOf(contactToDelete);
    console.log(index);
    const newContacts = contactsFinal;
    newContacts.splice(index, 1);
    setContactsFinal(newContacts);
  };

  return (
    <Dialog
      open={openDialog}
      onClose={() => {
        handleClose();
      }}
      maxWidth='lg'
    >
      <DialogTitle sx={{ display: 'flex', justifyContent: 'center' }}>Actualizar Contactos</DialogTitle>
      <DialogContent>
        <Box>
          <ContactForm contact={contact} setContact={setContact} />
          <Button
            sx={{ display: 'flex', justifyContent: 'center', width: '100%', my: '1em' }}
            variant='contained'
            onClick={() => {
              const newContactsFinal = contactsFinal;
              newContactsFinal.push(contact);
              setContactsFinal(newContactsFinal);
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
                <TableCell>Título</TableCell>
                <TableCell>Tipo</TableCell>
                <TableCell>Contenido</TableCell>
                <TableCell>Es Preferido</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {contactsFinal.map((contact: ContactToSend) => (
                <TableRow hover key={contact.title} sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
                  <TableCell>{contact.title}</TableCell>
                  <TableCell sx={{ py: theme => `${theme.spacing(0.5)} !important` }}>{contact.type}</TableCell>
                  <TableCell>{contact.content}</TableCell>
                  <TableCell>{contact.isPreferred ? 'Sí' : 'No'}</TableCell>
                  <TableCell>
                    <IconButton aria-label='delete' size='small' onClick={() => deleteContact(contact)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }}>
          <Button
            sx={{ display: 'flex', justifyContent: 'center', margin: '1%', width: '100%' }}
            variant='outlined'
            onClick={() => {
              handleClose();
              resetFields();
            }}
          >
            Cancelar
          </Button>
          <Button
            sx={{ display: 'flex', justifyContent: 'center', margin: '1%', width: '100%' }}
            variant='contained'
            onClick={async () => {
              try {
                await updateFamily(id, { contacts: contactsFinal });
                handleClose();
                setAction({
                  complete: true,
                  success: true,
                  message: 'Contactos actualizados exitosamente',
                  status: 200
                });
              } catch (e) {
                setAction({
                  complete: true,
                  success: false,
                  message: 'Error actualizando contactos',
                  status: 400
                });
              }
            }}
            disabled={contactsFinal.length === 0}
          >
            Editar Contactos
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};
