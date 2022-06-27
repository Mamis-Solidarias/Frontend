import React from 'react';
import { useRouter } from 'next/router';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import { Navigation } from '../../components';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import { communities, Community } from '../../types/community';

const Communities = () => {
  const router = useRouter();

  return (
    <Box sx={{ display: 'flex' }}>
      <Navigation />
      <Box sx={{ py: '5em', px: '5em' }}>
        <Button
          variant="outlined"
          onClick={() => router.push('/familias/crear')}
        >
          Crear Comunidad
        </Button>
        <Box
          component="div"
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}
        >
          {communities.map((community: Community) => (
            <Button
              sx={{ my: '3em', mx: '3em', minWidth: '20em' }}
              onClick={() => router.push('/comunidades/' + community.id)}
              key={community.id}
            >
              <Card
                key={community.id}
                sx={{
                  minWidth: '100%',
                  minHeight: '100%',
                  backgroundColor: 'RGBA(0,112,243,0.5)',
                  textAlign: 'start',
                  px: '1em',
                }}
              >
                <CardContent>
                  <strong>Nombre:</strong> {community.name}
                </CardContent>
                <CardContent>
                  <strong>Dirección:</strong> {community.address}
                </CardContent>
                <Divider />
                <CardContent>
                  <strong>Descripción:</strong> {community.description}
                </CardContent>
              </Card>
            </Button>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Communities;
