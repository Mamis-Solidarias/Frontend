import React from 'react';
import { useRouter } from 'next/router';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import { Navigation } from '../../components';
import { families, Family } from '../../types/family';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';

const Families = () => {
  const router = useRouter();

  return (
    <Box sx={{ display: 'flex' }}>
      <Navigation />
      <Box sx={{ py: '5em', px: '5em' }}>
        <Button
          variant="outlined"
          onClick={() => router.push('/familias/crear')}
        >
          Crear Familia
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
          {families.map((family: Family) => (
            <Button
              sx={{ my: '3em', mx: '3em', minWidth: '20em' }}
              onClick={() => router.push('/familias/' + family.id)}
              key={family.id}
            >
              <Card
                key={family.id}
                sx={{
                  minWidth: '100%',
                  minHeight: '100%',
                  backgroundColor: 'RGBA(0,112,243,0.5)',
                  textAlign: 'start',
                  px: '1em',
                }}
              >
                <CardContent>
                  <strong>Nombre:</strong> {family.name}
                </CardContent>
                <Divider />
                <CardContent>
                  <strong>Dirección:</strong> {family.address}
                </CardContent>
                <CardContent>
                  <strong>Modo de contacto:</strong>{' '}
                  {family.connectivityDetails}
                </CardContent>
              </Card>
            </Button>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Families;
