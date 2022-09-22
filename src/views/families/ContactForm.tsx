import TextField from '@mui/material/TextField';

import { FC, useState } from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';

interface Contact {
  content: string;
  isPreferred: boolean;
  title: string;
  type: string;
}
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
        style={{ padding: '1em' }}
        type='text'
        label='Título de Nuevo Contacto'
        placeholder='Instagram'
        value={contact.title}
        onChange={e => {
          const newContact = contact;
          newContact.title = e.target.value;
          setContact(newContact);
          setChanges(changes + 1);
        }}
        fullWidth={true}
        variant='standard'
      />
      <TextField
        style={{ padding: '1em' }}
        type='text'
        label='Contenido de Nuevo Contacto'
        placeholder='@miguel.sanchez77'
        value={contact.content}
        onChange={e => {
          const newContact = contact;
          newContact.content = e.target.value;
          setContact(newContact);
          setChanges(changes + 1);
        }}
        fullWidth={true}
        variant='standard'
      />

      <FormControl fullWidth sx={{ padding: '1em' }}>
        <InputLabel id={'types'}>Nueva Forma de Contacto</InputLabel>
        <Select
          labelId={'types'}
          fullWidth={true}
          variant='standard'
          defaultValue={'Email'}
          value={contact.type}
          label='Nueva Forma de Contacto'
          onChange={e => {
            const newContact = contact;
            newContact.type = e.target.value;
            setContact(newContact);
            setChanges(changes + 1);
          }}
        >
          <MenuItem value='' hidden={true}></MenuItem>
          <MenuItem value='Email'>Email</MenuItem>
          <MenuItem value='Facebook'>Facebook</MenuItem>
          <MenuItem value='Instagram'>Instagram</MenuItem>
          <MenuItem value='Phone'>Teléfono</MenuItem>
          <MenuItem value='Whatsapp'>Whatsapp</MenuItem>
          <MenuItem value='Other'>Otra</MenuItem>
        </Select>
      </FormControl>
      <Stack direction='row' spacing={1} alignItems='center'>
        <Typography>No es preferida</Typography>
        <Switch
          onChange={e => {
            const newContact = contact;
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
