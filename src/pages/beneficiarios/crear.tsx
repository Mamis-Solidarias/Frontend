import React, { useState } from 'react';

import { Navigation } from '../../components/index';
import { beneficiaries, createBeneficiary } from '../../types/beneficiary';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import FormLabel from '@mui/material/FormLabel';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

const Beneficiarios = () => {
  const [birthday, setBirthday] = React.useState<Date | null>(null);
  const [sex, setSex] = useState<number | null>(null);
  const [type, setType] = useState<string>('');

  return (
    <Box sx={{ display: 'flex' }}>
      <Navigation />
      <Container sx={{ py: '5em', px: '5em' }}>
        <Typography variant="h3" component="div">
          Nuevo Beneficiario
        </Typography>
        <Divider />
        <Box
          component="form"
          sx={{ display: 'flex', flexDirection: 'column' }}
          onSubmit={(e) => {
            e.preventDefault();
            const form = e.target;
            createBeneficiary(
              '1',
              form.firstName.value,
              form.lastName.value,
              sex,
              birthday,
              form.documentId.value,
              type,
              true,
              form.comments.value
            );
            console.log(beneficiaries);
            e.target.submit();
          }}
        >
          <TextField
            id="firstName"
            variant="standard"
            label="Nombres"
            type="text"
            sx={{ my: '1em' }}
            required
          />
          <TextField
            id="lastName"
            variant="standard"
            label="Apellidos"
            type="text"
            sx={{ my: '1em' }}
            required
          />
          <TextField
            id="family"
            variant="standard"
            label="Familia a la que pertenece"
            type="text"
            sx={{ my: '1em' }}
            required
          />
          <TextField
            id="documentId"
            variant="standard"
            label="DNI"
            type="number"
            sx={{ my: '1em' }}
            required
          />
          <FormControl sx={{ my: '1em' }}>
            <FormLabel id="sex-label" required>
              Sexo
            </FormLabel>
            <Select
              labelId="sex-label"
              id="sex"
              variant="standard"
              onChange={(e) => {
                if (!!e.target.value) {
                  setSex(e.target.value as number);
                }
              }}
            >
              <MenuItem value="0">Hombre</MenuItem>
              <MenuItem value="1">Mujer</MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{ my: '1em' }}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Fecha de Nacimiento *"
                onChange={(newValue) => setBirthday(newValue)}
                value={birthday}
                inputFormat="dd/mm/yyyy"
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </FormControl>
          <FormControl sx={{ my: '1em' }}>
            <FormLabel id="type-label" required>
              Tipo
            </FormLabel>
            <Select
              labelId="type-label"
              id="type"
              type="number"
              variant="standard"
              onChange={(e) => {
                if (!!e.target.value) {
                  setType(e.target.value as string);
                }
              }}
            >
              <MenuItem value="Beneficiary">Beneficiario</MenuItem>
              <MenuItem value="Guardian">Guardián</MenuItem>
            </Select>
          </FormControl>
          <TextField
            id="comments"
            variant="standard"
            label="Comentarios"
            sx={{ my: '1em' }}
          />
          <Button type="submit">Crear</Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Beneficiarios;
