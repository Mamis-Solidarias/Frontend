import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import React, {FC, useEffect, useState} from 'react';
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
import {CONTACTING_METHODS} from "../../types/ContactingMethods";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import {Link} from "@mui/material";
import MailIcon from "@mui/icons-material/Mail";
import CallIcon from "@mui/icons-material/Call";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import DeviceUnknownIcon from "@mui/icons-material/DeviceUnknown";

interface UpdateContactsProps {
  id: string;
  contacts: Contact[];
  openDialog: boolean;
  handleClose: () => void;
  setAction: (action: Action) => void;
}

export const UpdateFamilyContacts: FC<UpdateContactsProps> = props => {
  const { openDialog, handleClose, id, setAction, contacts } = props;
  const [contactsFinal, setContactsFinal] = useState<ContactToSend[]>([]);
  const [contact, setContact] = useState<Contact>({ type: '', title: '', isPreferred: false, content: '' });

  useEffect(() => {
    setContactsFinal([...contacts])
  }, [])

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
            disabled={!contact.content || !contact.title || !contact.type}
          >
            Añadir
          </Button>
        </Box>
        <TableContainer>
          <Table sx={{ minWidth: 800 }} aria-label='table in dashboard'>
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell>Título</TableCell>
                <TableCell>Contenido</TableCell>
                <TableCell>Es Preferido</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {contactsFinal.map((contact: ContactToSend) => (
                <TableRow hover key={contact.title} sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
                  {contact.type === CONTACTING_METHODS.FACEBOOK &&  <TableCell><FacebookIcon sx={{color: "#4267B2"}}/></TableCell>}
                  {contact.type === CONTACTING_METHODS.INSTAGRAM && <TableCell><InstagramIcon sx={{color: "#E1306C"}}/></TableCell>}
                  {contact.type === CONTACTING_METHODS.EMAIL && <TableCell><Link target={"_blank"} rel={"noopener noreferrer"} href={"mailto:" + contact.content} sx={{color: "black"}}><MailIcon/></Link></TableCell>}
                  {contact.type === CONTACTING_METHODS.PHONE && <TableCell><Link target={"_blank"} rel={"noopener noreferrer"} href={"tel:" + contact.content} sx={{color: "lightBlue"}}><CallIcon/></Link></TableCell>}
                  {contact.type === CONTACTING_METHODS.WHATSAPP && <TableCell><Link target={"_blank"} rel={"noopener noreferrer"} href={"https://api.whatsapp.com/send?phone=" + contact.content} sx={{color: "#075e54"}}><WhatsAppIcon/></Link></TableCell>}
                  {contact.type === CONTACTING_METHODS.OTHER && <TableCell><DeviceUnknownIcon sx={{color: "gray"}}/></TableCell>}
                  {CONTACTING_METHODS[contact.type as keyof typeof CONTACTING_METHODS] === CONTACTING_METHODS.FACEBOOK &&  <TableCell><FacebookIcon sx={{color: "#4267B2"}}/></TableCell>}
                  {CONTACTING_METHODS[contact.type as keyof typeof CONTACTING_METHODS] === CONTACTING_METHODS.INSTAGRAM && <TableCell><InstagramIcon sx={{color: "#E1306C"}}/></TableCell>}
                  {CONTACTING_METHODS[contact.type as keyof typeof CONTACTING_METHODS] === CONTACTING_METHODS.EMAIL && <TableCell><Link target={"_blank"} rel={"noopener noreferrer"} href={"mailto:" + contact.content} sx={{color: "black"}}><MailIcon/></Link></TableCell>}
                  {CONTACTING_METHODS[contact.type as keyof typeof CONTACTING_METHODS] === CONTACTING_METHODS.PHONE && <TableCell><Link target={"_blank"} rel={"noopener noreferrer"} href={"tel:" + contact.content} sx={{color: "lightBlue"}}><CallIcon/></Link></TableCell>}
                  {CONTACTING_METHODS[contact.type as keyof typeof CONTACTING_METHODS] === CONTACTING_METHODS.WHATSAPP && <TableCell><Link target={"_blank"} rel={"noopener noreferrer"} href={"https://api.whatsapp.com/send?phone=" + contact.content} sx={{color: "#075e54"}}><WhatsAppIcon/></Link></TableCell>}
                  {CONTACTING_METHODS[contact.type as keyof typeof CONTACTING_METHODS] === CONTACTING_METHODS.OTHER && <TableCell><DeviceUnknownIcon sx={{color: "gray"}}/></TableCell>}
                  <TableCell>{contact.title}</TableCell>
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
