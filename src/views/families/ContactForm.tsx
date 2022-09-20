import TextField from '@mui/material/TextField';

import { FC, useEffect } from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';

interface ContactFormProps {
  types: string[];
  setTypes: (value: string[]) => void;
  contents: string[];
  setContents: (value: string[]) => void;
  arrayIsPreferred: boolean[];
  setArrayIsPreferred: (value: boolean[]) => void;
  titles: string[];
  setTitles: (value: string[]) => void;
  key: number;
}

export const ContactForm: FC<ContactFormProps> = props => {
  const { types, setTypes, contents, setContents, arrayIsPreferred, setArrayIsPreferred, titles, setTitles, key } =
    props;

  useEffect(() => {
    console.log(arrayIsPreferred);
  }, [arrayIsPreferred]);

  return (
    <>
      <Typography>Forma de Contacto N° {key}</Typography>
      <TextField
        style={{ padding: '1em' }}
        type='text'
        label='Contenido'
        placeholder='@miguel.sanchez77'
        value={contents[key]}
        onChange={e => {
          const newContents = contents;
          newContents[key] = e.target.value;
          setContents(newContents);
        }}
        fullWidth={true}
        variant='standard'
      />
      <TextField
        style={{ padding: '1em' }}
        type='text'
        label='Título de Contacto'
        placeholder='Instagram'
        value={titles[key]}
        onChange={e => {
          const newTitles = titles;
          newTitles[key] = e.target.value;
          setTitles(newTitles);
        }}
        fullWidth={true}
        variant='standard'
      />
      <FormControl fullWidth sx={{ padding: '1em' }}>
        <InputLabel id={'types' + key}>Forma de Contacto</InputLabel>
        <Select
          labelId={'types' + key}
          fullWidth={true}
          variant='standard'
          defaultValue={'Email'}
          value={types[key]}
          label='Tipo de Contacto'
          onChange={e => {
            const newTypes = types;
            newTypes[key] = e.target.value;
            setTypes(newTypes);
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
            const newArrayIsPreferred = arrayIsPreferred;
            newArrayIsPreferred[key] = e.target.checked;
            setArrayIsPreferred(newArrayIsPreferred);
          }}
          checked={arrayIsPreferred[key]}
        />
        <Typography>Es preferida</Typography>
      </Stack>
    </>
  );
};
