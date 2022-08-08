import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import Box from '@mui/material/Box';

import { Navigation } from '../../components/index';
import { getBeneficiary } from '../../types/beneficiary';
import Container from '@mui/material/Container';
import { getFamily } from '../../types/family';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';

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
        <Container sx={{ py: '5em', px: '5em', lineHeight: '1.5em' }}>
          <Button
            variant="outlined"
            onClick={() => router.push('/beneficiarios')}
            sx={{ marginBottom: '3em' }}
          >
            Atrás
          </Button>
          <Card
            sx={{
              minWidth: '100%',
              minHeight: '100%',
              backgroundColor: 'RGBA(0,112,243,0.3)',
              textAlign: 'start',
              px: '1em',
            }}
          >
            <CardContent>
              <strong>Familia:</strong> {getFamily(benef.familyId).name}
            </CardContent>
            <CardContent>
              <strong>Nombre:</strong> {benef.firstName} {benef.lastName}
            </CardContent>
            <Divider />
            <CardContent>
              <strong>DNI:</strong> {benef.documentId}
            </CardContent>
            <CardContent>
              <strong>Sexo:</strong> {!!benef.sex ? 'Hombre' : 'Mujer'}
            </CardContent>
            <Divider />
            <CardContent>
              <strong>Fecha de Nacimiento:</strong>{' '}
              {dateYYYYMMDD[2] + '/' + dateYYYYMMDD[1] + '/' + dateYYYYMMDD[0]}
            </CardContent>
            <CardContent>
              <strong>Edad: </strong>{' '}
              {new Date().getFullYear() - benef.birthday.getFullYear()}
            </CardContent>
            <Divider />
            <CardContent>
              <strong>Tipo:</strong> {benef.type}
            </CardContent>
            {!!benef.comments && (
              <CardContent>
                <strong>Cometarios:</strong> {benef.comments}
              </CardContent>
            )}
          </Card>
        </Container>
      </Box>
    </>
  );
};

export default Beneficiary;
