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

interface UpdateContactsProps {
  id: number;
  contacts: Contact[];
  openDialog: boolean;
  handleClose: () => void;
}

export const UpdateFamilyContacts: FC<UpdateContactsProps> = props => {
  const { openDialog, handleClose } = props;
  const [contactsFinal, setContactsFinal] = useState<Contact[]>([]);
  const [contact, setContact] = useState<Contact>({ type: '', title: '', isPreferred: false, content: '' });

  const resetFields = () => {
    setContact({ type: '', title: '', isPreferred: false, content: '' });
  };

  const deleteContact = (contactToDelete: Contact) => {
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
              {contactsFinal.map((contact: Contact) => (
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
        <Button
          sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}
          variant='contained'
          onClick={() => {
            handleClose();
          }}
          disabled={contactsFinal.length === 0}
        >
          Editar Contactos
        </Button>
      </DialogContent>
    </Dialog>
  );
};
