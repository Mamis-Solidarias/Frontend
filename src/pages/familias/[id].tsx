import React from 'react';
import { useRouter } from 'next/router';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

import { Navigation } from '../../components';
import { getFamily, getMembers } from '../../types/family';
import Divider from '@mui/material/Divider';
import { getCommunity } from '../../types/community';

const Family = () => {
  const router = useRouter();
  const family = getFamily(router.query.id as string);
  const members = getMembers(router.query.id as string);

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <Navigation />
        <Container sx={{ py: '5em', px: '5em', lineHeight: '1.5em' }}>
          <Button
            variant="outlined"
            onClick={() => router.push('/familias')}
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
              <strong>Comunidad:</strong>{' '}
              {getCommunity(family.communityId).name}
            </CardContent>
            <CardContent>
              <strong>Nombre:</strong> {family.name}
            </CardContent>
            <Divider />
            <CardContent>
              <strong>Dirección:</strong> {family.address}
            </CardContent>
            <CardContent>
              <strong>Modo de contacto:</strong> {family.connectivityDetails}
            </CardContent>
            <Divider />
            <CardContent>
              <strong>Miembros:</strong>
              {members.length === 0 && ' -'}
              {members.map((member) => ' ' + member.firstName)}
            </CardContent>
          </Card>
        </Container>
      </Box>
    </>
  );
};

export default Family;
