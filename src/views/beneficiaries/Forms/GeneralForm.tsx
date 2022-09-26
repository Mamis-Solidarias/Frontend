import TextField from '@mui/material/TextField';

import { FC } from 'react';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

interface GeneralFormProps {
  firstName: string;
  setFirstName: (value: string) => void;
  lastName: string;
  setLastName: (value: string) => void;
  type: string;
  setType: (value: string) => void;
  gender: string;
  setGender: (value: string) => void;
  birthday: string;
  setBirthday: (value: string) => void;
  dni: string;
  setDni: (value: string) => void;
  comments: string;
  setComments: (value: string) => void;
  likes?: string;
  setLikes: (value: string) => void;
}

export const GeneralForm: FC<GeneralFormProps> = props => {
  const {
    firstName,
    setFirstName,
    lastName,
    setLastName,
    type,
    setType,
    gender,
    setGender,
    birthday,
    setBirthday,
    dni,
    setDni,
    comments,
    setComments,
    likes,
    setLikes
  } = props;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
      <Grid xs={5}>
        <TextField
          style={{ padding: '1em' }}
          id='firstName'
          type='text'
          inputProps={{ pattern: '[0-9]*$' }}
          label='Nombre'
          placeholder='Juan García'
          value={firstName}
          onChange={e => {
            setFirstName(e.target.value);
          }}
          fullWidth={true}
          variant='standard'
        />
        <TextField
          select
          fullWidth={true}
          variant='standard'
          placeholder='Niño'
          id='typeSelector'
          value={type}
          label='Tipo'
          onChange={e => setType(e.target.value)}
        >
          <MenuItem value='Adult'>Adulto</MenuItem>
          <MenuItem value='Child'>Niño</MenuItem>
        </TextField>
        <TextField
          style={{ padding: '1em', marginTop: '1em' }}
          id='birthday'
          type='date'
          label='Fecha de Nacimiento'
          InputLabelProps={{ shrink: true }}
          placeholder='23/04/1998'
          value={birthday}
          onChange={e => {
            setBirthday(e.target.value);
          }}
          fullWidth={true}
          variant='standard'
        />
        <TextField
          sx={{ padding: '1em' }}
          id='comments'
          type='text'
          label='Comentarios sobre Beneficiario'
          placeholder='Es buena gente'
          value={comments}
          onChange={e => {
            setComments(e.target.value);
          }}
          fullWidth={true}
          variant='standard'
        />
      </Grid>
      <Grid xs={5}>
        <TextField
          style={{ padding: '1em' }}
          id='lastName'
          type='text'
          inputProps={{ pattern: '[0-9]*$' }}
          label='Apellido'
          placeholder='Montoya'
          value={lastName}
          onChange={e => {
            setLastName(e.target.value);
          }}
          fullWidth={true}
          variant='standard'
        />
        <TextField
          select
          fullWidth={true}
          style={{ padding: '1em' }}
          variant='standard'
          label='Género'
          placeholder='Masculino'
          value={gender}
          onChange={e => setGender(e.target.value)}
        >
          <MenuItem value='Male'>Masculino</MenuItem>
          <MenuItem value='Female'>Femenino</MenuItem>
          <MenuItem value='Other'>Otro</MenuItem>
        </TextField>
        <TextField
          style={{ padding: '1em' }}
          id='dni'
          type='text'
          label='DNI del Beneficiario'
          placeholder='23456654'
          value={dni}
          onChange={e => {
            setDni(e.target.value);
          }}
          fullWidth={true}
          variant='standard'
        />
        <TextField
          style={{ padding: '1em' }}
          id='likes'
          type='text'
          label='Cosas que le gustan al Beneficiario'
          placeholder='La familia de José'
          value={likes}
          onChange={e => {
            setLikes(e.target.value);
          }}
          fullWidth={true}
          variant='standard'
        />
      </Grid>
    </Box>
  );
};
