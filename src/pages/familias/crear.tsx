import React from 'react';
import router from 'next/router';

import { Navigation } from '../../components/index';
import { createFamily } from '../../types/family';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';

const Familias = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <Navigation />
      <Container sx={{ py: '5em', px: '5em' }}>
        <Button
          variant="outlined"
          onClick={() => router.push('/familias')}
          sx={{ marginBottom: '3em' }}
        >
          Atrás
        </Button>
        <Typography variant="h3" component="div">
          Nueva Familia
        </Typography>
        <Divider />
        <Box
          component="form"
          sx={{ display: 'flex', flexDirection: 'column' }}
          onSubmit={(e) => {
            e.preventDefault();
            const form = e.target;
            createFamily(
              form.name.value,
              form.address.value,
              form.connectivityDetails,
              form.community
            );
            e.target.submit();
          }}
        >
          <TextField
            id="name"
            variant="standard"
            label="Nombre de Familia"
            type="text"
            sx={{ my: '1em' }}
            required
          />
          <TextField
            id="address"
            variant="standard"
            label="Dirección"
            type="text"
            sx={{ my: '1em' }}
            required
          />
          <TextField
            id="connectivityDetails"
            variant="standard"
            label="Modo de Contacto"
            type="text"
            sx={{ my: '1em' }}
            required
          />
          <Button type="submit">Crear</Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Familias;
