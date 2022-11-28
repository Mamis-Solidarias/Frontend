import TextField from '@mui/material/TextField';

import { FC, useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import Contact from 'src/types/Contact';
import cloneDeep from 'lodash.clonedeep';

interface ContactFormProps {
  contact: Contact;
  setContact: (contact: Contact) => void;
}

export const ContactForm: FC<ContactFormProps> = props => {
  const { contact, setContact } = props;
  const [changes, setChanges] = useState<number>(0);

  return (
    <>
      <TextField
        type='text'
        sx={{py: '.3em'}}
        label='Título'
        placeholder='Instagram'
        value={contact.title}
        onChange={e => {
          const newContact = cloneDeep(contact);
          newContact.title = e.target.value;
          setContact(newContact);
          setChanges(changes + 1);
        }}
        fullWidth={true}
        variant='standard'
      />
      <TextField
        type='text'
        sx={{py: '.3em'}}
        label='Contenido'
        placeholder='@miguel.sanchez77'
        value={contact.content}
        onChange={e => {
          const newContact = cloneDeep(contact);
          newContact.content = e.target.value;
          setContact(newContact);
          setChanges(changes + 1);
        }}
        fullWidth={true}
        variant='standard'
      />
    <TextField
        select
        type='text'
        sx={{py: '.3em'}}
        label='Forma de Contacto'
        defaultValue="Email"
        value={contact.type}
        onChange={e => {
          const newContact = cloneDeep(contact);
            newContact.type = e.target.value;
            setContact(newContact);
            setChanges(changes + 1);
        }}
        fullWidth={true}
        variant='standard'
      >
        <MenuItem value='' hidden={true}>Ninguno</MenuItem>
        <MenuItem value='Email'>Email</MenuItem>
        <MenuItem value='Facebook'>Facebook</MenuItem>
        <MenuItem value='Instagram'>Instagram</MenuItem>
        <MenuItem value='Phone'>Teléfono</MenuItem>
        <MenuItem value='Whatsapp'>Whatsapp</MenuItem>
        <MenuItem value='Other'>Otra</MenuItem>
      </TextField>

      <Stack direction='row' spacing={1} sx={{py: '.3em'}} alignItems='center'>
        <Typography>No es preferida</Typography>
        <Switch
          onChange={e => {
            const newContact = cloneDeep(contact);
            newContact.isPreferred = e.target.checked;
            setContact(newContact);
            setChanges(changes + 1);
          }}
          checked={contact.isPreferred}
        />
        <Typography>Es preferida</Typography>
      </Stack>
    </>
  );
};
