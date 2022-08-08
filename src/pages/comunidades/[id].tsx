import React from 'react';
import { useRouter } from 'next/router';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

import { Navigation } from '../../components';
import Divider from '@mui/material/Divider';
import { getCommunity, getFamilies } from '../../types/community';

const Community = () => {
  const router = useRouter();
  const community = getCommunity(router.query.id as string);
  const families = getFamilies(router.query.id as string);

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <Navigation />
        <Container sx={{ py: '5em', px: '5em', lineHeight: '1.5em' }}>
          <Button
            variant="outlined"
            onClick={() => router.push('/comunidades')}
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
              <strong>Nombre:</strong> {community.name}
            </CardContent>
            <Divider />
            <CardContent>
              <strong>Dirección:</strong> {community.address}
            </CardContent>
            <CardContent>
              <strong>Descripción:</strong> {community.description}
            </CardContent>
            <Divider />
            <CardContent>
              <strong>Miembros:</strong>
              {families.length === 0 && ' -'}
              {families.map((member) => ' ' + member.name)}
            </CardContent>
          </Card>
        </Container>
      </Box>
    </>
  );
};

export default Community;
