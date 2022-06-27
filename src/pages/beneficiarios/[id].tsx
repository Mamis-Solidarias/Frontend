import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import Box from '@mui/material/Box';

import { Navigation } from '../../components/index';
import { getBeneficiary } from '../../types/beneficiary';
import Container from '@mui/material/Container';

const Beneficiary = () => {
  const router = useRouter();
  const benef = getBeneficiary(router.query.id as string);
  const dateYYYYMMDD = benef.birthday
    .toISOString()
    .slice(0, 19)
    .split('T')[0]
    .split(/-/g);

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <Navigation />
        <Container sx={{ py: '5em', px: '5em' }}>
          <div>
            <strong>Familia:</strong> {benef.familyId}
          </div>
          <div>
            <strong>Nombre:</strong> {benef.firstName} {benef.lastName}
          </div>
          <div>
            <strong>DNI: </strong>
            {benef.documentId}
          </div>
          <div>
            <strong>Sexo: </strong>
            {!!benef.sex ? 'Hombre' : 'Mujer'}
          </div>
          <div>
            <strong>Fecha de Nacimiento: </strong>
            {dateYYYYMMDD[2] + '/' + dateYYYYMMDD[1] + '/' + dateYYYYMMDD[0]}
          </div>
          <div>
            <strong>Edad: </strong>{' '}
            {new Date().getFullYear() - benef.birthday.getFullYear()}
          </div>
          <div>{benef.comments}</div>
        </Container>
      </Box>
    </>
  );
};

export default Beneficiary;
